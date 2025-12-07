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
};

window.modifyStat = function(stat, amount) {
    if (!window.activeMonster) return;
    window.activeMonster[stat] = Math.max(0, Math.min(100, window.activeMonster[stat] + amount));
    window.updatePetCareUI();
};

window.petPet  = () => window.modifyStat("happiness", 10);
window.playWithPet = () => { window.modifyStat("fun", 10); window.modifyStat("happiness", 5); };
window.feedPet = () => window.modifyStat("hunger", 10);
window.washPet = () => window.modifyStat("cleanliness", 10);
window.sleepPet = () => window.modifyStat("energy", 10);

window.updatePetCareUI = function() {
    if (!window.activeMonster) return;

    const m = window.activeMonster;

    const set = (id, val) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    };

    set("petName", m.name);
    set("happyStat", m.happiness);
    set("funStat", m.fun);
    set("hungerStat", m.hunger);
    set("cleanStat", m.cleanliness);
    set("energyStat", m.energy);

    const petSVG = document.getElementById("petSVG");
    if (petSVG && m.color) petSVG.style.fill = m.color;
};

window.openPetCare = function(monster) {
    window.setActiveMonster(monster);

    const actions = [
        { id: "petBtn", func: window.petPet },
        { id: "playBtn", func: window.playWithPet },
        { id: "feedBtn", func: window.feedPet },
        { id: "washBtn", func: window.washPet },
        { id: "sleepBtn", func: window.sleepPet }
    ];

    actions.forEach(action => {
        const btn = document.getElementById(action.id);
        if (btn) {
            btn.onclick = action.func;
        }
    });
};
