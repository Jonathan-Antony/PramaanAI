export interface ParseResponse {
  filename: string;
  pages: number;
  processing_time_sec: number;
  full_text: string;
  page_wise: { page: number; text: string }[];
  sections: { section_id: string; content: string; length: number }[];
  ai_analysis: {
    tender_id: string;
    role: string;
    artifact_type: string;
    criteria: {
      mandatory: {
        financial?: string[];
        technical?: string[];
        compliance?: string[];
      };
      optional: {
        financial?: string[];
        technical?: string[];
        compliance?: string[];
      };
    };
    classification_summary: Record<string, number>;
    source_metadata: { document: string; issuer: string | null; pages: number | null };
    overall_extraction_confidence: number;
  };
}
