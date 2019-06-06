import React from "react";

class Button extends React.Component {
  render() {
    return (
      <div className="buttonBlock">
        <button id="clear" onClick={this.props.handleClear}>
          AC
        </button>
        <button
          id="add"
          value="+"
          className="operation"
          onClick={this.props.operator}
        >
          +
        </button>
        <button
          id="subtract"
          value="-"
          className="operation"
          onClick={this.props.operator}
        >
          -
        </button>
        <button id="one" value="1" onClick={this.props.number}>
          1
        </button>
        <button id="two" value="2" onClick={this.props.number}>
          2
        </button>
        <button id="three" value="3" onClick={this.props.number}>
          3
        </button>
        <button
          id="multiply"
          value="⋅"
          className="operation"
          onClick={this.props.operator}
        >
          x
        </button>
        <button id="four" value="4" onClick={this.props.number}>
          4
        </button>
        <button id="five" value="5" onClick={this.props.number}>
          5
        </button>
        <button id="six" value="6" onClick={this.props.number}>
          6
        </button>
        <button
          id="divide"
          value="/"
          className="operation"
          onClick={this.props.operator}
        >
          /
        </button>
        <div className="specialBlock">
          <button id="seven" value="7" onClick={this.props.number}>
            7
          </button>
          <button id="eight" value="8" onClick={this.props.number}>
            8
          </button>
          <button id="nine" value="9" onClick={this.props.number}>
            9
          </button>
          <button
            id="equals"
            value="="
            className="operation"
            onClick={this.props.evaluation}
          >
            =
          </button>
          <button id="zero" value="0" onClick={this.props.zero}>
            0
          </button>
          <button id="decimal" value="." onClick={this.props.decimal}>
            .
          </button>
        </div>
      </div>
    );
  }
}

export default Button;
