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

export interface SurahSelectorProps {
  surahs: Surah[];
  selectedSurah: Surah | null;
  onSelect: (surah: Surah | null) => void;
  isLoading?: boolean;
}