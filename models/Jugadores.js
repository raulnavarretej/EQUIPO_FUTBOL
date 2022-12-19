const modelsJugadores = {
    queryGetJugadores: "SELECT * FROM Jugadores",
    queryGetJugadoresByID:`SELECT * FROM Jugadores WHERE ID = ?`,
    queryDeleteJugadoresByID: `UPDATE Jugadores SET Activo = 'N' WHERE ID = ?`,
    queryJugadoresExists: `SELECT Nombre FROM Jugadores WHERE Nombre = ?`,
    queryAddJugagodres:
    `INSERT INTO Jugadores
        (Nombre,
            Apellido,
            Apodo, 
            Equipo,
            Titular, 
            Suplente)
        VALUES (
        ?, ?, ?, ?, ?, ?)`,
    
    }
    
    
    module.exports = modelsJugadores