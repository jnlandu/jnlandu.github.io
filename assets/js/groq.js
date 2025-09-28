
import groqSdk from 'https://cdn.jsdelivr.net/npm/groq-sdk@0.7.0/+esm'

// const GROQ_TOKEN ='gsk_2O3HiG4crj0dzuvMRgu3WGdyb3FY4W7TTwGwPRVxcCfYlrdASoFPfhjw'
const client = new groqSdk(
    {apiKey: GROQ_TOKEN, dangerouslyAllowBrowser: true }
);

const output = await client.chat.completions.create({
    messages: [{ role: "user", 
    content: "Hello, nice to meet you!" 
    }],
    model: 'llama3-8b-8192',
});
document.querySelector(".test").innerHTML = output.choices[0].message.content;
console.log(output.choices[0].message.content);
     