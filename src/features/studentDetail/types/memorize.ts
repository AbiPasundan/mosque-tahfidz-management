export type MemorizeStatus = "memorized" | "in_progress" | "murojaah" | "forgotten";

export interface MemorizeRecord {
  id: string;
  student_id: string;
  verified_by?: string;
  verifier_name?: string;
  surah: string;
  surah_number: number;
  ayat_start: number;
  ayat_end: number;
  status: MemorizeStatus;
  notes?: string;
  memorized_at?: string;
  last_reviewed_at?: string;
}

export interface CreateMemorizePayload {
  student_id: string;
  surah: string;
  surah_number: number;
  ayat_start: number;
  ayat_end: number;
  status: MemorizeStatus;
  notes?: string;
}

export interface UpdateMemorizeStatusPayload {
  status: MemorizeStatus;
  notes?: string;
}

export interface BulkUpdateMemorizeStatusPayload {
  ids: string[];
  status: MemorizeStatus;
}
