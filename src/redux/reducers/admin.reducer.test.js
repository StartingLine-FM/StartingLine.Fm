import adminReducer from '../redux/reducers/admin.reducer';

describe('adminReducer', () => {
  it('should return the initial state', () => {
    expect(adminReducer(undefined, {})).toEqual([]);
  });

  it('should handle SET_RESOURCES', () => {
    const mockResources = [
      { id: 1, name: 'Resource 1' },
      { id: 2, name: 'Resource 2' }
    ];
    const action = { type: 'SET_RESOURCES', payload: mockResources };
    expect(adminReducer([], action)).toEqual(mockResources);
  });
});