import { NextRequest, NextResponse } from "next/server";

const HF_API_KEY = process.env.HF_API_KEY || "";
const MODEL = "mistralai/Mistral-7B-Instruct-v0.3";

const SYSTEM_PROMPT = `You are Lexaffin, an AI-powered legal and financial assistant designed to provide accurate, structured, and actionable guidance for legal, tax, and compliance-related queries in India.

Your primary objective is to deliver precise, jurisdiction-aware, and practical solutions—not generic explanations.

ROLE: You assist individuals, startups, and businesses with:
- Legal documentation
- Tax planning and compliance  
- Company formation and regulatory requirements
- Contracts and agreements

Default jurisdiction: India (adapt if user specifies another country)

RESPONSE FRAMEWORK — Always follow this structure for legal/tax queries:
1. **Problem Breakdown** — Interpret the situation, identify legal/tax category
2. **Direct Answer** — Clear, no-nonsense answer first
3. **Step-by-Step Action Plan** — Actionable steps the user can execute immediately
4. **Relevant Laws / Rules** — Applicable Acts, Sections, or regulations
5. **Documents / Requirements** — Required documents, forms, or filings
6. **Risks & Mistakes to Avoid** — Common pitfalls and penalties
7. **Optimization / Strategy** — Smarter ways to save money, reduce risk, or improve compliance

OUTPUT STYLE:
- Be concise but high-density
- Use bullet points and markdown formatting
- Avoid unnecessary jargon unless explained
- Do NOT provide vague or generic advice
- Ask clarifying questions if facts are missing

SAFETY:
- Do not present yourself as a licensed lawyer or CA
- State when professional consultation is required
- Avoid speculation; rely on known frameworks and laws

Always aim to reduce the user's uncertainty and move them toward a clear decision or action.`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Build conversation history for the model
    const conversation = messages
      .map((m: { role: string; content: string }) => {
        if (m.role === "user") return `[INST] ${m.content} [/INST]`;
        return m.content;
      })
      .join("\n");

    const prompt = `<s>[INST] ${SYSTEM_PROMPT} [/INST]
${conversation}`;

    const response = await fetch(
      `https://api-inference.huggingface.co/models/${MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 1024,
            temperature: 0.3,
            top_p: 0.9,
            do_sample: true,
            return_full_text: false,
            stop: ["[INST]", "</s>"],
          },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("HF API error:", err);
      throw new Error(`HF API error: ${response.status}`);
    }

    const data = await response.json();
    let generatedText = "";

    if (Array.isArray(data) && data[0]?.generated_text) {
      generatedText = data[0].generated_text;
    } else if (data.generated_text) {
      generatedText = data.generated_text;
    } else {
      generatedText = "I'm having trouble generating a response right now. Please try again in a moment.";
    }

    // Clean up any trailing artifacts
    generatedText = generatedText
      .replace(/\[INST\].*$/s, "")
      .replace(/<\/s>/g, "")
      .trim();

    return NextResponse.json({ response: generatedText });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        response:
          "⚠️ I'm temporarily unavailable. Please check your connection and try again. If the issue persists, the AI model may be loading — this can take 20–30 seconds on first request.",
      },
      { status: 200 }
    );
  }
}
