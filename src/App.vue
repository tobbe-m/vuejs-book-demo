<template>
  <div id="app">
    <input type="text" v-model="search" placeholder="search text" />
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="books != null">
        <div v-if="books.length > 0">
          <bookPage v-for="book in books" v-bind:key="book.key" :book="book" />
        </div>
        <div v-else-if="books.length == 0">
          Sorry no results
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bookPage from './components/bookPage.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vue from 'vue';

Vue.use(VueAxios, axios);

export default {
  name: 'App',
  components: {
    bookPage
  },
  data() {
    return {
      books: null,
      search: '',
      awaitingSearch: false,
      loading: false,
    }
  },
  watch: {
    'search': function() {
      if (this.search.length > 2) {
        this.loading = true;
        if (!this.awaitingSearch) {
          setTimeout(() => {
            if (this.search != '') {
              let newVal = encodeURIComponent(this.search);
              let searchUrl = ('http://openlibrary.org/search.json?limit=100&title=').concat(newVal);
              Vue.axios.get(searchUrl).then((response) => {
                this.books = response.data.docs;
                console.log(this.books);
                this.loading = false;
              });
            }
            this.awaitingSearch = false;
          }, 1000);
          this.awaitingSearch = true;
        }
      }
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
