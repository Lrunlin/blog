import React, { Component } from "react";
import "@/assets/scss/resume.scss";
import resume1 from "../assets/image/resume1.png";
import resume2 from "../assets/image/resume2.png";

class Resume extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div id="resume">
        <h2>2021/04/24</h2>
        <img src={resume2} alt="刘润霖简历图片"/>
        <h2>2020/10/24校招会</h2>
        <img src={resume1} alt="刘润霖简历图片" />
      </div>
    );
  }
}
export default Resume;
