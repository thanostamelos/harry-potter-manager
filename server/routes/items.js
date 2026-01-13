import express from "express";
import items from "../models/item.js";

const router = express.Router();

// Get all item
router.get("/", (req, res) => {
    res.json(items);
});

// Add new item
router.post("/", (req, res) => {
    const {name, type, element, power, rarity, description} = req.body;

    // check for unique name
    if (items.find(item => item.name === name)) {
        return res.status(400).json({message: "Name already exists!"});
    }

    // initial status
    let status = type === "Spell" ? "Unlearned" : "Μη παρασκευασμένο";

    const newItem = {
        id: crypto.randomUUID(),   // unique id
        name,
        type,
        element,
        power: Number(power),
        rarity,
        description,
        status
    };

    items.push(newItem);
    res.status(201).json(newItem);
});

router.patch("/:id/status", (req, res) => {
    const id = Number(req.params.id);
    const item = items.find(i => i.id === id);
    if (!item) return res.status(404).json({message: "Item not found"});

    if (item.type === "Spell") {
        item.status = item.status === "Unlearned" ? "Learned" : "Unlearned";
    } else {
        item.status = item.status === "Μη παρασκευασμένο" ? "Παρασκευασμένο" : "Μη παρασκευασμένο";
    }

    res.json(item);
});

router.patch("/:id/upgrade", (req, res) => {
    const id = Number(req.params.id);
    const item = items.find(i => i.id === id);
    if (!item) return res.status(404).json({message: "Item not found"});

    item.power = Math.min(item.power + 5, 100);
    res.json(item);
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = items.findIndex(i => i.id === id);
    if (index === -1) return res.status(404).json({message: "Item not found"});

    items.splice(index, 1);
    res.json({message: "Deleted successfully"});
});

export default router;
