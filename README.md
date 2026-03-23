README.md 
API Blog – Node.js & MySQL

 Description
Ce projet est une API backend pour gérer un blog simple.  
Elle permet de créer, lire, modifier, supprimer et rechercher des articles.  
Chaque article contient : titre, contenu, auteur, catégorie, tags et date de création.

Cette API a été développée dans le cadre du TAF1 de l’UE INF222.

 Technologies utilisées
- Node.js
- Express
- MySQL (via mysql2)
- Postman pour tester l’API
- et swagger pour documenter l'API


Structure du projet

Installation
Cloner le projet :
git clone <URL_DU_DEPOT>
cd <nom_du_dossier>

Installer les dépendances :
npm install

Configurer la base de données dans db.js si nécessaire.
Exemple de table articles :
CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  contenu TEXT NOT NULL,
  auteur VARCHAR(100),
  categorie VARCHAR(100),
  tags VARCHAR(255)
);

Lancer le serveur :
node index.js

Utilisation
Swagger
Ouvrir le navigateur :
http://localhost:3000/api-docs

Postman
Serveur : http://localhost:3000
Routes :
GET /articles → Tous les articles
GET /articles/:id → Article par ID
POST /articles → Créer un article
PUT /articles/:id → Modifier un article
DELETE /articles/:id → Supprimer un article
