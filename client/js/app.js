import {createItem, deleteItem, getItems, updateStatus, upgradePower} from "./services/api.js";
import {hideLoading, showLoading, toggleModal} from "./utils/ui.js";
import {createTableRow} from "./components/tableRenderer.js";

let selectedId = null;
const tableBody = document.getElementById("tableBody");

// fetch items from the backend
const loadItems = async () => {
    showLoading();
    try {
        const items = await getItems();
        renderTable(items);
    } catch (error) {
        console.error("Failed to load items:", error);
    } finally {
        hideLoading();
    }
}

const renderTable = (items) => {
    tableBody.innerHTML = "";
    if (items.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='9' style='text-align: center;'>No items found</td></tr>";
        return;
    }

    items.forEach((item, index) => {
        const row = createTableRow(item, index, {
            onStatus: async (id) => {
                await updateStatus(id);
                loadItems();
            },
            onUpgrade: async (id) => {
                await upgradePower(id);
                loadItems();
            },
            onEdit: (item) => openEditModal(item),
            onDelete: (id) => {
                selectedId = id;
                toggleModal("confirmationModal", true);
            }
        });
        tableBody.appendChild(row);
    });
};

const modal = document.getElementById("modal");
const confirmationModal = document.getElementById("confirmationModal");
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
const confirmAction = document.getElementById("confirmActionBtn");
const cancelDelete = document.getElementById("cancelBtn");

const modalTitle = document.getElementById("modalTitle");

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

    toggleModal("modal", true);
}

// Open modal for the creation
addBtn.addEventListener("click", () => openModal(null));

// Update
saveBtn.addEventListener("click", async () => {
    showLoading();
    try {
        await updateStatus(selectedId);
        await loadItems();
        toggleModal("modal", false);
    } finally {
        hideLoading();
    }
});

confirmAction.addEventListener("click", async () => {
    showLoading();
    try {
        await deleteItem(selectedId);
        await loadItems();
        toggleModal("confirmationModal", false);
        toggleModal("modal", false);
    } finally {
        hideLoading();
    }
});

deleteBtn.addEventListener("click", () => toggleModal("confirmationModal", true));
cancelDelete.addEventListener("click", () => toggleModal("confirmationModal", false));
closeBtn.addEventListener("click", () => toggleModal("modal", false));

// create api
confirmAddButton.addEventListener("click", async () => {
    const newItem = {
        name: editName.value,
        type: editType.value,
        element: editElement.value,
        power: 100,
        rarity: editRarity.value,
        description: editDescription.value,
        status: editStatus.value
    }
    showLoading();

    try {
        await createItem(newItem);
        await loadItems();
        toggleModal("modal", false);
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

window.addEventListener("click", (event) => {
    if (event.target === modal) toggleModal("modal", false);
});

loadItems();
