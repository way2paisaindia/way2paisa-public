import test from 'node:test';
import assert from 'node:assert/strict';
import {officialMahaReraSource} from '../lib/official-maharera-source.mjs';

const reg='PR1180002400002';
test('permits an exact HTTPS MahaRERA project detail with a single registration',()=>{
  for(const u of [
    'https://maharerait.maharashtra.gov.in/public/project/view/47626',
    'https://maharerait.maharashtra.gov.in/project/view/57527',
    'https://maharera.maharashtra.gov.in/public/project/view/43601',
  ])assert.equal(officialMahaReraSource(u,reg),u);
});

test('rejects non-government portals, untrusted URLs and malformed paths',()=>{
  const bad=[
    'https://housiey.com/projects/romell-asrava',
    'https://maharerait.maharashtra.gov.in.evil.com/public/project/view/47626',
    'https://maharerait.maharashtra.gov.in@evil.com/public/project/view/47626',
    'http://maharerait.maharashtra.gov.in/public/project/view/47626',
    'javascript:alert(1)',
    'https://maharerait.maharashtra.gov.in/projects-search-result',
    'https://maharerait.maharashtra.gov.in/',
    'https://maharerait.maharashtra.gov.in/public/project/view/123?redirect=evil.com',
    'https://maharerait.maharashtra.gov.in/public/project/view/123#fragment',
    'https://maharerait.maharashtra.gov.in:444/public/project/view/123',
    'https://maharerait.maharashtra.gov.in/public/project/view/not-a-number',
    'https://www.maharerait.maharashtra.gov.in/public/project/view/47626',
    null,{},'',
  ];
  for(const u of bad)assert.equal(officialMahaReraSource(u,reg),null,String(u));
});

test('hides a single official link for multiple or missing phase registrations',()=>{
  const u='https://maharerait.maharashtra.gov.in/public/project/view/47626';
  for(const r of [
    'P51800034851; P51800049757',
    'P51800034851 (Tower A); P51800049757 (Tower B)',
    'P51800034851, P51800049757',
    'Available on request',null,'',undefined
  ])assert.equal(officialMahaReraSource(u,r),null,String(r));
});

test('validates individual MahaRERA registration syntax',()=>{
  const u='https://maharerait.maharashtra.gov.in/public/project/view/47626';
  assert.equal(officialMahaReraSource(u,'P51800049755'),u);
  assert.equal(officialMahaReraSource(u,'PM1180002500766'),u);
  assert.equal(officialMahaReraSource(u,'PR1180002501281'),u);
  assert.equal(officialMahaReraSource(u,'P51800049755 (Tower A)'),null);
  assert.equal(officialMahaReraSource(u,'P51800049755; P51800049756'),null);
});
