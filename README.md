# ShortURL Generator

Bienvenue dans ShortURL Generator, une application simple permettant de créer des raccourcis pour vos URL.

## Synopsis

Ce projet a été réalisé dans le cadre de notre formation à la [l'École Supérieure du Digital](https://www.wildcodeschool.com/fr-FR) de Bordeaux. Il s'agit d'un projet API, l'ojectif était de créer une api en groupe de 2 personnes. Nous avons choisi de créer une API permettant de créer des URL raccourcies.

Pourquoi nous avons choisi ce projet ? Nous sommes en alternance et dans l'entreprise où nous travaillons, nous avons besoin de créer des URL raccourcies. Nous avons donc décidé de créer une API qui nous permettrait de créer des URL raccourcies et que nous pourrions utiliser dans notre entreprise.

## Auteurs

[Théo Gillet](https://github.com/theo-code33) et [Louis Bouet](https://github.com/1ouiss) ont réalisé ce projet en 1 semaine.

## Fonctionnalités

- Création d'un compte utilisateur
- Génération d'une clé API
- Génération d'URL raccourcie
- Redirection vers l'URL d'origine

## Technologies utilisées

### Frontend

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend

![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## Installation

### Prérequis

- [Node.js](https://nodejs.org/) installé sur votre machine
- [Docker](https://www.docker.com/) installé sur votre machine

### Étapes d'installation

#### Installation de l'application Backend

1. Clonez le dépôt depuis GitHub :

   ```sh
   git clone https://github.com/votre-utilisateur/shorturl-generator.git
   ```

2. Accédez au répertoire du projet :

   ```sh
   cd short-url-api
   ```

3. Créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement suivantes :

   ```sh
    # Variables d'environnement pour la connexion à la base de données
    POSTGRES_PASSWORD=postgres
    POSTGRES_USER=postgres
    POSTGRES_DB=postgres

    # Clé secrète pour la génération des tokens JWT
    JWT_SECRET=secret
   ```

4. Lancer vos conteneurs Docker :

   ```sh
    docker-compose up -d
   ```

5. Installez les dépendances :

   ```sh
   yarn
   ```

6. Démarrez l'application :

   ```sh
   yarn start:dev
   ```

7. Accédez à la documention de l'API à l'adresse [http://localhost:3000/api](http://localhost:8000/documentation-dev).

Vous pouvez maintenant installer votre application frontend.

#### Installation de l'application Frontend

1. Clonez le dépôt depuis GitHub :

   ```sh
   git clone https://github.com/votre-utilisateur/shorturl-generator.git
   ```

2. Accédez au répertoire du projet :

   ```sh
   cd short-url-app
   ```

3. Créez un fichier `.env` à la racine du projet et ajoutez les variables d'environnement suivantes :

   ```sh
    # Url de base de l'application
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    # Variables d'environnement pour la connexion à l'API
    NEXT_API_URL=http://localhost:8000/api/v0
   ```

4. Installez les dépendances :

   ```sh
   yarn
   ```

5. Démarrez l'application :

   ```sh
   yarn dev
   ```

6. Accédez à l'application dans votre navigateur à l'adresse [http://localhost:3000](http://localhost:3000).

## Fonctionnement

### Utilisation de l'interface

1. **Page d'accueil**

   - Accédez à l'application via le navigateur sur la route `/admin`.
   - Créé un compte utilisateur

2. **Génération d'URL raccourcie**

   - Saisissez l'URL longue dans le champ prévu.
   - Cliquez sur le bouton "Créer mon url".
   - Vous obtiendrez une URL raccourcie unique associée à l'URL d'origine.

3. **Utilisation de l'URL raccourcie**

   - Copiez l'URL raccourcie générée.
   - Collez-la dans le navigateur pour être redirigé vers l'URL d'origine.

### Utilisation de l'API

1. **Création d'une clé api**

   - Accédez à l'application via le navigateur sur la route `/admin`.
   - Créé un compte utilisateur
   - Générer une clé API

2. **Génération d'URL raccourcie**

   - Envoyez une requête POST à l'URL `/api/v0/url` avec un body JSON contenant l'URL longue.
   - Vous obtiendrez une réponse JSON contenant l'URL raccourcie unique associée à l'URL d'origine.

## Contribution

Si vous souhaitez contribuer à ce projet, veuillez consulter le fichier [CONTRIBUTING.md](CONTRIBUTING.md) pour obtenir des informations sur la manière de contribuer.

## Licence

Ce projet est sous licence MIT. Consultez le fichier [LICENSE](LICENSE) pour plus d'informations.
