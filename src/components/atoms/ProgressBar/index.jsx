import React, { Component } from "react";

class ProgressBar extends Component {
  render() {
    const styles = {
      width: `${this.props.value * 100}%`,
    };

    return (
      <div className="progressBar__container">
        <div className="progressBar__bar" style={styles}></div>
      </div>
    );
  }
}

export default ProgressBar;
