# https://stackoverflow.com/a/18561055
# Needed so we can serialize JavaScript objects for internal use.
# TODO: Move to a custom serializer.
""" Module that monkey-patches json module when it's imported so
JSONEncoder.default() automatically checks for a special "to_json()"
method and uses it to encode the object if found.
"""
from json import JSONEncoder


def _default(self, obj):
    return getattr(obj.__class__, "__json__", _default.default)(obj)


_default.default = JSONEncoder.default  # Save unmodified default.
JSONEncoder.default = _default  # Replace it.
