#!/usr/bin/env node
const [, , ...args] = process.argv;
const generator = require("./dist/generator").default;
// Temporary arguments without effect!
const name = args?.[0];
generator(name);
