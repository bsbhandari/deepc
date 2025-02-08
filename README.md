# DeepClone

A robust and feature-rich utility for creating deep clones of JavaScript values. This package provides a reliable way to create deep copies of complex data structures while preserving their relationships and special object types.

## Features

- 🔄 Deep cloning of nested objects and arrays
- 🔁 Handles circular references
- 📅 Supports special objects (Date, RegExp, Map, Set)
- 🔧 Preserves prototype chain
- ⚙️ Maintains property descriptors
- 📦 Zero dependencies
- ✨ TypeScript friendly
- 🧪 Thoroughly tested

## Installation

```bash
npm install deepc
```

## Usage

```javascript
const deepc = require('deepc');

const original = {
    name: 'John',
    age: 30,
    address: {
        street: '123 Main St',
        city: 'Anytown',
        zip: '12345'
    }
};

const cloned = deepc(original);

console.log(cloned);
```
