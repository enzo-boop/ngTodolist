import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder,Validators,FormControl,FormGroup } from '@angular/forms';
import Task from 'src/models/interfaces';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss']
})
export class TodolistComponent implements OnInit {

  @Input() currentTasks: Array<Task> = [];

  @Output() Done: EventEmitter<any> = new EventEmitter<any>()

  @Output() Deleted: EventEmitter<number> = new EventEmitter<number>();

  @Output() Timed:EventEmitter<any>=new EventEmitter<any>();

  onDone(id: number, index: number) {
    let obj = { id: id, index: index };
    this.Done.emit(obj);
  }

  onDelete(id: number) {
    this.Deleted.emit(id);
  }

  taskTiming(id:number){
    let time=this.form.controls['time'].value;
    time ?? null;
    let obj={id:id,time:time}
    time!==null?this.Timed.emit(obj):null;
}

  form:FormGroup

  constructor(private fb:FormBuilder) { 
    this.form = fb.group({
      time:new FormControl(''),
    })
  }

  ngOnInit(): void {
  }

}
