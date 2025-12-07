window.activeMonster = null;

window.setActiveMonster = function(monster) {
  window.activeMonster = {
    ...monster,
    happiness: monster.happiness ?? 50,
    fun: monster.fun ?? 50,
    hunger: monster.hunger ?? 50,
    cleanliness: monster.cleanliness ?? 50,
    energy: monster.energy ?? 50
  };
  window.updatePetCareUI();
  setupBackButton();
};

window.modifyStat = function(stat, amount) {
  if (!window.activeMonster) return;
  window.activeMonster[stat] = Math.max(0, Math.min(100, window.activeMonster[stat] + amount));
  window.updatePetCareUI();
};

window.petPet  = () => window.modifyStat("happiness", +12);
window.playWithPet = () => { window.modifyStat("fun", +15); window.modifyStat("happiness", +8); };
window.feedPet = () => window.modifyStat("hunger", +10);
window.washPet = () => window.modifyStat("cleanliness", +15);
window.sleepPet = () => window.modifyStat("energy", +20);

window.updatePetCareUI = function() {
  if (!window.activeMonster) return;
  const m = window.activeMonster;

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set("happyStat", m.happiness);
  set("funStat", m.fun);
  set("hungerStat", m.hunger);
  set("cleanStat", m.cleanliness);
  set("energyStat", m.energy);

  const petSVG = document.getElementById("petSVG");
  if (petSVG && m.color) petSVG.style.fill = m.color;
};

