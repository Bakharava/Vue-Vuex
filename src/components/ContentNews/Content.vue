<template>
    <div class="content" id="posts">
        <div class="content__wrapper">
            <div class="content__news">
                <div class="content__news-latest">
                    <div class="content__news-latest-text">Latest posts</div>
                </div>
                <div class="content__news-posts" v-if="!loading">
                    <news-card :key="article.id" v-for="article in result">
                        <a class="newsCard__link" :href="article.url" target="_blank">
                            <img class="newsCard__link-img" :src="article.urlToImage ? article.urlToImage : fakeImage"
                                 :alt="article.title">
                            <div class="newsCard__news-title">{{article.title ? article.title : " "}}</div>
                            <p class="newsCard__news-time">{{article.publishedAt ?
                                article.publishedAt.replace(/[\T\Z]/g, ' ') : " "}}</p>
                        </a>
                    </news-card>
                </div>
                <Loader v-if="loading"/>
                <pagination />
            </div>
            <div class="content__additional">
                <div class="weather-widget">
                    <weather/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NewsCard from '../NewsCard/NewsCard';
    import Pagination from '../Pagination/Pagination';
    import Loader from '../Loader/Loader';
    import Weather from '../Weather/Weather';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "Content",
        components: {Weather, Pagination, NewsCard, Loader},
        computed: {
            ...mapGetters('content', {
                result: 'getNewsResult',
                newsUrlParam: 'getNewsUrlParam',
                pageNumberParam: 'getPageNumber',
                loading: 'getIsLoading',
               allNewsLength: 'getAllNewsLength',
                fakeImage: 'getFakeImage'
            })
        },
        mounted() {
            this.getNews({
                url: this.newsUrlParam,
                pageNum: this.pageNumberParam
            });
        },
        methods: {
            ...mapActions('content', [
                'getNews',
                'setPageNumber'
            ])
        }
    };

</script>

<style src="./Content.less"></style>
