const API_BASE = "http://localhost:5000/api/item";

export const getItems = async () => {
    const res = await fetch(API_BASE);
    return res.json();
}

export const createItem = async (item) => {
    const res = await fetch(API_BASE, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(item)
    });
    return res.json();
}

export const updateStatus = async (id) => {
    const res = await fetch(`${API_BASE}/${id}/status`, {method: "PATCH"});
    return res.json();
}

export const upgradePower = async (id) => {
    const res = await fetch(`${API_BASE}/${id}/upgrade`, {method: "PATCH"});
    return res.json();
}

export const deleteItem = async (id) => {
    const res = await fetch(`${API_BASE}/${id}`, {method: "DELETE"});
    return res.json();
}
