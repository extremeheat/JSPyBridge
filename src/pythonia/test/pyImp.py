print("hello world :)")

def add_inverse(a, b):
    return -1 * (a + b)


def complex_num():
    return 1j * 1j

def inner():
    return 3

def some_event(cb, vfn):
    print("CB", cb, vfn, vfn.someMethod())
    cb('from python', inner)