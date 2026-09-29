import { createFileRoute } from "@tanstack/react-router";

const fallbackResponse = "Anant builds AI-assisted GTM systems, outreach workflows, and content-led growth engines for early-stage teams. For a specific collaboration, please connect with him on LinkedIn.";

type GeminiResponse = { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json().catch(() => null) as { message?: unknown } | null;
        const message = typeof body?.message === "string" ? body.message.trim() : "";
        if (!message || message.length > 1_000) return Response.json({ response: fallbackResponse });

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return Response.json({ response: fallbackResponse });

        try {
          const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `You are Anant Awasthi's professional portfolio assistant. Answer concisely using his AI product and GTM portfolio context. User question: ${message}` }] }],
            }),
          });
          const data = await geminiResponse.json() as GeminiResponse;
          const response = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim();

          if (!geminiResponse.ok || !response) return Response.json({ response: fallbackResponse });

          return Response.json({ response });
        } catch (error) {
          console.error("Gemini chat request failed", error);
          return Response.json({ response: fallbackResponse });
        }
      },
    },
  },
});
