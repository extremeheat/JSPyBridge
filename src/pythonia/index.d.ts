/// <reference path="./py.stdlib.d.ts" />

export function python<T extends PyTypeName>(type: T) : Promise<PyObjectType<T>>
