const members = document.querySelector(".greatones-members");
const pickGreatOnes = document.querySelectorAll(".greatones");
const greatOnes = [];
const startPosition = {
  left: "-500px",
  top: "300px",
};
const footer = document.querySelector(".footer-container");

let totalHeight = 0;

const setMembers = (members) => {
  pickGreatOnes.forEach((one, i) => {
    totalHeight = totalHeight + one.offsetHeight + 50 * 2;
  });

  members.style.height = `${totalHeight}px`;
};

const setOnes = (pick, start, members) => {
  const pickArray = Array.from(pick);
  pickArray.forEach((one, i) => {
    const left = `${members.offsetWidth / 2 - one.offsetWidth / 2}px`;
    const totalHeight = pickArray
      .slice(0, i)
      .reduce((acc, curr) => acc + curr.offsetHeight, 0);
    const top = `${(i + 1) * 100 + totalHeight}px`;
    const spec = {
      tag: one,
      left,
      top,
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

const showFooter = (footer) => {
  footer.style.opacity = 1;
};

const waitForImagesToLoad = (parent, selector) => {
  const imgs = parent.querySelectorAll(selector);
  const imgPromises = Array.from(imgs).map(
    (img) =>
      new Promise((resolve) => {
        if (img.complete) {
          resolve();
        } else {
          img.addEventListener("load", resolve);
          img.addEventListener("error", resolve);
        }
      })
  );

  return Promise.all(imgPromises);
};

document.addEventListener("DOMContentLoaded", async () => {
  await waitForImagesToLoad(document, ".greatones img").then(() => {
    setMembers(members);
    setOnes(pickGreatOnes, startPosition, members);
    showGreatOnes(greatOnes);
  });
  showFooter(footer);
});

window.addEventListener("resize", function () {
  resetOnesPosition(pickGreatOnes, members);
});
