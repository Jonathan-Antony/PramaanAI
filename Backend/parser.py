from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import fitz
import time
import re
import os
import json
import uuid

from dotenv import load_dotenv
from groq import Groq

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# 🧠 HEALTH CHECK
# -----------------------------
@app.get("/")
def health_check():
    return {"status": "ok", "message": "PDF parser running"}


# -----------------------------
# 🧠 SEGMENTATION
# -----------------------------
def segment_text(full_text: str):
    blocks = re.split(r"\n(?=\d+(\.\d+)*\s)", full_text)

    sections = []
    for b in blocks:
        b = b.strip()
        if len(b) < 30:
            continue

        match = re.match(r"^(\d+(\.\d+)*)", b)
        section_id = match.group(1) if match else str(uuid.uuid4())[:6]

        sections.append({
            "section_id": section_id,
            "content": b,
            "length": len(b)
        })

    return sections


# -----------------------------
# 🧠 TOOL SCHEMA (STABLE + SIMPLE)
# -----------------------------
TENDER_TOOL = {
    "type": "function",
    "function": {
        "name": "extract_tender_criteria",
        "description": "Extract structured tender criteria ONLY from the document.",
        "parameters": {
            "type": "object",
            "required": ["criteria"],
            "properties": {
                "criteria": {
                    "type": "object",
                    "required": ["mandatory", "optional"],
                    "properties": {
                        "mandatory": {
                            "type": "object",
                            "properties": {
                                "financial": {"type": "array"},
                                "technical": {"type": "array"},
                                "compliance": {"type": "array"}
                            }
                        },
                        "optional": {
                            "type": "object",
                            "properties": {
                                "compliance": {"type": "array"}
                            }
                        }
                    }
                }
            }
        }
    }
}


# -----------------------------
# 🧠 NORMALIZATION (HARD SAFETY LAYER)
# -----------------------------
def normalize_output(tool_args: dict, filename: str):

    criteria = tool_args.get("criteria") or {}

    mandatory = criteria.get("mandatory") or {}
    optional = criteria.get("optional") or {}

    financial = mandatory.get("financial") or []
    technical = mandatory.get("technical") or []
    compliance = mandatory.get("compliance") or []

    optional_compliance = optional.get("compliance") or []

    return {
        "tender_id": filename.replace(".pdf", "") + "_" + str(uuid.uuid4())[:8],
        "role": "tender",
        "artifact_type": "TenderCriteriaArtifact",

        "criteria": {
            "mandatory": {
                "financial": financial,
                "technical": technical,
                "compliance": compliance
            },
            "optional": {
                "compliance": optional_compliance
            }
        },

        "classification_summary": {
            "financial": len(financial),
            "technical": len(technical),
            "compliance": len(compliance),
            "optional": len(optional_compliance)
        },

        "source_metadata": {
            "document": filename,
            "issuer": None,
            "pages": None
        },

        "overall_extraction_confidence": 0.95
    }


# -----------------------------
# 🤖 AI AGENT (PROMPT FIX APPLIED)
# -----------------------------
def run_ai_agent(sections, filename):

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a STRICT extraction engine.\n"
                    "RULES:\n"
                    "- MUST call the tool\n"
                    "- NEVER output text\n"
                    "- ONLY structured extraction\n"
                    "\n"
                    "IMPORTANT:\n"
                    "- If ANY requirement appears as preference, advantage, or 'will be given' → "
                    "it MUST go into optional.compliance\n"
                    "- NEVER leave optional empty if such sentence exists\n"
                )
            },
            {
                "role": "user",
                "content": json.dumps(sections, ensure_ascii=False)
            }
        ],
        tools=[TENDER_TOOL],
        tool_choice={
            "type": "function",
            "function": {"name": "extract_tender_criteria"}
        },
        temperature=0
    )

    msg = response.choices[0].message

    if not msg or not getattr(msg, "tool_calls", None):
        return {
            "error": "No tool call returned",
            "raw": msg.content if msg else None
        }

    tool_call = msg.tool_calls[0]
    args = json.loads(tool_call.function.arguments)

    return normalize_output(args, filename)


# -----------------------------
# 📄 MAIN API
# -----------------------------
@app.post("/parse")
async def parse_pdf(file: UploadFile = File(...)):

    start = time.time()

    contents = await file.read()
    doc = fitz.open(stream=contents, filetype="pdf")

    full_text = ""
    pages = []

    for i in range(len(doc)):
        page = doc.load_page(i)
        text = page.get_text("text").strip()

        pages.append({
            "page": i + 1,
            "text": text
        })

        full_text += text + "\n"

    sections = segment_text(full_text)

    ai_output = run_ai_agent(sections, file.filename)

    return {
        "filename": file.filename,
        "pages": len(doc),
        "processing_time_sec": round(time.time() - start, 3),

        "full_text": full_text.strip(),
        "page_wise": pages,
        "sections": sections,

        "ai_analysis": ai_output
    }