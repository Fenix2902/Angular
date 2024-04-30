import { Component, Injector, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tasks } from './../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Tasks[]>([]);

  //Estadode filter

  filter = signal<'all'| 'Pending' | 'Completed'>('all');
  taskByFilter = computed(() => {
    const filter = this.filter();
    const task = this.tasks()
    if (filter === 'Pending') {
      return task.filter(task => !task.completed)
    }
    if (filter === 'Completed') {
      return task.filter(task => task.completed)
    }
    return task
})

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  });

  //LOCALSTORAGE
  constructor(){
    effect(()=>{
      const task = this.tasks()
      console.log(task)
      localStorage.setItem('tasks', JSON.stringify(task))
    })
  }

  injector = inject(Injector);

  ngOnInit(){
    const storage = localStorage.getItem( 'tasks' )
    if(storage){
      const tasks = JSON.parse(storage)
      this.tasks.set(tasks)
    }
    this.trackTasks()
  }

  trackTasks(){
    effect(()=>{
      const task = this.tasks()
      console.log(task)
      localStorage.setItem('tasks', JSON.stringify(task))
    },{injector: this.injector});
  }

  changeHandler() {
    //agregar tarea
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim(); //trim se utiliza para quitar espacios al inicio y al final de una palabra
      if (value !== '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]); //inserta la tarea
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) =>
      tasks.filter((tasks, position) => position !== index)
    );
  }

  updateTask(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            completed: !task.completed, //invierte el estado de la tarea
          };
        }
        return task;
      });
    });
  }
  updateTaskEditingMode(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            editing: true, //invierte el estado de la tarea
          };
        }
        return {
          ...task,
          editing: false
        };
      });
    });
  }

  updateTaskText(index: number, event: Event) {
    const input = event.target as HTMLInputElement;
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: input.value,
            editing: false
          };
        }
        return task;
      });
    });
  }

  changeFilter(filter: 'all'| 'Pending' | 'Completed') {
    this.filter.set(filter);
  }
}
