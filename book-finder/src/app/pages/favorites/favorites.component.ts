import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritesService } from '../../core/services/favorites.service';
import { BookCardComponent } from '../../shared/components/book-card/book-card.component';
import { Favorite, Book } from '../../models/book.model';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterLink, BookCardComponent],
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent {
  favoritesService = inject(FavoritesService);

  // Convertit Favorite → Book pour réutiliser BookCardComponent
  asBook(fav: Favorite): Book {
    return {
      key: fav.key,
      title: fav.title,
      author_name: fav.author_name,
      cover_i: fav.cover_i,
      first_publish_year: fav.first_publish_year
    };
  }

  clearAll(): void {
    if (confirm('Voulez-vous vraiment supprimer tous vos favoris ?')) {
      this.favoritesService.clearAll();
    }
  }
}