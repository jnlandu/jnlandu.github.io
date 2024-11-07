import * as webllm from "https://esm.run/@mlc-ai/web-llm";

/*************** WebLLM logic ***************/
const baseContext = "You are a helpful AI agent. Identify yourself as Jeremie Nlandu - Mabiala.\
You can also be called Jeremie, Nlandu, or Mabiala, or Jeremie Nlandu, also Jeremie Mabiala,\
Make sure to always amswer correctly questions about Jeremie, that is following: Jeremie Nlandu Mabiala, is a AI Master's \
student at AIMS Senegal. Jeremie has a Master's in Mathematics from Stellenbosch and AIMS South Africa, and a BSc in Mathematics equivalent to Bac + 5. \
He is passionate about Mathematics and AI, interested in doing a  PhD or research internships (in Mathematical Modeling or AI), and has experience in  teaching. \
He is open for  collaboration in these fields. Use only this context when asked about Jeremie's background or related personal information.\
Here are other details about Jeremiee. You have to use them in the conversation:\
- Name: Jeremie Nlandu Mabiala\
- Experience: \
    1.  Teaching Assistant at the University of Kinshasa\
    2.  Research Intern at the Centre de Recherche de l'Enseignement des Mathematiques\
- Education:\
    1. AI Master's student at AIMS Senegal, in the AMMI program\
    2.  Master's in Mathematics from Stellenbosch and AIMS South Africa\
    3.  BSc in Mathematics equivalent to Bac + 5\
- Courses:\
    1.  Computer Vision: Convolutional Neural Networks, Object Detection, Image Segmentation, Image Classification\
    2.  Natural Language Processing: Text Classification, Named Entity Recognition, Sentiment Analysis, Machine Translation\
    3.  Reinforcement Learning: Q-Learning, Deep Q-Learning, Policy Gradient Methods\
    4.  Time Series Analysis: ARIMA, LSTM\
    5.  Statistical Modeling: Linear Regression, Logistic Regression, Decision Trees, Random Forest, Gradient Boosting\
    6.  Deep Learning: Neural Networks, CNNs, RNNs, LSTMs, GANs, Autoencoders, Diffusion Models\
    7. Machine Learning Operations: Model Deployment, Model Monitoring, Model Versioning, Model Testing, Model Debugging\
    8.  Machine Learning: Supervised Learning, Unsupervised Learning, Semi-Supervised Learning, Reinforcement Learning\
    9.  Mathematics: Linear Algebra, Calculus, Probability, Statistics, Optimization, Differential and Partial Differential Equations\
    10.  Data Science: Data Cleaning, Data Preprocessing, Data Visualization, Feature Engineering, Model Evaluation, Model Selection\
    11.  Software Engineering: Web Development, Mobile Development, API Development, Cloud Computing, DevOps\
    12.  Programming: Python, R, JavaScript, SQL\
    13.  Tools: Git, GitHub, Docker, Heroku, AWS, Google Cloud, Azure\
    14.  Soft Skills: Communication, Teamwork, Problem Solving, Leadership, Time Management, Adaptability, Creativity, Critical Thinking, Decision Making,\
     Flexibility, Initiative, Motivation, Organizational Skills, Patience, Perseverance, Positive Attitude, Self-Confidence, Stress Management, Work Ethic,\
      Writing Skills, Presentation Skills, Public Speaking, Networking";
const messages = [
  { content: baseContext, role: "system" }
];

const staticResponses = {
  "who is Jeremie": "Jeremie Nlandu Mabiala is a software engineer and AI Master's student at AIMS Senegal with a background in Mathematics.",
  "what is Jeremie studying": "Jeremie is currently studying AI at the African Institute of Mathematical Sciences (AIMS) in Senegal.",
  "tell me about Jeremie's background": "Jeremie holds a Master's in Mathematics from Stellenbosch and AIMS South Africa, with a passion for AI and Mathematical Modeling.",
  // Add more static responses as needed for specific questions
};



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
    temperature: 1.0,
    top_p: 1,
  };
  await engine.reload(selectedModel, config);
}

async function streamingGenerating(messages, onUpdate, onFinish, onError) {
  try {
    let curMessage = "";
    let usage;
    const completion = await engine.chat.completions.create({
      stream: true,
      messages,
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
  const message = {
    content: input,
    role: "user",
  };
  if (input.length === 0) {
    return;
  }

  document.getElementById("send").disabled = true;

  messages.push(message);
  appendMessage(message);

  document.getElementById("user-input").value = "";
  document
    .getElementById("user-input")
    .setAttribute("placeholder", "Ask question about me...");
  

  const aiMessage = {
    content: "typing...",
    role: "assistant",
  };
  appendMessage(aiMessage);

  const onFinishGenerating = (finalMessage, usage) => {
    updateLastMessage(finalMessage);
    document.getElementById("send").disabled = false;
    const usageText =
      `prompt_tokens: ${usage.prompt_tokens}, ` +
      `completion_tokens: ${usage.completion_tokens}, ` +
      `prefill: ${usage.extra.prefill_tokens_per_s.toFixed(4)} tokens/sec, ` +
      `decoding: ${usage.extra.decode_tokens_per_s.toFixed(4)} tokens/sec`;
    document.getElementById("chat-stats").classList.remove("hidden");
    document.getElementById("chat-stats").textContent = usageText;
  };

  streamingGenerating(
    messages,
    updateLastMessage,
    onFinishGenerating,
    console.error,
  );
}

function appendMessage(message) {
  const chatBox = document.getElementById("chat-box");
  const container = document.createElement("div");
  container.classList.add("message-container");
  const newMessage = document.createElement("div");
  newMessage.classList.add("message");
  newMessage.textContent = message.content;

  if (message.role === "user") {
    container.classList.add("user");
  } else {
    container.classList.add("assistant");
  }

  container.appendChild(newMessage);
  chatBox.appendChild(container);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
}

function updateLastMessage(content) {
  const messageDoms = document
    .getElementById("chat-box")
    .querySelectorAll(".message");
  const lastMessageDom = messageDoms[messageDoms.length - 1];
  lastMessageDom.textContent = content;
}

/*************** UI binding ***************/
document.getElementById("download").addEventListener("click", function () {
  initializeWebLLMEngine().then(() => {
    document.getElementById("send").disabled = false;
  });
});
document.getElementById("send").addEventListener("click", function () {

  onMessageSend();
});

