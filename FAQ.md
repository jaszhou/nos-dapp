
Error:

[Dapp] Error: Could not perform operation on '<operation>' on contract with address '<contract address>'

Solution:

Check make sure blocks are in sync between neoscan and python prompt.


Error:

[E 180302 22:30:01 ExecutionEngine:825] COULD NOT EXECUTE OP: Invalid list operation b'z' ROLL
[E 180302 22:30:01 ExecutionEngine:826] Invalid list operation
Traceback (most recent call last):
  File "/Users/thomassaunders/Workshop/neo-python/neo/VM/ExecutionEngine.py", line 823, in StepInto
    self.ExecuteOp(op, self.CurrentContext)
  File "/Users/thomassaunders/Workshop/neo-python/neo/VM/ExecutionEngine.py", line 276, in ExecuteOp
    estack.PushT(estack.Remove(n))
  File "/Users/thomassaunders/Workshop/neo-python/neo/VM/RandomAccessStack.py", line 57, in Remove
    raise Exception("Invalid list operation")
Exception: Invalid list operation

Solution:

it looks like we tried to test a contract that wanted some parameters but didn’t supply them. Note than if you’re building and testing contracts and you see an error similar to this, that is probably the issue you are running into.


Check progress:

root@05481644fe08:/opt/node1/neo-cli/Logs# pwd
/opt/node1/neo-cli/Logs
root@05481644fe08:/opt/node1/neo-cli/Logs# tail -f 2018-06-21.log
