import { Express } from "express";
import products from "./routers/products.js"
import carts from "./routers/cart.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.get("/", (req, res) => {
    return  res.status(200).send("bienvenido a la API")
});


app.use("/api/products", products);
app.use("/api/carts", carts);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});