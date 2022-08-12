const express = require("express");
const app = express();
const toWin = "HAPPY";

app.get("/wordle/:guess", function (req, res) {
  const userguess = req.params.guess.toUpperCase();
  let arr = ["", "", "", "", ""];
  let map = {
    A: 1,
    H: 1,
    P: 2,
    Y: 1,
  };

  for (let i = 0; i < userguess.length; i++) {
    if (userguess[i] === toWin[i]) {
      let curLetter = userguess[i];
      arr[i] = "green";
      map[curLetter]--;
    }
  }
  console.log(arr);
  for (let i = 0; i < userguess.length; i++) {
    if (userguess[i] !== toWin[i]) {
      let curLetter = userguess[i];
      if (map[curLetter] === undefined) {
        arr[i] =  "gray";
      } else if (map[curLetter] > 0) {
        arr[i] = "orange";
        map[curLetter]--;
      } else {
        arr[i] = "gray";
      }
    }
  }

  res.send(arr);
});

app.use(express.static("public"));

app.listen(2356);
