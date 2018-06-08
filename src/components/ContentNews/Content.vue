<template>
    <div class="content" id="posts">
        <div class="content__wrapper">
            <div class="content__news">
                <div class="content__news-latest">
                    <div class="content__news-latest-text">Latest posts</div>
                </div>
                <div class="content__news-posts" v-if="!loading">
                    <NewsCard :key="article.id" v-for="article in result" >
                        <a class="newsCard__link" :href="article.url" target="_blank">
                            <img  class="newsCard__link-img" :src="article.urlToImage ? article.urlToImage : fakeImage" :alt="article.title">
                            <div class="newsCard__news-title">{{article.title ? article.title : " "}}</div>
                            <p class="newsCard__news-time">{{article.publishedAt ? article.publishedAt.replace(/[\T\Z]/g, ' ') : " "}}</p>
                        </a>
                    </NewsCard>
                </div>
                <Loader v-if="loading"/>
                <Pagination
                        :allNewsLength="allNewsLength"
                        :pageSize="pageSize"
                        @activePageChanged="changePage"/>
            </div>
            <div class="content__additional">
                <div class="weather-widget">
                    <Weather />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import NewsCard from "../NewsCard/NewsCard";
    import Pagination from "../Pagination/Pagination";
    import Loader from "../Loader/Loader";
    import { EventBus } from "../EventBus";
    import Weather from "../Weather/Weather";

    const apiKey = 'b8d411a4e22745308fab1a665115c094';

    export default {
        name: "Content",
        components: {Weather, Pagination, NewsCard, Loader},
        data() {
            return {
                result: [],
                allNewsLength: '',
                loading: true,
                newsUrlParam: 'top-headlines?sources=bbc-news,the-next-web,the-verge',
                pageNumberParam: 1,
                language: 'en',
                pageSize: 20,
                fakeImage: '../../assets/image/news.jpg'
            }
        },
        mounted() {
            this.getNews(this.newsUrlParam);
        },
        created() {
            EventBus.$on('newsUrlChange', (type) => {
                this.pageNumberParam = 1;
                this.newsUrlParam = type === 'in world' ?'top-headlines?sources=bbc-news,the-next-web,the-verge' : `top-headlines?category=${type}`;
                this.getNews(this.newsUrlParam);
            });
            EventBus.$on('getSearchNews', searchParams => {
               const param = `everything?q=${searchParams}`;
                this.getNews(param);
            })
        },
        methods: {
            getNews(param) {
                const newsUrl = `https://newsapi.org/v2/${param}&language=${this.language}&pageSize=${this.pageSize}&page=${this.pageNumberParam}&apiKey=${apiKey}`;
                axios.get(newsUrl).then(response => {
                    this.loading = false;
                    this.result = response.data.articles;
                    this.allNewsLength = response.data.totalResults;
                }).catch((error) => {
                    console.log(error);
                });
            },
            changePage(page) {
                this.pageNumberParam = page;
                this.getNews(this.newsUrlParam)
            }
        }
    };

</script>

<style src="./Content.less"></style>
