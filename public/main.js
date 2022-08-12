let NUMBER_OF_WORDS = 6;
let NUMBER_OF_CHARS = 5;

let gameDiv = document.getElementById("game");

for (let i = 0; i < NUMBER_OF_WORDS; i++) {
  let wordDIV = document.createElement("div");
  wordDIV.className = "word";
  for (let g = 0; g < NUMBER_OF_CHARS; g++) {
    let letterDIV = document.createElement("div");
    letterDIV.className = "letter";
    wordDIV.appendChild(letterDIV);
  }
  gameDiv.appendChild(wordDIV);
}

let curWord = 0;
let curChar = 0;

document.addEventListener("keydown", async function (event) {
  let wordDiv = gameDiv.children[curWord];

  if (event.code == "Backspace") {
    let charToDel = wordDiv.children[curChar - 1];
    charToDel.innerHTML = "";
    curChar--;
  } else if (event.code == "Enter") {
    if (curChar === NUMBER_OF_CHARS) {
      const word = getCurrentWord();
      const result = await (await fetch("/wordle/" + word)).json();
      for (let i = 0; i < result.length; i++) {
        wordDiv.children[i].style.background = result[i];
      }

      curWord++;
      curChar = 0;
    }
  } else if (curChar < NUMBER_OF_CHARS && isLetter(event.key)) {
    let charArr = wordDiv.children[curChar];
    charArr.innerHTML = event.key.toUpperCase();
    curChar++;
  }
});

function getCurrentWord() {
  let word = "";
  let wordDiv = gameDiv.children[curWord];
  for (let i = 0; i < NUMBER_OF_CHARS; i++) {
    chardiv = wordDiv.children[i];
    word = word + chardiv.innerHTML;
  }
  return word;
}
function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });
