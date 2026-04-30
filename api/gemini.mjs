// Vercel Serverless Function : Gemini API 中継エンドポイント
// 役割: ブラウザから受け取った prompt を Google Gemini API に転送し、結果を返す
// APIキーは Vercel の環境変数 GEMINI_API_KEY から読み取り、外部には絶対に公開しない

const SYSTEM_PROMPT =
  "あなたは自動車リサイクルの専門家「エコ博士」です。" +
  "小学生にもわかるように、優しく、楽しく、専門用語を避けて解説してください。" +
  "語尾は『〜だよ』『〜だね』など。回答は短く（150文字以内）。";

const MODEL = "gemini-2.5-flash-preview-09-2025";

export default async function handler(req, res) {
  // POST 以外は拒否
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // リクエストボディの prompt を取得
  const { prompt } = req.body || {};
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "prompt is required" });
  }

  // 環境変数からAPIキーを取得（クライアントには絶対に出さない）
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set");
    return res.status(500).json({ error: "Server is not configured. Please contact administrator." });
  }

  // 入力長の上限（暴走防止）
  const trimmedPrompt = prompt.slice(0, 500);

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: trimmedPrompt }] }],
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error:", response.status, errText);
      return res.status(502).json({ error: "Upstream API error" });
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!text) {
      return res.status(502).json({ error: "Empty response from Gemini" });
    }

    return res.status(200).json({ text });
  } catch (err) {
    console.error("Serverless function error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
