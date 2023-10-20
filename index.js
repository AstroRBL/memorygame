const begScr = document.querySelector(".welcome");
const begCloseBtn = document.getElementById("begBtn");
const select = document.getElementById("difSel");
let width = 3;
let height = 3;
begCloseBtn.addEventListener("click", function () {
  const validValues = ["easy", "medium", "hard"];
  if (validValues.includes(select.value)) {
    begScr.style.display = "none";
    blinkTiles();
  } else {
    window.alert("Please select a Difficulty");
  }
});
window.onload = function () {
  initialize();
  blinkTiles();
};
function initialize() {
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      document.getElementById("board").appendChild(tile);
    }
  }
}

function blinkTiles() {
  const tiles = Array.from(document.querySelectorAll(".tile")); // Convert NodeList to array
  const blinkCount = 3;
  const blinkInterval = 600;
  const fadeOutInterval = 500;
  let i = 0;
  let blinkOrder = [];
  let blinkedTiles = []; // Array to store already blinked tiles

  // Check if the blinkedTiles array already has three tiles
  if (blinkedTiles.length >= blinkCount) {
    console.log(blinkedTiles); // Print the array of blinked tiles
    return;
  }

  // Generate a random order for the tiles to blink
  while (blinkOrder.length < blinkCount) {
    const randomIndex = Math.floor(Math.random() * tiles.length);
    if (!blinkOrder.includes(randomIndex)) {
      blinkOrder.push(randomIndex);
    }
  }

  let prevTile = null;
  const intervalId = setInterval(() => {
    if (i >= blinkCount) {
      clearInterval(intervalId);
      // Restore all tiles' original style
      tiles.forEach((tile) => {
        tile.style.backgroundColor = "transparent";
        tile.style.border = "";
      });
      console.log(blinkedTiles); // Print the array of blinked tiles
      return;
    }

    // Blink the tile at the current index
    const tile = tiles[blinkOrder[i]];
    tile.style.backgroundColor = "white";
    blinkedTiles.push(tile); // Store the blinked tile in the array

    // Check if the blinkedTiles array has reached three tiles
    if (blinkedTiles.length >= blinkCount) {
      clearInterval(intervalId);
      // Restore all tiles' original style
      tiles.forEach((tile) => {
        tile.style.backgroundColor = "transparent";
        tile.style.border = "";
      });
      console.log(blinkedTiles); // Print the array of blinked tiles
      return;
    }

    setTimeout(() => {
      // Fade out the background color of the tile at the current index
      tile.style.transition = `background-color ${fadeOutInterval}ms`;
      tile.style.backgroundColor = "transparent";

      setTimeout(() => {
        // Restore the tile's original style
        tile.style.transition = "";
        tile.style.border = "";
        i++;
        prevTile = null;
      }, fadeOutInterval);
    }, blinkInterval);

    // If there was a previous tile, restore its original style
    if (prevTile !== null) {
      prevTile.style.transition = "";
      prevTile.style.backgroundColor = "transparent";
      prevTile.style.border = "";
    }

    prevTile = tile;
  }, blinkInterval * blinkCount);
}
