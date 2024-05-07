import fs from 'fs';

const STORAGE = 'src/products.json';

export default class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
        this.initialize();
    }
    setSocket(socket) {
        this.socket = socket;
    }
    async initialize() {
        try {
            const data = await fs.promises.readFile(STORAGE, 'utf-8');
            const products = JSON.parse(data);
            if (products.length > 0) {
                const lastProduct = products[products.length - 1];
                this.nextId = lastProduct.id + 1;
            }
            this.products = products;
        } catch (error) {
            console.error("Error al inicializar el ID:", error);
        }
    }

    async addProduct(product) {
        const isValid =
            product.title &&
            product.description &&
            product.price &&
            product.thumbnails &&
            product.code &&
            product.stock;
        const isDuplicate = this.products.some((p) => p.code === product.code);
    
        if (isValid && !isDuplicate) {
            product.id = this.nextId++;
            this.products.push(product);
    
            try {
                await fs.promises.writeFile(STORAGE, JSON.stringify(this.products, null, 2));
                // Después de agregar el producto con éxito
                if (this.socket) {
                    this.socket.emit('productUpdate', { type: 'productUpdate', products: this.products });
                }

                console.log("Producto agregado correctamente");
            } catch (error) {
                console.error("Los datos no se guardaron", error);
            }
        } else {
            console.log("Todos los campos son obligatorios o el código de producto ya existe");
        }
    }


    
    async getProducts() {
        try {
            const data = await fs.promises.readFile(STORAGE, 'utf-8');
            this.products = JSON.parse(data);
            return this.products;
        } catch (error) {
            console.error("Error al leer el archivo:", error);
            return [];
        }
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (product) {
            console.log("Producto encontrado:");
            console.log(product);
            return product;
        } else {
            throw new Error("Producto no encontrado");
        }
    }    

    async updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex !== -1) {
            const updatedProduct = { ...this.products[productIndex], ...updatedFields };
            this.products[productIndex] = updatedProduct;

            try {
                await fs.promises.writeFile(STORAGE, JSON.stringify(this.products, null, 2));
                console.log("Producto actualizado correctamente");
            } catch (error) {
                console.error("Error al actualizar el producto:", error);
            }
        } else {
            throw new Error("Producto no encontrado");
        }
    }

    async deleteProduct(id) {
        const updatedProducts = this.products.filter((product) => product.id !== id);

        if (updatedProducts.length < this.products.length) {
            try {
                await fs.promises.writeFile(STORAGE, JSON.stringify(updatedProducts, null, 2));
                console.log("Producto eliminado correctamente");
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
            }
        } else {
            throw new Error("Producto no encontrado");
        }
    }

    async deleteFile() {
        try {
            await fs.promises.unlink(STORAGE);
            console.log("Archivo eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar el archivo:", error);
        }
    }
}