import fs from 'fs';

const PRODUCTOS = './productos.txt';

class ProductManager {
    constructor() {
        this.products = [];
    }

    async addProduct(product) {
        const existingProduct = this.products.find(p => p.codigo === product.codigo);
        if (existingProduct) {
            console.log("Error: ya existe el código del producto");
            return;
        }
        this.products.push(product);
        
        const data = JSON.stringify(this.products, null, 2);
       
        try {
            await fs.promises.writeFile(PRODUCTOS, data);
            console.log("Producto agregado correctamente");
        } catch (error) {
            console.error("Los datos no se guardaron", error);
        }
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(PRODUCTOS, 'utf-8');
            this.products = JSON.parse(data);
            console.log(this.products);
            return this.products;
        } catch (error) {
            console.error("Error al leer el archivo", error);
            return [];
        }
    }

    async getProductById(productId) {
        try {
            const data = await fs.promises.readFile(PRODUCTOS, 'utf-8');
            this.products = JSON.parse(data);
            const product = this.products.find(p => p.codigo === productId);
            if (product) {
                return product;
            } else {
                console.log("Producto no encontrado");
            }
        } catch (error) {
            console.error("Error al leer el archivo", error);
            return null;
        }
    }

    async updateProduct(productId, updatedFields) {
        try {
            const data = await fs.promises.readFile(PRODUCTOS, 'utf-8');
            this.products = JSON.parse(data);
            const index = this.products.findIndex(p => p.codigo === productId);
            if (index !== -1) {
                this.products[index] = { ...this.products[index], ...updatedFields };
                await fs.promises.writeFile(PRODUCTOS, JSON.stringify(this.products, null, 2));
                console.log("Producto actualizado correctamente");
            } else {
                console.log("Producto no encontrado");
            }
        } catch (error) {
            console.error("Error al leer o escribir el archivo", error);
        }
    }

    async deleteProduct(productId) {
        try {
            const data = await fs.promises.readFile(PRODUCTOS, 'utf-8');
            this.products = JSON.parse(data);
            const filteredProducts = this.products.filter(p => p.codigo !== productId);
            await fs.promises.writeFile(PRODUCTOS, JSON.stringify(filteredProducts, null, 2));
            console.log("Producto eliminado correctamente");
        } catch (error) {
            console.error("Error al leer o escribir el archivo", error);
        }
    }
}

export default ProductManager;