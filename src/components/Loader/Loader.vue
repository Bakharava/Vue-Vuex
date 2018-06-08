<template>
    <div class="spinner">
        <div v-for="point in keyPoints" v-bind:class="['point', className+point]" :key="point"></div>
    </div>
</template>

<script>
    export default {
        name: "Loader",
        data() {
            return {
                keyPoints: [],
                className: "point-"
            }
        },
        mounted() {
            this.getKeyPoint();
        },
        methods: {
            getKeyPoint() {
                for (let i = 0; i <= 12; i++) {
                    this.keyPoints.push(i+1);
                }
            }
        }
    }
</script>

<style src="./Loader.less"></style>
