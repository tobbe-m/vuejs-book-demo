<template>
  <div class="book-modal">
    <button class="close-modal" v-on:click="closeModal()"></button>
    <figure v-if="imageUrl" class="modal-image">
      <img :src="imageUrl" />
    </figure>
    <div class="modal-no-image" v-else>
      <bookIcon />
    </div>
    <div class="modal-content">
      <div class="modal-title">{{ title }}</div>
      <div class="modal-info">
        <div class="modal-author">
          <div v-for="author in authors" :key=author.i>{{author}}</div>
        </div>
        <div class="modal-year">{{ year }}</div>
      </div>
    </div>
  </div>
</template>

<script>

import bookIcon from './book-icon.component.vue';

export default {
  name: 'modal',
  components: {
    bookIcon
  },
  props: {
    title: String,
    imageUrl: String,
    year: String,
    authors: Array,
  },
  methods: {
    closeModal: function() {
      this.$modal.hide(this.$parent.name);
    },
  }
}
</script>