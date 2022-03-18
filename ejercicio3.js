const express = require('express')
const fs = require('fs')


const app = express()

const server = app.listen( 8080 , ()=>{
    console.log(`Sv en puerto ${server.address().port}`)
})


class Contenedor {
    constructor() {
        this.id = undefined,
            this.title = undefined,
            this.price = undefined,
            this.thumbnail = undefined
    }

    save = (title, price, thumbnail, obj) => {
        try {
            if (fs.existsSync('./products.txt')) {
                const data = JSON.parse(fs.readFileSync('./products.txt', 'utf-8'))
                const lastProd = data[data.length - 1].id
                this.title = title
                this.price = price
                this.thumbnail = thumbnail
                this.id = lastProd + 1
                data.push(obj)
                fs.writeFileSync('./products.txt', `${JSON.stringify(data)}`)
            } else {
                const array = []
                this.title = title
                this.price = price
                this.thumbnail = thumbnail
                this.id = 1
                array.push(obj)
                fs.writeFileSync('./products.txt', `${JSON.stringify(array)}`)
            }

        } catch (error) {
            console.log(error)
        }

        console.log('Archivo guardado')
    }



    getAll = () => {
        const data = fs.readFileSync('./products.txt', 'utf-8')
        return (data)
    }

    getRandom =() =>{ 
        const data = fs.readFileSync('./products.txt', 'utf-8')
         const dataObj = JSON.parse(data)
        const randomP = dataObj[Math.round(Math.random() *( dataObj.length - 1 ))]
        
        return randomP
}}

// Instancio y guardo los productos nuevos
const contenedor = new Contenedor()
contenedor.save('monitor', 100, 'https://ejemplo.com/data/img/img.png', contenedor)
contenedor.save('mouse', 20, 'https://ejemplo.com/data/img/img.png', contenedor)
contenedor.save('teclado', 50, 'https://ejemplo.com/data/img/img.png',contenedor)



app.get('/productos',( req, res) =>{
    let productos = contenedor.getAll()
    !productos ? res.status(404).send('Los productos no fueron encontrados') : res.send(productos)
})

app.get('/productoRandom',( req, res) =>{
    let random = JSON.stringify(contenedor.getRandom())
    !random ? res.status(404).send('Los productos no fueron encontrados') : res.send(random)
})