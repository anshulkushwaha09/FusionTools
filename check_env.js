import dotenv from 'dotenv';
import fs from 'fs';

// Load .env file manually to be sure
const envConfig = dotenv.parse(fs.readFileSync('.env'));

console.log("Checking .env for VITE_GROQ_API_KEY...");

if (envConfig.VITE_GROQ_API_KEY) {
    console.log("SUCCESS: VITE_GROQ_API_KEY found.");
    console.log("Length: " + envConfig.VITE_GROQ_API_KEY.length);
    if (envConfig.VITE_GROQ_API_KEY.startsWith("gsk_")) {
        console.log("Format: Valid (starts with gsk_)");
    } else {
        console.log("Format: Warning (does not start with gsk_)");
    }
} else {
    console.log("ERROR: VITE_GROQ_API_KEY is MISSING in .env");
    console.log("Available keys starting with VITE_: " + Object.keys(envConfig).filter(k => k.startsWith('VITE_')).join(', '));
}

if (envConfig.GROQ_API_KEY) {
    console.log("Note: GROQ_API_KEY found (Backend header), but client needs VITE_ prefix.");
}
