const deepClone = require('./index.js');

// Test helper function
function runTest(testName, callback) {
    try {
        callback();
        console.log(`✅ ${testName} passed`);
    } catch (error) {
        console.error(`❌ ${testName} failed:`, error.message);
    }
}

// Test suite
function runTests() {
    // Test 1: Primitive values
    runTest('Primitive values', () => {
        const primitives = [
            42,
            'hello',
            true,
            null,
            undefined,
            Symbol('test'),
            123n
        ];

        primitives.forEach(value => {
            const cloned = deepClone(value);
            if (value !== cloned) {
                throw new Error(`Failed to clone primitive value: ${value}`);
            }
        });
    });

    // Test 2: Simple objects
    runTest('Simple objects', () => {
        const original = { a: 1, b: 'string', c: true };
        const cloned = deepClone(original);
        
        if (JSON.stringify(original) !== JSON.stringify(cloned)) {
            throw new Error('Simple object clone mismatch');
        }
        if (original === cloned) {
            throw new Error('Simple object clone is not a new instance');
        }
    });

    // Test 3: Nested objects
    runTest('Nested objects', () => {
        const original = {
            a: { b: { c: 1 } },
            d: [{ e: 2 }]
        };
        const cloned = deepClone(original);

        if (JSON.stringify(original) !== JSON.stringify(cloned)) {
            throw new Error('Nested object clone mismatch');
        }
        if (original.a === cloned.a || original.a.b === cloned.a.b) {
            throw new Error('Nested object references were not cloned');
        }
    });

    // Test 4: Arrays
    runTest('Arrays', () => {
        const original = [1, [2, 3], [4, [5, 6]]];
        const cloned = deepClone(original);

        if (JSON.stringify(original) !== JSON.stringify(cloned)) {
            throw new Error('Array clone mismatch');
        }
        if (original[1] === cloned[1] || original[2][1] === cloned[2][1]) {
            throw new Error('Array references were not cloned');
        }
    });

    // Test 5: Circular references
    runTest('Circular references', () => {
        const original = { a: 1 };
        original.self = original;
        
        const cloned = deepClone(original);
        if (cloned.self !== cloned) {
            throw new Error('Circular reference not handled correctly');
        }
    });

    // Test 6: Complex objects
    runTest('Complex objects', () => {
        const date = new Date();
        const regex = /test/g;
        const original = {
            date: date,
            regex: regex,
            map: new Map([['key', 'value']]),
            set: new Set([1, 2, 3])
        };
        
        const cloned = deepClone(original);
        
        if (!(cloned.date instanceof Date)) throw new Error('Date not cloned correctly');
        if (!(cloned.regex instanceof RegExp)) throw new Error('RegExp not cloned correctly');
        if (!(cloned.map instanceof Map)) throw new Error('Map not cloned correctly');
        if (!(cloned.set instanceof Set)) throw new Error('Set not cloned correctly');
        
        if (cloned.date === original.date) throw new Error('Date reference not cloned');
        if (cloned.regex === original.regex) throw new Error('RegExp reference not cloned');
        if (cloned.map === original.map) throw new Error('Map reference not cloned');
        if (cloned.set === original.set) throw new Error('Set reference not cloned');
    });

    // Test 7: Edge cases
    runTest('Edge cases', () => {
        const testCases = [
            {},
            [],
            Object.create(null),
            new Error('test error'),
            new Map(),
            new Set(),
            new WeakMap(),
            new WeakSet(),
            new Date(),
            /test/g,
            new ArrayBuffer(8),
            new Int32Array([1, 2, 3]),
            function() {},
            class Test {}
        ];

        testCases.forEach(value => {
            const cloned = deepClone(value);
            if (value === cloned) {
                throw new Error(`Failed to create new instance for type: ${value.constructor.name}`);
            }
        });
    });
}

// Run all tests
console.log('Starting deepClone tests...\n');
runTests();
console.log('\nTests completed.'); 