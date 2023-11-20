import { tick } from "./logic.js";

const template = document.createElement('template');

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
    constructor() {
        super();

        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.content.cloneNode(true));

        let grid = Array(25*25).fill(0);
        let playingInterval;

        const generateButton = shadowRoot.getElementById("generate");
        const playButton = shadowRoot.getElementById("play");
        const pauseButton = shadowRoot.getElementById("pause");
        const tickButton = shadowRoot.getElementById("ticker");
        const widthElem = shadowRoot.getElementById("width");

        generateButton.onclick = handleGenerate;
        playButton.onclick = handlePlay;
        pauseButton.onclick = handlePause;
        tickButton.onclick = handleTick;
        widthElem.onchange = handleWidthChange;

        rerender();

        function handleGenerate() {
            for (let i = 0; i < grid.length; i++) {
                grid[i] = Math.round(Math.random());
            }
            rerender();
        }

        function handlePlay() {
            if (playingInterval) return;
            playingInterval = setInterval(handleTick, 500);
        }

        function handlePause() {
            if (playingInterval) {
                clearInterval(playingInterval);
                playingInterval = undefined;
            }
        }

        function handleTick() {
            grid = tick(grid)
            rerender();
        }

        function handleWidthChange(e) {
            const width = e.target.value;
            grid = Array(width*width).fill(0);
            rerender();
        }

        function handleCellClick(e) {
            grid[e.target["id"]] = grid[e.target["id"]] === 0 ? 1 : 0;
            rerender();
        }

        function rerender() {
            const cellSize = 20;
            const width = Math.sqrt(grid.length);

            const htmlGrid = shadowRoot.getElementById("grid");
            htmlGrid.innerHTML = "";
            htmlGrid.classList.add("grid");
            htmlGrid.style.width = `${cellSize*width}px`

            for (let i = 0; i < grid.length; i++) {
                const cell = document.createElement("span");
                cell.id = i;
                cell.classList.add("cell");
                if (grid[i]) {
                    cell.classList.add("alive");
                }
                htmlGrid.append(cell);
            }

            widthElem.value = width;
            shadowRoot.querySelectorAll('.cell').forEach(elem => elem.addEventListener('click', handleCellClick));
        }
    }
}

window.customElements.define('game-of-life', GameOfLife);
