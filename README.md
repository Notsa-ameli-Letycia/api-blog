README.md 
# API Blog – Node.js & MySQL

##  Description
Ce projet est une API backend pour gérer un blog simple.  
Elle permet de créer, lire, modifier, supprimer et rechercher des articles.  
Chaque article contient : titre, contenu, auteur, catégorie, tags et date de création.

Cette API a été développée dans le cadre du TAF1 de l’UE INF222.

---

##  Technologies utilisées
- Node.js
- Express
- MySQL (via mysql2)
- Postman pour tester l’API

---

## Structure du projet



mon-api-blog/
├── index.js # Serveur et routes principales
├── db.js # Connexion à MySQL
├── package.json
├── package-lock.json
└── README.md


---

##  Installation et configuration

1. Cloner le dépôt :  
```bash
git clone https://github.com/Notsa-ameli-Letycia/api-blog.git
cd api-blog

Installer les dépendances :
npm install

Configurer MySQL dans db.js avec tes identifiants.
Lancer le serveur :
node index.js


Le serveur sera accessible sur : http://localhost:3000

Endpoints de l’API
1. Créer un article
POST /api/articles
Body JSON :
{
  "titre": "Mon premier article",
  "contenu": "Contenu de l'article",
  "auteur": "Mel",
  "categorie": "Tech",
  "tags": "nodejs,api"
}

Réponse :
{
  "message": "Article créé !",
  "id": 1
}

2. Récupérer tous les articles
GET /api/articles
Réponse : tableau JSON avec tous les articles
3. Récupérer un article spécifique
GET /api/articles/{id}
Réponse : JSON de l’article correspondant
4. Modifier un article
PUT /api/articles/{id}
Body JSON avec les champs à modifier
5. Supprimer un article
DELETE /api/articles/{id}
6. Rechercher un article
GET /api/articles/search?query=mot
<img width="1920" height="1108" alt="Capture d’écran du 2026-03-23 11-17-08" src="https://github.com/user-attachments/assets/24da4c2f-807a-4744-9e7e-e2ea9d5f9fd8" />

Notes explicatives
La plateforme CleeRoute m’a aidée à structurer mon apprentissage sur Node.js et MySQL
Les étapes réalisées : création de compte, paramétrage, génération du parcours, suivi des modules
Chaque endpoint a été testé avec Postman
 Critique et suggestions
Points forts : interface simple, apprentissage guidé, parcours structuré
Points faibles : certaines étapes peu claires, manque de captures intégrées
Améliorations : ajout d’exemples d’utilisation plus concrets, tutoriels vidéo intégrés
 
