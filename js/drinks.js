export default class drinkApp {
  wrapper;
  drinkCount = 14;
  drink = [];
  drinkInfo = [];
  drinkWidth = 250;
  drinkHeight = 370;
  drinkMargin = 30;
  commandDrink;
  currentDrink;
  dragging = false;
  prevX = 0;
  prevY = 0;
  commandX = 0;
  commandY = 0;
  constructor(id, drinkInfo) {
    this.wrapper = document.getElementById(id);
    this.drinkInfo = drinkInfo;
  }

  runApp() {
    this.setWrapper();
    this.createDrink();
    this.initPosition();
    this.registerEvent();
  }

  registerEvent() {
    this.drink.forEach((drink) => {
      drink.tag.addEventListener("pointerdown", (e) => {
        this.onPointerDown(e, drink);
      });

      drink.tag.addEventListener("mouseover", () => {
        this.onMouseOver(drink);
      });
      drink.tag.addEventListener("mouseleave", () => {
        this.onMouseLeave(drink);
      });
    });

    this.wrapper.addEventListener("pointermove", (e) => {
      this.onPointerMove(e);
    });

    this.wrapper.addEventListener("pointerup", () => {
      this.onPointerUp();
    });

    this.wrapper.addEventListener("pointerleave", () => {
      this.onPointerUp();
    });
  }

  setWrapper() {
    this.wrapper.style.opacity = 0;
  }

  showWrapper() {
    gsap.to(this.wrapper, {
      duration: 1.5,
      opacity: 1,
      // ease: 'power1.inOut',
    });
  }

  closeWrapper() {
    gsap.to(this.wrapper, {
      duration: 1.5,
      opacity: 0,
      // ease: 'power1.inOut',
    });
  }

  createDrink() {
    Array.from({ length: this.drinkCount }).map((_, i) => {
      const tag = document.createElement("div");
      tag.className = "drink";
      tag.style.backgroundColor = `${this.drinkInfo[i].color}`;
      tag.style.color = "white";
      tag.style.position = "absolute";
      tag.style.left = `${i * (this.drinkWidth + this.drinkMargin)}px`;
      tag.style.width = `${this.drinkWidth}px`;
      tag.style.height = `${this.drinkHeight}px`;
      tag.style.display = "flex";
      tag.style.flexDirection = "column";
      tag.style.alignItems = "center";
      tag.style.overflow = "hidden";
      this.wrapper.appendChild(tag);

      const text1 = document.createElement("span");
      text1.textContent = `${this.drinkInfo[i].name}`;
      text1.className = "text1";
      tag.appendChild(text1);

      const text2 = document.createElement("span");
      text2.textContent = `${this.drinkInfo[i].englishName}`;
      text2.className = "text2";
      tag.appendChild(text2);

      const img = document.createElement("img");
      img.src = `../src/drink/${i + 1}.png`;
      img.style.width = "50%";
      img.style.marginTop = "40px";
      img.style.pointerEvents = "none";
      tag.appendChild(img);

      const position = { left: tag.offsetLeft, top: tag.offsetTop };

      const drink = { index: i, tag: tag, img: img, position: position };
      this.drink.push(drink);
    });

    const wrapperComputedStyle = window.getComputedStyle(this.wrapper);
    const wrapperWidth = parseInt(wrapperComputedStyle.width, 10);
    const centerIndex = Math.floor(this.drinkCount / 2);
    this.commandDrink = this.drink[centerIndex];

    this.commandX = wrapperWidth / 2 - this.drinkWidth / 2;
  }

  initPosition() {
    const dx = this.commandX - parseInt(this.commandDrink.tag.style.left);

    this.drink.forEach((drink) => {
      const tag = drink.tag;
      const currentLeft = tag.offsetLeft + dx;
      tag.style.left = `${currentLeft}px`;
    });
  }

  checkPosition() {
    const dx = [];

    for (const drink of this.drink) {
      const tag = drink.tag;
      const distance = Math.abs(this.commandX - tag.offsetLeft);
      dx.push(distance);
    }

    const minDistance = Math.min(...dx);
    const minIndex = dx.indexOf(minDistance);

    if (this.commandDrink.index !== minIndex) {
      this.commandDrink = this.drink[minIndex];
      this.setPosition();
    }
  }

  setPosition() {
    const frontCount = Math.floor((this.drinkCount - 1) / 2);
    const backCount = this.drinkCount - 1 - frontCount;

    const front = [];
    const back = [];

    for (const drink of this.drink) {
      const x = drink.tag.offsetLeft;

      if (x < this.commandDrink.tag.offsetLeft) {
        front.push(x);
      }

      if (x > this.commandDrink.tag.offsetLeft) {
        back.push(x);
      }
    }

    if (front.length > frontCount) {
      const temp = this.drink.shift();
      const lastDrink = this.drink[this.drink.length - 1];
      const x = lastDrink.tag.offsetLeft + this.drinkWidth + this.drinkMargin;
      temp.tag.style.left = `${x}px`;
      this.drink.push(temp);
    } else if (back.length > backCount) {
      const temp = this.drink.pop();
      const firstDrink = this.drink[0];
      const x = firstDrink.tag.offsetLeft - this.drinkWidth - this.drinkMargin;
      temp.tag.style.left = `${x}px`;
      this.drink.unshift(temp);
    }
  }

  onMouseOver(drink) {
    const tag = drink.tag;
    const img = drink.img;

    const top = drink.position.top - 50;

    gsap.to(tag, { top: `${top}px`, duration: 0.5 });
    gsap.to(img, { marginTop: "20px", duration: 0.5 });
  }

  onMouseLeave(drink) {
    const tag = drink.tag;
    const img = drink.img;

    const top = drink.position.top;

    gsap.to(tag, { top: `${top}px`, duration: 0.5 });
    gsap.to(img, { marginTop: "40px", duration: 0.5 });
  }

  onPointerDown(e, drink) {
    this.dragging = true;
    this.currentDrink = drink;

    this.prevX = e.clientX;
  }

  onPointerMove(e) {
    if (this.dragging) {
      this.drink.forEach((drink) => {
        const tag = drink.tag;
        const dx = e.clientX - this.prevX;
        const currentLeft = tag.offsetLeft + dx;
        tag.style.left = `${currentLeft}px`;
      });

      this.prevX = e.clientX;

      this.checkPosition();
    }
  }

  onPointerUp() {
    if (this.dragging) {
      this.dragging = false;
    }
  }
}
