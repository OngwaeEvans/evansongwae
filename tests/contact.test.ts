import { test } from 'node:test';
import assert from 'node:assert/strict';
import { contact, whatsapp, tel, sms } from '../src/data/identity.ts';

test('contact links target the supplied number', () => {
  assert.ok(whatsapp('invest').startsWith('https://wa.me/254702245252?text=Hello%20Evans'));
  assert.equal(tel, 'tel:+254702245252');
  assert.equal(sms, 'sms:+254702245252');
  assert.equal(contact.linktree, 'https://linktr.ee/EvansOngwaeOnchoke');
});
