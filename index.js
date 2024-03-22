import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

//import components
import pagination from './pagination.js';
import productModal from './productModal.js';
import delModal from './delModal.js';

const app = createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'mingwu', // API path
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
      modalProduct: null,
      modalDel: null,
      pages: {},
    }
  },
  methods: {
    //Login Verification
    checkAdmin() {
      const api = `${this.apiUrl}/api/user/check`;
      axios.post(api)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message)
          window.location = 'login.html';
        })
    },
    //Get Product Data
    getData(page) {
      const api = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;

      axios.get(api)
        .then((res) => {
          this.products = res.data.products;
          this.pages = res.data.pagination;
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    //Update Product Data
    updateProduct() {
      let api = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let http = 'post';

      // Determine API mode (Create or Update)
      if(!this.isNew) {
        api = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        http = 'put'
      }

      axios[http](api, { data: this.tempProduct })
        .then((res) => {
          alert(res.data.message);
          this.getData();
          this.$refs.pModal.closeModal();
          this.tempProduct = {};
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    //Popup Window
    openModal(status, item) {
      if(status === 'new'){
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        this.$refs.pModal.openModal();
      } else if (status === 'edit'){
        this.tempProduct = {...item};
        if(!Array.isArray(this.tempProduct.imagesUrl)){
          this.tempProduct.imagesUrl = [];
        }
        this.isNew = false;
        this.$refs.pModal.openModal();
      } else if (status === 'delete') {
        this.tempProduct = {...item};
        this.$refs.delModal.openModal();
      }
    },
    //Delete product
    delProduct() {
      const api = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

      axios.delete(api)
        .then((res) => {
          alert(res.data.message);
          this.$refs.delModal.closeModal();
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    }
  },
  mounted() {
    //Extract token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)mingToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  },
  components: { //Component Registration
    pagination,
    productModal,
    delModal
  }
});
app.mount('#app')