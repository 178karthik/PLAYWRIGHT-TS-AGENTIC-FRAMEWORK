import { test, expect } from '../../fixtures'
import { APIClient } from '../../api/APIClient'
import { APIResponse } from 'playwright';

test.describe('PetStore Api Tests', () => {

    test('Finds Pet By Status', async ({ api }) => {

        let response: APIResponse = await api.get('v2/pet/findByStatus?status=sold');
        const pets = await response.json();
        const firstId = pets[0].id;
        console.log(firstId);
        let allIds = pets.map(pet => pet.id);
        console.log(allIds)
    })
    test('Add a new pet to the store', async ({ api }) => {

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
        const postResponse = await response.json();
        expect(postResponse.status).toBe("available")

    })
    test('Update Existing Pet @put', async ({ request }) => {

        const payload: Record<string, unknown> = {
            "id": 0,
            "category": {
                "id": 0,
                "name": "string"
            },
            "name": "doggie",
            "photoUrls": [
                "string"
            ],
            "tags": [
                {
                    "id": 0,
                    "name": "string"
                }
            ],
            "status": "available"
        };

        let putResponse: APIResponse = await request.put('v2/pet', {data:payload});
        expect(putResponse.ok());
        console.log(putResponse.headersArray()[0]);
        const putResponseBody = await putResponse.json();
        const categoryType = putResponseBody.category.name;
        console.log(categoryType);
     
    })
})