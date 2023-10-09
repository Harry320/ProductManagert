const fs = require('fs')

class ProductManager{

#path
#format
#products

constructor(path) {
    this. #path = path
    this.#format ='uft-8'
    this.#products = []
}

#generateId = async =>{
    //  const products = await this.getProducts()
    return this.#products.length === 0? 1 : this.#products[this.#products.length-1].id +1
}

#validateProduct = async(products) =>{
    for(const[key,value]of Object.entries(product)) {
        if(!value){
            console.log('El producto ${product.title} tiene el campo ${key} incompleto')
            return false
        }
    }
    //const products = await this.getProducts()
    const existingProduct = await this.#products.find(p => p.code === product.code)
    if (existingProduct !== undefined) {
        console.log('Ya existe un producto con el codigo ${product.code}')
        return falce
    }
    return true
}

    addProduct=async(title,descrition,price,thumbnail,code,stock) => {
        
        const newProduct = {id:await this.#generateId(), title, description, price, thumbnail, code, stock}

        if (this.#validateProduct(newProduct)){
            this.#products.push(newProduct)
        await fs.promises.writeFile(this.#path,JSON.stringify(this.#products,null,'/t'))
        return newProduct
        }
    }
    getProducts = async() => {
        try{
            return JSON.parse(await fs.promises.readFile(this.#path, this.#format))
        }catch (err) {
            console.log('error:archivo no encontrado')
            return[]
        }
    }


    getProducts = async(id) =>{

        const product = this.#products.find (p => p.id === id)
        return product || 'No existe un producto con el ID ${id}'
    }

    updateProduct = async(id, update) => {

        const index = this.#products.findIndex(p=> p.id === id)

        if (index !== -1) {
            const isValid = await this.#validateProduct(update)
            if (!isValid) {
                return console.log('Error al actualizar: Actualizacion invalida')
            }
            this.#products[index] = {...this.#products[index], ...update }

            await fs.promises.writeFile(this.#path,JSON.stringify(this.#products,null,'\t'))

            return console.log('Producto actualizado', this.#products[index])
        }
        return console.log('Error al actualizar:Producto no encontrado')
    }

    deleteProduct = async(id) => {
        try{
            const product = this.#products.find(p=> p.id === id)
            if (!product) {
                return 'No existe un producto con el ID ${id}'
            }
            const filterProducts = this.#products.filter(p => p.id !== id)
            if (this.#products.lenght !== filterProducts.length) {
                await fs.promises.writeFile(this.#path, JSON.stringify(filterProducts, null, '\t'))
                return '${product.title}:Producto eliminado exitosamente'
            }
        } catch (err) {
            console.log(err)
        }
    }
}