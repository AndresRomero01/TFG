/* Copyright (c) 2023 by Paul Navasard (https://codepen.io/peanav/pen/DmZEEp)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

var selectedDay = new Date();
var selectedDayStr = "";

//TODO hacer un patron listener, guardando lista de quienes estan interesados en conocer los cambios
//y que se suscriban mendiante una funcion definida aqui que les añada al array.
//Cuando se cambie de mes se avisara a los otros scripts 
var auxCurrentDate = new Date();
//otra opcion, incluir en los scripts algun evento tipo onchange sobre el calendario para que ahi ya ellos se actualicen



!function() {

  var today = moment();

  function Calendar(selector, events) {
    this.el = document.querySelector(selector);
    this.events = events;
    this.current = moment().date(1);
    this.draw();
    var current = document.querySelector('.today');
    if(current) {
      var self = this;
      window.setTimeout(function() {
        //self.openDay(current);
      }, 500);
    }

    
  }

  Calendar.prototype.draw = function() {
    //Create Header
    this.drawHeader();

    //Draw Month
    this.drawMonth();

 //   this.drawLegend();

//Custom code after Drawing
      translateMonth();


  }

  Calendar.prototype.drawHeader = function() {
    var self = this;
    if(!this.header) {
      //Create the header elements
      this.header = createElement('div', 'header');
      this.header.className = 'header';

      this.title = createElement('h1');

      var right = createElement('div', 'right');
      right.addEventListener('click', function() { self.nextMonth();/* translateMonth()*/});

       var left = createElement('div', 'left');
      left.addEventListener('click', function() { self.prevMonth();}); 

      //Append the Elements
      this.header.appendChild(this.title); 
      this.header.appendChild(right);
      this.header.appendChild(left);
      this.el.appendChild(this.header);
    }

    this.title.innerHTML = this.current.format('MMMM YYYY');
  }

  Calendar.prototype.drawMonth = function() {
    var self = this;
    
    //aleat generation of events
      this.events.forEach(function(ev) {
     ev.date = self.current.clone().date(1);
    });  
    
    
    if(this.month) {
      this.oldMonth = this.month;
      this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
      this.oldMonth.addEventListener('webkitAnimationEnd', function() {
        self.oldMonth.parentNode.removeChild(self.oldMonth);
        self.month = createElement('div', 'month');
        self.backFill();
        self.currentMonth();
        self.fowardFill();
        self.el.appendChild(self.month);
        window.setTimeout(function() {
          self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
        }, 16);
      });
    } else {
        this.month = createElement('div', 'month');
        this.el.appendChild(this.month);
        this.backFill();
        this.currentMonth();
        this.fowardFill();
        this.month.className = 'month new';
    }
    console.log("draw month acabado");
  }

  Calendar.prototype.backFill = function() {
    var clone = this.current.clone();
    var dayOfWeek = clone.day();

    if(!dayOfWeek) { return; }

    clone.subtract('days', dayOfWeek+1);

    for(var i = dayOfWeek; i > 0 ; i--) {
      this.drawDay(clone.add('days', 1));
    }
  }

  Calendar.prototype.fowardFill = function() {
    var clone = this.current.clone().add('months', 1).subtract('days', 1);
    var dayOfWeek = clone.day();

    if(dayOfWeek === 6) { return; }

    

    for(var i = dayOfWeek; i < 6 ; i++) {
      this.drawDay(clone.add('days', 1));
    }
  }

  Calendar.prototype.currentMonth = function() {
    var clone = this.current.clone();

    while(clone.month() === this.current.month()) {   
          this.drawDay(clone);
          clone.add('days', 1);
        
    }
  }

  Calendar.prototype.getWeek = function(day) {
    if(!this.week || day.day() === 0) {
      this.week = createElement('div', 'week row');
      this.month.appendChild(this.week);
    }
  }

  Calendar.prototype.drawDay = function(day) {
    var self = this;
    this.getWeek(day);

    //Outer Day
    var outer = createElement('div', this.getDayClass(day));
     
    //Ya no es necesario controlar desde aqui el evento clickable de cada dia, ahora se hace desde
    //calendarExtra.js tras haber pintado el calendario


    /*  if(!outer.classList.contains('other'))
    {
          
      console.log("day poniendo listener " + day)
       outer.addEventListener('click', function() {
        //TODO listener de un day
        //console.log("dia pulsado");
      // var dayNumber = +day.querySelectorAll('.day-number')[0].innerText || +day.querySelectorAll('.day-number')[0].textContent;
        
        if(dayNumber > auxCurrentDate.getDay())
          self.dayPressed(this);
        //ejemplo de obtener datos en la funcion openDay
        //self.openDay(this);
      });  

    }  */
   

    //Day Name
    var translatedName = transalateOneDay(day.format('ddd'));
    //var name = createElement('div', 'day-name', day.format('ddd'));
    var name = createElement('div', 'day-name', translatedName);
    //var name = translatedName;

    //Day Number
    var number = createElement('div', 'day-number', day.format('DD'));


    //Events
   // var events = createElement('div', 'day-events');
   // this.drawEvents(day, events);

    outer.appendChild(name);
    outer.appendChild(number);
   // outer.appendChild(events);
    this.week.appendChild(outer);
  }


  Calendar.prototype.getDayClass = function(day) {
    classes = ['day'];
    if(day.month() !== this.current.month()) {
      classes.push('other');
    } else if (today.isSame(day, 'day')) {
      classes.push('today');
    }
    
    
    classes.push('col');
    return classes.join(' ');
  }

  

