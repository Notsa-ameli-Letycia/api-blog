// 🔥 index.js
const express = require('express');
const db = require('./db'); // Connexion MySQL

const app = express();
app.use(express.json()); // Toujours avant les routes

console.log("🔥 INDEX.JS EN COURS D'EXECUTION");

// ------------------- ROUTES ------------------- //

// ✅ Route test racine
app.get('/', (req, res) => {
  res.send('API Blog fonctionne !');
});

// 1️⃣ Créer un article
app.post('/articles', (req, res) => {
  const { titre, contenu, auteur, categorie, tags } = req.body;

  const sql = 'INSERT INTO articles (titre, contenu, auteur, categorie, tags) VALUES (?, ?, ?, ?, ?)';
  
  db.query(sql, [titre, contenu, auteur, categorie, tags], (err, result) => {
    if (err) {
      console.error("Erreur SQL :", err.message);
      return res.status(500).json({ error: err.message });
    }

    console.log("🚀 Article créé avec ID :", result.insertId);
    res.status(201).json({ message: "Article créé !", id: result.insertId });
  });
});

// 2️⃣ Voir tous les articles
app.get('/articles', (req, res) => {
  const sql = 'SELECT * FROM articles';
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur SQL :", err.message);
      return res.status(500).json({ error: err.message });
    }

    console.log("📥 GET /articles →", results.length, "articles trouvés");
    res.status(200).json(results);
  });
});

// 3️⃣ Voir un article par ID
app.get('/articles/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM articles WHERE id = ?';
  
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Article non trouvé" });

    res.status(200).json(results[0]);
  });
});

// 4️⃣ Modifier un article
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

// 5️⃣ Supprimer un article
app.delete('/articles/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM articles WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Article non trouvé" });

    res.status(200).json({ message: "Article supprimé !" });
  });
});

// ------------------- SERVEUR ------------------- //
app.listen(3000, () => {
  console.log('🚀 Serveur sur http://localhost:3000');
});

