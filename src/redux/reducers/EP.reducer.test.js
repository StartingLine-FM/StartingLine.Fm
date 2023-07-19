import EP_Reducer from "./EP.reducer";

describe("Testing EP_Reducer:", () => {

    test("testing for correct initial state of []", () => {
        let action = {}
        let returnedState = EP_Reducer(undefined, action);
        expect(returnedState).toEqual([]);
    })

    test(`testing SET_EP action type, should return [{
            "title": "StartupBREW: TEDxFargo Day",
            "time": "July 19 @ 8:00 am - 9:30 am",
            "location": "Brewhalla",
            "description": "Welcome to #StartupBREW! This week we will be celebrating TEDxFargo Eve while hearing from TEDxFargo Speakers, Amber Buker, Founder of Totem + Jon Absey, Founder of Sego Promos! EVENT DETAILS: The event will be held at Brewhalla on July 19th! 8:00 AM – Coffee Club (time to drink coffee and connect) 8:30 AM – Program…",
            `, () => {
        let action = {
            type: "SET_EP",
            payload: [
                {
                    "title": "StartupBREW: TEDxFargo Day",
                    "time": "July 19 @ 8:00 am - 9:30 am",
                    "location": "Brewhalla",
                    "description": "Welcome to #StartupBREW! This week we will be celebrating TEDxFargo Eve while hearing from TEDxFargo Speakers, Amber Buker, Founder of Totem + Jon Absey, Founder of Sego Promos! EVENT DETAILS: The event will be held at Brewhalla on July 19th! 8:00 AM – Coffee Club (time to drink coffee and connect) 8:30 AM – Program…"
                }
            ]
        }
        let returnedState = EP_Reducer(undefined, action);
        expect(returnedState).toEqual([
            {
                "title": "StartupBREW: TEDxFargo Day",
                "time": "July 19 @ 8:00 am - 9:30 am",
                "location": "Brewhalla",
                "description": "Welcome to #StartupBREW! This week we will be celebrating TEDxFargo Eve while hearing from TEDxFargo Speakers, Amber Buker, Founder of Totem + Jon Absey, Founder of Sego Promos! EVENT DETAILS: The event will be held at Brewhalla on July 19th! 8:00 AM – Coffee Club (time to drink coffee and connect) 8:30 AM – Program…"
            }
        ]);
    })
})