/* Calendar.prototype.dayPressed = function (day)
{
  var dayNumber = +day.querySelectorAll('.day-number')[0].innerText || +day.querySelectorAll('.day-number')[0].textContent;
 // console.log(dayNumber);

  var olderSelected = document.querySelector(".selectedDay")
  if(olderSelected != null)
    olderSelected.classList.remove("selectedDay");

  var dayNumberDiv = day.querySelector(".day-number");
  dayNumberDiv.classList.add("selectedDay");
  


  //selectedDay = dateConstructor(dayNumber, document.querySelector("#calendar .header h1").innerHTML);
  selectedDayStr = dateStringFormat(dayNumber, document.querySelector("#calendar .header h1").innerHTML);
} */

  Calendar.prototype.nextMonth = function() {
    this.current.add('months', 1);
    this.next = true;
    this.draw();
  }

  Calendar.prototype.prevMonth = function() {
    this.current.subtract('months', 1);
    this.next = false;
    this.draw();
  }

  window.Calendar = Calendar;

  function createElement(tagName, className, innerText) {
    var ele = document.createElement(tagName);
    if(className) {
      ele.className = className;
    }
    if(innerText) {
      ele.innderText = ele.textContent = innerText;
    }
    return ele;
  }
}();

!function() {
  var data = [
  /*   { eventName: 'Lunch Meeting w/ Mark', calendar: 'Work', color: 'orange' },
    { eventName: 'Interview - Jr. Web Developer', calendar: 'Work', color: 'orange' },
    { eventName: 'Demo New App to the Board', calendar: 'Work', color: 'orange' },
    { eventName: 'Dinner w/ Marketing', calendar: 'Work', color: 'orange' },

    { eventName: 'Game vs Portalnd', calendar: 'Sports', color: 'blue' },
    { eventName: 'Game vs Houston', calendar: 'Sports', color: 'blue' },
    { eventName: 'Game vs Denver', calendar: 'Sports', color: 'blue' },
    { eventName: 'Game vs San Degio', calendar: 'Sports', color: 'blue' },

    { eventName: 'School Play', calendar: 'Kids', color: 'yellow' },
    { eventName: 'Parent/Teacher Conference', calendar: 'Kids', color: 'yellow' },
    { eventName: 'Pick up from Soccer Practice', calendar: 'Kids', color: 'yellow' },
    { eventName: 'Ice Cream Night', calendar: 'Kids', color: 'yellow' },

    { eventName: 'Free Tamale Night', calendar: 'Other', color: 'green' },
    { eventName: 'Bowling Team', calendar: 'Other', color: 'green' },
    { eventName: 'Teach Kids to Code', calendar: 'Other', color: 'green' },
    { eventName: 'Startup Weekend', calendar: 'Other', color: 'green' } */
  ];

  

  function addDate(ev) {
    
  }

  var calendar = new Calendar('#calendar', data);

}();


//translateMonth();

