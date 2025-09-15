document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector(".input input");
  const sendBtn = document.querySelector(".send");
  const msgs = document.querySelector(".msgs");
  const authorSelect = document.querySelector(".author"); // nový řádek

  // čas
  function getTime() {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  // vytvoření bubliny se zprávou
  function addMessage(text, author = "Káťa") {
    const row = document.createElement("div");

    // pokud jsem to já (Káťa), tak zpráva vpravo, jinak vlevo
    if (author === "Káťa") {
      row.className = "msg-row right";
    } else {
      row.className = "msg-row left";
    }

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

  // odeslání zprávy
  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    const author = authorSelect.value; // nový řádek

    addMessage(text, author);
    addchat(text, author);
    async function addchat(text, author) {
      const message = text;
      const name = author;

      const response = await sql(
        `INSERT INTO chat (message,name) VALUES ('${message}','${name}') `
      );
    }
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
