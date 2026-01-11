let data = [
    {
        id: 1,
        name: "Expelliarmus",
        type: "Charm",
        element: "Disarming",
        rarity: "Common",
        description: "Disarms your opponent by forcing them to release whatever they are holding.",
        status: "learned"
    },
    {
        id: 2,
        name: "Lumos",
        type: "Charm",
        element: "Light",
        rarity: "Common",
        description: "Causes the tip of the caster’s wand to emit light.",
        status: "learned"
    },
    {
        id: 3,
        name: "Alohomora",
        type: "Charm",
        element: "Unlocking",
        rarity: "Common",
        description: "Unlocks doors and other objects that are locked.",
        status: "learned"
    },
    {
        id: 4,
        name: "Wingardium Leviosa",
        type: "Charm",
        element: "Levitation",
        rarity: "Common",
        description: "Makes objects levitate and allows the caster to move them through the air.",
        status: "learned"
    },
    {
        id: 5,
        name: "Avada Kedavra",
        type: "Curse",
        element: "Killing",
        rarity: "Legendary",
        description: "Causes instant death to the victim. One of the Unforgivable Curses.",
        status: "learned"
    },
    {
        id: 6,
        name: "Crucio",
        type: "Curse",
        element: "Pain",
        rarity: "Legendary",
        description: "Inflicts intense, excruciating pain on the victim. Unforgivable Curse.",
        status: "learned"
    },
    {
        id: 7,
        name: "Imperio",
        type: "Curse",
        element: "Control",
        rarity: "Legendary",
        description: "Places the victim completely under the caster’s control. Unforgivable Curse.",
        status: "learned"
    },
    {
        id: 8,
        name: "Protego",
        type: "Charm",
        element: "Shielding",
        rarity: "Rare",
        description: "Creates a magical barrier to deflect spells and physical attacks.",
        status: "learned"
    },
    {
        id: 9,
        name: "Rictusempra",
        type: "Charm",
        element: "Tickling",
        rarity: "Uncommon",
        description: "Causes the target to laugh uncontrollably, rendering them unable to fight properly.",
        status: "learned"
    },
    {
        id: 10,
        name: "Sectumsempra",
        type: "Curse",
        element: "Slashing",
        rarity: "Rare",
        description: "Causes deep cuts to appear on the victim’s body, as if slashed by an invisible sword.",
        status: "learned"
    }
];

let selectedId = null;

const tableBody = document.getElementById("tableBody");
const modal = document.getElementById("modal");
const searchInput = document.getElementById("searchInput");

const editName = document.getElementById("editName");
const editType = document.getElementById("editHouse");
const editElement = document.getElementById("editElement");
const editRarity = document.getElementById("editRarity");
const editDescription = document.getElementById("editDescription");
const editStatus = document.getElementById("editStatus");

const saveBtn = document.getElementById("saveBtn");
const deleteBtn = document.getElementById("deleteBtn");
const closeBtn = document.getElementById("closeBtn");

const renderTable = (items) => {
    tableBody.innerHTML = "";

    items.forEach(item => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.type}</td>
      <td>${item.element}</td>
      <td>${item.rarity}</td>
      <td>${item.description}</td>
      <td>${item.status}</td>
      <td>
        <button data-id="${item.id}">Edit</button>
      </td>
    `;

        tr.querySelector("button").addEventListener("click", () => openModal(item));
        tableBody.appendChild(tr);
    });
}

function openModal(item) {
    selectedId = item.id;
    editName.value = item.name;
    editType.value = item.type;
    editElement.value = item.element;
    editRarity.value = item.rarity;
    editDescription.value = item.description;
    editStatus.value = item.status;
    modal.classList.remove("hidden");
}

function closeModal() {
    modal.classList.add("hidden");
}

saveBtn.addEventListener("click", () => {
    const item = data.find(d => d.id === selectedId);
    item.name = editName.value;
    item.type = editType.value;
    item.element = editElement.value;
    item.rarity = editRarity.value;
    item.description = editDescription.value;
    item.status = editStatus.value;
    renderTable(data);
    closeModal();
});


deleteBtn.addEventListener("click", () => {
    data = data.filter(d => d.id !== selectedId);
    renderTable(data);
    closeModal();
});

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = data.filter(item =>
        item.name.toLowerCase().includes(value) ||
        item.status.toLowerCase().includes(value)
    );
    renderTable(filtered);
});

closeBtn.addEventListener("click", closeModal);

renderTable(data);
