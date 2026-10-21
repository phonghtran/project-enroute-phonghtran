import React, { Component } from "react";
import VectorAnimation from "../../atoms/VectorAnimation";

class BackgroundFullBleed extends Component {
  render() {
    const styles = {
      backgroundImage: `url(${this.props.imageURL})`,
    };

    return (
      <div className="backgroundFullBleed" style={styles}>
        <VectorAnimation />
      </div>
    );
  }
}

export default BackgroundFullBleed;
