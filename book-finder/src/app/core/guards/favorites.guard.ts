import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';

export const favoritesGuard: CanActivateFn = () => {
  const favoritesService = inject(FavoritesService);
  const router = inject(Router);

  if (favoritesService.count() === 0) {
    router.navigate(['/'], { 
      queryParams: { message: 'Ajoutez des livres en favoris pour accéder à cette page.' } 
    });
    return false;
  }

  return true;
};