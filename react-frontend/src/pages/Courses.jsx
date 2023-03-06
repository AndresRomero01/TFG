import React, { useEffect, useState, Component } from 'react';
import Course from '../components/Course';
import '../css/Courses.css';

class Courses extends Component {

    constructor(props)
    {
        super(props);
        this.state = {
            courses: []
        }
    }

    componentDidMount(){

        fetch("api/getCoursesList", {})
        .then(res => res.json())
        .then(data => {
            console.log(data[0]);
            console.log("size: " + data.length);
            this.setState({courses: data});
            data.forEach(e => {
                console.log("Nombre del curso: " + e["name"] + ", y el curso es: " + e["isFree"] + " desc: " + e["description"]); 
                console.log("La cat es: " + e["category"].id);       
            })
        })
    } 
    
    render() {
        return (
            <div className='divCourses row'>
                {this.state.courses.map(e => 
                    <Course 
                        key={e.name} 
                        name={e.name}
                        isFree={e.isFree.toString()} // si no pongo toString, no aparece
                        desc={e.description}
                        cat={e.category.id}
                    ></Course>
                )}
            </div>
        );
    }
    
}

export default Courses;