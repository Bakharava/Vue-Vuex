import api from '../../../api/api';

const language = 'en';
const pageSize = 20;

export const actions = {
    async getNews({commit}, {url, pageNum}) {
        try {
            const apiKey = 'b8d411a4e22745308fab1a665115c094';
            const newsUrl = await api().get(`https://newsapi.org/v2/${url}&language=${language}&pageSize=${pageSize}&page=${pageNum}&apiKey=${apiKey}`);
            const result = await newsUrl.data.articles;
            const allNewsLength = await newsUrl.data.totalResults;
            const status = await newsUrl.data.status;
            if (status === 'ok') {
                commit('setNewsResult', {data: result, allNewsLength: allNewsLength});
                if (pageNum <= 6) {
                    commit('setPagesAmount');
                }
            } else {
                commit('setNoData');
            }

        } catch (error) {
            commit('setError', error);
        }
    },
    changeNewsType({commit}, type) {
        commit('setNewsType', type);
    },
    changeSearchParam({commit}, newTypeParam) {
        commit('changeSearchParam', newTypeParam);
    },
    setPageNumber({commit}, page) {
        commit('setPageNumber', page);
    },
    setPagesAmount({commit}) {
        commit('setPagesAmount');
    },
    setActivePage({commit}, page) {
        commit('setActivePage', page);
    },
    changePagesValue({commit}, arrayOfPages) {
        commit('changePagesValue', arrayOfPages);
    }
};
