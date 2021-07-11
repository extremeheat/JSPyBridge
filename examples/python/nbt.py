# Named Binary Tag (NBT) serialization format
from JSPyBridge import require, globalThis
JSON = globalThis.JSON
nbt = require("prismarine-nbt", "latest")

print(nbt.comp({
    'Armor': nbt.list(nbt.comp([
        {
            'Count': nbt.byte(1),
            'Damage': nbt.short(0),
            'Name': nbt.string('helmet')
        }
    ]))
}))


def cross_encode():
    write = {
        "type": "compound",
        "name": "",
        "value": {
            "FireworksItem": {
                "type": "compound",
                "value": {
                    "FireworkColor": {"type": "byteArray", "value": [11]},
                    "FireworkFade": {"type": "byteArray", "value": []},
                    "FireworkFlicker": {"type": "int", "value": -79},
                    "FireworkTrail": {"type": "int", "value": 22},
                    "FireworkType": {"type": "byte", "value": 0},
                },
            },
            "customColor": {"type": "long", "value": [-1, -75715]},
        },
    }


    tests = ['big', 'little']
    for test in tests:
        written = nbt.writeUncompressed(write, test)
        parsed = nbt.parse(written).parsed
        assert JSON.stringify(parsed) == JSON.stringify(write)
        
        for _test in tests:
            _written = nbt.writeUncompressed(parsed, _test)
            _ = nbt.parse(written)
            assert JSON.stringify(_.parsed) == JSON.stringify(write)

cross_encode()