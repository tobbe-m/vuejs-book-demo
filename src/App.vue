<template>
  <div id="app">
    <header class="header">
      <h1 class="page-title">Book search</h1>
    </header>
    <div class="content">
      <form class="book-search-form" name="book-search">
        <label for="book-search" class="book-search-label">Use the search field below to find books</label>
        <input name="book-search" id="book-search" class="search-field" type="text" v-model="search" placeholder="Search for books" title="Book searcg field" />
      </form>
      <div v-if="loading && search != ''">
        <div class="loader-icon"></div>
      </div>
      <div v-else>
        <div v-if="books != null">
          <div class="book-list" v-if="books.length > 0">
            <bookPage v-for="book in books" v-bind:key="book.key" :book="book" />
          </div>
          <div v-else-if="books.length == 0">
            Sorry no results
          </div>
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
              let searchUrl = ('https://openlibrary.org/search.json?limit=100&title=').concat(newVal);
              Vue.axios.get(searchUrl).then((response) => {
                this.books = response.data.docs;
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

<style lang="scss">
  @import './assets/scss/styles.module.scss';
</style>
