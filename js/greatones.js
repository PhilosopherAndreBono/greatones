const members = document.querySelector(".greatones-members");
const pickGreatOnes = document.querySelectorAll(".greatones");
const greatOnes = [];
const startPosition = {
  left: "-200px",
  top: "300px",
};

const setMembers = () => {
  let totalHeight = 0;

  pickGreatOnes.forEach((greatOne) => {
    totalHeight = totalHeight + greatOne.offsetHeight + 50 * 2;
  });

  members.style.height = `${totalHeight}px`;
};

const setOnes = (pick, start, members) => {
  pick.forEach((one, i) => {
    const left = `${members.offsetWidth / 2 - one.offsetWidth / 2}px`;
    const spec = {
      tag: one,
      left,
      top: (i + 1) * 100 + i * one.offsetHeight,
    };
    greatOnes.push(spec);

    one.style.left = start.left;
    one.style.top = start.top;
  });
};

const resetOnesPosition = (pick, members) => {
  pick.forEach((one) => {
    const left = `${members.offsetWidth / 2 - one.offsetWidth / 2}px`;

    one.style.left = left;
  });
};

const showGreatOnes = (ones) => {
  for (const one of ones) {
    showOne(one);
  }
};

const showOne = (one) => {
  gsap.to(one.tag, {
    duration: 1,
    left: one.left,
    top: one.top,
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setMembers();
  setOnes(pickGreatOnes, startPosition, members);
  showGreatOnes(greatOnes);
});

window.addEventListener("resize", function () {
    resetOnesPosition(pickGreatOnes, members);
});
