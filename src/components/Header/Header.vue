<template>
    <div class="wrapper">
        <div class="header">
            <div class="header__link">
                <div class="header__logo">
                    <img class="header__logo-img" src="../../assets/image/logo.svg"/>
                </div>
                <div class="header__link-news">
                    <!--<a class="fa fa-home link-home"></a>-->
                    <a v-bind:class="['type', type === isActive ? 'active' : '']"
                       v-for="type in newsType"
                       :key="type"
                       @click="getNewsType(type)">
                        {{type}}
                    </a>
                </div>
                <div class="header__search">
                    <div class="search-news" target="_self">
                        <input id="search-news-input"
                               type="search"
                               autocomplete="off"
                               v-model="searchParam"
                               @change="getSearchNews(searchParam)">
                    </div>
                    <a class="link-social fa fa-twitter" href="https://www.twitter.com/" target="_blank"></a>
                    <a class="link-social fa fa-pinterest" href="https://www.pinterest.com/" target="_blank"></a>
                    <a class="link-social fa fa-facebook" href="https://www.facebook.com/" target="_blank"></a>
                    <a class="link-social fa fa-instagram" href="https://www.instagram.com/" target="_blank"></a>
                </div>
            </div>
        </div>
        <sub-header/>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import '../../assets/fonts/font-awesome/css/font-awesome.css';
    import SubHeader from './SubHeader/SubHeader';

    export default {
        name: "Header",
        components: {SubHeader},
        data() {
            return {
                newsType: ['in world', 'sport', 'music', 'business'],
                searchParam: '',
                isActive: 'in world'
            }
        },
        computed: {
            ...mapGetters('content', {
                newsUrlParam: 'getNewsUrlParam',
                pageNumberParam: 'getPageNumber',
            })
        },
        methods: {
            ...mapActions('content', [
                'getNews',
                'changeNewsType',
                'changeSearchParam'
            ]),
            getNewsType(type) {
                this.changeNewsType(type);
                this.getNews({
                    url: this.newsUrlParam,
                    pageNum: this.pageNumberParam
                });
                this.isActive = type;
                this.searchParam = '';
            },
            getSearchNews(searchParam) {
                const newTypeParam = `everything?q=${searchParam}`;
                this.changeSearchParam(newTypeParam);
                this.getNews({
                    url: newTypeParam,
                    pageNum: this.pageNumberParam
                });
                this.isActive = '';
                this.searchParam = '';
            }
        }
    }
</script>

<style src="./Header.less"></style>
