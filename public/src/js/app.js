const app = new Vue({
  el: '#app',
  data: {
    query: '',
    page: 1,
    results: [],
    processing: false
  },
  methods: {
    async fetchResults() {
      try {
        if (this.page === 1) {
          this.results = [];
        }
        this.processing = true;
        const resp = await axios.get('https://api.unsplash.com/search/photos', {
          params: {
            page: this.page,
            query: this.query
          },
          headers: {
            Authorization: `Client-ID 5da5bf6418e04d2ceee5e4ff1f64204e3fdda31a0bbf75c848c4fca0c29c95f7`
          }
        });
        const {results} = resp.data;
        if (this.page === 1) {
          this.results = results;
        } else {
          this.results = this.results.concat(results);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.processing = false;
      }
    }
  }
});