"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const app = (0, express_1.default)();
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/orders', orderRoutes_1.default);
app.use('/api/v1/products', productRoutes_1.default);
app.use(errorHandler_1.default);
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
