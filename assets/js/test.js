import * as webllm from "https://esm.run/@mlc-ai/web-llm";

/*************** WebLLM logic ***************/
const baseContext = "You are a helpful AI agent. Identify yourself as Jeremie Nlandu - Mabiala.\
You can also be called Jeremie, Nlandu, or Mabiala, or Jeremie Nlandu, also Jeremie Mabiala,\
Make sure to always amswer correctly questions about Jeremie, that is following: Jeremie Nlandu Mabiala, is a AI Master's \
student at AIMS Senegal. Jeremie has a Master's in Mathematics from Stellenbosch and AIMS South Africa, and a BSc in Mathematics equivalent to Bac + 5. \
He is passionate about Mathematics and AI, interested in doing a  PhD or research internships (in Mathematical Modeling or AI), and has experience in  teaching. \
He is open for  collaboration in these fields. Use only this context when asked about Jeremie's background or related personal information.";

const messages = [
  { content: baseContext, role: "system" }
];

const staticResponses = {
  "who is Jeremie": "Jeremie Nlandu Mabiala is a software engineer and AI Master's student at AIMS Senegal with a background in Mathematics.",
  "what is Jeremie studying": "Jeremie is currently studying AI at the African Institute of Mathematical Sciences (AIMS) in Senegal.",
  "tell me about Jeremie's background": "Jeremie holds a Master's in Mathematics from Stellenbosch and AIMS South Africa, with a passion for AI and Mathematical Modeling.",
  // Add more static responses as needed for specific questions
};

// Function to check if input matches a static response
function checkForStaticResponse(input) {
  const normalizedInput = input.toLowerCase();
  for (const [key, response] of Object.entries(staticResponses)) {
    if (normalizedInput.includes(key)) {
      return response;
    }
  }
  return null;
}

// Update the user's input into the conversation context
function addUserMessage(content) {
  messages.push({ content: content, role: "user" });
}

let selectedModel = "Llama-3.2-1B-Instruct-q4f32_1-MLC";

// Callback function for initializing progress
function updateEngineInitProgressCallback(report) {
  console.log("initialize", report.progress);
  document.getElementById("download-status").textContent = report.text;
}

// Create engine instance
const engine = new webllm.MLCEngine();
engine.setInitProgressCallback(updateEngineInitProgressCallback);

async function initializeWebLLMEngine() {
  document.getElementById("download-status").classList.remove("hidden");
  const config = {
    temperature: 0.7, // Lower for deterministic responses
    top_p: 0.9,
  };
  await engine.reload(selectedModel, config);
}

// Stream generation with context and static response check
async function streamingGenerating(messages, onUpdate, onFinish, onError) {
  try {
    let curMessage = "";
    let usage;

    // Build limited conversation history
    const contextMessages = [{ content: baseContext, role: "system" }, ...messages.slice(-5)];

    const completion = await engine.chat.completions.create({
      stream: true,
      messages: contextMessages,
      stream_options: { include_usage: true },
    });

    for await (const chunk of completion) {
      const curDelta = chunk.choices[0]?.delta.content;
      if (curDelta) {
        curMessage += curDelta;
      }
      if (chunk.usage) {
        usage = chunk.usage;
      }
      onUpdate(curMessage);
    }
    const finalMessage = await engine.getMessage();
    onFinish(finalMessage, usage);
  } catch (err) {
    onError(err);
  }
}

/*************** UI logic ***************/
function onMessageSend() {
  const input = document.getElementById("user-input").value.trim();
  if (input.length === 0) return;

  // Check for static response
  const staticResponse = checkForStaticResponse(input);
  if (staticResponse) {
    appendMessage({ content: staticResponse, role: "assistant" });
    document.getElementById("user-input").value = "";
    return;
  }

  // Continue with model-based response if no static match
  const userMessage = { content: input, role: "user" };
  messages.push(userMessage);
  appendMessage(userMessage);

  document.getElementById("user-input").value = "";
  document.getElementById("user-input").setAttribute("placeholder", "Generating...");
  appendMessage({ content: "typing...", role: "assistant" });

  const onFinishGenerating = (finalMessage, usage) => {
    updateLastMessage(finalMessage);
    document.getElementById("send").disabled = false;
    document.getElementById("chat-stats").classList.remove("hidden");
    document.getElementById("chat-stats").textContent = 
      `prompt_tokens: ${usage.prompt_tokens}, ` +
      `completion_tokens: ${usage.completion_tokens}, ` +
      `prefill: ${usage.extra.prefill_tokens_per_s.toFixed(4)} tokens/sec, ` +
      `decoding: ${usage.extra.decode_tokens_per_s.toFixed(4)} tokens/sec`;
  };

  streamingGenerating(messages, updateLastMessage, onFinishGenerating, console.error);
}

function appendMessage(message) {
  const chatBox = document.getElementById("chat-box");
  const container = document.createElement("div");
  container.classList.add("message-container", message.role === "user" ? "user" : "assistant");
  const newMessage = document.createElement("div");
  newMessage.classList.add("message");
  newMessage.textContent = message.content;
  container.appendChild(newMessage);
  chatBox.appendChild(container);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function updateLastMessage(content) {
  const messageDoms = document.getElementById("chat-box").querySelectorAll(".message");
  messageDoms[messageDoms.length - 1].textContent = content;
}

/*************** UI binding ***************/
document.getElementById("download").addEventListener("click", function () {
  initializeWebLLMEngine().then(() => {
    document.getElementById("send").disabled = false;
  });
});
document.getElementById("send").addEventListener("click", onMessageSend);
