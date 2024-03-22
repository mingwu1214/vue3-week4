import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

// Create Vue app
const app = createApp({
  data(){
    return {
      apiUrl : 'https://vue3-course-api.hexschool.io/v2',// API base URL
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // Method to perform user login
    login() {
      const api = `${this.apiUrl}/admin/signin`;

      axios.post(api, this.user)
        .then((res) => {
          const { expired, token } = res.data;
          document.cookie = `mingToken=${token};expires=${new Date(expired)}; path=/`;
          window.location = 'index.html';
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
  }
});
// Mount the app to the HTML element with id 'app'
app.mount('#app')