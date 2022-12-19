const{response, request} = require("express")
const pool = require("../db/connection")

const modelsjug = require("../models/Jugadores")
const {queryJugadoresExists} = require("../models/Jugadores")

const addjug = async (req = request, res = response) => {
    const {Nombre,
          Apellido,
          Apodo, 
          Equipo,
          Titular, 
          Suplente, 
         } = req.body//URI params

    if(!Nombre || !Apellido || !Apodo || !Equipo || !Equipo || !Titular || !Suplente){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [jugExist] = await conn.query(modelsjug.queryJugadoresExists,[Nombre])
        
        if(jugExist){
            res.status(400).json({msg: `El juagador '${Nombre}' ya se encuentra registrado`})
            return
        }
                 //generamos la consulta
                    const result = await conn.query(modelsjug.queryAddEquip,
                            [
                            Nombre,
                            Apellido,
                            Apodo, 
                            Equipo,
                            Titular, 
                            Suplente, 
                            ], (error) => {if(error) throw error})
                        console.log(result.affectedRows)
                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                    res.status(404).json({msg: `No se pudo reagistrar el jugador con Nombre ${Nombre}`})
                    return
                    }
                    res.json({msg:`Se agregó satisfactoriamente el jugador con Nombre ${Nombre}`})//Se manda la lista de equipos
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}

const updateEquipo = async (req = request, res = response) => {
    //const {id} = req.params
    const {Nombre,
        Ciudad,
        Pais, 
        Dueño, 
        Año_Fundacion, 
        Activo } = req.body//URI params

        if(!Nombre || !Ciudad || !Pais || !Dueño || !Activo){
            res.status(400).json({msg: "Faltan Datos"})
            return
        }
    
    let conn;
    try {
        conn = await pool.getConnection()//Realizamos la conexión
        //generamos la consulta
        const [equipExist] = await conn.query(modelsEquipo.queryEquipoExists,[Nombre])
        
        if(!equipExist){
            res.status(400).json({msg: `El Equipo '${Nombre}' no existe`})
            return
        }
                    const result = await conn.query(`UPDATE Equipo SET 
                    Nombre = '${Nombre}',
                    Ciudad = '${Ciudad}',
                    Pais = '${Pais}',
                    Dueño = '${Dueño}',
                    Año_Fundacion = '${Año_Fundacion}',
                    Activo = '${Activo}'
                    WHERE Nombre = '${Nombre}'`, (error) => {if (error) throw error})
                    
                    if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
                        res.status(404).json({msg: `No se pudo actualizar el equipo`})
                        return
                        }
   
                    res.json({msg:`Se actualizo satisfactoriamente el equipo '${Nombre}'`})//Se manda la lista de equipos
                 
               
    }catch (error){
        console.log(error)
        res.status(500).json({msg: error})//informamos el error
    }finally{
        if (conn) conn.end()//Termina la conexión
    }

}

const getEquipo = async (req = request, res = response) => {
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const users = await conn.query(modelsEquipo.queryGetEquipo, (error) => {if (error) throw error})

        if(!users){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: "NO existen equipos registradas"})
            return
        }
        res.json({users})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }
}

const getEquipoByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const [user] = await conn.query(modelsEquipo.queryGetEquipoByID, [id], (error) => {if (error) throw error})
        console.log(user)

        if(!user){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existe el equipo registrado con el ID ${id}`})
            return
        }
        res.json({user})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}

const deleteEquipoByID = async (req = request, res = response) =>{
    const {id} = req.params
    let conn
    try{
        conn = await pool.getConnection() //realizamos la conexion
        
        //generamos la consulta
        const result = await conn.query(modelsEquipo.queryDeleteEquipoByID, [id], (error) => {if (error) throw error})
        console.log(result.affectedRows)

        if(result.affectedRows === 0){ // En caso de no haber registros lo informamos
            res.status(404).json({msg: `NO existen equipos registrados con el ID ${id}`})
            return
        }

        res.json({msg:`Se elemino el equipo con el ID ${id}`})
    }catch (error){

        console.log(error)
        res.status(500).json({msg: error}) //informamos del error
    } finally{
        if (conn) conn.end() //termina la conexion

    }


}

module.exports = {addjug, updateEquipo, getEquipo, getEquipoByID, deleteEquipoByID}