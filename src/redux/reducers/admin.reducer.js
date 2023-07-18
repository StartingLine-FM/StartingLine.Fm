//manages state of the resources
//listens for actions and updates for the state
const adminReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_RESOURCES':
            //when SET is dispatched updates and returns new list/state
        return action.payload;
        default:
            //if no case matches, just keeps the state the same
            return state;
    }
};
// sets the resources for the admin to have access via the payload/state
export default adminReducer;