import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PainelWord } from './components/painel-word/painel-word';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PainelWord],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('abnt-generate');

}
