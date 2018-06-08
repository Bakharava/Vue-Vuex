<template>
    <div class="pagination">
        <a class="pagination__quot"
           @click="decreasePages(pages)">&laquo;</a>
        <a v-bind:class="['pagination__page', page === isActive? 'active' : '', 'number'+page]"
           :key="page"
           v-for="page in changePagesAmount"
           @click="getActivePage(page)"
        >{{page}}</a>
        <div class="pagination__dot" v-if="totalPages > 3">. . .</div>
        <a v-bind:class="['pagination__page', totalPages === isActive? 'active' : '', 'number'+totalPages]"
           v-if="totalPages > 3"
           @click="getActivePage(totalPages)"
        >{{totalPages}}</a>
        <a class="pagination__quot"
           @click="increasePages(pages)"
        >&raquo;</a>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            allNewsLength: Number,
            pageSize: Number
        },
        data() {
            return {
                pages: [],
                isActive: 1
            }
        },
        computed: {
            changePagesAmount() {
                return this.getPagesAmount(this.allNewsLength);
            },
            totalPages() {
                return Math.ceil(this.allNewsLength / this.pageSize);
            },
            changePageUp() {
                return this.increasePages(this.pages);
            },
            changePageDown() {
                return this.decreasePages(this.pages);
            },
        },

        mounted() {
            this.getPagesAmount();
        },
        methods: {
            getActivePage(page) {
                this.$emit('activePageChanged', page);
                this.isActive = page;
            },
            decreasePages(pages) {
                let arr = pages.map(page => {
                    return page - 1
                });
                console.log(arr);
                return this.pages = arr
            },
            increasePages(pages) {
              let arr =   pages.map(page => {
                    return page + 1
                });
                console.log(arr);
                return this.pages = arr;
            },
            getPagesAmount(amount) {
                this.pages = [];
                let pagesAmount = Math.ceil(amount / this.pageSize);
                if (pagesAmount > 3) {
                    for (let i = 0; i < 3; i++) {
                        this.pages.push(i + 1);
                    }
                } else {
                    for (let i = 0; i < pagesAmount; i++) {
                        this.pages.push(i + 1);
                    }
                }
                return this.pages;
            }
        }
    }
</script>

<style src="./Pagination.less"></style>
