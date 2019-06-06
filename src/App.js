import React from "react";
import "./App.css";
import Button from "./components/Button";
import Display from "./components/Display";
import Formula from "./components/Formula";

const isOperator = testSubject => /[+-/⋅]/.test(testSubject);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: "",
      display: "0",
      prevDis: "n/a",
      decimalPressed: false
    };
  }

  handleClear = () => {
    this.setState({
      formula: "",
      display: "0",
      prevDis: "n/a",
      decimalPressed: false
    });
  };

  handleZero = e => {
    //still some bugs with zeros, e.g. after operators, zeros can be repeatedly pushed
    this.setState({
      formula: this.state.formula.replace(/^0/, "") + e.target.value,
      display: this.state.display.replace(/^0/, "") + e.target.value,
      prevDis: e.target.value
    });
  };

  handleNumber = e => {
    this.setState({
      formula: this.state.formula + e.target.value,
      prevDis: e.target.value
    });
    !this.state.justEvaluated
      ? !isOperator(this.state.prevDis) || this.state.decimalPressed //if "=" hasn't been pressed or the decimal button has been pressed
        ? this.setState({
            // if last pressed button is an operator
            display: this.state.display + e.target.value
          })
        : this.setState({
            // if last pressed button isn't an operator
            display: e.target.value
          })
      : this.setState({
          // if "=" has been pressed
          formula: e.target.value,
          display: e.target.value,
          justEvaluated: false
        });
  };

  handleOperator = e => {
    this.setState({
      display: e.target.value,
      prevDis: e.target.value,
      decimalPressed: false
    });
    !this.state.justEvaluated
      ? !isOperator(this.state.prevDis)
        ? this.setState({
            formula: this.state.formula + e.target.value
          })
        : this.setState({
            formula: this.state.formula.replace(/.$/, e.target.value)
          })
      : this.setState({
          formula: this.state.prevDis + e.target.value,
          justEvaluated: false
        });
  };

  handleEvaluation = e => {
    let formula = this.state.formula.replace(/⋅/g, "*"); //don't have to .replace() for some reason??
    // eslint-disable-next-line no-eval
    let answer = Math.round(100000 * eval(formula)) / 100000; //how many digits after decimal
    this.setState({
      display: answer.toString(),
      formula: this.state.formula + e.target.value + answer,
      prevDis: answer.toString(),
      justEvaluated: true,
      decimalPressed: false
    });
  };

  handleDecimal = e => {
    !this.state.decimalPressed //if decimal button hasn't been pressed. do this -->
      ? this.state.prevDis !== "." //if the last button pressed isn't decimal button
        ? /[0-9]/.test(this.state.prevDis) //if the last button pressed is between 0-9, add decimal point directly after previous formula
          ? this.setState({
              formula: this.state.formula + e.target.value,
              display: this.state.display + e.target.value,
              prevDis: e.target.value,
              decimalPressed: true
            })
          : this.setState({
              //if the last button pressed isn't between 0-9, add 0 before decimal point
              formula: this.state.formula + "0" + e.target.value,
              display: "0" + e.target.value,
              prevDis: e.target.value,
              decimalPressed: true
            })
        : this.setState({
            // if the last button pressed is decimal button
            formula: this.state.formula,
            display: this.state.display
          })
      : this.setState({
          //if decimal button has been pressed
          formula: this.state.formula,
          display: this.state.display
        });
  };

  render() {
    return (
      <div className="app">
        <Formula formula={this.state.formula} />
        <Display display={this.state.display} />
        <Button
          handleClear={this.handleClear}
          number={this.handleNumber}
          operator={this.handleOperator}
          evaluation={this.handleEvaluation}
          decimal={this.handleDecimal}
          zero={this.handleZero}
        />
      </div>
    );
  }
}

export default App;
