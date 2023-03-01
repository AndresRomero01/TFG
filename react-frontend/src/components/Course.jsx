import React, { Component } from 'react';

class Course extends Component {
    state = {  
        name: "",
        desc: "",
        isFree: false,
        cat: ""
    } 

    constructor(props){
        super(props);
        this.setState = {
          name: props.name,
          isFree: props.isFree,
          desc: props.desc
        }
      }

    render() { 
        return (<h1>Soy el comp Course</h1>);
    }
}
 
export default Course;