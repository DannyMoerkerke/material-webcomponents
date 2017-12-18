export default (initialState, reducer) => {

    let state = initialState;

    document.addEventListener('action', e => {
        console.log('before dispatch', state);
        state = reducer(state, e.detail.action);

        console.log('action', e.detail.action);
        console.log('after dispatch', state);

        document.dispatchEvent(new CustomEvent('state-change', {
            detail: {
                state
            }
        }));
    });

    return {
        getState: () => state
    }
};