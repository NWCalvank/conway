import { tick } from "./logic.js";

const template = document.createElement("template");

template.innerHTML = `
<style>
    .grid {
        display: flex;
        flex-wrap: wrap;
    }
    .cell {
        width: 18px;
        height: 18px;
        border-width: 1px;
        border-style: solid;
    }
    .alive {
        background-color: black;
</style>

<button id="generate">Generate</button>
<button id="play">Play</button>
<button id="pause">Pause</button>
<button id="ticker">Tick</button>
<input id="width" type="number"></input>
<div id="grid"></div>
`;

class GameOfLife extends HTMLElement {
  /** @type {Array<number>} */
  grid = Array(25 * 25).fill(0);
  /** @type {number|undefined} */
  playingInterval;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.generateButton = this.shadowRoot.getElementById("generate");
    this.playButton = this.shadowRoot.getElementById("play");
    this.pauseButton = this.shadowRoot.getElementById("pause");
    this.tickButton = this.shadowRoot.getElementById("ticker");
    this.widthElem = this.shadowRoot.getElementById("width");

    this.generateButton.onclick = this.handleGenerate.bind(this);
    this.playButton.onclick = this.handlePlay.bind(this);
    this.pauseButton.onclick = this.handlePause.bind(this);
    this.tickButton.onclick = this.handleTick.bind(this);
    this.widthElem.onchange = this.handleWidthChange.bind(this);

    this.render();
  }

  handleGenerate() {
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = Math.round(Math.random());
    }
    this.render();
  }

  handlePlay() {
    if (this.playingInterval) return;
    this.playingInterval = setInterval(this.handleTick.bind(this), 500);
  }

  handlePause() {
    if (this.playingInterval) {
      clearInterval(this.playingInterval);
      this.playingInterval = undefined;
    }
  }

  handleTick() {
    this.grid = tick.call(this, this.grid);
    this.render();
  }

  /** @param {Event & { target: HTMLInputElement }} e */
  handleWidthChange(e) {
    const width = +e.target.value;
    this.grid = Array(width * width).fill(0);
    this.render();
  }

  /** @param {Event & { target: HTMLInputElement }} e */
  handleCellClick(e) {
    this.grid[e.target["id"]] = this.grid[e.target["id"]] === 0 ? 1 : 0;
    this.render();
  }

  /**
   * Write current grid state to the DOM
   */
  render() {
    const cellSize = 20;
    const width = Math.sqrt(this.grid.length);

    const htmlGrid = this.shadowRoot.getElementById("grid");
    htmlGrid.innerHTML = "";
    htmlGrid.classList.add("grid");
    htmlGrid.style.width = `${cellSize * width}px`;

    for (let i = 0; i < this.grid.length; i++) {
      const cell = document.createElement("span");
      cell.id = `${i}`;
      cell.classList.add("cell");
      if (this.grid[i]) {
        cell.classList.add("alive");
      }
      htmlGrid.append(cell);
    }

    if (this.widthElem instanceof HTMLInputElement) {
      this.widthElem.value = `${width}`;
    }
    this.shadowRoot
      .querySelectorAll(".cell")
      .forEach((elem) =>
        elem.addEventListener("click", this.handleCellClick.bind(this)),
      );
  }
}

window.customElements.define("game-of-life", GameOfLife);
