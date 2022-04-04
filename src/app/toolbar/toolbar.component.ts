import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators, FormControl} from '@angular/forms';
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
    if(this.contentForm.errors===null&&this.contentForm.dirty===true){
    let task: Task = { id:this.idCount, body: this.contentForm.controls['content'].value, time: 'time', done: false };
    this.contentForm.reset();
    this.idCount++;
    this.Tasks.push(task);
    let index = this.Tasks.length-1;
    //animation with opacity
    setTimeout(() => { (<HTMLElement>document.getElementsByClassName('card')[index]).setAttribute('style', 'opacity:1') },10);
    }
    else{
      console.warn('invalid task content');
    }
  }

  deleteTask(id: number) {
    let targetTask = this.Tasks.filter((elem) => { return elem.id === id })[0]!;
    targetTask ?? null;
    targetTask !== null ? this.Tasks = this.Tasks.filter((elem) => { return elem.id !== id }) : console.warn('no task to delete found..');
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

  contentForm:FormGroup;

  constructor(private fb:FormBuilder) {
    this.contentForm = fb.group({
      content:new FormControl('',Validators['required']),
    })
    setInterval(()=>{this.clock()},500);
   }

  ngOnInit(): void {
  }

}
