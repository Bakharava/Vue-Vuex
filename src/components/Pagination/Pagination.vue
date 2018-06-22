<template>
    <div class="pagination">
        <a class="pagination__quot"
           @click="decreasePages(pages)">&laquo;</a>
        <a v-bind:class="['pagination__page', page === isActive? 'active' : '', 'number'+page]"
           :key="page"
           v-for="page in pages"
           @click="getActivePage(page)"
        >{{page}}</a>
        <div class="pagination__dot" v-if="totalPages > 6">. . .</div>
        <a v-bind:class="['pagination__page', totalPages === isActive? 'active' : '', 'number'+totalPages]"
           v-if="totalPages > 6"
           @click="getActivePage(totalPages)"
        >{{totalPages}}</a>
        <a class="pagination__quot"
           @click="increasePages(pages)"
        >&raquo;</a>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    const pageSize = 20;
    export default {
        name: "Pagination",
        data() {
            return {
                isActive: 1
            }
        },
        computed: {
            ...mapGetters('content', {
                newsUrlParam: 'getNewsUrlParam',
                pageNumberParam: 'getPageNumber',
                allNewsLength: 'getAllNewsLength',
                pages: 'getPages'
            }),
          /*  changePagesAmount() {
                return this.getPagesAmount(this.allNewsLength);
            },*/
            totalPages() {
                return Math.ceil(this.allNewsLength / pageSize);
            },
           /* changePageUp() {
                return this.increasePages(this.pages);
            },
            changePageDown() {
                return this.decreasePages(this.pages);
            },*/
        },

        mounted() {
            this.getPagesAmount(this.allNewsLength)
        },
        methods: {
            ...mapActions('content', [
                'getNews',
                'setPageNumber',
                'setPagesAmount'
            ]),
            getActivePage(page) {
                this.setPageNumber(page);
                this.getNews({
                    url: this.newsUrlParam,
                    pageNum: this.pageNumberParam
                });
                this.isActive = page;
            },
            decreasePages(pages) {
                let arr = pages.map(page => {
                    return page - 5
                });
                this.setPagesAmount(arr)
            },
            increasePages(pages) {
              let arr =   pages.map(page => {
                    return page + 5
                });
                this.setPagesAmount(arr)
            },
            getPagesAmount(amount) {
                let pages = [];
                let pagesAmount = Math.ceil(amount / pageSize);
                if(pagesAmount <= 6) {
                    for (let i = 1; i <= pagesAmount; i++) {
                        pages.push(i)
                    }
                } else {
                    for (let i = 1; i <=6; i++) {
                        pages.push(i);
                    }
                }
                console.log(pages)
                this.setPagesAmount(pages);
            }
        }
    }
</script>

<style src="./Pagination.less"></style>
