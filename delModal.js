export default {
  // Props received from parent: tempProduct object, delProduct method, and getData method
  props: ['tempProduct','delProduct','getData'],
  data() {
    return {
      modalDel: null,
    }
  },
  methods: {
    // Method to open the delete product modal
    openModal() {
      this.modalDel.show();
    },
    // Method to close the delete product modal
    closeModal() {
      this.modalDel.hide();
    }
  },
  // Template for the delete product modal
  template: `<div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
    aria-labelledby="delProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click="delProduct">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>`,
  mounted(){
    this.modalDel = new bootstrap.Modal(this.$refs.delProductModal, {
      keyboard: false,
      backdrop: 'static'
    });
  },
}