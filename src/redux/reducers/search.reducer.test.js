import searchReducer from "./search.reducer";

describe("Testing searchReducer:", () => {

    test("testing for correct initial state of []", () => {
        let action = {}
        let returnedState = searchReducer(undefined, action);
        expect(returnedState).toEqual([]);
    })

    test(`testing SET_SEARCH action type, should return [{"id": 8,
            "stage_id": 4,
            "category_id": 4,
            "name": "Emerging Praire",
            "image_url": null,
            "description": "Gathers members from the entreprenuership community to help up and coming entreprenuers",
            "website": null,
            "email": null,
            "address": null,
            "linkedin": null}]`, () => {
        let action = {
            type: "SET_SEARCH",
            payload: [
                {
                    "id": 8,
                    "stage_id": 4,
                    "category_id": 4,
                    "name": "Emerging Praire",
                    "image_url": null,
                    "description": "Gathers members from the entreprenuership community to help up and coming entreprenuers",
                    "website": null,
                    "email": null,
                    "address": null,
                    "linkedin": null
                }
            ]
        }
        let returnedState = searchReducer(undefined, action);
        expect(returnedState).toEqual([
            {
                "id": 8,
                "stage_id": 4,
                "category_id": 4,
                "name": "Emerging Praire",
                "image_url": null,
                "description": "Gathers members from the entreprenuership community to help up and coming entreprenuers",
                "website": null,
                "email": null,
                "address": null,
                "linkedin": null
            }
        ]);
    })
})

