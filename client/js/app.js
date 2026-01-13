import {createItem, deleteItem, getItems, updateStatus, upgradePower} from "./services/api.js";

let selectedId = null;

const tableBody = document.getElementById("tableBody");
const modal = document.getElementById("modal");
const searchInput = document.getElementById("searchInput");

const editName = document.getElementById("editName");
const editType = document.getElementById("editType");
const editElement = document.getElementById("editElement");
const editRarity = document.getElementById("editRarity");
const editDescription = document.getElementById("editDescription");
const editStatus = document.getElementById("editStatus");

const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveBtn");
const deleteBtn = document.getElementById("deleteBtn");
const closeBtn = document.getElementById("closeBtn");
const confirmAddButton = document.getElementById("confirmAddButton");
const loadingOverlay = document.getElementById("loadingOverlay");

const showLoading = () => loadingOverlay.classList.remove("hidden");
const hideLoading = () => loadingOverlay.classList.add("hidden");

const modalTitle = document.getElementById("modalTitle");

const renderTable = (items) => {
    tableBody.innerHTML = "";

    items.forEach((item, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>${item.type}</td>
      <td>${item.element}</td>
      <td>${item.power}</td>
      <td>${item.rarity}</td>
      <td>${item.description}</td>
      <td>${item.status}</td>
      <td class="actions-cell">
        <button class="action-btn status-btn" title="Toggle Status"><i class="ti ti-refresh"></i></button>
        <button class="action-btn upgrade-btn" title="Upgrade Power +5"><i class="ti ti-bolt"></i></button>
        <button class="action-btn edit-btn" title="Edit Item"><i class="ti ti-edit"></i></button>
        <button class="action-btn delete-btn" title="Delete Item"><i class="ti ti-trash"></i></button>
      </td>
    `;
        // 1. Change Status
        tr.querySelector(".status-btn").addEventListener("click", async () => {
            showLoading();
            await updateStatus(item.id);
            await loadItems();
            hideLoading();
        });

        // 2. Upgrade Power
        tr.querySelector(".upgrade-btn").addEventListener("click", async () => {
            showLoading();
            await upgradePower(item.id);
            await loadItems();
            hideLoading();
        });

        // 3. Edit Modal
        tr.querySelector(".edit-btn").addEventListener("click", () => {
            openModal(item);
        });

        // 4. Delete
        tr.querySelector(".delete-btn").addEventListener("click", async () => {
            if (confirm(`Delete ${item.name}?`)) {
                showLoading();
                await deleteItem(item.id);
                await loadItems();
                hideLoading();
            }
        });
        tableBody.appendChild(tr);
    });
}

// fetch items from the backend
const loadItems = async () => {
    console.log("loading items...");
    const items = await getItems();
    renderTable(items);
}

const openModal = (item) => {
    modalTitle.innerText = item ? "Edit Item" : "Add Item";

    selectedId = item?.id ?? null;
    editName.value = item?.name ?? "";
    editType.value = item?.type ?? "Spell";
    editElement.value = item?.element ?? "";
    editRarity.value = item?.rarity ?? "Common";
    editDescription.value = item?.description ?? "";
    editStatus.value = item?.status ?? "";
    saveBtn.style.display = item ? "inline-block" : 'none';
    deleteBtn.style.display = item ? "inline-block" : 'none';
    confirmAddButton.style.display = item ? "none" : 'inline-block';
    modal.classList.remove("hidden");
}

const closeModal = () => {
    modal.classList.add("hidden");
}

// Open modal for the creation
addBtn.addEventListener("click", () => {
    console.log("add item");
    openModal(null)
});

// Update
saveBtn.addEventListener("click", async () => {
    showLoading();
    try {
        await updateStatus(selectedId);
        await loadItems();
        closeModal();
    } finally {
        hideLoading();
    }
});

// Delete
deleteBtn.addEventListener("click", async () => {
    if (!confirm("Are you sure?")) return;
    showLoading();
    try {
        await deleteItem(selectedId);
        await loadItems();
        closeModal();
    } finally {
        hideLoading();
    }
});

// create api
confirmAddButton.addEventListener("click", async () => {
    const newItem = {
        name: editName.value,
        type: editType.value,
        element: editElement.value,
        power: editRarity.value,
        rarity: editRarity.value,
        description: editDescription.value,
        status: editStatus.value
    }
    showLoading();

    try {
        const result = await createItem(newItem);
        if (result.message) {
            alert(result.message);
        } else {
            await loadItems();
            closeModal();
        }
    } catch (error) {
        console.error("Error creating item:", error);
    } finally {
        hideLoading();
    }
});

searchInput.addEventListener("input", async (e) => {
    const value = e.target.value.toLowerCase();
    const items = await getItems();
    const filtered = items.filter(item =>
        item.name.toLowerCase().includes(value) ||
        item.status.toLowerCase().includes(value)
    );
    renderTable(filtered);
});

closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

loadItems();
