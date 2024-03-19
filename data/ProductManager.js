
const fs = require ( 'fs' );


class ProductManager{
    #products;
    #path;
    static idProducto = 0;

    constructor(){
        this.#path ="./data/productos.json";
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

    addProduct(title, description ,price, thumbnail, code ,stock){
        
        if(!title || !description || !price || !thumbnail || !code || !stock)
            return "todos los parametros  son obligatorios [title, description ,price, thumbnail, code ,stock]";

        const codigoRepetido = this.#products.some(p => p.code ==  code);

        if (codigoRepetido) 
            return `El codigo ${code} ya esta registrado`;

            ProductManager.idProducto = ProductManager.idProducto + 1;
            const id = this.#asignarIdProduct();
            const  newProduct = {
                id: id ,
                title : title,
                price : price,
                description : description,
                thumbnail : thumbnail,
                code : code,
                stock : stock
            }
            this.#products.push(newProduct);
            this.#guardarArchivo();

            return "El producto se agrego con exito!";

    }

    getProducts(){
        return this.#products;
    }

    getProductById(id){
       const producto = this.#products.find(p => p.id == id);
       if(producto) 
        return producto;
       else
        return "no se encontro el producto con ese id"
    }


    updateProduct(id, updateObject){
        let msg = `El producto con id ${id} no existe`;

        const index = this.#products.findIndex(p=> p.id === id );
        
        if(index !== -1 ){
            const {id, ...rest} = updateObject;
            this.#products[index] = {...this.#products [index], ...rest};
            this.#guardarArchivo();
            msg = "producto actualizado";
        }

        return msg;
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

 

module.exports = ProductManager;