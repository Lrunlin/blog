import React, { Component } from "react";
import "@/assets/scss/Foot.scss";
class Foot extends Component {
  render() {
    return (
      <footer id="foot">
        <p className="foot-writer">
          @2021-刘润霖的小站-
          <a href="https://beian.miit.gov.cn/" rel="noreferrer" target="_blank">
            辽ICP备2020014377号-2
          </a>
        </p>
      </footer>
    );
  }
}
export default Foot