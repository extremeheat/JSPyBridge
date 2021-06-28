def add(demoClas1, demoClas2):
    # print("dc", demoClas1, demoClas2)
    return demoClas1.var + demoClas2.var

class DemoClass:
    """Some doc"""

    def __init__(self, var):
        self.var = var

    def get(self, update):
        return self.var + update

    def nested(self):
        def some():
            return 3

        return some

    def arr(self):
        return [1, 2, 4]

    def barr(self):
        return bytearray()

    def dic(self):
        return {"x": {"y": 4, "z": [5, 6, 7, 8, None]}}