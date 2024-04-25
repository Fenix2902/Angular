import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms'; // se utiliza para inputs
import { __values } from 'tslib';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css',
})
export class LabsComponent {
  welcome = 'Bienvenidos a mi primera aplicaciòn con angular';
  tasks = signal([
    'instalar el angular CLI',
    'Crear Proyecto',
    'Crear componentes',
    'Crear Servicio',
  ]);
  name = signal('nicolas');
  age = 18;
  disable = true;
  img = 'https://w3schools.com/howto/img_avatar.png';

  persona = signal({
    name: 'jorge',
    age: 17,
    avatar: 'https://w3schools.com/howto/img_avatar.png',
  });

  //Formulario reactivos

  colorCtrl = new FormControl();

  constructor(){
    this.colorCtrl.valueChanges.subscribe(value =>{
      console.log(`Nuevo valor ${value}`);
    })
  }//validacion en forma reactiva desde la lógica.

  //renderizar se usa {{}}
  //Para  acceder al atributo de un objeto  en ts debemos usar []
  // metodo de la clase se usa ()
  clickHandler() {
    alert('hola');
  }

  changeHandler(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.name.set(newValue);
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }

  changeAge(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    this.persona.update((newState) => {
      return { ...newState, age: parseInt(newValue) };
    });
  }
}
