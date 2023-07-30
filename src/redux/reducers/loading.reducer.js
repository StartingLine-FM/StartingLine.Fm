

const initialState = {
    loadingEP: false,
    loadingFU: false,
    loadingChamber: false,
  };
  
  export const EP_Loading_Reducer = (state = initialState.loadingEP, action) => {
    switch (action.type) {
      case 'SET_LOADING_EP':
        return true; // Set loadingEP to true
      case 'CLEAR_LOADING_EP':
        return false; // Set loadingEP to false
      default:
        return state;
    }
  };
  
  export const FU_Loading_Reducer = (state = initialState.loadingFU, action) => {
    switch (action.type) {
      case 'SET_LOADING_FU':
        return true; // Set loadingFU to true
      case 'CLEAR_LOADING_FU':
        return false; // Set loadingFU to false
      default:
        return state;
    }
  };
  
  export const chamber_Loading_Reducer = (state = initialState.loadingChamber, action) => {
    switch (action.type) {
      case 'SET_LOADING_CHAMBER':
        return true; // Set loadingChamber to true
      case 'CLEAR_LOADING_CHAMBER':
        return false; // Set loadingChamber to false
      default:
        return state;
    }
  };
  
