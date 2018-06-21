export const mutations ={
    setNewsResult(state, data, allNewsLength) {
        return state = Object.assign(state, {result: data}, {allNewsLength: allNewsLength}, {loading: false})
    }
};
