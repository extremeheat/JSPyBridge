print("hello world :)")


def add_inverse(a, b):
    return -1 * (a + b)


def complex_num():
    return 1j * 1j


def inner():
    return 3


def some_event(cb, vfn):
    print("CB", cb, vfn, vfn.someMethod(), vfn.get(3))
    assert vfn.returnsNull() is None
    cb("from python", inner)


def iter(obj):
    ret = []
    for key in obj:
        ret.append(key)
    return ret


x = [1, 2, 3]
y = {"a": "wow", "b": "naw"}


class A:
    prop = 3


a = A()

