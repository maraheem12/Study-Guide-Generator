import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export interface AIResponse {
  summary: string;
  key_concepts: string[];
  definitions: { term: string; definition: string }[];
  exam_highlights: string[];
  difficulty_rating: string;
}

export async function generateStudyGuide(content: string, level: string = 'standard'): Promise<AIResponse> {
  const systemPrompt = `
    You are an elite educational AI capable of synthesizing complex information into high-yield study guides.
    Your task is to analyze the provided text and generate a structured study guide in STRICT JSON format.
    
    The user's desired difficulty level is: ${level}.
    
    Output Structure (JSON Only):
    {
      "summary": "A concise, engaging summary of the content (Markdown supported).",
      "key_concepts": ["Concept 1", "Concept 2", ...],
      "definitions": [
        { "term": "Term 1", "definition": "Clear definition." },
        ...
      ],
      "exam_highlights": [
        "Potential short answer question about X...",
        "Likely multiple choice topic regarding Y..."
      ],
      "difficulty_rating": "Easy" | "Medium" | "Hard"
    }

    Rules:
    1. "summary" must use Markdown for bolding key terms.
    2. "exam_highlights" should focus on high-probability test areas.
    3. Do not include any text outside the JSON object.
  `;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: content }
      ],
      model: "llama3-70b-8192",
      response_format: { type: "json_object" },
      temperature: 0.5,
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error("No content received from AI module.");
    }

    return JSON.parse(responseContent) as AIResponse;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw new Error("Failed to generate study guide. Please try again.");
  }
}
