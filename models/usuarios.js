const modelsUsuarios = {
queryGetUsers: "SELECT * FROM Usuarios",
queryGetUsersByID:`SELECT * FROM Usuarios WHERE ID = ?`,
queryDeleteUsersByID: `UPDATE Usuarios SET Activo = 'N' WHERE ID = ?`,
queryUserExists: `SELECT Usuario FROM Usuarios WHERE Usuario = '?'`,
queryAddUser:
`INSERT INTO Usuarios(
                        Nombre,
                        Apellidos, 
                        Edad, 
                        Genero, 
                        Usuario, 
                        Contrasena,
                        Fecha_Nacimiento,
                        Activo)
                    VALUES (
                        ?,?,?,?,?,?,?,?)`,
querySignIn: `SELECT Contrasena, Activo FROM Usuarios WHERE Usuario = ?`
                    }

module.exports = modelsUsuarios