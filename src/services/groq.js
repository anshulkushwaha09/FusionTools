import { generateResponse } from './AIEngine';

// Backward compatibility wrapper
const callGroqParams = async (messages) => {
    // Extract user prompt from messages to pass to AIEngine
    const userMsg = messages.find(m => m.role === 'user')?.content || "";
    const systemMsg = messages.find(m => m.role === 'system')?.content || "You are a helpful AI.";
    
    return await generateResponse(userMsg, systemMsg);
};

export const generateCaptions = async (topic) => {
  return (await generateResponse(
      `Generate 5-10 catchy, engaging, and modern captions for: ${topic}. Include hashtags. Return ONLY the list, one per line.`,
      "You are a creative social media expert."
  )).split('\n').filter(line => line.trim().length > 0);
};

export const generateStory = async (topic, tone, length) => {
  return await generateResponse(
      `Write a ${tone} story about ${topic}. Length: approximately ${length} words. Format the output in Markdown.`,
      "You are a creative writer."
  );
};

export const generateResume = async (data) => {
  const prompt = `
    Create a professional resume in Markdown format based on:
    Name: ${data.name}
    Email: ${data.email}
    Top Skills: ${data.skills}
    Experience: ${data.experience}
    Education: ${data.education}
    Summary: ${data.summary}
    `;
  return await generateResponse(prompt, "You are a professional resume writer. Format nicely in Markdown.");
};

export const fixGrammar = async (text) => {
  return await generateResponse(
      `Correct the grammar of the following text. Return ONLY the corrected text: ${text}`,
      "You are a strict grammar checker."
  );
};

export const generateSlogans = async (topic) => {
  const res = await generateResponse(
      `Generate 10 catchy slogans for: ${topic}. Return one per line, no numbering.`,
      "You are a brand strategist."
  );
  return res.split('\n').filter(line => line.trim().length > 0);
};

export const generateBusinessIdeas = async (topic) => {
  const res = await generateResponse(
      `Generate 5 business ideas for: ${topic}. Format as Title: Description.`,
      "You are a business consultant."
  );
  return res.split('\n').filter(line => line.trim().length > 0);
};
