<template>
  <aside>
    <v-row>
      <v-card
        flat
      >
        <div
          cols="6"
          class="text-h5 mt-9 ml-3 text-left"
          style="display:inline-block;"
        >
          고급검색
          <v-switch
            v-model="search_opts.advanced.enabled"
            inset
            class="ml-2"
            style="display:inline-block;"
            @change="updateSearchOpts"
          />
        </div>
        <div
          class="text-h6 ml-3 text-left"
        >
          필터
          <v-text-field
            v-model="search_opts.advanced.filter.db_name"
            label="데이터베이스"
            :disabled="!search_opts.advanced.enabled"
            outlined
            dense
            class="mt-3"
          />
          <v-text-field
            v-model="search_opts.advanced.filter.author"
            label="작성자"
            outlined
            :disabled="!search_opts.advanced.enabled"
            dense
            class="mt-n3"
          />
        </div>
        <div
          class="text-h6 ml-3 mt-n3 text-left"
        >
          와일드카드
          <v-text-field
            v-model="search_opts.advanced.wildcard.table_name"
            label="테이블"
            :disabled="!(search_opts.advanced.enabled && !search_opts.advanced.wildcard.column_name)"
            outlined
            dense
            class="mt-3"
          />
          <v-text-field
            v-model="search_opts.advanced.wildcard.column_name"
            label="컬럼"
            outlined
            dense
            :disabled="!(search_opts.advanced.enabled && !search_opts.advanced.wildcard.table_name)"
            class="mt-n3"
          />
        </div>
      </v-card>
    </v-row>
    <v-row>
      <v-card
        flat
      >
        <div
          class="text-h5 mt-9 ml-3 text-left"
        >
          최근 검색어
        </div>
        <ul
          class="mt-3"
        >
          <li
            v-for="item in recent_search_keywords.slice().reverse()"
            :key="item"
            class="link-detail"
            style="cursor:pointer;"
            @click="search(item)"
          >
            {{ item }}
          </li>
        </ul>
      </v-card>
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
      search_opts: state => state.search_opts,
    }),
  },
  methods: {
    ...userHelper.mapActions([
      'updateSearchOpts'
    ]),
  },
}
</script>
<style>
.link-detail:hover {
    color: #929292;
}
</style>
