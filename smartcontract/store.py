"""
    Main for SC
    :param operation: operation
    :type operation: str
    :param args: list of arguments
        args[0]: token name

    :param type: str

    build /smart-contracts/store.py test 0710 02 True False add ['NAS']

    import contract  /smart-contracts/store.avm 0710 02 True False
"""

from boa.interop.Neo.Runtime import Log, Notify
from boa.interop.Neo.Storage import Get,Put,Delete,GetContext
from boa.builtins import concat, list
from boa.interop.Neo.Runtime import Serialize, Deserialize

def Main(operation, args):


    context = GetContext()

    if operation == 'add':
        # Try to get a value for this key from storage

        item_key = args[0]



        item_value = Get(context, item_key)
        msg = ["Value read from storage:", item_value]
        Notify(msg)

        if len(item_value) == 0:
            Notify("Storage key not yet set. Setting to 1")
            item_value = 1
            # Store the new value
            Put(context, item_key, item_value)


            # Store token list

            temp = Get(context, 'token_list')

            if not temp == False:
                #tokens = Deserialize(temp)
                name = concat(',',item_key)
                tokens = concat(temp,name)
                #a_save_s = Serialize(tokens)
                Put(context, 'token_list', tokens)

                msg = ["New value written into list:", tokens]
                Notify(msg)


            else:
                #a_save_s = Serialize(item_key)
                Put(context, 'token_list', item_key)


        else:
            Notify("Storage key already set. Incrementing by 1")
            item_value += 1

        # Store the new value
        Put(context, item_key, item_value)



        msg = ["New value written into storage:", item_value]
        Notify(msg)

        return item_value

    elif operation == 'balance':
            item_key = args[0]

            item_value = Get(context, item_key)
            msg = ["Value read from storage:", item_value]
            Notify(msg)

            if len(item_value) == 0:
                Notify("Storage key not yet set. Setting to 0")
                item_value = 0

            else:
                Notify("Storage key already set.")


            return item_value

    elif operation == 'deleteAll':

            Delete(context, 'token_list')

            msg = ["Delete the token list:", item_key]
            Notify(msg)

            return item_value
