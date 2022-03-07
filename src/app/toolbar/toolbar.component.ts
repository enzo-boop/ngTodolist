import { Component, OnInit } from '@angular/core';
import Task from 'src/models/interfaces';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  idCount:number=0;

  panelOpenState: boolean = false;

  Tasks: Array<Task> = [];

  time:string = '00:00';

  removeAll() {
    this.Tasks = [];
  }

  addTask() {
    let task: Task = { id:this.idCount, body: 'new task', time: 'time', done: false };
    this.idCount++;
    this.Tasks.push(task);
    let index = this.Tasks.length-1;
    //animation with opacity
    setTimeout(() => { (<HTMLElement>document.getElementsByClassName('card')[index]).setAttribute('style', 'opacity:1') },10);
  }

  deleteTask(id: number) {
    let targetTask = this.Tasks.filter((elem) => { return elem.id === id })[0]!;
    targetTask ?? null;
    targetTask !== null ? this.Tasks = this.Tasks.filter((elem) => { return elem.id !== id }) : console.warn('no task to delete found..');
  }

  editTask(changes: any) {
    let targetTask = this.Tasks.filter((elem) => { return elem.id === changes.id })[0]!;
    targetTask ?? null;
    targetTask !== null ? this.Tasks.map((elem) => { elem.id === changes.id ? elem.body = changes.body : null }) : console.warn('no task to edit found..');
  }

  checkTask(data:any) {
    let targetTask = this.Tasks[data.index];
    targetTask ?? null;
    targetTask !== null ? this.Tasks.map((elem) => {elem.id === data.id ? elem.done = !elem.done : null }) : console.warn('no task to do found...');
    //animation for check icon
    if (targetTask.done === true) {
      (<HTMLElement>document.getElementsByClassName('card')[data.index]).setAttribute('style', 'background:green;opacity:1;');
      setTimeout(() => { (<HTMLElement>document.getElementsByClassName('card')[data.index]).children[2].setAttribute('style', 'animation:appear 1 0.3s') },10);
    }
    else
      (<HTMLElement>document.getElementsByClassName('card')[data.index]).setAttribute('style', 'background:unherit;opacity:1;');
  }

  addTaskTime(ev:any){
    this.Tasks.map((elem)=>{elem.id===ev.id?elem.time=ev.time:null});
  }

  countDoneTasks(): number {
    let doneTasks = this.Tasks.filter((elem) => { return elem.done === true }).length;
    return doneTasks
  }

  clock(){
    let date = new Date;
    this.time=date.toLocaleTimeString().slice(0,5);
  }

  constructor() {
    setInterval(()=>{this.clock()},500);
   }

  ngOnInit(): void {
  }

}
