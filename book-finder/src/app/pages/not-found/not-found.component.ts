import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="text-center py-5">
      <div class="display-1 fw-bold text-primary mb-3">404</div>
      <i class="bi bi-map display-3 text-muted mb-3 d-block"></i>
      <h2 class="fw-bold mb-2">Page introuvable</h2>
      <p class="text-muted mb-4">La page que vous cherchez n'existe pas ou a été déplacée.</p>
      <a routerLink="/" class="btn btn-primary btn-lg me-2">
        <i class="bi bi-house me-1"></i>Accueil
      </a>
      <a routerLink="/search" class="btn btn-outline-primary btn-lg">
        <i class="bi bi-search me-1"></i>Rechercher un livre
      </a>
    </div>
  `
})
export class NotFoundComponent {}