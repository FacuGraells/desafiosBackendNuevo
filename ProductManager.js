



class ProductManager{
    #products;
    
    static idProducto = 0;

    constructor(){
        this.#products = [];
    }

    addProduct(title, description ,price, thumbnail, code ,stock){
        
        if(!title || !description || !price || !thumbnail || !code || !stock)
            return "todos los parametros  son obligatorios [title, description ,price, thumbnail, code ,stock]";

        const codigoRepetido = this.#products.some(p => p.code ==  code);

        if (codigoRepetido) 
            return `El codigo ${code} ya esta registrado`;

            ProductManager.idProducto = ProductManager.idProducto + 1;
            const id = ProductManager.idProducto + 1;
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

    
}


 

module.exports = ProductManager;