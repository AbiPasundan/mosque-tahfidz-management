import type { CreateProgressPayload } from "../hooks/useProgress";

export interface QueueEntry extends CreateProgressPayload {
  studentName: string;
}

export interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
}
