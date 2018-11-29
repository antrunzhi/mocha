'use strict';

const debug = require('debug')('mocha:cli:one-and-dones');
const align = require('wide-align');
const Mocha = require('../mocha');

/**
 * Dumps a sorted list of the enumerable, lower-case keys of some object
 * to `STDOUT`.
 * @param {Object} obj - Object, ostensibly having some enumerable keys
 * @private
 */
const showKeys = obj => {
  console.log();
  const keys = Object.keys(obj);
  const maxKeyLength = keys.reduce((max, key) => Math.max(max, key.length), 0);
  keys
    .filter(
      key => /^[a-z]/.test(key) && !obj[key].browserOnly && !obj[key].abstract
    )
    .sort()
    .forEach(key => {
      const description = obj[key].description;
      console.log(
        `    ${align.left(key, maxKeyLength + 1)}${
          description ? `- ${description}` : ''
        }`
      );
    });
  console.log();
};

/**
 * Dump list of built-in interfaces
 * @private
 */
const showInterfaces = () => {
  showKeys(Mocha.interfaces);
};

/**
 * Dump list of built-in reporters
 * @private
 */
const showReporters = () => {
  showKeys(Mocha.reporters);
};

const ONE_AND_DONES = (exports.ONE_AND_DONES = {
  interfaces: () => {
    debug('interfaces:');
    showInterfaces();
  },
  reporters: () => {
    debug('reporters:');
    showReporters();
  }
});

exports.ONE_AND_DONE_ARGS = new Set(
  ['help', 'h', 'version', 'V'].concat(Object.keys(ONE_AND_DONES))
);
