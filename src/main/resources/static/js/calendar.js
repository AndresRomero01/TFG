/* Copyright (c) 2023 by Paul Navasard (https://codepen.io/peanav/pen/DmZEEp)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

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
    //  translateDays();

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
      left.addEventListener('click', function() { self.prevMonth(); /*translateMonth()*/});

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
    console.log("class list: "+ outer.classList);
    if(!outer.classList.contains('other'))
    {
      outer.addEventListener('click', function() {
        //TODO listener de un day
        console.log("dia pulsado");
        self.dayPressed(this);
        //ejemplo de obtener datos en la funcion openDay
        //self.openDay(this);
      });

    }
   

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

 /*  Calendar.prototype.drawEvents = function(day, element) {
    if(day.month() === this.current.month()) {
      var todaysEvents = this.events.reduce(function(memo, ev) {
        if(ev.date.isSame(day, 'day')) {
          memo.push(ev);
        }
        return memo;
      }, []);

      todaysEvents.forEach(function(ev) {
        var evSpan = createElement('span', ev.color);
        element.appendChild(evSpan);
      });
    }
  } */

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

  /* Calendar.prototype.openDay = function(el) {
    var details, arrow;
    var dayNumber = +el.querySelectorAll('.day-number')[0].innerText || +el.querySelectorAll('.day-number')[0].textContent;
    var day = this.current.clone().date(dayNumber);

    var currentOpened = document.querySelector('.details');

    //Check to see if there is an open detais box on the current row
    if(currentOpened && currentOpened.parentNode === el.parentNode) {
      details = currentOpened;
      arrow = document.querySelector('.arrow');
    } else {
      //Close the open events on differnt week row
      //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
      if(currentOpened) {
        currentOpened.addEventListener('webkitAnimationEnd', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('oanimationend', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('msAnimationEnd', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('animationend', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.className = 'details out';
      }

      //Create the Details Container
      details = createElement('div', 'details in');

      //Create the arrow
      var arrow = createElement('div', 'arrow');

      //Create the event wrapper

      details.appendChild(arrow);
      el.parentNode.appendChild(details);
    }

    var todaysEvents = this.events.reduce(function(memo, ev) {
      if(ev.date.isSame(day, 'day')) {
        memo.push(ev);
      }
      return memo;
    }, []);

    this.renderEvents(todaysEvents, details);

    arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + 27 + 'px';
  } */

 /*  Calendar.prototype.renderEvents = function(events, ele) {
    //Remove any events in the current details element
    var currentWrapper = ele.querySelector('.events');
    var wrapper = createElement('div', 'events in' + (currentWrapper ? ' new' : ''));

    events.forEach(function(ev) {
      var div = createElement('div', 'event');
      var square = createElement('div', 'event-category ' + ev.color);
      var span = createElement('span', '', ev.eventName);

      div.appendChild(square);
      div.appendChild(span);
      wrapper.appendChild(div);
    });

    if(!events.length) {
      var div = createElement('div', 'event empty');
      var span = createElement('span', '', 'No Events');

      div.appendChild(span);
      wrapper.appendChild(div);
    }

    if(currentWrapper) {
      currentWrapper.className = 'events out';
      currentWrapper.addEventListener('webkitAnimationEnd', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('oanimationend', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('msAnimationEnd', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('animationend', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
    } else {
      ele.appendChild(wrapper);
    }
  } */

  /* Calendar.prototype.drawLegend = function() {
    var legend = createElement('div', 'legend');
    var calendars = this.events.map(function(e) {
      return e.calendar + '|' + e.color;
    }).reduce(function(memo, e) {
      if(memo.indexOf(e) === -1) {
        memo.push(e);
      }
      return memo;
    }, []).forEach(function(e) {
      var parts = e.split('|');
      var entry = createElement('span', 'entry ' +  parts[1], parts[0]);
      legend.appendChild(entry);
    });
    this.el.appendChild(legend);
  } */

Calendar.prototype.dayPressed = function (day)
{
  var dayNumber = +day.querySelectorAll('.day-number')[0].innerText || +day.querySelectorAll('.day-number')[0].textContent;
  console.log(dayNumber);

  var olderSelected = document.querySelector(".selectedDay")
  if(olderSelected != null)
    olderSelected.classList.remove("selectedDay");

  var dayNumberDiv = day.querySelector(".day-number");
  dayNumberDiv.classList.add("selectedDay");
  
  console.log("div " +dayNumberDiv);
  console.log("div older " +olderSelected);

  var day2 = this.current.clone().date(dayNumber);
  console.log("mes: "+ day2.month());//Detecta el mes que se esta mostrando, pero si el dia no es de ese mes, no da su valor correcto
  console.log("dia pulsado: "+ dayNumber +" " +  document.querySelector("#calendar .header h1").innerHTML);
  dateConstructor(dayNumber, document.querySelector("#calendar .header h1").innerHTML);
}

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


/* function translate(){ */
 /*  var elem = document.querySelector("#calendar .header h1");
  console.log(elem);
  console.log(elem.innerHTML);
  translateMonth(elem); */
  //elem.innerHTML ="Marzo";
/*   } */

//translateMonth();

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
          console.log(nodeList[i]);
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
          console.log(nodeList[i]);
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
if(w <=600)
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

function dateConstructor(dayNumber, MonthYear)
{
  var dateStr;
 // const d = new Date("2022-03-25");
 var year;
 var month;

/*  if(dayNumber.length == 1)
    dayNumber = '0'+dayNumber; */

 var aux = MonthYear.split(" ");

 if(aux.length < 2)
 {
      console.log("Mal input para el dateConstructor");
      return null;
 }
  year = aux[1];
  //TODO coger asi el mes no vale, ya que hay dias de meses pasados y siguientes
  //Sol1: poner solo listener a days que no tengan la clase other
  //Sol2: ver si en el objeto day hay alguna forma de saber su mes y anio
  month = ESMonthToNumberStr(aux[0]);
  dateStr = year +"-"+month+"-"+dayNumber;
  var d = new Date(dateStr);
  console.log(d);
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








// document.addEventListener('DOMContentLoaded', translate());
