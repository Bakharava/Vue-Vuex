<template>
  <div id="app">
    <div class="main-container">
      <Header />
      <Content />
      <Footer/>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header/Header";
import Content from "./components/ContentNews/Content";
import Footer from "./components/Footer/Footer";

export default {
  name: 'app',
  components: {
      Footer,
      Content,
      Header
  },
    data() {
      return {
          newsParam: ''
      }
    },
    methods: {
    }
}
</script>

<style src="./app.less"></style>
