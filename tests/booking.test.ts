import test from 'node:test';
import assert from 'node:assert/strict';
import { bookingLinks, bookingMessage, validateBooking, type BookingEnquiry } from '../client/src/lib/booking';
import { pageForPath, structuredData } from '../client/src/content/site';
import { trackIntent } from '../client/src/lib/analytics';

const valid: BookingEnquiry = { name: 'Léa & Ali', eventType: 'wedding', date: '2027-06-15', undecided: false, location: 'Beirut, Lebanon', venue: '', message: 'Arabic & house? نعم 🎶\nA second line.' };
test('requires the details necessary for a booking conversation', () => {
  assert.deepEqual(validateBooking(valid, '2026-09-10'), {});
  const errors = validateBooking({ ...valid, name: ' ', location: '', eventType: '', date: '' }, '2026-09-10');
  assert.deepEqual(Object.keys(errors).sort(), ['date', 'eventType', 'location', 'name']);
});
test('supports undecided dates while rejecting past and impossible dates', () => {
  assert.deepEqual(validateBooking({...valid, date: '', undecided: true}, '2026-09-10'), {});
  assert.deepEqual(validateBooking({...valid, date: '2026-09-10'}, '2026-09-10'), {});
  for (const date of ['2026-09-09', '2027-02-30', 'bad-date']) assert.ok(validateBooking({...valid, date}, '2026-09-10').date);
});
test('preserves international text, ampersands and newlines in both handoffs', () => {
  const links = bookingLinks(valid);
  assert.equal(new URL(links.whatsapp).host, 'wa.me');
  assert.equal(new URL(links.whatsapp).pathname, '/96170121188');
  assert.equal(new URL(links.whatsapp).searchParams.get('text'), bookingMessage(valid));
  assert.equal(new URL(links.email).searchParams.get('body'), bookingMessage(valid));
  assert.ok(bookingMessage({...valid, undecided: true}).includes('Date: Not decided'));
  assert.ok(!bookingMessage(valid).includes('Venue:'));
});
test('canonicalizes existing experience URLs and unknown pages without false services', () => {
  assert.equal(pageForPath('/experience').path, '/experience/');
  assert.equal(pageForPath('/experience/').path, '/experience/');
  assert.equal(pageForPath('/missing').noindex, true);
  const data = structuredData(pageForPath('/weddings/'));
  assert.ok(!Array.isArray(data) && data['@graph'].some(item => item['@type'] === 'Service'));
});
test('unavailable or failing analytics never interrupts a contact handoff', () => {
  const original = Object.getOwnPropertyDescriptor(globalThis, 'window');
  try {
    for (const value of [{}, {gtag() { throw new Error('Tracking blocked'); }}]) {
      Object.defineProperty(globalThis, 'window', {value, configurable: true});
      assert.doesNotThrow(() => trackIntent('contact_intent', 'whatsapp'));
      assert.ok(bookingLinks(valid).whatsapp.startsWith('https://wa.me/96170121188?'));
    }
  } finally {
    if (original) Object.defineProperty(globalThis, 'window', original);
    else Reflect.deleteProperty(globalThis, 'window');
  }
});
