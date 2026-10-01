LeMarché

LeMarché : est une plateforme e-commerce développée pour permettre aux utilisateurs de découvrir des produits, consulter leurs informations et effectuer des achats en ligne.

Présentation

Le projet est composé d'un backend Django et d'une nterface frontend React. Il a été développé comme un projet web complet mettant en pratique différentes technologies modernes du développement web.

Technologies utilisées

Backend

* Python
* Django
* Django REST Framework
* SQLite

Frontend

* React
* Vite
* JavaScript
* HTML
* CSS

Outils

* Git
* GitHub
* Visual Studio Code

Structure du projet

marche-platform/
├── backend/
│   └── marche/
│
├── lemarche_frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── .gitignore

Installation

1. Cloner le projet

git clone https://github.com/stephanemwamba46-ship-it/marche-platform.git
cd marche-platform
 
2. Backend Django

Créer et activer un environnement virtuel :

python -m venv venv


Sous Windows :

venv\Scripts\activate

Installer les dépendances :

pip install -r backend/requirements.txt

Lancer le serveur Django :

python backend/marche/manage.py runserver

3. Frontend React

Se rendre dans le dossier frontend :

cd lemarche_frontend

Installer les dépendances :

npm install

Lancer le serveur de développement :

npm run dev
 
Configuration

Les informations sensibles telles que les clés secrètes, mots de passe et variables d'environnement ne doivent pas être publiées sur GitHub.

Utiliser un fichier .env local pour les informations sensibles.

Aperçu

Des captures d'écran et démonstrations du projet pourront être ajoutées ultérieurement.

Auteur

Stéphane Mwamba

Développeur web & mobile — solutions digitales et entrepreneuriat numérique.
Je transforme des idées en solutions digitales concrètes.

Licence

Ce projet est publié à des fins de présentation et de développement.
