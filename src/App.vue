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
              let searchUrl = ('http://openlibrary.org/search.json?limit=100&title=').concat(newVal);
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

$color-white: #fff;
$color-black: #000;
$color-purple: rebeccapurple;
$color-purple-light: lighten($color-purple, 20);
$color-purple-lighter: lighten($color-purple, 40);

body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.page-title {
  margin: 0;
  font-size: 3rem;
}

.header {
  padding: 0.5rem;
  background-color: $color-purple;
  color: $color-white;
  font-size: 2rem;
}

.content {
  padding: 3rem;
}

.search-field {
  padding: 0.6rem;
  font-size: 1.3rem;
  margin-bottom: 2rem;
  border: 1px solid $color-purple-light;
}

.book-search-label {
  display: block;
  margin-bottom: 1rem;
}

.loader-icon {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin-top: 1rem;
}

.loader-icon:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid $color-purple;
  border-color: $color-purple transparent $color-purple transparent;
  animation: loader-icon 1.2s linear infinite;
}

@keyframes loader-icon {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.book-list {
  display: grid;
  grid-template-columns: repeat(1, minmax(100%, 1fr));
  grid-gap: 1rem;

  @media only screen and (min-width: 37.5em) {
    grid-template-columns: repeat(2, minmax(49%, 1fr));
  }

  @media only screen and (min-width: 62.5em) {
    grid-template-columns: repeat(4, minmax(24%, 1fr));
  }
}

.book-item {
  grid-column: span 1;
  border: 2px solid $color-purple;
  position: relative;
  box-shadow: 5px 5px 10px 2px rgba($color-purple, 0.20);
}

.book-image {
  margin: 0;
  height: 200px;
  overflow: hidden;

  img {
    max-width: 100%;
  }
}

.book-no-image {
  height: 200px;
  background-color: $color-purple-lighter;
  display: flex;
  align-items: center;
  justify-content: center;
}

.book-title {
  font-size: 1.5rem;
  padding: 0.5rem;
  color: $color-black;
}

.book-content {
  padding: 1rem;
}

.read-more, .close-modal {
  position: absolute;
  width: 50px;
  height: 50px;
  display: block;
  background-color: $color-white;
  border: 2px solid $color-purple-light;
  border-radius: 50%;
  top: 10px;
  right: 10px;
  cursor: pointer;

  &::before, &::after {
    content: "";
    width: 2px;
    height: 30px;
    background-color: $color-purple-light;
    display: block;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

  }

  &::before {

  }

  &::after {
    transform: rotate(90deg);
  }

  &:hover {
    background-color: $color-purple-lighter;

    &::before, &::after {
      background-color: $color-white;
    }
  }
}

.close-modal {
  width: 30px;
  height: 30px;
  transform: rotate(45deg);

  &::before, &::after {
    height: 20px;
  }
}

.book-modal {
  overflow: auto;
  display: flex;
}

.modal-image {
  margin: 0;

  img {
    display: block;
  }
}

.modal-content {
  padding: 1rem;
  padding-top: 3rem;
  flex-grow: 1;
  width: 50%;
}

.modal-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.modal-info {
  display: flex;
}

.modal-year {
  flex-grow: 1;
  text-align: right;
}

.modal-no-image {
  width: 50%;
  flex-grow: 1;
  background-color: $color-purple-lighter;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 1rem;
}

//

.animated-icon{
  //height: 9.5em;
  position: relative;
  //width: 12.7em;
  width: 60%;
  height: 65%;
  max-width: 12.7em;

  .modal-no-image & {
    min-height: 6.5em;

   .book-cover {
     &::after {
       top: -58%;
     }
   } 
  }
  
  .book-cover {
    background: none;
    border: 0.5em solid #000;
    // height: 7em;
    // width: 5.5em;
    height: 73%;
    width: 43%;
    transform: rotateY(10deg) skewY(5deg);
    transform-style: preserve-3d;
    transform-origin: right;
    position: absolute;
    z-index: 0;
    margin-top: 22px;

    &::after{
      content: '';
      @extend .book-cover;
      position: absolute;
      left: 100%;
      top: -50%;
      height: 100%;
      width: 100%;
      transform: rotateY(0deg) skewY(-10deg);
    }
  }
  .page{
    transform-origin: right;
    position: absolute;
    top: 17.5%;
    left: 3%;
    //height: 7em;
    height: 75%;
    border: 4px solid #000;
    background: #fff;
    z-index: 10;
    //width: 5.5em;
    width: 43%;
    transform: rotateY(0deg) skewY(15deg) scaleX(0.8);
    transform-style: preserve-3d;

    &::before{
      content: "";
      position: absolute;
      // top: -.25em;
      // left: -.25em;
      top: -3.1%;
      left: -3.1%;
      transform-origin: right;
      transform: rotateY(180deg) skewY(20deg) scaleX(0.95);
      transform-style: preserve-3d;
      border: 4px solid #000;
      background: #fff;
      z-index: 100;
      //height: 7em;
      height: 100%;
      //width: 5.5em;
      width: 100%;
      animation: turn 2s ease-in-out infinite;
    }
     &::after{
      content: "";
      position: absolute;
      // top: -.25em;
      // left: -.25em;
      top: -3.1%;
      left: -3.1%;
      transform-origin: right;
      transform: rotateY(180deg) skewY(25deg) scaleX(0.95);
      transform-style: preserve-3d;
      border: 4px solid #000;
      background: #fff;
      z-index: 100;
      //height: 7em;
      height: 100%;
      //width: 5.5em;
      width: 100%;
    } 
  }
}
@-webkit-keyframes turn {
  0% { transform: rotateY(180deg) skewY(25deg) scaleX(0.95); }
  40% { transform: rotateY(0deg) skewY(0) scaleX(0.95); }
  100% { transform: rotateY(0deg) skewY(0) scaleX(0.95); }
}
@keyframes turn {
  
  0% { transform: rotateY(180deg) skewY(25deg) scaleX(0.95); }
  40% { transform: rotateY(0deg) skewY(0) scaleX(0.95); }
  100% { transform: rotateY(0deg) skewY(0) scaleX(0.95); }
}

</style>
