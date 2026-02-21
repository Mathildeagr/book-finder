import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  template: `
    <div class="d-flex justify-content-center align-items-center py-5">
      <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Chargement...</span>
      </div>
      <span class="ms-3 fs-5 text-muted">Chargement...</span>
    </div>
  `
})
export class LoaderComponent {}