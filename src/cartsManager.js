


import fs from "fs" ;
import ProductManager from "./ProductManager.js";

class CartsManager{
    #carts;
    #path;
    static idProducto = 0;

    constructor(){
        this.#path ="./src/data/carritos.json";
        this.#carts = this.#readCartsInFile();
        
    }

    #asignarIdCart(){
        let id = 1;
        if(!this.#carts.lenght != 0)
            id = this.#carts[this.#carts.length - 1].id + 1;
        return id;
    }

    #readCartsInFile(){
        try{
            if(fs.existsSync(this.#path)){
                return JSON.parse(fs.readFileSync(this.#path, "utf-8"));
            }
            return [];

        } catch (error){
            console.log(`ocurrio un error al momento de leer el archivo de productos, ${error}`);
        }
    }

    #guardarArchivo(){
        try{
            fs.writeFileSync(this.#path, JSON.stringify(this.#carts));
        }
     catch (error){
        console.log(`ocurrio un error al momento de leer el archivo de productos, ${error}`);
    }

    }

    createCart (){
        const newCart = {
            id: this.#asignarIdCart(),
            products: []
        };
        this.#carts.push(newCart);
        this.#guardarArchivo();
        
        return newCart;
    }

    getCartById(id){
    
           
    

       const producto = this.#carts.find(p => p.id == id);
       if(producto) 
        return producto;
       else
        return "no se encontro el producto con ese id"
    }
   
    addProdcuctInCart(cid, pid){

        let respuesta = `el carro con id ${cid} no existe`;
        const indexCarrito = this.#carts.findIndex(c=> c.id === cid );
        
        if(indexCarrito !== -1 ){
            const  indexProductoInCart = this.#carts[indexCarrito].productos.findindex(p=>p.id===pid);
            const p = new ProductManager();
            const producto = p.getProductById(pid);

            if(producto.status && indexProductoInCart === -1){
                this.#carts[indexCarrito].products.push({id:pid, "quantity":1});
                this.#guardarArchivo();
                respuesta = "producto agregado al carrito";
            }else if(producto.status && indexProductoInCart !==-1){
                ++this.#carts[indexCarrito].products[indexProductoInCart].quantity;
                this.#guardarArchivo();
                respuesta = "producto agregado al carrito";
            }else{
                respuesta = `el producto con id ${pid} no existe `  
            }
        }
         
        return respuesta;
    }



    

    
}

 

export default CartsManager;