import React, { Component } from "react";

class MetaList extends Component {
  render() {
    return (
      <span>
        {this.props.meta.map((tag) => {
          return <span key={tag.name}>{tag.value} </span>;
        })}
      </span>
    );
  }
}

export default MetaList;
