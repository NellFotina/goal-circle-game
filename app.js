// видео-урок на ютубе
// https://vladilen.ru/marathon/game
// https://www.youtube.com/watch?v=ZyzCgm1pdG4

const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const board = document.querySelector("#board");
const colors = [
  "#06a192",
  "#318c83",
  "#4cc4b8",
  "#77efe3",
  "#067267",
  "#11dbc7",
  "#03544c",
  "#2c5b57",
  "#e5e547",
  "#efef45",
];
let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    //console.log(event.target);
    //console.log(event.target.getAttribute("data-time"));
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

//DEBUG
//startGame();

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    // if (current < 10) {
    //   current = `0${current}`;
    // }
    setTime(current);
  }
}
function setTime(value) {
  if (value < 10) {
    value = `0${value}`;
  }
  timeEl.innerHTML = `00:${value}`;
}
function finishGame() {
  //   timeEl.parentNode.remove();
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  //   const qqq = board.getBoundingClientRect();
  //   console.log(qqq);
  //   const x = 150;
  //   const y = 200;
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(10, width - size);
  const y = getRandomNumber(10, height - size);
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const color3 = getRandomColor();

  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = `linear-gradient(90deg, ${color1} 0%, ${color2} 47%, ${color3} 100%)`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function getRandomColor(element) {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

//мы можем взломать нашу игру, чтобы шарики нажимались автоматически
//и можно было бы набрать большой счет.
//Для этого после выбора кнопки со временем в консоли в девтулс написать: winTheGame()
function winTheGame() {
  function kill() {
    const circle = document.querySelector(".circle");
    // условие, что шарики есть и время еще не закончилось:
    if (circle) {
      circle.click();
    }
  }
  //здесь задается частота попадания по шарику
  setInterval(kill, 42);
}
