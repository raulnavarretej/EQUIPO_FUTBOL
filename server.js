const express = require('express')
const messagesRouter = require('./routes/messages')
const UsuariosRouter = require('./routes/Usuarios')
const JugadoresRouter = require('./routes/jugadores')
const cors = require('cors')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            messages: "/api/v1/messages",
            Usuarios: "/api/v1/Usuarios",
            jugadores: "/api/v1/jugadores"
        }
        this.middlewares()
        this.routes()
    }
    routes(){ ','
       this.app.use(this.paths.messages, messagesRouter)
       this.app.use(this.paths.Usuarios, UsuariosRouter)
       this.app.use(this.paths.jugadores, JugadoresRouter)
 }
    middlewares(){
        this.app.use(cors())// habilita origen curzado
        this.app.use(express.json())
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }
}
module.exports = Server
