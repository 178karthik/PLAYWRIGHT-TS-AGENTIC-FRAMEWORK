import { test, expect } from '../../fixtures'

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