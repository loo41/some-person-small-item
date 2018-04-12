const ask = {
    state: {
        askList: []
    },
    mutations: {
        updateAsk (state, list) {
            state.askList = list;
        },
        addAsk (state, list) {
            state.askList = state.askList.push(list);
        }
    }
};

export default ask;
