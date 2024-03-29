import { Component, signal } from '@angular/core';
import {CommonModule}from '@angular/common'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal([
    'instalar el angular CLI',
    'Crear Proyecto',
    'Crear componentes',
    'Crear Servicio',
  ]);
}
