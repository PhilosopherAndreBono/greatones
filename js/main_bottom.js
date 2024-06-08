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

const drink = new drinkApp("main-bottom-drinks-wrapper", drinkInfo);

const setMapHeight = () => {
  const box = document.querySelectorAll(".main-bottom-map-box");
  const map = document.querySelectorAll(".main-bottom-map");
  const mobileBox = document.querySelectorAll(".main-bottom-mobile-map-box");
  const mobileMap = document.querySelectorAll(".main-bottom-mobile-map");

  box.forEach((box) => {
    const style = window.getComputedStyle(box);
    const width = style.getPropertyValue("width");
    const widthNumber = parseInt(width, 10);

    box.style.height = `${widthNumber * 1.6}px`;
  });

  map.forEach((map) => {
    const style = window.getComputedStyle(map);
    const width = style.getPropertyValue("width");

    map.style.height = width;
  });

  const mobileWidthNumber = parseInt(window.getComputedStyle(mobileBox[0]).getPropertyValue("width"), 10);

  mobileBox.forEach((box) => {
    const style = window.getComputedStyle(box);
    const width = style.getPropertyValue("width");
    // const widthNumber = parseInt(width, 10);

    box.style.height = `${mobileWidthNumber * 1.6}px`;
  });

  const mobileMapWidth = window.getComputedStyle(mobileMap[0]).getPropertyValue("width");

  mobileMap.forEach((map) => {
    const style = window.getComputedStyle(map);
    const width = style.getPropertyValue("width");

    map.style.height = mobileMapWidth;
  });
};

const setText = () => {
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth;

  const drinkSection = document.getElementById("main-bottom-drink-section");
  const drinkSectionTop = drinkSection.getBoundingClientRect().top;
  // const drinkText = document.querySelector(".main-bottom-drink-text");

  const mapSection = document.getElementById("main-bottom-map-section");
  const mapSectionTop = mapSection.getBoundingClientRect().top;
  const mapText = document.querySelector(".main-bottom-map-text");

  const marginTop =
    viewportWidth < 600
      ? "100px"
      : viewportWidth >= 600 && viewportWidth < 992
      ? "125px"
      : "150px";

  // if (drinkSectionTop <= viewportHeight - 200) {
  //   gsap.to(drinkText, {
  //     duration: 0.5,
  //     marginTop: "50px",
  //     opacity: 1,
  //   });
  //   drink.showWrapper();
  // } else {
  //   gsap.to(drinkText, {
  //     duration: 0.5,
  //     marginTop,
  //     opacity: 0,
  //   });
  //   drink.closeWrapper();
  // }

  if (mapSectionTop <= viewportHeight - 200) {
    if (mapText) {
      gsap.to(mapText, {
        duration: 0.5,
        marginTop: "50px",
        opacity: 1,
      });
    }
  } else {
    if (mapText) {
      gsap.to(mapText, {
        duration: 0.5,
        marginTop,
        opacity: 0,
      });
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  drink.runApp();
  drink.showWrapper();
  setMapHeight();
});

document.addEventListener("scroll", function () {
  setText();
});

window.addEventListener("resize", function () {
  drink.resetDrink();
  setMapHeight();
});
