import { test, expect } from '../../fixtures'
import { APIClient } from '../../api/APIClient'
import { APIResponse } from 'playwright';

test.describe('PetStore Api Tests', () => {

    let firstId: string;

    test('Finds Pet By Status', async ({ request }) => {

        const api = new APIClient(request);
        let response: APIResponse = await api.get('v2/pet/findByStatus?status=sold');
        const pets = await response.json();
        firstId = pets[0].id;
        console.log(firstId);
        let allIds = pets.map(pet => pet.id);
        console.log(allIds)
    })
    test('Add a new pet to the store', async ({ request }) => {
        const api = new APIClient(request);

        const payload: Record<string, unknown> = {
            "id": 0,
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "doggie",
            "photoUrls": ["string"],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        };

        let response: APIResponse = await api.post('v2/pet', payload);
        expect(await response.status()).toBe(200)
        const postResponse = await response.json();
        expect(postResponse.status).toBe("available")

    })
    test('Deletes a pet', async ({ request }) => {
        const api = new APIClient(request);
        const endpoint = 'v2/pet/' + firstId;
        const deleteResponse = await api.delete(endpoint)
        expect(await deleteResponse.status()).toBe(200)
        console.log(await deleteResponse.json())


    })

})
