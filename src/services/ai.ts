export interface AIAdapter {
  generateText(prompt: string, context?: string): Promise<string>;
  summarize(text: string): Promise<string>;
}
class GeminiAdapter implements AIAdapter {
  async generateText(prompt: string, context?: string): Promise<string> {
    const key = process.env.GEMINI_API_KEY;
    if (!key || (process.env.AI_PROVIDER && process.env.AI_PROVIDER !== 'gemini')) throw new Error('AI provider is not configured.');
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL ?? 'gemini-2.5-flash'}:generateContent`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({ contents: [{ parts: [{ text: context ? `Context:\n${context}\n\nTask:\n${prompt}` : prompt }] }] }),
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new Error('AI generation failed. Please try again.');
    const data = await response.json() as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
    const text = data.candidates?.[0]?.content?.parts?.map(p => p.text ?? '').join('');
    if (!text) throw new Error('AI provider returned no text.');
    return text;
  }
  summarize(text: string) { return this.generateText('Provide a concise professional summary.', text); }
}
export function getAIProvider(): AIAdapter { return new GeminiAdapter(); }
export const ai = getAIProvider();
