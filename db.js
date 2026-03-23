const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'mel',           // ton utilisateur MySQL
  password: '1234',      // ton mot de passe
  database: 'blog_db'    // ta base MySQL
});

db.connect((err) => {
  if (err) {
    console.error('Erreur connexion:', err);
  } else {
    console.log('Connecté à MySQL');
  }
});

module.exports = db;
