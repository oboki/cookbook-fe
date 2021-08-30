<template>
  <aside>
    <v-row>
      <v-col
        cols="10"
        class="text-h6 mt-9 ml-3 text-left"
      >
        <div>최근 검색어</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="ml-3 text-left">
        <ul>
          <li
            v-for="item in recent_search_keywords.slice().reverse()"
            :key="item"
          >
            {{ item }}
          </li>
        </ul>
      </v-col>
    </v-row>
  </aside>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'

const userHelper = createNamespacedHelpers('user')

export default {
  name: 'Sidebar',
  computed: {
    ...userHelper.mapState({
      recent_search_keywords: state => state.recent_search_keywords,
    }),
  },
}
</script>
