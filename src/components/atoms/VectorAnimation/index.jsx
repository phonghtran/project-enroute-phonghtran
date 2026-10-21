import React, { Component } from "react";

class VectorAnimation extends Component {
  totalNodes = 50;
  movement = 5;
  dotRadius = 5;
  vectorNodes = [];

  endAngle = Math.PI + (Math.PI * 3) / 2; // End point on circle

  componentDidMount() {
    for (var i = 0; i < this.totalNodes; i++) {
      let relationships = [];

      const randomLines = Math.floor(Math.random() * 2) + 1;

      for (var j = 0; j < randomLines; j++) {
        relationships.push(Math.floor(Math.random() * this.totalNodes));
      }

      this.vectorNodes.push({
        location: {
          x:
            Math.floor(Math.random() * window.innerWidth * 0.8) +
            window.innerWidth * 0.25,
          y:
            Math.floor(Math.random() * window.innerHeight * 0.8) -
            window.innerHeight * 0.15,
        },
        relationships: relationships,
      });
    }

    this.renderGraph();
    window.addEventListener("resize", this.renderGraph);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.renderGraph);
  }

  renderGraph = () => {
    var canvas = document.getElementById("vectorAnimation__canvas");

    //scale the canvas
    canvas.setAttribute("height", window.innerHeight);
    canvas.setAttribute("width", window.innerWidth);

    if (canvas.getContext) {
      var ctx = canvas.getContext("2d");

      ctx.beginPath();
      for (var i = 0; i < this.totalNodes; i++) {
        const x = this.vectorNodes[i]["location"]["x"];
        const y = this.vectorNodes[i]["location"]["y"];

        ctx.beginPath();
        ctx.arc(x, y, this.dotRadius, 0, this.endAngle);
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.fill();

        // Random lines

        for (var j = 0; j < this.vectorNodes[i]["relationships"].length; j++) {
          const randomNode = this.vectorNodes[i]["relationships"][j];
          const x2 = this.vectorNodes[randomNode]["location"]["x"];
          const y2 = this.vectorNodes[randomNode]["location"]["y"];

          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = "rgba(255, 255, 255, 1)";
          ctx.stroke();
        }
      } // for loop nodes
    } // if there's context
  };

  render() {
    return (
      <div className="vectorAnimation">
        <canvas
          className="vectorAnimation__canvas"
          id="vectorAnimation__canvas"
        ></canvas>
      </div>
    );
  }
}

export default VectorAnimation;
