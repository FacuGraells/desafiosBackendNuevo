const ProductManager = require("./ProductManager");


const producto = new ProductManager();


console.log(producto.addProduct("laptop", "asus rog", 15000, "https//img1.com", "234trp", 20 ));
console.log(producto.addProduct("celular", "iphone", 1500, "https//img2.com", "iss234trp", 4 ));
console.log(producto.addProduct("bicicleta", "scott", 27000, "https//img3.com", "ahc432odf", 2 ));


// console.log(producto.getProducts());
// console.log(producto.getProductById(1));
// console.log(producto.deleteProduct(3));