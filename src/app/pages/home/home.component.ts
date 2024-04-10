import { Component, signal } from '@angular/core';
import {CommonModule}from '@angular/common'
import{ Tasks }from './../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Tasks[]>([
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear componente',
      completed: false
    },
  ]);

  changeHandler(event: Event) {//agregar tarea
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
  }

  addTask(title: string){
    const newTask = {
      id:Date.now(),
      title,
      completed:false
    }
    this.tasks.update((tasks)=>[...tasks,newTask])//inserta la tarea
  }


  deleteTask(index: number){
    this.tasks.update((tasks)=>tasks.filter((tasks,position)=> position !== index))
  }

  updateTask(index: number){
    this.tasks.update((tasks)=>{
      return tasks.map((task,position)=>{
        if (position === index){
          return{
            ...task,
            completed: !task.completed //invierte el estado de la tarea
          }
        }
        return task;
      })
    })
  }
}
