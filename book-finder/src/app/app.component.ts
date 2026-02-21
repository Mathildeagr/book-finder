import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar />
    <main class="container py-4">
      <router-outlet />
    </main>
    <footer class="bg-dark text-white text-center py-3 mt-5">
      <small><i class="bi bi-book me-1"></i>BookFinder — Powered by <a href="https://openlibrary.org" target="_blank" class="text-warning">OpenLibrary</a></small>
    </footer>
  `
})
export class AppComponent {}