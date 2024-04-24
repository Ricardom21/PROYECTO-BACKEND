import fs from 'fs';

const CARTS_FILE = './src/cart.json';

class CartManager {
    constructor() {
        this.carts = [];
        this.nextId = 1,
        this.loadCartsFromFile();
    }

    async saveCarts() {
        try {
            const cartData = JSON.stringify(this.carts, null, 2);
            await fs.promises.writeFile(CARTS_FILE, cartData, 'utf-8');
            console.log("Carritos guardados con éxito");
        } catch (error) {
            console.error("Error al guardar los carritos:", error);
            throw error;
        }
    }

   async getCarts() {
        try {
            const data = await fs.promises.readFile(CARTS_FILE, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error("Error al obtener los carritos:", error);
            throw error;
        }
    }

   async createCart() {
    // Generar un nuevo ID de carrito
    const newCartId = this.nextId++;
    
    // Crear un nuevo carrito vacío
    const newCart = { id: newCartId, products: [] };
    
    // Guardar el nuevo carrito en el arreglo de carritos
    this.carts.push(newCart);
    
    // Guardar todos los carritos en el archivo
    await this.saveCarts(); // <-- Aquí se llama a this.saveCarts()

    return newCart;
}

async addProductToCart(cartId, productId, quantity) {
    // Obtener el carrito por su ID
    const cart = await this.getCart(cartId);

    // Verificar si el carrito existe
    if (!cart) {
        throw new Error('Cart not found');
    }

    // Agregar el producto al carrito
    cart.products.push({ productId, quantity });

    // Guardar el carrito actualizado en el archivo
    await this.saveCarts(); // <-- Aquí se llama a this.saveCarts()
}

async removeProductFromCart(cartId, productId) {
    // Obtener el carrito por su ID
    const cart = await this.getCart(cartId);

    // Verificar si el carrito existe
    if (!cart) {
        throw new Error('Cart not found');
    }

    // Filtrar los productos en el carrito para remover el producto específico
    cart.products = cart.products.filter(product => product.productId !== productId);

    // Guardar el carrito actualizado en el archivo
    await this.saveCarts(); // <-- Aquí se llama a this.saveCarts()
}


    async saveCartsToFile() {
        // Guardar los carritos en el archivo
        try {
            await fs.promises.writeFile(CARTS_FILE, JSON.stringify(this.carts, null, 2));
        } catch (error) {
            console.error('Error saving carts to file:', error);
        }
    }

    async loadCartsFromFile() {
        // Cargar los carritos desde el archivo
        try {
            const data = await fs.promises.readFile(CARTS_FILE, 'utf-8');
            this.carts = JSON.parse(data);
        } catch (error) {
            console.error('Error loading carts from file:', error);
        }
    }
}

export default CartManager;





