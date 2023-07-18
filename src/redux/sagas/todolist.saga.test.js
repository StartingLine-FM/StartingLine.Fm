const todoListSaga = require('./todolist.saga');

describe('holds all the test for the todo list saga', () => {
    test('this test should run the function that gets all of the resources for the user', () => {
        const generator = FetchTodoList();
        expect(generator.next().value).toEqual(call())
    });

    test('this test should run the function that adds a specific resource', () => {
        const generator = postTodoResource();
        expect(generator.next().value).toEqual(call())
    });

    test('this test should delete a resource with a specific number in the req params from the user', () => {
        const generator = deleteTodoResource();
        expect(generator.next().value).toEqual(call())
    });

    test('this test should update a resource from query params passed in', () => {
        const generator = putTodoResource();
        expect(generator.next().value).toEqual(call())
    });

    test('this test should delete all resources', () => {
        const generator = deleteTodoList();
        expect(generator.next().value).toEqual(call())
    });

})