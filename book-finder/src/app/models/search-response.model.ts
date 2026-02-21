import { Book } from './book.model';

export interface SearchResponse {
  numFound: number;
  start: number;
  docs: Book[];
}