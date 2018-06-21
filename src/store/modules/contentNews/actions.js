import api from "../../../api/api";

const language = 'en';
const pageSize = 20;

export const actions = {
    async getNews({ commit }, param, pageNumberParam) {
        try {
            const apiKey = 'b8d411a4e22745308fab1a665115c094';

            const newsUrl = await api().get(`https://newsapi.org/v2/${param}&language=${language}&pageSize=${pageSize}&page=${pageNumberParam}&apiKey=${apiKey}`);
            const result = await newsUrl.data.articles;
            const allNewsLength = await newsUrl.data.totalResults;
            commit('setNewsResult',  result, allNewsLength)
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e)
        }
    },
};