import { Component, Input, Output, EventEmitter, inject, computed, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Book } from '../../../models/book.model';
import { FavoritesService } from '../../../core/services/favorites.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterLink, TruncatePipe],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  @Input({ required: true }) book!: Book;
  @Output() favoriteToggled = new EventEmitter<Book>();

  private favoritesService = inject(FavoritesService);

  get isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.book.key);
  }

  get coverUrl(): string {
    return this.book.cover_i
      ? `https://covers.openlibrary.org/b/id/${this.book.cover_i}-M.jpg`
      : 'no-cover.png';
  }

  get workId(): string {
    return this.book.key.replace('/works/', '');
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = 'no-cover.png';
  }

  toggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favoritesService.toggleFavorite(this.book);
    this.favoriteToggled.emit(this.book);
  }
}