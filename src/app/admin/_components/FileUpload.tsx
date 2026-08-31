"use client";

import { useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";

function randomFileName(originalName: string) {
  const ext = originalName.split(".").pop();
  const random = Math.random().toString(36).slice(2, 10);
  return `${Date.now()}-${random}.${ext}`;
}

async function uploadFile(file: File): Promise<string> {
  const supabase = createClient();
  const path = randomFileName(file.name);

  const { error } = await supabase.storage.from("media").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Single file upload. Writes the resulting public URL into a hidden
 * input with `name`, so it submits along with the rest of the form —
 * no extra JS wiring needed in the parent Server Action.
 */
export function SingleImageUpload({
  name,
  label,
  defaultValue,
  accept = "image/*",
}: {
  name: string;
  label: string;
  defaultValue?: string;
  accept?: string;
}) {
  const [url, setUrl] = useState(defaultValue || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const publicUrl = await uploadFile(file);
      setUrl(publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload gagal.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-[var(--ink)] mb-1">{label}</label>
      <input type="hidden" name={name} value={url} />

      {url && (
        <div className="mb-2 relative w-40 aspect-video rounded-lg overflow-hidden border border-[var(--line)] bg-[var(--blue-pale)]">
          {/\.(mp4|webm|mov|m4v)(\?|$)/i.test(url) ? (
            <video src={url} className="w-full h-full object-cover" muted />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="" className="w-full h-full object-cover" />
          )}
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="text-xs font-medium px-3 py-2 rounded-lg border border-[var(--line)] text-[var(--ink)] hover:bg-[#f6f8fb] transition-colors disabled:opacity-60"
        >
          {uploading ? "Mengunggah..." : url ? "Ganti File" : "Pilih File"}
        </button>
        {url && !uploading && (
          <button
            type="button"
            onClick={() => setUrl("")}
            className="text-xs text-red-600 hover:underline"
          >
            Hapus
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}

/**
 * Multiple image upload (for product photo galleries). Keeps an
 * ordered list of public URLs in a hidden textarea named `name`,
 * one URL per line — matching what the existing product Server
 * Action already expects.
 */
export function MultiImageUpload({
  name,
  label,
  defaultUrls = [],
}: {
  name: string;
  label: string;
  defaultUrls?: string[];
}) {
  const [urls, setUrls] = useState<string[]>(defaultUrls);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList) {
    setUploading(true);
    setError("");
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        uploaded.push(await uploadFile(file));
      }
      setUrls((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload gagal.");
    } finally {
      setUploading(false);
    }
  }

  function removeAt(index: number) {
    setUrls((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="block text-sm font-medium text-[var(--ink)] mb-1">{label}</label>
      <textarea name={name} value={urls.join("\n")} readOnly className="hidden" />

      {urls.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {urls.map((url, i) => (
            <div
              key={url + i}
              className="relative w-20 h-20 rounded-lg overflow-hidden border border-[var(--line)] bg-[var(--blue-pale)] group"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute top-0.5 right-0.5 bg-black/60 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="text-xs font-medium px-3 py-2 rounded-lg border border-[var(--line)] text-[var(--ink)] hover:bg-[#f6f8fb] transition-colors disabled:opacity-60"
      >
        {uploading ? "Mengunggah..." : "+ Tambah Foto"}
      </button>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      <p className="text-xs text-[var(--muted)] mt-1">
        Bisa pilih beberapa foto sekaligus. Urutan mengikuti urutan upload.
      </p>
    </div>
  );
}
