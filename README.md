# Documentation du Projet BookSage Microservices

## Introduction
Bienvenue dans la documentation du projet BookSage Microservices. BookSage est une plateforme qui facilite la gestion des livres pour les utilisateurs et favorise l'interaction entre les amateurs de lecture. Cette documentation fournit un aperçu complet du projet, y compris son architecture, l'installation, l'exécution et les directives de contribution.

## Structure du Projet
Le projet BookSage est organisé en plusieurs composants, chacun jouant un rôle clé dans l'ensemble du système. Voici un détail de chaque composant :

### Microservices
Le projet BookSage repose sur une architecture de microservices pour améliorer la modularité, la scalabilité et la flexibilité. Voici un aperçu des microservices et de leurs caractéristiques :

1. **Gestion des Utilisateurs**
   - Module : Gestion Utilisateur
   - Technologie : Spring Boot
   - Base de Données : H2 (base de données embarquée)
   - Sécurité : Spring Security
   - Fonctionnalités : Gestion des utilisateurs, authentification, autorisation.

2. **Gestion des Livres**
   - Module : Gestion Livres
   - Technologie : Spring Boot
   - Base de Données : H2 (base de données embarquée)
   - Fonctionnalités : Gestion des livres, catégories, recherche de livres.

3. **Gestion des Emprunts**
   - Module : Gestion Emprunt
   - Technologie : Spring Boot
   - Base de Données : H2 (base de données embarquée)
   - Fonctionnalités : Gestion des emprunts, réservations.

4. **Gestion des Auteurs**
   - Module : Gestion Auteur
   - Technologie : Spring Boot
   - Base de Données : MySQL
   - Fonctionnalités : Gestion des auteurs, de leurs œuvres, détails biographiques.

5. **Gestion des Avis (Reviews)**
   - Module : Gestion Reviews
   - Technologie : Node.js
   - Base de Données : MongoDB
   - Fonctionnalités : Gestion des avis et commentaires sur les livres, évaluation.

### Architecture
Pour faciliter la gestion des microservices, le projet BookSage utilise les composants suivants :

- **Serveur Eureka** : Permet la découverte et l'enregistrement des microservices. Il simplifie la communication entre les microservices en les enregistrant et en fournissant des informations sur leur emplacement.

- **Gateway** : Gère les requêtes entrantes et les achemine vers les microservices appropriés. Il sert de point d'entrée unique pour l'ensemble de l'application.

### Partie Front-End
Le projet comprend une interface utilisateur développée en Angular. Cette interface permet aux utilisateurs d'interagir avec les microservices de manière conviviale. Elle offre des fonctionnalités telles que la recherche de livres, la gestion du profil utilisateur, la publication d'avis, etc.

## Organisation du Projet
Le projet est organisé en plusieurs répertoires, chacun correspondant à un microservice ou à la partie front-end. Voici une structure de répertoire typique :

- `MS_Gestion_utilisateur/` : Contient le code source du microservice de gestion des utilisateurs.
- `ms-livre/` : Contient le code source du microservice de gestion des livres.
- `ms-review/` : Contient le code source du microservice de gestion des avis (reviews).
- `EurekaDiscoveryServer/` : Contient le code source du serveur de découverte Eureka.
- `Gateway/` : Contient le code source de la partie gateway.
- `BookSage_Front/` : Contient le code source de la partie front-end développée en Angular.
- `docker-compose.yml` : Le fichier Docker Compose pour le déploiement des microservices.
- `README.md` : La documentation spécifique à chaque microservice.

## Installation et Exécution
Pour exécuter le projet BookSage sur votre machine locale, suivez ces étapes :

### Prérequis
Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre système :

- **Docker** : [Téléchargez Docker](https://www.docker.com/) et installez-le.

- **Node.js** : Si Node.js n'est pas déjà installé, téléchargez-le depuis [nodejs.org](https://nodejs.org/) pour exécuter le microservice de gestion des avis.

### Étapes d'Exécution
1. Clonez le dépôt Git sur votre machine :

   ```bash
   git clone https://github.com/Youssrra/BookSage_MS.git

2. Accédez au répertoire du projet :

   ```bash
   cd BookSage_MS
   ```

3. Utilisez Docker Compose pour démarrer l'ensemble de l'application, y compris les microservices et la partie front-end :

   ```bash
   docker-compose up
   ```

4. Une fois que Docker Compose a terminé le démarrage, vous pouvez accéder à l'application front-end en ouvrant un navigateur web à l'URL http://localhost:4200
   
## Contribution
Le projet BookSage accueille les contributions de la communauté. Si vous souhaitez contribuer, suivez ces étapes :

1. Sélectionnez le microservice auquel vous souhaitez contribuer.

2. Consultez le fichier README du microservice pour obtenir des instructions spécifiques à la contribution.

3. Créez une branche pour votre contribution, implémentez les modifications et soumettez une demande de tirage (pull request).

4. Les contributeurs du projet examineront votre demande de tirage et fourniront des commentaires et des ajustements si nécessaire.

5. Une fois que la contribution est approuvée, elle sera fusionnée dans le projet principal.

## Licence
Le projet BookSage est sous licence [mentionner la licence ici]. Pour plus de détails sur la licence, consultez le fichier LICENCE inclus dans le ré

pertoire du projet.

## Besoin d'Aide ?
Pour toute question, préoccupation ou support technique, veuillez contacter les responsables du projet :

- [Adresse e-mail de contact 1]
- [Adresse e-mail de contact 2]

Nous sommes là pour vous aider à contribuer et à utiliser BookSage !

**Bon développement !**
```

N'hésitez pas à personnaliser davantage la documentation en remplaçant `[mentionner la licence ici]`, `[Adresse e-mail de contact 1]` et `[Adresse e-mail de contact 2]` par les informations appropriées pour votre projet.
