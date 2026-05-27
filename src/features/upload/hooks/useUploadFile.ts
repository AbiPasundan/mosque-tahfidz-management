import { useState } from "react";
import { api } from "@/lib/api";

interface UploadState {
  uploading: boolean;
  progress: number;
  error: string | null;
}

interface UploadResult {
  url: string;
  public_id: string;
  format: string;
  size: number;
  width: number;
  height: number;
}

export function useUploadFile() {
  const [state, setState] = useState<UploadState>({
    uploading: false,
    progress: 0,
    error: null,
  });

  const upload = async (file: File): Promise<UploadResult | null> => {
    setState({ uploading: true, progress: 0, error: null });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await api.post("/api/v1/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const pct = e.total ? Math.round((e.loaded * 100) / e.total) : 0;
          setState((prev) => ({ ...prev, progress: pct }));
        },
      });

      setState({ uploading: false, progress: 100, error: null });
      return data.data as UploadResult;
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.message || "Upload failed";
      setState({ uploading: false, progress: 0, error: msg });
      return null;
    }
  };

  const reset = () =>
    setState({ uploading: false, progress: 0, error: null });

  return { ...state, upload, reset };
}
