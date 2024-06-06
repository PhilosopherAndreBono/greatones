export default class drinkApp {
  wrapper;
  drinkCount = 14;
  drink = [];
  name = [];
  drinkWidth = 231;
  drinkHeight = 300;
  drinkMargin = 30;
  commandDrink;
  currentDrink;
  mouseOver = false;
  dragging = false;
  prevX = 0;
  prevY = 0;
  commandX = 0;
  commandY = 0;
  constructor(id, name) {
    this.wrapper = document.getElementById(id);
    this.name = name;

    this.runApp();
  }

  runApp() {
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

  createDrink() {
    Array.from({ length: this.drinkCount }).map((_, i) => {
      const tag = document.createElement("div");
      tag.className = "drink";
      tag.textContent = `${this.name[i]}`;
      tag.style.position = "absolute";
      tag.style.left = `${i * (this.drinkWidth + this.drinkMargin)}px`;
      tag.style.width = `${this.drinkWidth}px`;
      tag.style.height = `${this.drinkHeight}px`;
      tag.style.display = "flex";
      tag.style.flexDirection = "column";
      tag.style.alignItems = "center";
      tag.style.overflow = "hidden"
      this.wrapper.appendChild(tag);

      const img = document.createElement("img");
      img.src = `../src/drink/${i + 1}.png`;
      img.style.width = "50%";
      img.style.marginTop = "110px";
      img.style.pointerEvents = "none";
      tag.appendChild(img);

      const drink = { index: i, tag: tag, img: img };
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
    if (!this.mouseOver) {
      this.mouseOver = true;

      const tag = drink.tag;
      const img = drink.img;
  
      const top = tag.offsetTop - 20;
      tag.style.top = `${top}px`;
      img.style.marginTop = "70px";
    }
  }

  onMouseLeave(drink) {
    if (this.mouseOver) {
      this.mouseOver = false;

      const tag = drink.tag;
      const img = drink.img;
  
      const top = tag.offsetTop + 20;
      tag.style.top = `${top}px`;
      img.style.marginTop = "110px";
    }
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
