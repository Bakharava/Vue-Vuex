<template>
    <div class="pagination">
        <a class="pagination__quot"
           v-if="totalPagesSize > 6 && pages[0] > 1"
           @click="decreasePages(pages)">
            &laquo;
        </a>
        <a v-bind:class="['pagination__page', page === activePage? 'active' : '', 'number'+page]"
           :key="page"
           v-for="page in pages"
           @click="getActivePageData(page)">
            {{page}}
        </a>
        <div class="pagination__dot" v-if="totalPagesSize > 6 && pages[pages.length-1] !== totalPagesSize-1">. . .</div>
        <a v-bind:class="['pagination__page', totalPagesSize === activePage? 'active' : '', 'number'+totalPages]"
           v-if="totalPages > 6"
           @click="getActivePageData(totalPagesSize)"
        >{{totalPagesSize}}</a>
        <a class="pagination__quot"
           v-if="totalPagesSize > 6 && pages[pages.length-1] < totalPagesSize-1 "
           @click="increasePages(pages)"
        >&raquo;</a>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    const pageSize = 20;
    export default {
        name: 'Pagination',
        data() {
            return {
                totalPagesSize: ''
            }
        },
        computed: {
            ...mapGetters('content', {
                newsUrlParam: 'getNewsUrlParam',
                pageNumberParam: 'getPageNumber',
                allNewsLength: 'getAllNewsLength',
                pages: 'getPages',
                activePage: 'getActivePage'
            }),
            totalPages() {
                return this.totalPagesSize = Math.ceil(this.allNewsLength / pageSize);
            },
        },
        methods: {
            ...mapActions('content', [
                'getNews',
                'setPageNumber',
                'setPagesAmount',
                'setActivePage',
                'changePagesValue'
            ]),
            getActivePageData(page) {
                this.setPageNumber(page);
                this.setActivePage(page);
                this.getNews({
                    url: this.newsUrlParam,
                    pageNum: this.pageNumberParam
                });
                if (this.totalPagesSize > 6 && page === this.totalPagesSize) {
                    let arr = [1, 2, 3, 4, 5, 6];
                    arr = arr.map(item => {
                        return this.totalPagesSize - item;
                    });
                    arr.sort();
                    this.changePagesValue(arr);
                }

            },
            decreasePages(pages) {
                if (this.totalPagesSize > 6 && pages[0] > 1) {
                    let arr = pages.map(page => {
                        return page - 1;
                    });
                    this.changePagesValue(arr);
                }
            },
            increasePages(pages) {
                if (this.totalPagesSize > 6 && pages[pages.length - 1] + 1 < this.totalPagesSize) {
                    let arr = pages.map(page => {
                        return page + 1
                    });
                    this.changePagesValue(arr);
                }
            },
        }
    }
</script>

<style src="./Pagination.less"></style>
