import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  template: `
    <div class="alert alert-danger d-flex align-items-center gap-2" role="alert">
      <i class="bi bi-exclamation-triangle-fill fs-5"></i>
      <div>
        <strong>Une erreur est survenue</strong><br>
        <span>{{ message }}</span>
      </div>
    </div>
  `
})
export class ErrorMessageComponent {
  @Input() message: string = 'Erreur inconnue. Veuillez réessayer.';
}