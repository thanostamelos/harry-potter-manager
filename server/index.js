import express from "express";
import cors from "cors";
import itemsRoutes from "./routes/items.js";

const app = express();
const PORT = 5000;

app.use(cors());            // allows requests from the frontend
app.use(express.json());    // for JSON requests

app.use("/api/item", itemsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
