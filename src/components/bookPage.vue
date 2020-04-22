<template>
  <div class="book-item">
    <figure v-if="book.cover_i" class="book-image">
      <img :src="this.imagePath + book.cover_i + ' -L.jpg'" :alt="'Cover for ' + book.title" />
    </figure>
    <div v-else>
      <div class="book-no-image">
        <bookIcon />
      </div>
    </div>
    <div class="book-content">
      <div class="book-title">{{ book.title }}</div>
      <div class="book-author" v-for="author in book.author_name" :key=author.i>{{author}}</div>
    </div>
    <button class="read-more" v-on:click="openModal({title: book.title, coverId: book.cover_i, year: book.first_publish_year, authors: book.author_name })"></button>
    <modals-container :adaptive="true" height="95%" />
  </div>
</template>

<script>
import Vue from 'vue';
import VModal from 'vue-js-modal';
import modal from './modal.vue';
import bookIcon from './book-icon.component.vue';

Vue.use(VModal, { dynamic: true, injectModalsContainer: true });

export default {
  name: 'bookPage',
  props: {
    book: Object,
  },
  components: {
    bookIcon
  },
  data() {
    return {
      coverId: null,
      imagePath: 'https://covers.openlibrary.org/b/id/',
    }
  },
  mounted() {
    this.coverId = this.book.cover_i;
  },
  methods: {
    openModal: function(data) {
      let modalTitle = data.title;
      let modalCover = (data.coverId ? this.imagePath + data.coverId + '-L.jpg' : null);
      let year = data.year.toString();
      let authors = data.authors;
      this.$modal.show(modal, {
        title: modalTitle,
        imageUrl: modalCover,
        year: year,
        authors: authors,
      }, { height: 'auto', adaptive: true },
      );
    },
  }
}
</script>