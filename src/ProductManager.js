
//const fs = require ( 'fs' );

import fs from "fs" ;

class ProductManager{
    #products;
    #path;
    static idProducto = 0;

    constructor(){
        this.#path ="./src/data/productos.json";
        this.#products = this.#readProductsInFile();
        
    }

    #asignarIdProduct(){
        let id = 1;
        if(!this.#products.lenght != 0)
            id = this.#products[this.#products.length - 1].id + 1;
        return id;
    }

    #readProductsInFile(){
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
            fs.writeFileSync(this.#path, JSON.stringify(this.#products));
        }
     catch (error){
        console.log(`ocurrio un error al momento de leer el archivo de productos, ${error}`);
    }

    }

    addProduct(title, description ,price, thumbnails=[], code ,stock, category, status = true){
        
        let result = "ocurrio un error";

        if(!title || !description || !price  || !code || !stock || !category)
            
            result = "todos los parametros  son obligatorios [title, description ,price, code ,stock, category]";

        else{

            const codigoRepetido = this.#products.some(p => p.code ==  code);

        if (codigoRepetido) 
            
            result = `El codigo ${code} ya esta registrado`;
        
        else {
            
            ProductManager.idProducto = ProductManager.idProducto + 1;
            const id = this.#asignarIdProduct();
            const  newProduct = {
                id ,
                title,
                price,
                description,
                thumbnails,
                code,
                stock,
                category,
                status
            }
            this.#products.push(newProduct);
            this.#guardarArchivo();
            result = {
                msg  : "producto agregado correct",
                producto : newProduct
            };
        }

            
    }
        

            return result;

    }

    getProducts(limit = 0){
        limit = Number(limit);
            if(limit > 0)
                return this.#products.slice(0, limit);
             else    
                 return this.#products;
    }
           
    

    getProductById(id){
        let status = false
        let resp = `el producto con id ${id} no existe`;
       const producto = this.#products.find(p => p.id == id);
       if(producto) {
        status = true;
        resp = producto
       }
        
       return {status , resp};
    }


    updateProduct(id, updateObject){
        let result = `El producto con id ${id} no existe`;

        const index = this.#products.findIndex(p=> p.id === id );
        
        if(index !== -1 ){
            const {id, ...rest} = updateObject;
            const propPermitidas = ["title", "description", "price", "code" ,"stock", "category"]
            const propActualizadas = Object.keys(rest)
            .filter(propiedad => propPermitidas.includes(propiedad))
            .reduce((obj,key,) =>{
                obj[key] = rest[key];
                return obj;
            }, {});
            this.#products[index] = {...this.#products [index], ...propActualizadas};
            this.#guardarArchivo();
            result = {
                msg:"producto actualizado",
                producto:this.#products[index]
            } ;
        }

        return result;
    }

    deleteProduct(id){
        let msg = `el producto con id ${id}, no existe` ;
        const index = this.#products.findIndex(p=> p.id === id );
        if(index !== -1 ){
           this.#products = this.#products.filter(p=> p.id == id);
           this.#guardarArchivo();
           msg = "producto eliminado!"
        }

        return msg;
    
    }
}

 

//module.exports = ProductManager;

export default ProductManager;