import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { react } from "@nosplatform/api-functions";
import utils from "../../utils";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableRow from "../TableRow";

const { injectNOS, nosProps } = react.default;
const styles = {
  choices: {
    display: "flex",
    "flex-direction": "column",
    "align-items": "center"
  },
  input: {
    width: "400px",
    height: "20px",
    padding: "10px",
    border: "none",
    outline: "none",
    backgroundColor: "rgb(243,243,243)",
    color: "black",
    margin: "5px",
    "::placeholder": {
      color: "rgb(203,203,203)"
    }
  },
  disabled: {
    backgroundColor: "white"
  },
  button: {
    position: "absolute",
    right: "10px",
    top: "10px",
    height: "30px",
    width: "60px"
  },
  inputBox: {
    position: "relative"
  }
};



class AddToken extends React.Component {
   constructor() {
      super();
      this.state = {
         token_name: ""
      }
      this.updateState = this.updateState.bind(this);
   }


   updateState(e) {
     this.setState({token_name: e.target.value});

   };



   makeVote = async (name) => {
     console.log("Invoke 'makeVote'");
     this.handleInvoke(this.props.contract, "add", [name]);
   };



   handleInvoke = (scriptHash, operation, args) =>
       this.props.nos
         .invoke({ scriptHash, operation, args })
        // .then(txid => alert(`Invoke txid: ${txid} `))
         .catch(err => alert(`Error: ${err.message}`));



   handleAlert = async func => alert(await func);

   render() {
       const { classes, nos } = this.props;

      return (
         <div>
            Add New Token: <input type = "text" value = {this.state.token_name}
               onChange = {this.updateState} />


            <button onClick={() => this.makeVote(this.state.token_name)}>

              Add
            </button>
         </div>
      );
   }
}


AddToken.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  nos: nosProps.isRequired
};


export default injectNOS(injectSheet(styles)(AddToken));
