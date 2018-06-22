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
            commit('setNewsResult', {data:result, allNewsLength: allNewsLength})
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e)
        }
    },
    changeNewsType({commit}, type) {
        commit('setNewsType', type)
    },
    setPageNumber({commit}, page) {
        commit('setPageNumber', page)
    },
    setPagesAmount({commit}, pages) {
        commit('setPagesAmount', pages)
    }
};
