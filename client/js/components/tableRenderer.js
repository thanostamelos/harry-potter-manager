export const createTableRow = (item, index, handlers) => {
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
            <button class="action-btn status-btn"><i class="ti ti-refresh"></i></button>
            <button class="action-btn upgrade-btn"><i class="ti ti-bolt"></i></button>
            <button class="action-btn edit-btn"><i class="ti ti-edit"></i></button>
            <button class="action-btn delete-btn"><i class="ti ti-trash"></i></button>
        </td>
    `;

    // Συνδέουμε τα events χρησιμοποιώντας τα handlers που περνάμε από το app.js
    tr.querySelector(".status-btn").onclick = () => handlers.onStatus(item.id);
    tr.querySelector(".upgrade-btn").onclick = () => handlers.onUpgrade(item.id);
    tr.querySelector(".edit-btn").onclick = () => handlers.onEdit(item);
    tr.querySelector(".delete-btn").onclick = () => handlers.onDelete(item.id);

    return tr;
};