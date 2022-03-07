import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  deg:number = 6; 

  hr:any;

  mn:any;

  sc:any;

  constructor() {
   }

  ngOnInit(): void {
    this.hr = document.getElementById('hr');
    this.mn = document.getElementById('mn');
    this.sc = document.getElementById('sc');
    setInterval(() => {
      let hh,mm,ss,msec;
      let day = new Date();
      hh = day.getHours() * 30;
      mm = day.getMinutes() * this.deg;
      ss = day.getSeconds() * this.deg;
      msec = day.getMilliseconds();
      this.hr.style.transform = `rotateZ(${(hh) + (mm / 12)}deg)`;
      this.mn.style.transform = `rotateZ(${mm}deg)`;
      this.sc.style.transform = `rotateZ(${ss}deg)`;
  
},100);
}
}
