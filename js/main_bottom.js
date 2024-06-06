import drinkApp from "./drinks.js";

const name = [
  "청포도 에이드",
  "코코넛 커피",
  "바닐라 라떼",
  "흑당 밀크 버블린",
  "바다 소금 라떼",
  "딸기 스노잉",
  "망고 요거트 스무디",
  "청포도 에이드",
  "코코넛 커피",
  "바닐라 라떼",
  "흑당 밀크 버블린",
  "바다 소금 라떼",
  "딸기 스노잉",
  "망고 요거트 스무디",
];

document.addEventListener("DOMContentLoaded", () => {
  new drinkApp("drinks-wrapper", name);
});