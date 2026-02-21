import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SearchResponse } from '../../models/search-response.model';
import { BookDetail, Author } from '../../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private http = inject(HttpClient);
  private baseUrl = 'https://openlibrary.org';

  search(query: string, page: number = 1, limit: number = 20): Observable<SearchResponse> {
    const params = new HttpParams()
      .set('q', query)
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('fields', 'key,title,author_name,cover_i,first_publish_year,subject,publisher,isbn,language,number_of_pages_median');

    return this.http.get<SearchResponse>(`${this.baseUrl}/search.json`, { params }).pipe(
      catchError(err => throwError(() => new Error('Erreur lors de la recherche : ' + err.message)))
    );
  }

  getBookDetail(workId: string): Observable<BookDetail> {
    return this.http.get<BookDetail>(`${this.baseUrl}/works/${workId}.json`).pipe(
      catchError(err => throwError(() => new Error('Erreur lors du chargement du livre : ' + err.message)))
    );
  }

  getAuthor(authorKey: string): Observable<Author> {
    return this.http.get<Author>(`${this.baseUrl}${authorKey}.json`).pipe(
      catchError(err => throwError(() => new Error('Erreur lors du chargement de l\'auteur : ' + err.message)))
    );
  }

  getCoverUrl(coverId: number, size: 'S' | 'M' | 'L' = 'M'): string {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  }
}
