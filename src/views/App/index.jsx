import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { react } from "@nosplatform/api-functions";


import Header from "./../../components/Header";
import NOSActions from "./../../components/NOSActions";
import OpponentChoice from "./../../components/OpponentChoice";
import AddToken from "./../../components/AddToken";
import Content from "./../../components/Content";
import '../../assets/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Panel } from 'react-bootstrap';

const { injectNOS, nosProps } = react.default;

import Background from './bg.jpg';




const styles = {
  "@import": "https://fonts.googleapis.com/css?family=Source+Sans+Pro",
  "@global html, body": {
    fontFamily: "Source Sans Pro",
    margin: 0,
    padding: 0,
    backgroundColor: "#ffffff"
    // backgroundImage: `url(${Background})`
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



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();

    this.componentDidMount();

  }

  getInitialState = () => {

    return {
      playerAddress: "",
      contract: "8285708c3f8530e57d54628c07b687e48fa16f88"

    };
  };

  handleAlert = async func => alert(await func);

  componentDidMount = async () => {
    try {
      const playerAddress = await this.props.nos.getAddress();

      console.log("address: "+playerAddress);

      await this.setState({
        playerAddress

      });
    } catch (e) {
      return;
    }

  };




render = () => {
  const { classes } = this.props;

  return (
    <div className={classes.App}>
      <Header title="The Top Rated Tokens" />

      <div className="Panel">

        <p>You can vote for the most profitable tokens on exchange
           at the moment. The vote counter will be reset after one week.</p>

      </div>



     <Content  contract = {this.state.contract}/>





    </div>
  );
};


}


App.propTypes = {
  classes: PropTypes.object.isRequired

};

export default injectSheet(styles)(App);
