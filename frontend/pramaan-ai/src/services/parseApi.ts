import type { ParseResponse } from "@/types/parse";

const PARSE_URL = "https://pramaanai.onrender.com/parse";

export async function parseTenderPdf(file: File): Promise<ParseResponse> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(PARSE_URL, { method: "POST", body: form });
  if (!res.ok) throw new Error(`Parse failed: ${res.status}`);
  return res.json();
}
