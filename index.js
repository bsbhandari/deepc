/**
 * Performs a deep clone of any JavaScript value
 * @param {*} value - The value to clone
 * @param {WeakMap} [visited=new WeakMap()] - Internal map to track circular references
 * @returns {*} A deep clone of the input value
 */
function deepc(value, visited = new WeakMap()) {
    // Handle null and undefined
    if (value === null || value === undefined) {
        return value;
    }

    // Handle primitive values (including Symbol and BigInt)
    if (typeof value !== 'object' && typeof value !== 'function') {
        return value;
    }

    // Handle circular references
    if (visited.has(value)) {
        return visited.get(value);
    }

    // Handle Date objects
    if (value instanceof Date) {
        return new Date(value.getTime());
    }

    // Handle RegExp objects
    if (value instanceof RegExp) {
        return new RegExp(value.source, value.flags);
    }

    // Handle Array objects
    if (Array.isArray(value)) {
        const clonedArray = [];
        visited.set(value, clonedArray);
        value.forEach((item, index) => {
            clonedArray[index] = deepc(item, visited);
        });
        return clonedArray;
    }

    // Handle Map objects
    if (value instanceof Map) {
        const clonedMap = new Map();
        visited.set(value, clonedMap);
        value.forEach((val, key) => {
            clonedMap.set(deepc(key, visited), deepc(val, visited));
        });
        return clonedMap;
    }

    // Handle Set objects
    if (value instanceof Set) {
        const clonedSet = new Set();
        visited.set(value, clonedSet);
        value.forEach(val => {
            clonedSet.add(deepc(val, visited));
        });
        return clonedSet;
    }

    // Handle ArrayBuffer and TypedArrays
    if (value instanceof ArrayBuffer) {
        const clonedBuffer = value.slice(0);
        return clonedBuffer;
    }

    if (ArrayBuffer.isView(value)) {
        const clonedArray = new value.constructor(
            value.buffer.slice(0),
            value.byteOffset,
            value.length
        );
        return clonedArray;
    }

    // Handle Error objects
    if (value instanceof Error) {
        const clonedError = new value.constructor(value.message);
        clonedError.stack = value.stack;
        clonedError.name = value.name;
        return clonedError;
    }

    // Handle Function objects
    if (typeof value === 'function') {
        // Return a new function that calls the original
        const clonedFunc = function(...args) {
            return value.apply(this, args);
        };
        // Copy over properties
        Object.assign(clonedFunc, value);
        return clonedFunc;
    }

    // Handle Object literals and other objects
    const clonedObj = Object.create(Object.getPrototypeOf(value));
    visited.set(value, clonedObj);

    // Get all property descriptors, including non-enumerable ones
    const descriptors = Object.getOwnPropertyDescriptors(value);
    for (const [key, descriptor] of Object.entries(descriptors)) {
        if (descriptor.value !== undefined) {
            descriptor.value = deepc(descriptor.value, visited);
        }
        Object.defineProperty(clonedObj, key, descriptor);
    }

    return clonedObj;
}

module.exports = deepc; 