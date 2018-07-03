import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { react } from "@nosplatform/api-functions";
import utils from "../../utils";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import TableRow from "../TableRow";
import AddToken from "./../../components/AddToken";

const { injectNOS, nosProps } = react.default;

const styles = {
  "@import": "https://fonts.googleapis.com/css?family=Source+Sans+Pro",
  "@global html, body": {
    fontFamily: "Source Sans Pro",
    margin: 0,
    padding: 0,
    backgroundColor: "#ffffff"
  },
  App: {
    textAlign: "center"
  },
  intro: {
    fontSize: "large"
  },
  lineBreak: {
    width: "75%",
    borderTop: "1px solid #333333",
    margin: "32px auto"
  }
};


class Content extends React.Component {


   constructor() {
      super();
      this.state = {
         value: 0,
         list: "",
         tokens:[],
         values:[]

      }


   }



   getVote = async () => {
     console.log("Invoke 'getVote'");
     this.handleGetStorage(this.props.contract,'NAS',true,false);
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

   handleGetValue = async (i,scriptHash, key, encodeInput, decodeOutput) =>
             this.props.nos
               .getStorage({ scriptHash, key, encodeInput, decodeOutput })
               .then(txid => {
                  this.setState({value:txid});
                  this.setState({tokens:this.state.list.split(",")});
                })
               .catch(err => alert(`Error: ${err.message}`));

   handleGetList = async (scriptHash, key, encodeInput, decodeOutput) =>
                         this.props.nos
                           .getStorage({ scriptHash, key, encodeInput, decodeOutput })
                           .then(txid => this.setState({list:txid}))
                           .catch(err => alert(`Error: ${err.message}`));


   getValue = async (i,key) => {

             return this.handleGetValue(i,this.props.contract,key,true,false)
           };

   getList = async (key) => {
                    console.log("calling getList here: " + key);
                     return this.handleGetList(this.props.contract,key,true,true)
                   };

  handleAlert = async func => alert(await func);

  componentDidMount = async () => {

    const { nos } = this.props;

    this.getList('token_list');

    //this.state.tokens = this.state.list.split(",");

    console.log(this.state.tokens.toString());

  };

   render() {

     // this.getList('token_list');
     //
     this.state.tokens = this.state.list.split(",");

     console.log(this.state.tokens.toString() + "len: " +this.state.tokens.length);

     // this.setState({tokens:this.state.list.split(",")});

     //alert(this.props.contract);

     const { classes, nos } = this.props;


     // var arrayLength = this.state.tokens.length;
     //  for (var i = 0; i < arrayLength; i++) {
     //      //alert(myStringArray[i]);
     //      //Do something
     //      this.getValue(i,this.state.tokens[i]);
     //  }

     //alert(this.state.tokens);

      return (
         <div>
            <div className={classes.App}>


            <table align='center'>
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Total Votes Received</th>
                  <th>Vote</th>
                </tr>
              </thead>
              <tbody>
                 {
                   this.state.tokens.map((token, i) => <TableRow key = {i}
                    data = {token}
                    contract = {this.props.contract} />)
                  }

              </tbody>
            </table>

            <hr className={classes.lineBreak} />

            <AddToken  contract = {this.props.contract} />


          </div>
         </div>
      );
   }
}


Content.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  nos: nosProps.isRequired
};

export default injectNOS(injectSheet(styles)(Content));
