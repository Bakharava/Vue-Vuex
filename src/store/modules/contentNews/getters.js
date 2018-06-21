
export const getters = {
    getNewsResult: (state) => {
        return state.result
    },
    getPageNumber: state => state.pageNumberParam,
    getNewsUrlParam: state => state.newsUrlParam,
    getIsLoading: state => state.loading,
    getAllNewsLength: state => state.allNewsLength
};
