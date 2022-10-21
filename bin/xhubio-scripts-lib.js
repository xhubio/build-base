#!/usr/bin/env node
'use strict';

const path = require('path')

const script = process.argv[2];
const args = process.argv.slice(3);
const generalScriptExecuter = require('../dist/src/generalScriptExecuter').generalScriptExecuter

const result = generalScriptExecuter({
  scriptDirectory: path.join(__dirname,'..','dist','src','script'),
  validNames: [
    'xhubioInit', 'xhubioUpdate', 'replaceImageLinks'
  ],
  name: script,
  args
})

if (result.status !== 0) {
  console.log(result.stderr)
}
