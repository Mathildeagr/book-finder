import { Component, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { BookService } from '../../core/services/book.service';
import { Book } from '../../models/book.model';
import { BookCardComponent } from '../../shared/components/book-card/book-card.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, BookCardComponent, LoaderComponent, ErrorMessageComponent, DecimalPipe],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private bookService = inject(BookService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private destroy$ = new Subject<void>();

  searchForm!: FormGroup;
  books: Book[] = [];
  totalResults = 0;
  currentPage = 1;
  limit = 20;
  isLoading = false;
  errorMessage = '';
  hasSearched = false;

  get totalPages(): number {
    return Math.ceil(this.totalResults / this.limit);
  }

  get pages(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 2;
    const range: number[] = [];
    for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
      range.push(i);
    }
    return range;
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      query: ['', [Validators.required, Validators.minLength(2)]],
      sortBy: ['relevance']
    });

    // Lire le paramètre URL si présent
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(params => {
      if (params['q']) {
        this.searchForm.patchValue({ query: params['q'] });
        this.doSearch();
      }
    });
  }

  onSubmit(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }
    this.currentPage = 1;
    this.updateUrl();
    this.doSearch();
  }

  doSearch(): void {
    const { query } = this.searchForm.value;
    this.isLoading = true;
    this.errorMessage = '';
    this.hasSearched = true;

    this.bookService.search(query, this.currentPage, this.limit)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.books = res.docs;
          this.totalResults = res.numFound;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.errorMessage = err.message;
          this.isLoading = false;
          this.cdr.detectChanges();  
        }
      });
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.doSearch();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private updateUrl(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: this.searchForm.value.query },
      queryParamsHandling: 'merge'
    });
  }

  get queryControl() { return this.searchForm.get('query')!; }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}