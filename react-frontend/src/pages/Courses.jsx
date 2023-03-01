import React, { useEffect, useState } from 'react';
import Course from '../components/Course';

function Courses() {

    const [coursesList, setCoursesList] = useState(null);

    useEffect(() => {
        console.log("dentro de useEffect");
        fetch("api/getCoursesList", {})
        .then(res => res.json())
        .then(data => {
            console.log(data[0]);
            console.log("size: " + data.length);
            setCoursesList(data);
            data.forEach(e => {
                console.log("Nombre del curso: " + e["name"] + ", y el curso es: " + e["isFree"]);        
            })
        })
    }, [])
    

    return (
        <div>
            <h1>Hi, these are the private courses</h1>
            <h1>Adios, these are the private courses</h1>
            {<h1>{coursesList[0].name}</h1>}
            {/* <Course 
                name={coursesList[0].name }
                isFree={coursesList[0].isFree}
                desc={coursesList[0].desc}
            >
            </Course> */}
        </div>
    );
    
    
}

export default Courses;