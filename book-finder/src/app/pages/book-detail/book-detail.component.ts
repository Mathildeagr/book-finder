import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject, takeUntil, switchMap, forkJoin, of, catchError } from 'rxjs';
import { BookService } from '../../core/services/book.service';
import { FavoritesService } from '../../core/services/favorites.service';
import { BookDetail, Author, Book } from '../../models/book.model';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [RouterLink, LoaderComponent, ErrorMessageComponent],
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);
  favoritesService = inject(FavoritesService);
  private cdr = inject(ChangeDetectorRef); 
  private destroy$ = new Subject<void>();

  book: BookDetail | null = null;
  authors: Author[] = [];
  coverId: number | null = null;
  workId = '';
  isLoading = true;
  errorMessage = '';

  get description(): string {
    if (!this.book?.description) return 'Aucune description disponible.';
    if (typeof this.book.description === 'string') return this.book.description;
    return this.book.description.value || 'Aucune description disponible.';
  }

  get coverUrl(): string {
    return this.coverId
      ? this.bookService.getCoverUrl(this.coverId, 'L')
      : 'no-cover.png';
  }

  get isFavorite(): boolean {
    return this.favoritesService.isFavorite(`/works/${this.workId}`);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.onerror = null;
    img.src = 'no-cover.png';
  }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$),
      switchMap(params => {
        this.workId = params['id'];
        this.isLoading = true;
        this.errorMessage = '';
        return this.bookService.getBookDetail(this.workId).pipe(
          catchError(err => { this.errorMessage = err.message; this.isLoading = false; return of(null); })
        );
      }),
      switchMap(book => {
        if (!book) return of({ book: null, authors: [] });
        this.book = book;

        if (book.covers) { this.coverId = (book as any).covers[0]; }

        const authorRequests = (book.authors || []).slice(0, 3).map(a =>
          this.bookService.getAuthor(a.author.key).pipe(catchError(() => of(null)))
        );
        return forkJoin(authorRequests.length ? authorRequests : [of(null)]).pipe(
          switchMap(authors => of({ book, authors: authors.filter(Boolean) as Author[] }))
        );
      })
    ).subscribe({
      next: ({ book, authors }) => {
        if (book) {
          this.authors = authors;
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  toggleFavorite(): void {
    if (!this.book) return;
    const bookAsBook: Book = {
      key: `/works/${this.workId}`,
      title: this.book.title,
      cover_i: this.coverId || undefined,
    };
    this.favoritesService.toggleFavorite(bookAsBook);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}