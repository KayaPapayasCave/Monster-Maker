// --- DATA ---
let newName = "";
let newRarity = "";

let sortMethod = "none";
let filterRarity = "all";

const palette = [
  "#FFD6E8", "#FFC7D9", "#FFB6C1",
  "#F1E4FF", "#EAD7FF", "#DCC1FF",
  "#D6F3FF", "#C2F0FC", "#BEE8FF",
  "#E4FFE8", "#D7FFE2", "#C5FFD7",
  "#FFF3CD", "#FFF7B2", "#FFEFB5",
  "#FFF0DB", "#FFE5CC", "#FFD8B1",
];

let newColor = palette[0];

let monsters = [
  { name: "Fluffy", color: "#FFD6E8", rarity: "common" },
  { name: "Gromp", color: "#D6F3FF", rarity: "uncommon" }
];

// --- DOM elements ---
const nameInput = document.getElementById("nameInput");
const raritySelect = document.getElementById("raritySelect");
const sortSelect = document.getElementById("sortSelect");
const filterSelect = document.getElementById("filterSelect");

const paletteContainer = document.getElementById("paletteContainer");
const monsterList = document.getElementById("monsterList");

const previewSVG = document.getElementById("previewSVG");
const previewName = document.getElementById("previewName");

const emptyMsg = document.getElementById("emptyMsg");
const countMsg = document.getElementById("countMsg");

// --- Init rendering of palette ---
function renderPalette() {
  paletteContainer.innerHTML = "";

  palette.forEach(color => {
    const swatch = document.createElement("div");
    swatch.className = "color-swatch";
    swatch.style.backgroundColor = color;

    if (newColor === color) swatch.classList.add("selected");

    swatch.addEventListener("click", () => {
      newColor = color;
      previewSVG.style.fill = newColor;
      previewName.textContent = "Your Monster";
      const allCards = document.querySelectorAll(".monster-card");
      allCards.forEach(c => c.classList.remove("selected-card"));
      renderPalette();
    });

    paletteContainer.appendChild(swatch);
  });
}

// --- Sorting / Filtering ---
function getSortedAndFiltered() {
  let list = [...monsters];

  if (filterRarity !== "all") {
    list = list.filter(m => m.rarity === filterRarity);
  }

  if (sortMethod === "name") {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortMethod === "rarity") {
    const order = {
      common: 0, uncommon: 1, rare: 2,
      epic: 3, legendary: 4, mythic: 5
    };

    list.sort((a, b) => {
      const diff = order[a.rarity] - order[b.rarity];
      return diff !== 0 ? diff : a.name.localeCompare(b.name);
    });
  }

  return list;
}

// --- Render monster list ---
function renderMonsters() {
  monsterList.innerHTML = "";

  const list = getSortedAndFiltered();

  emptyMsg.style.display = monsters.length === 0 ? "block" : "none";
  countMsg.textContent = monsters.length > 0 ? `You have ${monsters.length} monster(s)` : "";

  list.forEach((monster, index) => {
    const card = document.createElement("div");
    card.className = "monster-card";
    card.style.backgroundColor = monster.color;

    const title = document.createElement("h3");
    title.textContent = monster.name;

    const badge = document.createElement("span");
    badge.textContent = {
      common: "🪨 Common",
      uncommon: "🍀 Uncommon",
      rare: "💎 Rare",
      epic: "💜 Epic",
      legendary: "⭐ Legendary",
      mythic: "🌈 Mythic"
    }[monster.rarity];

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";

    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      monsters.splice(index, 1);
      renderMonsters();
  });

  card.addEventListener("click", () => {
    previewSVG.style.fill = monster.color;
    previewName.textContent = monster.name;

    const allSwatches = document.querySelectorAll(".color-swatch");
    allSwatches.forEach(s => s.classList.remove("selected"));

    const allCards = document.querySelectorAll(".monster-card");
    allCards.forEach(c => c.classList.remove("selected-card"));

    card.classList.add("selected-card");

    selectedMonster = monster;
  });

  card.append(title, badge, delBtn);
  monsterList.appendChild(card);
});
}

// --- Add monster ---
function addMonster() {
  if (newName.trim() === "") return;

  monsters.push({
    name: newName,
    color: newColor,
    rarity: newRarity
  });

  newName = "";
  nameInput.value = "";

  renderMonsters();
}

// --- Update preview ---
function updatePreview() {
  previewSVG.style.fill = newColor;
  previewName.textContent = newName || "Your Monster";
}

// --- Event listeners ---
nameInput.addEventListener("input", e => newName = e.target.value);
raritySelect.addEventListener("change", e => newRarity = e.target.value);

sortSelect.addEventListener("change", e => {
  sortMethod = e.target.value;
  renderMonsters();
});

filterSelect.addEventListener("change", e => {
  filterRarity = e.target.value;
  renderMonsters();
});

document.getElementById("addBtn").addEventListener("click", addMonster);

// --- Initialize ---
renderPalette();
renderMonsters();
updatePreview();
previewSVG.style.fill = newColor;