//esta llamada es solo util para el primer dibujado. en el resto, el cambio de informacion sobre dias no funciona
      //para ello se llama a dicha funcion desde el calendarExtra, para cuando se cambia de mes
      disableEnableDays();

function translateMonth()
{
  var month = document.querySelector("#calendar .header h1");
 let monthStr = month.innerHTML;
 console.log(monthStr)

 monthStr = monthStr.replace("January", "Enero");
 monthStr = monthStr.replace("February", "Febrero");
 monthStr = monthStr.replace("March", "Marzo");
 monthStr = monthStr.replace("April", "Abril");
 monthStr = monthStr.replace("May", "Mayo");
 monthStr = monthStr.replace("June", "Junio");
 monthStr = monthStr.replace("July", "Julio");
 monthStr = monthStr.replace("August", "Agosto");
 monthStr = monthStr.replace("September", "Septiembre");
 monthStr = monthStr.replace("October", "Octubre");
 monthStr = monthStr.replace("November", "Noviembre");
 monthStr = monthStr.replace("December", "Diciembre");
 

 month.innerHTML = monthStr;
}


function translateDays()
{
  let nodeList = document.querySelectorAll(".day-name");

  var w = window.innerWidth;
  if(w <=600)
  {
      for (let i = 0; i < nodeList.length; i++) {
          //console.log(nodeList[i]);
          let dayStr = nodeList[i].innerHTML;
          
          dayStr = dayStr.replace("Mon", "L");
          dayStr = dayStr.replace("Tue", "M");
          dayStr = dayStr.replace("Wed", "X");
          dayStr = dayStr.replace("Thu", "J");
          dayStr = dayStr.replace("Fri", "V");
          dayStr = dayStr.replace("Sat", "S");
          dayStr = dayStr.replace("Sun", "D");
          nodeList[i].innerHTML = dayStr;
      }
  }
  else{
      for (let i = 0; i < nodeList.length; i++) {
         // console.log(nodeList[i]);
          let dayStr = nodeList[i].innerHTML;
          
          dayStr = dayStr.replace("Mon", "Lunes");
          dayStr = dayStr.replace("Tue", "Martes");
          dayStr = dayStr.replace("Wed", "Miercoles");
          dayStr = dayStr.replace("Thu", "Jueves");
          dayStr = dayStr.replace("Fri", "Viernes");
          dayStr = dayStr.replace("Sat", "Sabado");
          dayStr = dayStr.replace("Sun", "Domingo");
          nodeList[i].innerHTML = dayStr;
      }
  }
  nodeList = [];

}

function transalateOneDay(dayStr)
{
var w = window.innerWidth;
if(w <=740)
{
  dayStr = dayStr.replace("Mon", "L");
  dayStr = dayStr.replace("Tue", "M");
  dayStr = dayStr.replace("Wed", "X");
  dayStr = dayStr.replace("Thu", "J");
  dayStr = dayStr.replace("Fri", "V");
  dayStr = dayStr.replace("Sat", "S");
  dayStr = dayStr.replace("Sun", "D");
}
else{
  dayStr = dayStr.replace("Mon", "Lunes");
  dayStr = dayStr.replace("Tue", "Martes");
  dayStr = dayStr.replace("Wed", "Miercoles");
  dayStr = dayStr.replace("Thu", "Jueves");
  dayStr = dayStr.replace("Fri", "Viernes");
  dayStr = dayStr.replace("Sat", "Sabado");
  dayStr = dayStr.replace("Sun", "Domingo");
}
          
return dayStr;
}

/**
 * 
 * @returns Devuelve la fecha seleccionada como objeto Date
 */
function getSelectedDay(){
  return selectedDay;
}

/**
 * 
 * @returns Devuelve la fecha seleccionada con el formato year-month-day en un string 
 */
function getSelectedDayStr(){
  return selectedDayStr;
}

function dateStringFormat(dayNumber, MonthYear)
{
  var dateStr;
 // const d = new Date("2022-03-25");
 var year;
 var month;

  dayNumber = ""+dayNumber;

  if(dayNumber.length == 1)
  {
    dayNumber = '0'+dayNumber; 
  }
    
  var aux = MonthYear.split(" ");

  if(aux.length < 2)
  {
      console.log("Mal input para el dateConstructor");
      return null;
  }

  year = aux[1];
  
  month = ESMonthToNumberStr(aux[0]);//Como solo los dias del mes actual son clickables, basta con coger el mes mostrado en el header
  dateStr = year +"-"+month+"-"+dayNumber;
  return dateStr;
}

