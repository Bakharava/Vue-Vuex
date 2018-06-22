export const mutations = {
    setNewsResult(state, {data, allNewsLength}) {
        return state = Object.assign(state, {result: data, allNewsLength: allNewsLength, loading: false})
    },
    setNewsType(state, type) {
        return state.newsUrlParam = type === 'in world' ? 'top-headlines?sources=bbc-news,the-next-web,the-verge' : `top-headlines?category=${type}`;
    },
    setPageNumber(state, page) {
        return state.pageNumberParam = page;
    },
    setPagesAmount(state, pages) {
       return state.pages = pages;
    }
};
