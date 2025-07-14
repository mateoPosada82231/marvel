require('dotenv').config();
const express = require('express');
const cors = require('cors');
const md5 = require('md5');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Configuración
const PORT = process.env.PORT || 3001;
const MARVEL_PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;
const MARVEL_PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;

// Ruta para obtener personajes de Marvel
app.get('/api/marvel/characters', async (req, res) => {
    try {
        // Generamos el timestamp y el hash para la autenticación
        const ts = new Date().getTime();
        const hash = md5(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);

        // Parámetros de consulta que pueden venir del frontend
        const { limit = 10, offset = 0, nameStartsWith } = req.query;

        // Construimos la URL base
        let url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}&limit=${limit}&offset=${offset}`;

        // Añadimos filtro por nombre si existe
        if (nameStartsWith) {
            url += `&nameStartsWith=${encodeURIComponent(nameStartsWith)}`;
        }

        // Realizamos la petición a la API de Marvel
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error en la API de Marvel: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al obtener datos de Marvel API' });
    }
});

// Ruta para obtener detalles de un personaje específico
app.get('/api/marvel/characters/:characterId', async (req, res) => {
    try {
        const { characterId } = req.params;
        const ts = new Date().getTime();
        const hash = md5(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);

        const url = `https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${ts}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error en la API de Marvel: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al obtener datos del personaje' });
    }
});

// Ruta para obtener comics de un personaje
app.get('/api/marvel/characters/:characterId/comics', async (req, res) => {
    try {
        const { characterId } = req.params;
        const { limit = 10, offset = 0 } = req.query;
        const ts = new Date().getTime();
        const hash = md5(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY);

        const url = `https://gateway.marvel.com/v1/public/characters/${characterId}/comics?ts=${ts}&apikey=${MARVEL_PUBLIC_KEY}&hash=${hash}&limit=${limit}&offset=${offset}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error en la API de Marvel: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al obtener comics del personaje' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
});