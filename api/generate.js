import Groq from "groq-sdk";

// Initialize Groq SDK Lazily or Request-Scoped
const getGroqClient = () => {
    const key = process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY;
    if (!key) throw new Error("Missing GROQ_API_KEY");
    return new Groq({ apiKey: key });
};

// Helper for OpenAI-compatible APIs (DeepSeek, OpenRouter)
const callOpenAICompatible = async (url, apiKey, model, messages) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: messages,
            stream: false
        })
    });
    
    if (!response.ok) {
        const err = await response.text();
        throw new Error(`API Error (${url}): ${err}`);
    }

    const data = await response.json();
    return data;
};

// Helper for Gemini
const callGemini = async (apiKey, model, messages) => {
    let parts = [];
    messages.forEach(msg => {
        parts.push(`[${msg.role.toUpperCase()}]: ${msg.content}`);
    });
    const prompt = parts.join("\n\n");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Gemini API Error: ${err}`);
    }

    const data = await response.json();
    return {
        choices: [{
            message: {
                content: data.candidates?.[0]?.content?.parts?.[0]?.text || ""
            }
        }]
    };
};

// Helper for HuggingFace
const callHuggingFace = async (apiKey, model, messages) => {
    const prompt = messages.map(m => `${m.role}: ${m.content}`).join("\n") + "\nAssistant:";
    
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            inputs: prompt,
            parameters: {
                max_new_tokens: 500,
                return_full_text: false
            }
        })
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`HuggingFace API Error: ${err}`);
    }

    const data = await response.json();
    const text = Array.isArray(data) ? data[0].generated_text : (data.generated_text || JSON.stringify(data));
    
    return {
        choices: [{
            message: { content: text }
        }]
    };
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    try {
        const { messages, model, provider } = req.body;
        
        let result;
        console.log(`Processing request for Provider: ${provider}, Model: ${model}`);

        switch (provider?.toLowerCase()) {
            case 'gemini':
                if (!process.env.GEMINI_API_KEY) throw new Error("Missing GEMINI_API_KEY");
                result = await callGemini(process.env.GEMINI_API_KEY, model || "gemini-pro", messages);
                break;

            case 'deepseek':
                if (!process.env.DEEPSEEK_API_KEY) throw new Error("Missing DEEPSEEK_API_KEY");
                result = await callOpenAICompatible(
                    "https://api.deepseek.com/chat/completions",
                    process.env.DEEPSEEK_API_KEY,
                    model || "deepseek-chat",
                    messages
                );
                break;

            case 'openrouter':
                if (!process.env.OPENROUTER_API_KEY) throw new Error("Missing OPENROUTER_API_KEY");
                result = await callOpenAICompatible(
                    "https://openrouter.ai/api/v1/chat/completions",
                    process.env.OPENROUTER_API_KEY,
                    model || "openai/gpt-3.5-turbo",
                    messages
                );
                break;
                
            case 'huggingface':
                if (!process.env.HUGGINGFACE_API_KEY) throw new Error("Missing HUGGINGFACE_API_KEY");
                result = await callHuggingFace(
                    process.env.HUGGINGFACE_API_KEY,
                    model || "mistralai/Mixtral-8x7B-Instruct-v0.1",
                    messages
                );
                break;

            case 'groq':
            default:
                const groq = getGroqClient();
                const completion = await groq.chat.completions.create({
                    messages,
                    model: model || "llama-3.3-70b-versatile",
                });
                result = completion;
                break;
        }

        res.status(200).json(result);

    } catch (error) {
        console.error("AI Proxy Error:", error);
        res.status(500).json({ 
            error: error.message || "Internal Server Error",
            details: error.toString()
        });
    }
}