function dateConstructor(dayNumber, MonthYear)
{
  dateStr = dateStringFormat(dayNumber, MonthYear);
  var d = new Date(dateStr);
  //console.log(d);
  return d;
}



function ESMonthToNumberStr(ESmonth)
{
  switch (ESmonth) {
      case "Enero":
          return "01"
          break;
      case "Febrero":
          return "02"
          break;
      case "Marzo":
          return "03"
          break;
      case "Abril":
          return "04"
          break;
      case "Mayo":
          return "05"
          break;
      case "Junio":
          return "06"
          break;
      case "Julio":
          return "07"
          break;
      case "Agosto":
          return "08"
          break;
      case "Septiembre":
          return "09"
          break;
      case "Octubre":
          return "10"
          break;
      case "Noviembre":
          return "11"
          break;
      case "Diciembre":
          return "12"
          break;
      default:
          break;
  }
}

/**
 * Prepara los dias con funcionamiento basico de seleccion en el calendario
 * Pone como clickables los dias posteriores al actual, asociando al click la funcion
 * que actauliza el dia actual seleccionado y el aspecto visual de seleccion
 */
function disableEnableDays()
{
  
    let days = document.querySelectorAll(".day");

    for(let i = 0; i < days.length; i++)
    {
     // console.log("day: " + days[i] + "day number: " + days[i].querySelector(".day-number").innerHTML);
    
 
      if(!days[i].classList.contains('other'))
      {
          let monthYear = document.querySelector(".header h1").innerHTML.split(" ");
          let monthNumber =  ESMonthToNumberStr(monthYear[0]);
          let yearNumber = parseInt(monthYear[1])

          //console.log("year "+ yearNumber + " month: "+ monthNumber);
          //console.log("current year "+ auxCurrentDate.getFullYear() + " current month: "+ (auxCurrentDate.getMonth()+1));

          //si msotrando un anio anterior, todo disabled
          if(yearNumber < auxCurrentDate.getFullYear())
          {
            days[i].classList.add("prev")
            //console.log("anterior year")
          }
            
            //si mostrando un mes anterior del mismo anio, todo disabled
          else if(yearNumber == auxCurrentDate.getFullYear() && monthNumber < auxCurrentDate.getMonth()+1)
          {
            days[i].classList.add("prev")
            //console.log("anterior mes")
          }
            
            //Si mismo mes y anio, solo quitar los dias anteriores al actual
          else if (yearNumber == auxCurrentDate.getFullYear() && monthNumber == auxCurrentDate.getMonth()+1){
              var dayNumber = +days[i].querySelectorAll('.day-number')[0].innerText || +days[i].querySelectorAll('.day-number')[0].textContent;
        
              if(dayNumber < auxCurrentDate.getDate())
                days[i].classList.add("prev")
              else 
              {
                days[i].addEventListener('click', function() {
                    self.dayPressed2(days[i]);
                }); 
          }
        }
        else{//anio y mes superior, todo enabled
          //console.log("futuro")
            days[i].addEventListener('click', function() {         
                self.dayPressed2(days[i]);
          }); 

          }
  
      } 
    }

}


  /**
   * Gestiona los eventos basicos del calendario cuando se ha pulsado un dia clickable
   * siendo estos cambiar la variable con el dia actual y mostrar cual es el dia seleccionado
   */
function dayPressed2(parentDiv)
{
  var dayNumber2 = +parentDiv.querySelectorAll('.day-number')[0].innerText || +parentDiv.querySelectorAll('.day-number')[0].textContent;
 // console.log(dayNumber);

  var olderSelected = document.querySelector(".selectedDay")
  if(olderSelected != null)
    olderSelected.classList.remove("selectedDay");

  var dayNumberDiv = parentDiv.querySelector(".day-number");
  dayNumberDiv.classList.add("selectedDay");
  
  //selectedDay = dateConstructor(dayNumber, document.querySelector("#calendar .header h1").innerHTML);
  selectedDayStr = dateStringFormat(dayNumber2, document.querySelector("#calendar .header h1").innerHTML);
}




// document.addEventListener('DOMContentLoaded', translate());
