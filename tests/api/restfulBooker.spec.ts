import { test, expect } from '../../fixtures'
import { Booking } from '../../api/models/BookingPayload';
import { BookingDates } from '../../api/models/BookingPayload';
import {join} from 'path'
import { readFile } from 'fs/promises';
import bookingJson from '../../resources/api-payloads/bookingPayload.json'
 
test('Create Booking', async ({ request }) => {

    const createBookingPayload = {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
            "checkin": "2018-01-01",
            "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
    }

    let createBooking = await request.post('booking/', { headers: { "Content-Type": "application/json" }, data: createBookingPayload });
    const createBookingResponseBody = await createBooking.json();
    expect(createBooking.status()).toBe(200);
    expect(createBooking.ok()).toBeTruthy();
    expect(createBookingResponseBody.booking).toMatchObject(createBookingPayload)
    expect(typeof createBookingResponseBody.bookingid).toBe('number')
    expect(typeof createBookingResponseBody.booking).toBe('object')
    expect(Array.isArray(createBookingResponseBody.booking)).toBeFalsy()

    const headers = await createBooking.headers();

    expect(headers['content-type']).toContain("application")
    console.log(headers['content-type'])

})
test('Create Booking Using Classes', async ({ request }) => {

    const bookingDate = new BookingDates("2018-01-01","2019-01-01");
    const booking = new Booking("Jim","T",23,true,bookingDate,"nothing")

    let createBooking = await request.post('https://restful-booker.herokuapp.com/booking/', { headers: { "Content-Type": "application/json" }, data: booking });
    const createBookingResponseBody = await createBooking.json();
    expect(createBooking.status()).toBe(200);
    expect(typeof createBookingResponseBody.booking.depositpaid).toBe('boolean')

})
test('Create Booking Using Json', async ({ request }) => {
    const jsonPayload = structuredClone(bookingJson);
    bookingJson.firstname= "Thontanaal"
    let createBooking = await request.post('https://restful-booker.herokuapp.com/booking/', { headers: { "Content-Type": "application/json" }, data: boookingJson });
    const createBookingResponseBody = await createBooking.json();
    console.log(createBookingResponseBody)
    expect(createBooking.status()).toBe(200);
    expect(typeof createBookingResponseBody.booking.depositpaid).toBe('boolean')

})
test('Create Booking Using ReadFile', async ({ request }) => {

    const path = join(__dirname,"../../resources/api-payloads/bookingPayload.json");
    const file = await readFile(path,'utf-8');
    const payload = JSON.parse(file)
    payload.firstname = "Thont"
    let createBooking = await request.post('https://restful-booker.herokuapp.com/booking/', { headers: { "Content-Type": "application/json" }, data: payload });
    const createBookingResponseBody = await createBooking.json();
    console.log(createBookingResponseBody)
    expect(createBooking.status()).toBe(200);
    expect(typeof createBookingResponseBody.booking.depositpaid).toBe('boolean')

})