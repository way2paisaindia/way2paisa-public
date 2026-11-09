import assert from 'node:assert/strict';
import {formatStoredIsoPossession} from '../app/lib/possession-date.mjs';

const tests = [
 ['2026-12-31', 'Registered target Dec 2026 · Reconfirm current approvals'],
 ['2027-03-30', 'Registered target Mar 2027 · Reconfirm current approvals'],
 ['2030-04-30', 'Registered target Apr 2030 · Reconfirm current approvals'],
 ['2028-02-29', 'Registered target Feb 2028 · Reconfirm current approvals'],
 ['2026-12-31T00:00:00Z', 'Registered target Dec 2026 · Reconfirm current approvals'],
 ['2027-02-29', null],
 ['2026-13-01', null],
 ['2026-02-30', null],
 ['Ready to Move', null],
 ['RERA Mar 2027', null],
 [null, null],
];
for (const [input, expected] of tests) assert.equal(formatStoredIsoPossession(input), expected);
console.log(`${tests.length} ISO possession date cases passed`);
