import todoListResourcesReducer from "./todolist.reducer"; // import in the todo list reducer

// describe what it should be for empty tests
describe("testing the todo list reducer", () => {
    // test the default return state
    test('should show no reports', () => {
        let action = {};
        let returnedState = todoListResourcesReducer(undefined, action);
        expect(returnedState).toEqual([]);
    });
    // test the get 
    test('should have all of the todo resources for each user', () => {
        let action = { type: "SET_TODO_LIST" };
        let returnedState = todoListResourcesReducer(undefined, action);
        expect(returnedState).toEqual(action.payload)
    });
});