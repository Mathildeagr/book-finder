import { Injectable, signal, computed } from '@angular/core';
import { Book, Favorite } from '../../models/book.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly STORAGE_KEY = 'bookfinder_favorites';
  
  private _favorites = signal<Favorite[]>(this.loadFromStorage());

  favorites = this._favorites.asReadonly();
  count = computed(() => this._favorites().length);

  isFavorite(bookKey: string): boolean {
    return this._favorites().some(f => f.key === bookKey);
  }

  addFavorite(book: Book): void {
    if (this.isFavorite(book.key)) return;

    const favorite: Favorite = {
      key: book.key,
      title: book.title,
      author_name: book.author_name,
      cover_i: book.cover_i,
      first_publish_year: book.first_publish_year,
      addedAt: new Date()
    };

    this._favorites.update(favs => [...favs, favorite]);
    this.saveToStorage();
  }

  removeFavorite(bookKey: string): void {
    this._favorites.update(favs => favs.filter(f => f.key !== bookKey));
    this.saveToStorage();
  }

  toggleFavorite(book: Book): void {
    this.isFavorite(book.key) ? this.removeFavorite(book.key) : this.addFavorite(book);
  }

  clearAll(): void {
    this._favorites.set([]);
    this.saveToStorage();
  }

  private loadFromStorage(): Favorite[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._favorites()));
  }
}