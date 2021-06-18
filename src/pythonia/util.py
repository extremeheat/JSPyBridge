import inspect

def make_signature(what):
    # print('w', what, )
    s = repr(what) + '\n'
    if type(what) is dict or type(what) is list or type(what) is tuple:
        return s
    if inspect.isclass(what):
        s += 'class'
    elif inspect.ismethod(what):
        s += 'method'
    elif callable(what):
        s += 'def'
    elif inspect.ismodule(what):
        s += 'module'
    s += ' ' + getattr(what, '__name__', '')
    # print(inspect.signature(what))
    sig = str(inspect.signature(what)) if callable(what) else ''
    if len(sig) > 2:
        s += '' + sig
    s += '\n' + (inspect.getcomments(what) or '')
    s += what.__doc__ or ''
    return s

# tupl = (2, 3, 4)

# print(make_signature(make_signature))
# print(make_signature(tupl))
# print(SomeClass.__qualname__, inspect.signature(SomeClass.someMethod))
# print(SomeClass.someMethod.__doc__)
# print(inspect.getcomments(SomeClass.someMethod))
# print(inspect.getcomments(inspect.getcomments))
# print(inspect.getcomments.__doc__)