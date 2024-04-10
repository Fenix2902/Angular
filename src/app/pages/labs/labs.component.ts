import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Bienvenidos a mi primera aplicaciòn con angular';
  tasks = signal([
    'instalar el angular CLI',
    'Crear Proyecto',
    'Crear componentes',
    'Crear Servicio',
  ]);
  name = signal('Nicolas')
  age = 18;
  disable = true
  img = 'https://w3schools.com/howto/img_avatar.png'

  persona = signal({
    name: 'nicolas',
    age: 19,
    avatar: 'https://w3schools.com/howto/img_avatar.png'
  })
  //renderizar se usa {{}}
  //Para  acceder al atributo de un objeto  en ts debemos usar []
  // metodo de la clase se usa ()
  clickHandler() {
    alert('hola')
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keydownHandler(event:KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value)
  }
}
