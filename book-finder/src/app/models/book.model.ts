export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  subject?: string[];
  publisher?: string[];
  isbn?: string[];
  language?: string[];
  number_of_pages_median?: number;
}

export interface BookDetail {
  key: string;
  title: string;
  description?: string | { value: string };
  subjects?: string[];
  subject_places?: string[];
  subject_times?: string[];
  created?: { value: string };
  authors?: { author: { key: string } }[];
}

export interface Author {
  key: string;
  name: string;
  bio?: string | { value: string };
  birth_date?: string;
  death_date?: string;
  photos?: number[];
}

export interface Favorite {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  addedAt: Date;
}