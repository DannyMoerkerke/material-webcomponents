import {INCREMENT, DECREMENT} from '../actions/index.js';

export default (state, action) => {
    switch(action.type) {

        case INCREMENT:
            return Object.assign(state, {counter: state.counter + action.amount});

            break;

        case DECREMENT:
            return Object.assign(state, {counter: state.counter - action.amount});

            break;

        default:
            return state;

    }
};
