import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

app.get("/", (req, res) => {
    res.send("Bienvenidos a la API del Sistema de Cine");
});

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'bd_sistema_cine'
});

db.connect((error) => {
    if (error) {
        console.log("Error al conectar a la base de datos");
        return;
    } else {
        console.log("Conexión exitosa");
    }
});

// **Endpoint GET para Participaciones con INNER JOIN**
app.get('/participaciones/', (req, res) => {
    const query = `
        SELECT p.id_pelicula, p.titulo, a.id_actor, a.nombre, pp.rol 
        FROM participaciones_pelicula pp
        INNER JOIN peliculas p ON pp.id_pelicula = p.id_pelicula
        INNER JOIN actores a ON pp.id_actor = a.id_actor
        group by p.id_pelicula, a.id_actor`;
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al obtener las participaciones');
            return;
        } else {
            res.status(200).json(results);
        }
    });
});

// **Endpoint POST para agregar una Participación**
app.post('/participaciones/', (req, res) => {
    const { id_pelicula, id_actor, rol } = req.body;
    const query = 'INSERT INTO participaciones_pelicula (id_pelicula, id_actor, rol) VALUES (?, ?, ?)';
    db.query(query, [id_pelicula, id_actor, rol], (error, results) => {
        if (error) {
            res.status(500).send('Error al agregar la participación');
            return;
        } else {
            res.status(201).json('Participación registrada exitosamente');
        }
    });
});

// **Endpoint DELETE para eliminar una Participación**
app.delete('/participaciones/:id_pelicula/:id_actor', (req, res) => {
    const { id_pelicula, id_actor } = req.params;
    const query = 'DELETE FROM participaciones_pelicula WHERE id_pelicula = ? AND id_actor = ?';
    db.query(query, [id_pelicula, id_actor], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar la participación');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('No existe la participación');
            return;
        }
        res.status(200).json('Participación eliminada exitosamente');
    });
});

// **Endpoint PUT para actualizar una Participación**
app.put('/participaciones/:id_pelicula/:id_actor', (req, res) => {
    const { id_pelicula, id_actor } = req.params;
    const { rol } = req.body;
    const query = 'UPDATE participaciones_pelicula SET rol = ? WHERE id_pelicula = ? AND id_actor = ?';
    db.query(query, [rol, id_pelicula, id_actor], (error, results) => {
        if (error) {
            res.status(500).send('Error al actualizar la participación');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('No existe la participación');
            return;
        }
        res.status(200).json('Participación actualizada exitosamente');
    });
});


// **Endpoints para Películas**
app.get('/peliculas/', (req, res) => {
    const query = "SELECT * FROM peliculas";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al obtener las películas');
            return;
        } else {
            res.status(200).json(results);
        }
    });
});

app.post('/peliculas/', (req, res) => {
    const { titulo, anio, genero } = req.body;
    const query = 'INSERT INTO peliculas (titulo, anio, genero) VALUES (?, ?, ?)';
    db.query(query, [titulo, anio, genero], (error, results) => {
        if (error) {
            res.status(500).send('Error al agregar la película');
            return;
        } else {
            res.status(201).json('Película registrada exitosamente');
        }
    });
});

app.delete('/peliculas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM peliculas WHERE id_pelicula = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar la película');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('No existe la película');
            return;
        }
        res.status(200).json('Película eliminada exitosamente');
    });
});

app.put('/peliculas/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, anio, genero } = req.body;
    const query = 'UPDATE peliculas SET titulo = ?, anio = ?, genero = ? WHERE id_pelicula = ?';
    db.query(query, [titulo, anio, genero, id], (error, results) => {
        if (error) {
            res.status(500).send('Error al actualizar la película');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('No existe la película');
            return;
        }
        res.status(200).json('Película actualizada exitosamente');
    });
});

// **Endpoints para Actores**
app.get('/actores/', (req, res) => {
    const query = "SELECT * FROM actores";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al obtener los actores');
            return;
        } else {
            res.status(200).json(results);
        }
    });
});

app.post('/actores/', (req, res) => {
    const { nombre, nacionalidad, edad } = req.body;
    const query = 'INSERT INTO actores (nombre, nacionalidad, edad) VALUES (?, ?, ?)';
    db.query(query, [nombre, nacionalidad, edad], (error, results) => {
        if (error) {
            res.status(500).send('Error al agregar el actor');
            return;
        } else {
            res.status(201).json('Actor registrado exitosamente');
        }
    });
});

app.delete('/actores/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM actores WHERE id_actor = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar el actor');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('No existe el actor');
            return;
        }
        res.status(200).json('Actor eliminado exitosamente');
    });
});

app.put('/actores/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, nacionalidad, edad } = req.body;
    const query = 'UPDATE actores SET nombre = ?, nacionalidad = ?, edad = ? WHERE id_actor = ?';
    db.query(query, [nombre, nacionalidad, edad, id], (error, results) => {
        if (error) {
            res.status(500).send('Error al actualizar el actor');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('No existe el actor');
            return;
        }
        res.status(200).json('Actor actualizado exitosamente');
    });
});


