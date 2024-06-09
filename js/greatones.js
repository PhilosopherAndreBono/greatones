const members = document.querySelector(".greatones-members");
const pickGreatOnes = document.querySelectorAll(".greatones");
const greatOnes = [];
const startPosition = {
  left: "-200px",
  top: "300px",
};
const footer = document.querySelector(".footer-container");

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

const showFooter = (footer) => {
    footer.style.opacity = 1;
}

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
    setMembers();
    setOnes(pickGreatOnes, startPosition, members);
    showGreatOnes(greatOnes);
  });
  showFooter(footer);
});

window.addEventListener("resize", function () {
  resetOnesPosition(pickGreatOnes, members);
});
