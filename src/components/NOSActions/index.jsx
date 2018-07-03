import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { react } from "@nosplatform/api-functions";
import utils from "../../utils";

const { injectNOS, nosProps } = react.default;

const styles = {
  button: {
    margin: "16px",
    fontSize: "14px"
  }
};

const scriptHash  = "0a1948712e880db364e8e06e68ae8c614a399c05";

class NOSActions extends React.Component {
  handleAlert = async func => alert(await func);

  //const contract = "3674ec2b12947d4dc7db992c1fd68ece2ffd3593";

  // handleGetAddress = async () => alert(await this.props.nos.getAddress());


  handleClaimGas = () =>
    this.props.nos
      .claimGas()
      .then(alert)
      .catch(alert);

      getGameId = async () => {
        // const currentGameKey = `${utils.neoAddressDecode(
        //   this.props.nos.getAddress()
        // )}`;
       try {
          const response = await this.props.nos.getStorage({ scriptHash, key: 'test-storage-key' });
          console.log(await response);
        }
        catch (err) {
          console.log('fetch failed', err);
        }


        return this.props.nos.getStorage({ scriptHash, key: 'test-storage-key' });
      };


      addToken = async () => {
        // eslint-disable-next-line no-bitwise

        //alert("add token ");
        // try {
        //   await this.props.nos.invoke({
        //     scriptHash:"7d58d0f53f5fca063842bbd4c30802cdab824877",
        //     operation: "add",
        //     args: "NAS"
        //
        //   }).then((txid) => alert(`Invoke txid: ${txid} `));
        // } catch (e) {
        //   console.log(e);
        //   return;
        // }


        console.log("Invoke 'sendMessage'");
        this.handleInvoke("0a1948712e880db364e8e06e68ae8c614a399c05", "balance", ['NAS']);
      };

      getVote = async () => {

        console.log("Invoke 'getVote'");
        this.handleGetStorage("0a1948712e880db364e8e06e68ae8c614a399c05",'NAS',true,false);
      };

      handleInvoke = (scriptHash, operation, args) =>
          this.props.nos
            .invoke({ scriptHash, operation, args })
            .then(txid => alert(`Invoke txid: ${txid} `))
            .catch(err => alert(`Error: ${err.message}`));

      handleGetStorage = async (scriptHash, key, encodeInput, decodeOutput) =>
          this.props.nos
            .getStorage({ scriptHash, key, encodeInput, decodeOutput })
            .then(txid => alert(`Invoke txid: ${txid} `))
            .catch(err => alert(`Error: ${err.message}`));


// testinvoke 0xec9a9f99b894c333667b008b9df35faaf4536143 Main

testStorage = async () => {
  // eslint-disable-next-line no-bitwise

  //alert("add token ");
  try {
    await this.props.nos.invoke({
      scriptHash:"7d58d0f53f5fca063842bbd4c30802cdab824877",
      operation: "Main",
      args: ["add","NAS"]

    });
  } catch (e) {
    console.log(e);
    return;
  }
};

getBalance = async () => {
  // eslint-disable-next-line no-bitwise

  //alert("add token ");
  try {
    await this.props.nos.testInvoke({
      scriptHash:"7d58d0f53f5fca063842bbd4c30802cdab824877",
      operation: "balance",
      args: "NAS"

    }).then((txid) => alert(`Invoke txid: ${txid} `));
  } catch (e) {
    console.log(e);
    return;
  }
};

  render() {
    const { classes, nos } = this.props;

    const neo = "c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b";
    const gas = "602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7";
    const rpx = "ecc6b20d3ccac1ee9ef109af5a7cdb85706b1df9";

    // Add your smart contract's scriptHash here
    const scriptHash = "7d58d0f53f5fca063842bbd4c30802cdab824877";

    // The operation of your smart contract you want to (test)invoke
    const operation = "Main";

    // The necessary arguments for you (test)invoke
    const args = [];

    // The storagekey you want to query
    const key = "NAS";


    // nos.getStorage({ scriptHash, key })
    //     .then((data) => alert(`Get storage data: ${data} `))
    //     .catch((err) => alert(`Error: ${err.message}`));


    // The amount and recipient of your send function
    const recipient = "";
    const amount = "";

    const invoke = { scriptHash, operation, args }; // and testInvoke
    const getStorage = { scriptHash, key };
    const send = { amount, asset: gas, recipient };

    return (
      <React.Fragment>
        <button className={classes.button} onClick={() => this.addToken()}>
          Vote
        </button>
        <button
          className={classes.button}
          onClick={() => this.handleAlert(nos.getBalance({ asset: neo }))}
        >
          Get Token
        </button>
        <button
          className={classes.button}
          onClick={() => this.getVote()}
        >
          Get Balance
        </button>
        <button
          className={classes.button}
          onClick={() => this.handleAlert(nos.getBalance({ asset: rpx }))}
        >
          Get RPX Balance
        </button>

        <button className={classes.button} onClick={this.handleClaimGas}>
          Claim Gas
        </button>
        <button className={classes.button} onClick={() => this.handleAlert(this.getGameId())}>
          Send GAS to...
        </button>

        <button className={classes.button} onClick={() => this.handleAlert(JSON.stringify(nos.testInvoke(invoke)))}>
          TestInvoke
        </button>
        {/*
          <button
            className={classes.button}
            onClick={() => this.handleAlert(nos.invoke(invoke))}
          >
            Invoke
          </button>
        */}
        <button
          className={classes.button}
      //    onClick={() => this.handleAlert(nos.getStorage(getStorage))}
          onClick={() =>   nos.getStorage({ scriptHash, key })
            .then((data) => alert(`Get storage data: ${data} `))
            .catch((err) => alert(`Error: ${err.message}`))}
        >
          GetStorage
        </button>
      </React.Fragment>
    );
  }
}

NOSActions.propTypes = {
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  nos: nosProps.isRequired
};

export default injectNOS(injectSheet(styles)(NOSActions));
