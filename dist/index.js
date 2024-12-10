import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 4000;
const app = express();
app.get("/", (_req, res) => {
    res.send(`
    <h1>Hello this is time Capsule</h1>
    `);
});
app.listen(port, () => {
    console.log(`The server is up 📶 => http://localhost:${port} 🚀`);
});
//# sourceMappingURL=index.js.map