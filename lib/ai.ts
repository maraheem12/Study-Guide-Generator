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
  concept_map: {
    nodes: { id: string; label: string }[];
    edges: { source: string; target: string; label?: string }[];
  };
  practice_quiz: {
    question: string;
    options: string[];
    correct_answer: number;
    explanation: string;
  }[];
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
          "difficulty_rating": "Easy" | "Medium" | "Hard",
          "concept_map": {
            "nodes": [
               { "id": "1", "label": "Main Topic" },
               { "id": "2", "label": "Subtopic A" }
            ],
            "edges": [
               { "source": "1", "target": "2", "label": "includes" }
            ]
          },
          "practice_quiz": [
            {
              "question": "What is...?",
              "options": ["Option A", "Option B", "Option C", "Option D"],
              "correct_answer": 0,
              "explanation": "Option A is correct because..."
            }
          ]
        }
    
        Rules:
        1. "summary" must use Markdown for bolding key terms.
        2. "exam_highlights" should focus on high-probability test areas.
        3. "concept_map" should represent logical relationships between key terms. Provide at least 5 nodes.
        4. "practice_quiz" should contain 3-5 multiple choice questions.
        5. Do not include any text outside the JSON object.
      `;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: content }
      ],
      model: "llama-3.3-70b-versatile",
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
