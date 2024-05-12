import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  welcome = 'Hola Mundo';
  tasks = [
    'instalar el angular CLI',
    'Crear Proyecto',
    'Crear componentes'
  ]
}
