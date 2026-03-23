const express = require('express');
const db = require('./db'); 
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(express.json()); 

console.log("INDEX.JS EN COURS D'EXECUTION");


app.get('/', (req, res) => {
  res.send('API Blog fonctionne !');
});

app.post('/articles', (req, res) => {
  const { titre, contenu, auteur, categorie, tags } = req.body;
  const sql = 'INSERT INTO articles (titre, contenu, auteur, categorie, tags) VALUES (?, ?, ?, ?, ?)';
  
  db.query(sql, [titre, contenu, auteur, categorie, tags], (err, result) => {
    if (err) {
      console.error("Erreur SQL :", err.message);
      return res.status(500).json({ error: err.message });
    }
    console.log("Article créé avec ID :", result.insertId);
    res.status(201).json({ message: "Article créé !", id: result.insertId });
  });
});

app.get('/articles', (req, res) => {
  const sql = 'SELECT * FROM articles';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    console.log("GET /articles →", results.length, "articles trouvés");
    res.status(200).json(results);
  });
});

app.get('/articles/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM articles WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Article non trouvé" });
    res.status(200).json(results[0]);
  });
});

app.put('/articles/:id', (req, res) => {
  const { id } = req.params;
  const { titre, contenu, auteur, categorie, tags } = req.body;
  const sql = 'UPDATE articles SET titre=?, contenu=?, auteur=?, categorie=?, tags=? WHERE id=?';
  db.query(sql, [titre, contenu, auteur, categorie, tags, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Article non trouvé" });
    res.status(200).json({ message: "Article modifié !" });
  });
});

app.delete('/articles/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM articles WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Article non trouvé" });
    res.status(200).json({ message: "Article supprimé !" });
  });
});

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Blog Simplifié",
      version: "1.0.0",
      description: "API pour gérer les articles d'un blog"
    },
  },
  apis: ["./index.js"], 
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - titre
 *         - contenu
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de l'article
 *         titre:
 *           type: string
 *           description: Titre de l'article
 *         contenu:
 *           type: string
 *           description: Contenu de l'article
 *         auteur:
 *           type: string
 *         categorie:
 *           type: string
 *         tags:
 *           type: string
 *       example:
 *         id: 1
 *         titre: Mon premier article
 *         contenu: Contenu de l'article
 *         auteur: Mel
 *         categorie: Tutoriel
 *         tags: ["nodejs","express"]
 */

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Récupérer tous les articles
 *     responses:
 *       200:
 *         description: Liste des articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *   post:
 *     summary: Créer un nouvel article
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Article créé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 */

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     summary: Récupérer un article par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'article
 *     responses:
 *       200:
 *         description: Article trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: Article non trouvé
 *   put:
 *     summary: Modifier un article par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: Article modifié
 *       404:
 *         description: Article non trouvé
 *   delete:
 *     summary: Supprimer un article par ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Article supprimé
 *       404:
 *         description: Article non trouvé
 */


app.listen(3000, () => {
  console.log('Serveur sur http://localhost:3000');
  console.log('Swagger UI: http://localhost:3000/api-docs');
});
