import React, { Component } from "react";
import '../css/Course.css';

class Course extends Component {
  state = {
    name: "",
    desc: "",
    isFree: false,
    cat: 0, // las cat empiezan por id 1 en la BD pq las he metido a mano, pero y si se meten con id automatico?
  };

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      isFree: props.isFree,
      desc: props.desc,
      cat: props.cat
    };
  }

  render() {
    return (
      <div className="border col-md-3 d-inline-block divCurso">
        <div className="divImagen mx-auto">
          Aqui ira la imagen
        </div>
        <div className="divCourseInfo " align="center">
          <h1 className="">{this.state.name}</h1>
          <p>Is free? {this.state.isFree}</p>
          <p>{this.state.desc}</p>
          <p>Categoria: {this.state.cat}</p>
        </div>
      </div>
    );
  }
}

export default Course;
