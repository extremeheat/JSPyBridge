## How it works

This bridge works through standard input/output pipes, there are no native modules and the 
communication can happen through anywhere--either pipes or network sockets.

For every property access, there is a communication protocol that allows one side to access the
access properties on the other side, and also complete function calls. 
Non-primitive values are sent as foreign object reference IDs (FFID). These FFIDs
exist in a map on both sides of the bridge, and map numeric IDs with a object reference. 

On the opposite side to the one which holds a reference, this FFID is assigned to a Proxy object.
In JS, a ES6 proxy is used, and in Python, the proxy is a normal class with custom `__getattr__` 
and other magic methods. Each proxy property access is mirrored on the other side of the bridge. 

Proxy objects on both sides of the bridge are GC tracked. In JavaScript, all python Proxy objects
are registered to a FinalizationRegistry. In Python, `__del__` is used to track the Proxy object's
destruction. When the proxy object is destoryed on one side of the bridge, its reference is removed
from the other side of the bridge. This means you don't have to deal with memory management.

### On the JavaScript side
The magic behind this is the usage of Proxy chains which permits call stack build up, until
a .then call for property access or a function call is done. Afterwards, the callstack is sent
and executed in Python.
