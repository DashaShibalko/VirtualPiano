const PIANO = document.querySelector(".piano");
const PIANOKEYS = document.querySelectorAll(".piano-key");

const letterButton = document.querySelector(".btn-notes");
const noteButton = document.querySelector('.btn-letters');

const swithcNotesLetters = (event) => {
    noteButton.classList.toggle('btn-active');
    letterButton.classList.toggle("btn-active");
    PIANOKEYS.forEach((elem) => {
      elem.classList.toggle("letter");
    })
}

noteButton.addEventListener('click', swithcNotesLetters);
letterButton.addEventListener('click', swithcNotesLetters);

const startActive = (event) => {
  event.target.classList.add("piano-key-active-pseudo");
  event.target.classList.add("piano-key-active")
  const note = event.target.dataset.note;
  const src = `./assets/audio/${note}.mp3`;
  playAudio(src);
}

const removeActive = (event) => {
  event.target.classList.remove("piano-key-active-pseudo");
  event.target.classList.toggle("piano-key-active")
}
function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

const stopAudio = () => {
  PIANOKEYS.forEach((elem) => {
    elem.classList.remove("piano-key-active");
    elem.classList.remove("piano-key-active-pseudo");
    elem.removeEventListener("mouseover", startActive);
    elem.removeEventListener("mouseout", removeActive);
  })
}





PIANO.addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("piano-key")) {
    event.target.classList.add("piano-key-active-pseudo");
    event.target.classList.add("piano-key-active");
    const note = event.target.dataset.note;
    const src = `./assets/audio/${note}.mp3`;
    playAudio(src);
  }
  PIANOKEYS.forEach((elem) => {
    elem.addEventListener("mouseover", startActive);
    elem.addEventListener("mouseout", removeActive);
  })

},
  false
);

window.addEventListener("mouseup", stopAudio);


window.addEventListener('keydown', (event) => {
  PIANOKEYS.forEach((el) => {
    if (`Key${el.dataset.letter}` === event.code && !el.classList.contains('piano-key-active')) {
      el.classList.toggle('piano-key-active')
      el.classList.toggle('piano-key-active-pseudo')
      const note = el.dataset.note;
      const src = `./assets/audio/${note}.mp3`;
      playAudio(src);

    }
  })

});

window.addEventListener('keyup', (event) => {
  PIANOKEYS.forEach((el) => {
    if (`Key${el.dataset.letter}` === event.code && el.classList.contains('piano-key-active')) {
      el.classList.toggle('piano-key-active');
      el.classList.toggle('piano-key-active-pseudo');
    }

  })
})

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}