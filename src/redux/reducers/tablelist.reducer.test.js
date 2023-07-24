import tableListReducer from "./tablelist.reducer";

// describe what it should be for empty tests
describe("testing the table list reducer", () => {
    // test the default return state
    test('should show no reports', () => {
        let action = {};
        let returnedState = tableListReducer(undefined, action);
        expect(returnedState).toEqual([]);
    });
    // test the get 
    test('should have all of the todo resources for each user', () => {
        let action = { type: "SET_TABLE_LIST" };
        let returnedState = tableListReducer(undefined, action);
        expect(returnedState).toEqual(action.payload)
    });
});