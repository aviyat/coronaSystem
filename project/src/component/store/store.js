import produce from 'immer';
import { createStore, applyMiddleware } from 'redux'

const state = {

    
    member:{

    }
};

const reducer = produce((state, action) => {
    
    switch (action.type) {

         
            case 'ADD_MEMBER':{
                debugger
                state.member={...action.payload}
                break
            }
          
           
    }
}, state);

const store = createStore(reducer);
window.store = store;
export default store;




