export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';

export const increment = amount => ({type: INCREMENT, amount});
export const decrement = amount => ({type: DECREMENT, amount});