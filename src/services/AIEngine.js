export const PROVIDERS = {
    GROQ: 'groq',
    GEMINI: 'gemini',
    DEEPSEEK: 'deepseek',
    OPENROUTER: 'openrouter',
    HUGGINGFACE: 'huggingface'
};

const MODELS = {
    GROQ: "llama-3.3-70b-versatile",
    GEMINI: "gemini-pro",
    DEEPSEEK: "deepseek-chat",
    OPENROUTER: "openai/gpt-3.5-turbo",
    HUGGINGFACE: "mistralai/Mixtral-8x7B-Instruct-v0.1"
};

// Simple load balancer / failover state
let currentProviderIndex = 0;
const providerList = [PROVIDERS.GROQ, PROVIDERS.GEMINI, PROVIDERS.OPENROUTER, PROVIDERS.DEEPSEEK, PROVIDERS.HUGGINGFACE];

// Function to call the backend proxy
const callProxy = async (provider, messages, model) => {
    const response = await fetch("/.netlify/functions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            provider,
            model: model || MODELS[provider.toUpperCase()],
            messages
        })
    });

    if (!response.ok) {
        throw new Error(`Provider ${provider} failed: ${response.statusText}`);
    }

    const data = await response.json();
    // Normalize response content
    return data.choices?.[0]?.message?.content || data.generated_text || "";
};

// Main Engine Function
export const generateResponse = async (prompt, systemRole = "You are a helpful AI assistant.") => {
    const messages = [
        { role: "system", content: systemRole },
        { role: "user", content: prompt }
    ];

    // Strategy: Short prompts -> Groq (Fast)
    // Long Prompts -> Gemini (Large context)
    // Structure -> DeepSeek
    
    let preferredProvider = PROVIDERS.GROQ; // Default
    if (prompt.length > 2000) preferredProvider = PROVIDERS.GEMINI;
    if (prompt.includes("JSON") || prompt.includes("structure")) preferredProvider = PROVIDERS.DEEPSEEK;

    // Ordered list for meaningful failover starting with preferred
    const orderedProviders = [
        preferredProvider,
        ...providerList.filter(p => p !== preferredProvider)
    ];

    let lastError = null;

    for (const provider of orderedProviders) {
        try {
            console.log(`[AIEngine] Attempting with ${provider}...`);
            const result = await callProxy(provider, messages);
            if (result) return result;
        } catch (error) {
            console.error(`[AIEngine] ${provider} failed:`, error);
            lastError = error;
            // Continue to next provider...
        }
    }

    throw new Error(`All AI Providers failed. Last error: ${lastError?.message}`);
};

// Specific Hooks for explicit control if needed
export const useGroq = (prompt) => generateResponse(prompt); // Will prefer Groq by logic anyway
export const useGemini = (prompt) => callProxy(PROVIDERS.GEMINI, [{role: 'user', content: prompt}]);

// Analytics (Simple Counter)
export const getUsageStats = () => {
    return {
        provider: providerList[currentProviderIndex],
        totalCalls: 0 // Placeholder for real analytics
    };
};
