const socket = io();
let user;
let chatBox = document.getElementById("chatBox");

Swal.fire({
  title: "Enter your name",
  input: "text",
  text: "Enter your name",
  inputValidator: (value) => {
    return !value && "You need to write something!";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
});

chatBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", {
        user,
        message: chatBox.value,
      });
      chatBox.value = "";
    }
  }
});

socket.on("messageLogs", (data) => {
  let log = document.getElementById("messageLogs");
  let messages = "";
  data.forEach((message) => {
    messages += `<p><strong>${message.user}</strong>: ${message.message}</p>`;
  });
  log.innerHTML = messages;
});
