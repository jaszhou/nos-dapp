# FAQ/Troubleshooting Guide

These are common issues encountered when starting to develop DApp with nOS. Hopefully it can help new developer to get started quickly.

Questions/Answers:

1. How do I access neoscan for privatenet?

From the browser, access the link:  http://localhost:4000.  If the URL is not accessible, try to restart the container as described in question 2.


2. How to resolve sync issue when using privatenet?

Go to command line:

```
cd <project location>/nos-local/neo-local
make stop

```
Wait for the containers to stop completely, then run:

```
cd <project location>/nos-local
make run
```
You may also check from docker command:

```
docker ps
```

3. How to check current sync status from privatenet?

From the container command prompt, run:  state

Example:
```
neo> state
Progress: 5300 / 20043
Block-cache length 920
Blocks since program start 5300
Time elapsed 3.9674691666666666 mins
Blocks per min 1335.86419386162
TPS: 22.302210708211764

```
Make sure the block height matches the value in neoscan in question 1.


4. How to resolve network error shown in devtool console?

Add one line to /etc/hosts:

```
127.0.0.1 neo-nodes
```

5. How do I log into nOS client with private wallet?

The easy way is to export the wallet from container, e.g.

```
neo> export wif AK2nJJpJr6o664CWJKi1QRXjqeic2zRp8y
[wallet password]> ***
WIF key export: KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr

```
You can use the export string to log into nOS client by choosing WIF login option.

6. Where do I find the network option of nOSLocal?

Somethings the nOSLocal option is missing from the network setting, to rectify it, simply click the button of 'Clear Custom Network Configuration' and it should be available again.

7. Why my NEO/GAS balance is not shown after transfer?

You'll need to sign out and sign in nOS client again to see the new balance.
