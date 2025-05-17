import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavComponent} from './components/shared/nav/nav.component';
import {FooterComponent} from './components/shared/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AreebEventsFontend';
}
