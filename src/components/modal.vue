<template>
  <div>
    {{ title }}
    {{ year }}
    <div v-for="author in authors" :key=author.i>
      {{author}}
    </div>
    <figure>
      <img :src="imageUrl" />
    </figure>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: {
    title: String,
    imageUrl: String,
    year: String,
    authors: Array,
  }
}
</script>