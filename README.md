# Smart Parking (PARKS)

voir la maquette : https://parkscgp.github.io/PARKS/

### Plateforme intelligente de gestion et réservation de stationnement urbain

##  Overview

**PARKS** est une plateforme digitale permettant d’optimiser la gestion du stationnement en milieu urbain grâce à une combinaison de **données en temps réel**, **API REST**, et **technologies IoT**.

Le projet s’inscrit dans une démarche de **Smart City**, visant à réduire la congestion, améliorer l’expérience utilisateur et maximiser l’utilisation des infrastructures de parking. 

---
##  Vision produit

> Transformer la recherche de stationnement en une expérience fluide, prédictive et automatisée.

### Problèmes adressés

* Temps excessif de recherche de place
* Congestion urbaine
* Mauvaise exploitation des parkings
* Manque de visibilité en temps réel

### Solution apportée

* Localisation instantanée des places disponibles
* Réservation anticipée
* Suivi en temps réel
* Analyse des données d’occupation

---

##  Fonctionnalités clés

###  User App (Conducteurs)

* Authentification sécurisée (JWT)
* Recherche de parkings en temps réel
* Réservation instantanée ou planifiée
* Paiement intégré
* Historique & suivi des réservations
* Notifications (confirmation, expiration, rappel)

###  Admin Dashboard (Gestionnaires)

* Gestion des parkings et des places
* Suivi des réservations
* Gestion des utilisateurs
* Dashboard analytics (taux d’occupation, revenus, etc.)

###  Fonctionnalités avancées

* Mise à jour temps réel (WebSockets / polling)
* Intégration IoT (capteurs de présence)
* Prédiction de disponibilité (évolutif IA)
* Visualisation via plan interactif

---

##  Architecture système

Architecture **3-tier scalable** :

```
[ Frontend (React) ]
        ↓
[ API REST (Spring Boot) ]
        ↓
[ PostgreSQL Database ]
```

###  Frontend

* React (SPA)
* Communication via API REST (JSON)
* UX orientée temps réel

###  Backend

* Java Spring Boot
* Architecture RESTful
* Gestion de la logique métier :

  * Users
  * Parkings
  * Places
  * Reservations
  * Payments

### Database

* PostgreSQL (relationnelle)
* Modélisation normalisée

---

##  Sécurité

* Authentification : JWT
* Autorisation : RBAC (User / Admin)
* Communication : HTTPS
* Protection API : validation & contrôle d’accès

---

##  Temps réel

Deux stratégies possibles :

* **WebSockets** → temps réel natif
* **Polling API** → fallback simple

Cas d’usage :

* Mise à jour des places disponibles
* Notifications utilisateurs

---

##  IoT Integration (Optionnel)

* Capteurs détectant l’occupation des places
* Transmission des données vers le backend
* Simulation possible en environnement académique 

---

##  Stack technique

### Frontend

* React
* HTML5 / CSS3 / JavaScript (ES6+)

### Backend

* Java 17
* Spring Boot
* Maven

### Data

* PostgreSQL

### DevOps & Tools

* Git / GitHub
* Trello (gestion projet)
* Postman (tests API)

---

##  Modélisation (Core Entities)

* **User**
* **Parking**
* **Place**
* **Reservation**
* **Payment**

---

##  Roadmap

### Phase 1 – Core MVP

* Authentification
* Recherche parking
* Réservation

### Phase 2 – Fonctionnalités avancées

* Paiement
* Dashboard admin
* Temps réel

### Phase 3 – Smart Features

* IoT
* Prédiction (ML)
* Optimisation dynamique

---

##  KPI (indicateurs clés)

* Taux d’occupation des parkings
* Temps moyen de recherche
* Nombre de réservations
* Taux de conversion utilisateur

---

##  Livrables

* Application web (frontend + backend)
* API REST documentée
* Base de données
* Interface admin
* Code source versionné
* Documentation projet 

---

##  Organisation projet

### Méthodologie

* Approche Agile (itérative)
* Suivi via Trello

### Phases

1. Cadrage
2. Conception
3. Développement
4. Livraison

---

##  Perspectives d’évolution

* Application mobile native (iOS / Android)
* Intégration avec véhicules connectés
* Paiement automatique (sans friction)
* Smart pricing (tarification dynamique)
* Reconnaissance de plaques (ANPR)

---

##  Licence

Projet académique – usage pédagogique.

---

##  Contact

Projet réalisé dans le cadre du Master 1
Conduite & Gestion de Projet

---

##  Suivi du projet

 [Voir le Trello](https://trello.com/b/HIqGA0FM)
