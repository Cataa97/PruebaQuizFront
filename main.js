const chatBox = document.querySelector(".chat-box");
const inputField = chatBox.querySelector("input[type='text']");
const button = chatBox.querySelector("button");
const chatBoxBody = chatBox.querySelector(".chat-box-body");

button.addEventListener("click", sendMessage);
inputField.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

function quiz() {
  let topics = document.getElementById("topics").value;
  let numberQuestions = document.getElementById("numberQuestions").value;
  let language = document.getElementById("language").value;
  let numberOptions = document.getElementById("numberOptions").value;
  let dificultad = document.getElementById("difficulty").value;
  let correcta = document.getElementById("correct").value;
  const message = `creame ${numberQuestions} preguntas sobre ${topics} con ${numberOptions} opciones de dificultad ${dificultad} en el idioma ${language}, ${correcta}. porfavor que el resultado este en JSON(que el json este en ingles).`;
  
  return message;
}

function sendMessage() {
  const message = quiz();
  inputField.value = "";
  chatBoxBody.innerHTML += `<div class="message"><p>${message}</p></div>`;
  chatBoxBody.innerHTML += `<div id="loading" class="response loading">.</div>`;
  scrollToBottom();
  //window.dotsGoingUp = true;
    /* var dots = window.setInterval( function() {
        var wait = document.getElementById("loading");
        if ( window.dotsGoingUp ) 
            wait.innerHTML += ".";
        else {
            wait.innerHTML = wait.innerHTML.substring(1, wait.innerHTML.length);
        if ( wait.innerHTML.length < 2)
            window.dotsGoingUp = true;
        }
        if ( wait.innerHTML.length > 3 )
            window.dotsGoingUp = false;
        }, 250); */

  fetch('http://localhost:3000/generate', {
    method: 'POST',
    headers: {
      accept: 'application.json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({message})
  }).then(response => {
    return response.json();
  }).then(data => {
    document.getElementById("loading").remove();
    chatBoxBody.innerHTML += `<div class="response"><p>${data.message}</p></div>`;
    scrollToBottom();
  })
}

function scrollToBottom() {
  chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
}

