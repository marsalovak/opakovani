const database = "3it_marsalovak23";
const username = "marsalovak23";
const password = "9jWnrwT1Bz";
const server = "localhost";

 
// Tvoje jméno
const myName = "Kateřina";
 
// Vlastní funkce na spouštění SQL

  try {
    const response = await fetch(url, { method: "POST", body: postJson });
    if (!response.ok) throw new Error(`Chyba: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error.message);
    return [];
  }
 
// Vytvoření HTML prvku pro zprávu
function createMessageElement(msg) {
  const div = document.createElement("div");
  const isSent = msg.name === myName;
  div.className = `message ${isSent ? "sent" : "received"}`;
 
  const textDiv = document.createElement("div");
  textDiv.className = "text";
  textDiv.textContent = msg.text;
 
  const timeDiv = document.createElement("div");
  timeDiv.className = "time";
  timeDiv.textContent = new Date(msg.time).toLocaleTimeString("cs-CZ", {
    hour: "2-digit",
    minute: "2-digit",
  });
 
  div.appendChild(textDiv);
  div.appendChild(timeDiv);
 
  return div;
}
 
// Vložení nové zprávy do DB
async function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const text = messageInput.value.trim();
 
  if (!text) return;
 
  await sql(
    `INSERT INTO chat_app (name, text, time) VALUES ('${myName}', '${text}', NOW())`
  );
 
  messageInput.value = "";
  loadMessages();
}
 
// Načtení zpráv z DB a vykreslení
async function loadMessages() {
  const messages = await sql("SELECT * FROM chat_app ORDER BY time ASC");
  const chatBox = document.getElementById("chat-box");
 
  // Uložíme si, kde je uživatel ve scrollování
  const isAtBottom =
    chatBox.scrollHeight - chatBox.clientHeight <= chatBox.scrollTop + 1;
 
  chatBox.innerHTML = "";
 
  messages.forEach((msg) => {
    chatBox.appendChild(createMessageElement(msg));
  });
 
  // Rolujeme na konec jen, pokud uživatel nebyl ve scrollování
  if (isAtBottom) {
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}
 
// Posluchač formuláře
document.getElementById("chat-form").addEventListener("submit", (e) => {
  e.preventDefault();
  sendMessage();
});
 
// Posluchač pro ikonu hlasové zprávy (prozatím jen placeholder)
document.getElementById("voice-btn").addEventListener("click", () => {
  alert("Funkce hlasové zprávy je zatím ve vývoji.");
});
 
// Obnovování každé 2 sekundy
setInterval(loadMessages, 2000);
loadMessages();