
export const getters = {
    getNewsResult: (state) => state.result,
    getPageNumber: state => state.pageNumberParam,
    getNewsUrlParam: state => state.newsUrlParam,
    getIsLoading: state => state.loading,
    getAllNewsLength: state => state.allNewsLength,
    getFakeImage: state => state.fakeImage,
    getPages: state => state.pages,
    getActivePage: state => state.activePage
};
