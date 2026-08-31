/**
 * Translation helper for Admin CMS — uses Google Translate endpoint
 * (client=dict-chrome-ex, no API key needed, high capacity, no rate-limits)
 * with MyMemory API as secondary fallback.
 *
 * Called ONCE when an article or product is saved/updated in the admin
 * dashboard (never on public page load). Results are saved permanently
 * in Supabase.
 */

const MYMEMORY_API_URL = "https://api.mymemory.translated.net/get";

const LANG_CODE: Record<"en" | "zh", string> = {
  en: "en",
  zh: "zh-CN",
};

/** Splits text into chunks under a character limit, breaking on sentence/newline boundaries. */
function chunkText(text: string, limit: number): string[] {
  if (text.length <= limit) return [text];

  const pieces = text.split(/(?<=[.!?\n])\s+/);
  const chunks: string[] = [];
  let current = "";

  for (const piece of pieces) {
    if ((current + " " + piece).trim().length > limit) {
      if (current) chunks.push(current.trim());
      if (piece.length > limit) {
        for (let i = 0; i < piece.length; i += limit) {
          chunks.push(piece.slice(i, i + limit));
        }
        current = "";
      } else {
        current = piece;
      }
    } else {
      current = (current + " " + piece).trim();
    }
  }
  if (current) chunks.push(current.trim());

  return chunks;
}

/**
 * Google Translate public endpoint (used by Chrome translation extension).
 * Does not require an API key and supports large text chunks reliably.
 */
async function translateWithGoogle(
  text: string,
  targetLang: "en" | "zh"
): Promise<string | null> {
  if (!text || !text.trim()) return "";
  const lang = LANG_CODE[targetLang];
  const chunks = chunkText(text, 1000);
  const results: string[] = [];

  for (const chunk of chunks) {
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=dict-chrome-ex&sl=id&tl=${lang}&dt=t&q=${encodeURIComponent(chunk)}`;
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });

      if (!res.ok) return null;

      const data = await res.json();
      if (Array.isArray(data?.[0])) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const piece = data[0].map((item: any) => item?.[0] || "").join("");
        results.push(piece);
      } else {
        return null;
      }
    } catch (err) {
      console.error("Google Translate error:", err);
      return null;
    }
  }

  return results.join(" ");
}

/** Fallback: MyMemory API */
async function translateWithMyMemory(
  text: string,
  targetLang: "en" | "zh"
): Promise<string | null> {
  if (!text || !text.trim()) return "";
  const email = process.env.MYMEMORY_EMAIL || "bondyladista@gmail.com";
  const chunks = chunkText(text, 400);
  const results: string[] = [];

  for (const chunk of chunks) {
    const params = new URLSearchParams({
      q: chunk,
      langpair: `id|${LANG_CODE[targetLang]}`,
      de: email,
    });

    try {
      const res = await fetch(`${MYMEMORY_API_URL}?${params.toString()}`);
      if (!res.ok) return null;
      const data = await res.json();
      if (data.responseStatus !== 200 && data.responseStatus !== "200") return null;
      results.push(data?.responseData?.translatedText || chunk);
    } catch {
      return null;
    }
    await new Promise((r) => setTimeout(r, 200));
  }

  return results.join(" ");
}

/** Translates a single text block using Google Translate first, falling back to MyMemory. */
export async function translateText(
  text: string,
  targetLang: "en" | "zh"
): Promise<{ translated: string; success: boolean }> {
  if (!text || !text.trim()) return { translated: "", success: true };

  // Try Google Translate endpoint first
  const googleRes = await translateWithGoogle(text, targetLang);
  if (googleRes !== null && googleRes.trim().length > 0) {
    return { translated: googleRes, success: true };
  }

  // Fallback to MyMemory
  const myMemoryRes = await translateWithMyMemory(text, targetLang);
  if (myMemoryRes !== null && myMemoryRes.trim().length > 0) {
    return { translated: myMemoryRes, success: true };
  }

  // Safety net: return original text if all APIs fail
  return { translated: text, success: false };
}

/**
 * Translate a set of fields (e.g. title + content) into both EN and ZH.
 */
export async function translateFields(
  fields: Record<string, string>
): Promise<{
  en: Record<string, string | null>;
  zh: Record<string, string | null>;
  status: "done" | "partial" | "failed";
}> {
  const keys = Object.keys(fields);

  const en: Record<string, string | null> = {};
  const zh: Record<string, string | null> = {};
  const successMap: boolean[] = [];

  for (const key of keys) {
    const resEn = await translateText(fields[key], "en");
    en[key] = resEn.translated;
    successMap.push(resEn.success);

    const resZh = await translateText(fields[key], "zh");
    zh[key] = resZh.translated;
    successMap.push(resZh.success);
  }

  const allOk = successMap.every((s) => s === true);
  const allFailed = successMap.every((s) => s === false);
  const status = allOk ? "done" : allFailed ? "failed" : "partial";

  return { en, zh, status };
}
