import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  features = [
    { icon: 'bi-search', title: 'Recherche avancée', desc: 'Trouvez n\'importe quel livre parmi des millions de titres.' },
    { icon: 'bi-star-fill', title: 'Favoris', desc: 'Sauvegardez vos livres préférés pour les retrouver facilement.' },
    { icon: 'bi-book', title: 'Détail complet', desc: 'Accédez à toutes les informations d\'un livre en un clic.' }
  ];
}