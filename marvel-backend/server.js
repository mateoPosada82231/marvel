require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuración
const PORT = process.env.PORT || 3001;
const SUPERHERO_API_KEY = process.env.SUPERHERO_API_KEY || '10223569763528853'; // Clave de ejemplo

// Validar que la clave esté configurada
if (!SUPERHERO_API_KEY) {
    console.error('Error: La clave API de SuperHero no está configurada');
    process.exit(1);
}

console.log('Configuración cargada:');
console.log('- Puerto: ' + PORT);
console.log('- Clave API SuperHero configurada: Sí');

// Ruta de prueba para validar la API
app.get('/api/superheroes/test', async (req, res) => {
    try {
        const url = `https://superheroapi.com/api/${SUPERHERO_API_KEY}/1`;
        console.log('- URL de prueba: ' + url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`Error de API (${response.status}):`, errorBody);
            return res.status(response.status).json({
                error: `Error ${response.status} al acceder a SuperHero API`,
                details: errorBody
            });
        }
        
        const data = await response.json();
        res.json({
            success: true,
            message: 'Conexión exitosa con SuperHero API',
            testResult: data
        });
    } catch (error) {
        console.error('Error en prueba de conexión:', error);
        res.status(500).json({ error: 'Error al probar la API' });
    }
});

// Ruta para buscar superhéroes
app.get('/api/superheroes/search', async (req, res) => {
    try {
        const { name = 'man' } = req.query;
        const url = `https://superheroapi.com/api/${SUPERHERO_API_KEY}/search/${encodeURIComponent(name)}`;
        
        console.log('Buscando superhéroes:', url);
        
        const response = await fetch(url);
        const data = await response.json();
        
        // La API devuelve "error" cuando no encuentra resultados
        if (data.response === 'error') {
            return res.json({
                response: 'success',
                results: []  // Devolvemos array vacío en lugar de error
            });
        }
        
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Error al buscar superhéroes',
            message: error.message
        });
    }
});

// Ruta para obtener un superhéroe por ID
app.get('/api/superheroes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const url = `https://superheroapi.com/api/${SUPERHERO_API_KEY}/${id}`;
        
        console.log('Obteniendo superhéroe:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            return res.status(response.status).json({ 
                error: `Error al obtener superhéroe: ${response.status}`
            });
        }
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Error al obtener superhéroe',
            message: error.message
        });
    }
});

// Ruta para obtener conexiones de un superhéroe (como alternativa a los comics)
app.get('/api/superheroes/:id/connections', async (req, res) => {
    try {
        const { id } = req.params;
        const url = `https://superheroapi.com/api/${SUPERHERO_API_KEY}/${id}/connections`;
        
        console.log('Obteniendo conexiones:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            return res.status(response.status).json({ 
                error: `Error al obtener conexiones: ${response.status}`
            });
        }
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            error: 'Error al obtener conexiones',
            message: error.message
        });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
    console.log(`Prueba la API: http://localhost:${PORT}/api/superheroes/test`);
});