import * as generate from './netlify/functions/generate.js';
console.log("Function loaded successfully");
if (typeof generate.handler === 'function') {
    console.log("Handler exported correctly");
} else {
    console.error("Handler missing");
}
