import React, { Component } from "react";

class Course extends Component {
  state = {
    name: "",
    desc: "",
    isFree: false,
    cat: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      isFree: props.isFree,
      desc: props.desc
    };
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <h1>{this.state.isFree}</h1>
        <h1>{this.state.desc}</h1>
      </div>
    );
  }
}

export default Course;
