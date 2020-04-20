import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  methods: {
    fetchData(url) {
      console.log(url);
      Vue.axios.get(url).then((response) => {
        return response.data.docs;
      });
    },
  }
}