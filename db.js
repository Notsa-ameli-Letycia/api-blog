const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'mel',           
  password: '1234',      
  database: 'blog_db'    
});

db.connect((err) => {
  if (err) {
    console.error('Erreur connexion:', err);
  } else {
    console.log('Connecté à MySQL');
  }
});

module.exports = db;
