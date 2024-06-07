import drinkApp from "./drinks.js";

const drinkInfo = [
  { name: "청포도 에이드", color: "#BED892", englishName: "GREEN GRAPE ADE" },
  { name: "코코넛 커피", color: "#DCDCD5", englishName: "COCONUT COFFEE" },
  { name: "바닐라 라떼", color: "#946A51", englishName: "VANILLA LATTE" },
  {
    name: "흑당 밀크 버블린",
    color: "#C9B096",
    englishName: "BLACK SUGAR MILK BUBBLIN",
  },
  { name: "바다 소금 라떼", color: "#C9B096", englishName: "SEA SALT LATTE" },
  { name: "딸기 스노잉", color: "#C9B096", englishName: "STRAWBERRY SNOWING" },
  {
    name: "망고 요거트 스무디",
    color: "#F3DD76",
    englishName: "MANGO YOGURT SMOOTHIE",
  },
  { name: "청포도 에이드", color: "#BED892", englishName: "GREEN GRAPE ADE" },
  { name: "코코넛 커피", color: "#DCDCD5", englishName: "COCONUT COFFEE" },
  { name: "바닐라 라떼", color: "#946A51", englishName: "VANILLA LATTE" },
  {
    name: "흑당 밀크 버블린",
    color: "#C9B096",
    englishName: "BLACK SUGAR MILK BUBBLIN",
  },
  { name: "바다 소금 라떼", color: "#C9B096", englishName: "SEA SALT LATTE" },
  { name: "딸기 스노잉", color: "#C9B096", englishName: "STRAWBERRY SNOWING" },
  {
    name: "망고 요거트 스무디",
    color: "#F3DD76",
    englishName: "MANGO YOGURT SMOOTHIE",
  },
];

const drink = new drinkApp("drinks-wrapper", drinkInfo);

document.addEventListener("DOMContentLoaded", () => {
  drink.runApp();
});

document.addEventListener("scroll", function () {
  const drinkSection = document.getElementById("drink-section");
  const sectionTop = drinkSection.getBoundingClientRect().top; // 섹션의 상단 위치
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight; // 뷰포트 높이
  const drinkText = document.querySelector(".drink-text");

  if (sectionTop <= viewportHeight - 300) {
    gsap.to(drinkText, {
      duration: 0.5,
      marginTop: "0px",
      opacity: 1,
    });
    drink.showWrapper();
  } else {
    gsap.to(drinkText, {
      duration: 0.5,
      marginTop: "100px",
      opacity: 0,
    });
    drink.closeWrapper();
  }
});
