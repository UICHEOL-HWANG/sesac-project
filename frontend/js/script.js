document.getElementById("send-button").addEventListener("click", function () {
  const userInput = document.getElementById("user-input").value;
  sendMessageToChatbot(userInput);
  document.getElementById("user-input").value = '';
});

document.getElementById("user-input").addEventListener("keypress",function(event){
  const userInput = document.getElementById("user-input").value;
  if (event.key == "Enter"){
    event.preventDefault() ; // 엔터 키 기본 동작 방지 
    sendMessageToChatbot(userInput)
  }

  document.getElementById("user-input").value='';
})


function sendMessageToChatbot(message) {
  if (message.trim() === "") {
    return;
  }

  updateChatBox("User", message);
  fetch(`http://localhost:8000/chat?user_input=${encodeURIComponent(message)}`)
    .then((response) => response.json())
    .then((data) => {
      updateChatBox("도봉이", data["도봉이"]);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function updateChatBox(sender, message) {
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<strong>${sender}:</strong> ${message}<br>`;
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}
