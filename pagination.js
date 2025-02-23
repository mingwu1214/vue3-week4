export default {
  // Props to receive 'pages' object and 'getData' method from the parent component
  props: ['pages', 'getData'], 
  // Template for pagination navigation
  template: `<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{
        disabled: !pages.has_pre
      }">
        <a class="page-link" href="#" aria-label="Previous" @click="getData(pages.current_page - 1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"
        :class="{
          active: page === pages.current_page
        }"
        v-for="page in pages.total_pages" :key="page + 123">
        <a class="page-link" href="#" @click="getData(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{
        disabled: !pages.has_next
      }">
        <a class="page-link" href="#" aria-label="Next" @click="getData(pages.current_page + 1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`
}