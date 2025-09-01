import React, { useRef, useState } from "react";

const API_BASE =
  process.env.REACT_APP_API_URL?.replace(/\/$/, "") || "http://localhost:5001";

export default function FileUpload({ onFileParsed, setIsLoading, setError }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handlePick = () => inputRef.current?.click();

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);
    setIsLoading(true);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: form, // DO NOT set Content-Type; browser will set multipart boundary
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Upload failed: ${res.status} ${txt}`);
      }

      const data = await res.json();

      // Mirror your existing UI expectations
      onFileParsed?.(
        `Uploaded length: ${data?.text_length ?? 0} chars`,
        file.name
      );
    } catch (err) {
      setError(
        err?.message?.includes("Failed to fetch") ||
          err?.message?.includes("NetworkError")
          ? "Could not connect to backend (check URL/port)."
          : err?.message || "Upload failed."
      );
    } finally {
      setUploading(false);
      setIsLoading(false);
      // reset input so same file can be re-selected
      if (inputRef.current) inputRef.current.value = "";
    }
  };



  return (
    <div className="fileBox" style={{}}>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt,.docx"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <button onClick={handlePick} disabled={uploading}>
        {uploading ? "Uploading..." : "Choose File"}
      </button>
    </div>
  );
}
