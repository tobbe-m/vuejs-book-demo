<template>
  <div>
    <h1>{{ book.title }}</h1>
    <img :src="this.imagePath + book.cover_i + ' -S.jpg'" />
    <div v-for="author in book.author_name" :key=author.i>
      {{author}}
    </div>
    <button v-on:click="openModal({title: book.title, coverId: book.cover_i, year: book.first_publish_year, authors: book.author_name })">Read more</button>
    <modals-container/>
  </div>
</template>

<script>
import Vue from 'vue';
import VModal from 'vue-js-modal';
import modal from './modal.vue';


Vue.use(VModal, { dynamic: true, injectModalsContainer: true });

export default {
  name: 'bookPage',
  props: {
    book: Object,
  },
  data() {
    return {
      coverId: null,
      imagePath: 'http://covers.openlibrary.org/b/id/',
    }
  },
  mounted() {
    this.coverId = this.book.cover_i;
  },
  methods: {
    openModal: function(data) {
      let modalTitle = data.title;
      let modalCover = this.imagePath + data.coverId + '-L.jpg';
      let year = data.year.toString();
      let authors = data.authors;
      this.$modal.show(modal, {
        title: modalTitle,
        imageUrl: modalCover,
        year: year,
        authors: authors,
      });
    },
  }
}
</script>