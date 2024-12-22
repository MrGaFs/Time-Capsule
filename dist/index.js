"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./utils/db"));
const mainRouter_1 = __importDefault(require("./routes/mainRouter"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const port = process.env.PORT || 4000;
const app = (0, express_1.default)();
(0, db_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static("public"));
app.use("/api", mainRouter_1.default);
app.get("/", (_req, res) => {
    res.send(`
    <h1>Hello this is Time Capsule API ⏳</h1>
    `);
});
app.use(errorHandler_1.default);
app.listen(port, () => {
    console.log(`The server is up 📶 => http://localhost:${port} 🚀`);
});
//# sourceMappingURL=index.js.map