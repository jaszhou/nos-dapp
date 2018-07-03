import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { react } from "@nosplatform/api-functions";
import utils from "../../utils";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';


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


class TableRow extends React.Component {

  constructor(props) {
       super(props);
       this.state = {
          header: "Header from props...",
          content: "Content from props...",
          value: ""
       };


    }

  
    componentDidMount = async () => {

      console.log("key len: " + this.props.data.length);

      if(this.props.data == null || this.props.data.length < 2){
        console.log("trying to get empty key from storage");
      }else {
        this.getValue(this.props.data);
      }

    };

  getVote = async () => {
    console.log("Invoke 'getVote'");
    this.handleGetStorage(this.props.contract,'NAS',true,true);
  };

  makeVote = async (name) => {
    console.log("Invoke 'makeVote'");
    this.handleInvoke(this.props.contract, "add", [name]);
  };



  handleInvoke = (scriptHash, operation, args) =>
      this.props.nos
        .invoke({ scriptHash, operation, args })
        //.then(txid => alert(`Invoke txid: ${txid} `))
        .catch(err => alert(`Error: ${err.message}`));

  handleGetStorage = async (scriptHash, key, encodeInput, decodeOutput) =>
      this.props.nos
        .getStorage({ scriptHash, key, encodeInput, decodeOutput })
        .then(txid => alert(`Invoke txid: ${txid} `))
        .catch(err => alert(`Error: ${err.message}`));

  handleGetValue = async (scriptHash, key, encodeInput, decodeOutput) =>
            this.props.nos
              .getStorage({ scriptHash, key, encodeInput, decodeOutput })
              .then(txid => this.setState({value:txid}))
              .catch(err => alert(`Error: ${err.message}`));

  getValue = async (key) => {
            console.log("call storage: " + key);
            return this.handleGetValue(this.props.contract,key,true,false)
          };

   render() {

     const { nos, classes } = this.props;


// {this.getValue(this.props.data)};
     //alert(this.props.contract);




     // this.setState({
     //   age: this.getValue(this.props.data.name),
     // });

     console.log("state value: " + this.state.value);
     console.log("date value: " + this.props.data);

     if(this.state.value == ''){
         if(this.props.data == null || this.props.data.length < 2){
           console.log("trying to get empty key from storage");
         }else {
           this.getValue(this.props.data);
         }
       }

      return (
         <tr>
            <td>{this.props.data}</td>
            <td>{this.state.value}</td>
            <td>
            <button onClick={() => this.makeVote(this.props.data)}>
              Vote
            </button>
            </td>
         </tr>
      );
   }
}

TableRow.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  nos: nosProps.isRequired
};

export default injectNOS(injectSheet(styles)(TableRow));
