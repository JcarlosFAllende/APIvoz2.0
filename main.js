const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input"); // <=> document.querySelector("#search-form input");
const info = document.querySelector(".info");

// The speech recognition interface lives on the browser’s window object
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if(SpeechRecognition) {
  console.log("Your Browser supports speech Recognition");
  
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  // recognition.lang = "en-US";

  searchForm.insertAdjacentHTML("beforeend", '<button type="button"><i class="fas fa-microphone"></i></button>');
  searchFormInput.style.paddingRight = "50px";

  const micBtn = searchForm.querySelector("button");
  const micIcon = micBtn.firstElementChild;

  micBtn.addEventListener("click", micBtnClick);
  function micBtnClick() {
    if(micIcon.classList.contains("fa-microphone")) { // Start Voice Recognition
      recognition.start(); // First time you have to allow access to mic!
    }
    else {
      recognition.stop();
    }
  }

  recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
  function startSpeechRecognition() {
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-microphone-slash");
    searchFormInput.focus();
    console.log("Voice activated, SPEAK");
  }

  recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
  function endSpeechRecognition() {
    micIcon.classList.remove("fa-microphone-slash");
    micIcon.classList.add("fa-microphone");
    searchFormInput.focus();
    console.log("Speech recognition service disconnected");
  }

  recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
  function resultOfSpeechRecognition(event) {
    
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    
    if(transcript.toLowerCase().trim()==="ayuda del sitio") {
      window.open('info.html', '__blank');
    }
    else if(!searchFormInput.value) {
      searchFormInput.value = transcript;
    }
    else {
      if(transcript.toLowerCase().trim()==="búsqueda múltiple") {
        window.open('https://playoverwatch.com/es-mx/search/?q='+searchFormInput.value);
 
          window.open('https://www.farmacialapaz.com.mx/?s='+searchFormInput.value);
        
           window.open('https://www.sony.com.mx/search?query='+searchFormInput.value);
        
        window.open('https://cuevana3.io/?s='+searchFormInput.value);
        
        window.open('https://www.elsotano.com/busqueda/listaLibros.php?tipoBus=full&tipoArticulo=&palabrasBusqueda='+searchFormInput.value);
      }
      if(transcript.toLowerCase().trim()==="jugadores"){
        window.open('https://playoverwatch.com/es-mx/search/?q='+searchFormInput.value);

      }
      else if (transcript.toLowerCase().trim()==="farmacia"){
        window.open('https://www.farmacialapaz.com.mx/?s='+searchFormInput.value);
      }
      else if (transcript.toLowerCase().trim()==="sony"){
        window.open('https://www.sony.com.mx/search?query='+searchFormInput.value);
      }
      else if (transcript.toLowerCase().trim()==="libros"){
        window.open('https://www.elsotano.com/busqueda/listaLibros.php?tipoBus=full&tipoArticulo=&palabrasBusqueda='+searchFormInput.value);
      }
      else if (transcript.toLowerCase().trim()==="video"){
        window.open('https://cuevana3.io/?s='+searchFormInput.value);
      }
      else if (transcript.toLowerCase().trim()==="salir del sitio"){
       
     var mensaje;
      var opcion = confirm("¿Seguro que quieres salir?");
     
      if (opcion == true) { 
         window.close();     
    } else {
        mensaje = "No";
    }
      }
     
      else if(transcript.toLowerCase().trim()==="borrar") {
        searchFormInput.value = "";
      }
      else {
        searchFormInput.value = transcript;
      }
    }
    // searchFormInput.value = transcript;
    // searchFormInput.focus();
    // setTimeout(() => {
    //   searchForm.submit();
    // }, 500);
  }
  
  info.textContent = 'Comandos de voz:';
  
}
else {
  console.log("Your Browser does not support speech Recognition");
  info.textContent = "Your Browser does not support Speech Recognition";
}
