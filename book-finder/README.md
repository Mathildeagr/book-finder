# BookFinder

Application front-end développée avec **Angular 18+**

Elle permet de rechercher des livres, consulter leur détail et gérer une liste de favoris, en s'appuyant sur l'API publique [OpenLibrary](https://openlibrary.org).

---

## Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
ng serve
```

L'application est ensuite disponible sur **http://localhost:4200**

> Aucune clé d'API requise — OpenLibrary est entièrement publique et gratuite.

---

## Fonctionnalités

-  **Recherche de livres** avec formulaire réactif validé et pagination
-  **Page de détail** avec description, auteurs et sujets
-  **Gestion des favoris** persistés en localStorage
-  **Guard Angular** sur la route `/favorites`
-  **Page 404** personnalisée
-  **Lazy loading** sur toutes les routes

---

## Architecture

```
src/app/
├── core/
│   ├── guards/          # FavoritesGuard
│   └── services/        # BookService, FavoritesService
├── models/              # Interfaces TypeScript
├── pages/
│   ├── home/
│   ├── search/
│   ├── book-detail/
│   ├── favorites/
│   └── not-found/
└── shared/
    ├── components/      # navbar, book-card, loader, error-message
    └── pipes/           # truncate
```

---

##  Stack technique

| Technologie | Version |
|---|---|
| Angular | 18+ |
| TypeScript | 5+ |
| RxJS | 7+ |
| Bootstrap | 5 |
| Bootstrap Icons | 1+ |

---

##  API

**OpenLibrary** — https://openlibrary.org/developers/api

- Recherche : `GET /search.json?q=...`
- Détail d'un livre : `GET /works/{id}.json`
- Détail d'un auteur : `GET /authors/{id}.json`
- Couvertures : `https://covers.openlibrary.org/b/id/{id}-M.jpg`

## Pistes d'améliorations

**Fonctionnalistés**
- **Filtres avancés sur la recherche (langue, année de publication, type de média)**
- **Système de notes ou commentaires personnels sur chaque livre favori**
- **Page dédiée aux auteurs avec leur bibliographie complète**

**UX / Design**
- **Mode sombre**
- **Animations de transition entre les pages plus élaborées**
- **Vue liste / grille switchable sur les résultats**