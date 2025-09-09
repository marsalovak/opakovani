const database = "3it_marsalovak23";
const username = "marsalovak23";
const password = "9jWnrwT1Bz";
const server = "localhost";

// opakovani.js

document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".input input");
  const sendBtn = document.querySelector(".send");
  const msgs = document.querySelector(".msgs");

  // ⏰ funkce na formátování času
  function getTime() {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // ✉️ funkce na vytvoření bubliny se zprávou
  function addMessage(text, author = "Já") {
    const row = document.createElement("div");
    row.className = "msg-row right"; // right = moje zpráva

    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.innerHTML = `
      <div class="meta">${getTime()} ${author}</div>
      <div>${text}</div>
    `;

    row.appendChild(bubble);
    msgs.appendChild(row);

    // automaticky scroll na konec
    msgs.scrollTop = msgs.scrollHeight;
  }

  // 🚀 odeslání zprávy
  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text);

    // 👉 tady můžeš přidat volání na server
    // fetch("/api/messages", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ author: "Kateřina", text })
    // });

    input.value = "";
  }

  // kliknutí na tlačítko
  sendBtn.addEventListener("click", sendMessage);

  // Enter klávesa = odeslání
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});
