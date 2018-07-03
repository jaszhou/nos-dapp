<p align="center">
  <img src=".assets/logo.png" width="150px" />
</p>

<h1 align="center">Hot Tokens</h1>

<p align="center">
  This is a POC <strong>dApp</strong> developed on the <strong>nOS</strong> platform
</p>

## Purpose

User may vote the favourite tokens on the market. The information will be stored in NEO BlockChain.

## Setup
```bash
$ git clone https://github.com/jaszhou/hot-tokens.git hot-tokens
$ cd hot-tokens
$ yarn
$ yarn start
```

## privatenet
Refer to: [nos-local](https://github.com/nos/nos-local)

## Deploy smart contract to  privatenet
```
cd smartcontract

# copy smartcontract to container
docker cp store.py neo-python:/smart-contracts/

# deploy smartcontract
build /smart-contracts/store.py
import contract /smart-contracts/store.avm 0710 02 True False


```
Once the smartcontract has been deployed, get the contract hash (e.g. 8285708c3f8530e57d54628c07b687e48fa16f88),
update the value in `src/views/App/index.jsx` :

```
contract: "8285708c3f8530e57d54628c07b687e48fa16f88"
```

## Known issues
 - Currently it only has minimum functions
 - The contract hash is hardcoded in the code, you may need to update it with your own.
 - By default, it runs on the local privatenet which deployed with [nos-local](https://github.com/nos/nos-local)
