import { Express } from "express";
import ProductManager from "./data/ProductManager.js";


const app = express();
const PORT = 8080;

app.get("/products", (req, res) => {
    const {limit} = req.query;
    const p = new  ProductManager();
    return res.json({productos: p.getProducts(limit) });
});


app.get("/produts/:id",(req, res)=>{
    const {pid} = req.params;
    const p = new ProductManager();
    const  producto = p.getProductById(Number(pid));
    return res.json({producto});
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});