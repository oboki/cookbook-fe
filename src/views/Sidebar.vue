<template>
  <aside>
    <v-row>
      <v-card
        flat
        :class="{
          'width-100': $vuetify.breakpoint.smAndDown
        }"
      >
        <div
          class="text-h5 ml-3 text-left"
          style="display:inline-block;"
        >
          고급검색
          <v-switch
            v-model="advancedSearchEnabled"
            inset
            class="ml-2"
            style="display:inline-block;"
            @change="updateAdvancedSearchOpts"
          />
        </div>
        <div
          class="text-h6 ml-3 text-left"
        >
          필터
          <v-text-field
            v-model="advancedSearch.filter.dbName"
            label="데이터베이스"
            :disabled="!advancedSearchEnabled"
            outlined
            dense
            class="mt-3"
            @change="updateAdvancedSearchOpts"
          />
        </div>
        <div
          class="text-h6 ml-3 mt-n3 text-left"
        >
          제외 검색어
          <v-text-field
            v-model="advancedSearch.exclude"
            :disabled="!advancedSearchEnabled"
            outlined
            dense
            class="mt-3"
            @change="updateAdvancedSearchOpts"
          />
        </div>
        <div
          class="text-h6 ml-3 mt-n3 text-left"
        >
          와일드카드
          <v-text-field
            v-model="advancedSearch.wildcard.tableName"
            label="테이블명"
            :disabled="!(advancedSearchEnabled && !advancedSearch.wildcard.entityName && !advancedSearch.wildcard.columnName && !advancedSearch.wildcard.attributeName)"
            outlined
            dense
            class="mt-3"
            @change="updateAdvancedSearchOpts"
          />
          <v-text-field
            v-model="advancedSearch.wildcard.entityName"
            label="엔티티명"
            :disabled="!(advancedSearchEnabled && !advancedSearch.wildcard.tableName && !advancedSearch.wildcard.columnName && !advancedSearch.wildcard.attributeName)"
            outlined
            dense
            class="mt-n3"
            @change="updateAdvancedSearchOpts"
          />
          <v-text-field
            v-model="advancedSearch.wildcard.columnName"
            label="컬럼명"
            outlined
            dense
            :disabled="!(advancedSearchEnabled && !advancedSearch.wildcard.tableName && !advancedSearch.wildcard.entityName && !advancedSearch.wildcard.attributeName)"
            class="mt-n3"
            @change="updateAdvancedSearchOpts"
          />
          <v-text-field
            v-model="advancedSearch.wildcard.attributeName"
            label="속성명"
            outlined
            dense
            :disabled="!(advancedSearchEnabled && !advancedSearch.wildcard.tableName && !advancedSearch.wildcard.entityName && !advancedSearch.wildcard.columnName)"
            class="mt-n3"
            @change="updateAdvancedSearchOpts"
          />
        </div>
      </v-card>
    </v-row>
    <v-row>
      <v-card
        flat
      >
        <div
          class="text-h5 mt-4 ml-3 text-left"
        >
          최근 검색어
        </div>
        <ul
          class="mt-3"
        >
          <li
            v-for="item in recentSearchKeywords.slice().reverse()"
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
  data() {
    return {
      advancedSearchEnabled: false,
      advancedSearch: {
        filter: {
          dbName: null
        },
        wildcard: {
          tableName: null,
          entityName: null,
          columnName: null,
          attributeName: null
        },
        exclude: null
      }

    }
  },
  computed: {
    ...userHelper.mapState({
      recentSearchKeywords: state => state.recentSearchKeywords,
      searchOpts: state => state.searchOpts,
    }),
  },
  created() {
    this.loadAdvancedSearch();
  },
  methods: {
    ...userHelper.mapActions([
      'updateSearchOpts'
    ]),
    loadAdvancedSearch() {
      this.advancedSearchEnabled = this.searchOpts.advanced.enabled;
      this.searchOpts.advanced.items.forEach(item => {
        if (item.type === 'filter' && item.field === 'db_name') {
          this.$set(this.advancedSearch.filter, 'dbName', item.value);
        }
        if (item.type === 'exclude') {
          this.$set(this.advancedSearch, 'exclude', item.value);
        }
        if (item.type === 'wildcard' && item.field === 'table_name') {
          this.$set(this.advancedSearch.wildcard, 'tableName', item.value);
        }
        if (item.type === 'wildcard' && item.field === 'entity_name') {
          this.$set(this.advancedSearch.wildcard, 'entityName', item.value);
        }
        if (item.type === 'wildcard' && item.field === 'column_name') {
          this.$set(this.advancedSearch.wildcard, 'columnName', item.value);
        }
        if (item.type === 'wildcard' && item.field === 'attribute_name') {
          this.$set(this.advancedSearch.wildcard, 'attributeName', item.value);
        }
      })
    },
    updateAdvancedSearchOpts() {
      const tmp = [];
      if (this.advancedSearch.filter.dbName) {
        tmp.push({
          type: "filter",
          field: "db_name",
          value: this.advancedSearch.filter.dbName,
        })
      }

      if (this.advancedSearch.wildcard.tableName) {
        tmp.push({
          type: "wildcard",
          field: "table_name",
          value: this.advancedSearch.wildcard.tableName,
        })
      }

      if (this.advancedSearch.wildcard.entityName) {
        tmp.push({
          type: "wildcard",
          field: "entity_name",
          value: this.advancedSearch.wildcard.entityName,
        })
      }

      if (this.advancedSearch.wildcard.columnName) {
        tmp.push({
          type: "wildcard",
          field: "column_name",
          value: this.advancedSearch.wildcard.columnName,
        })
      }

      if (this.advancedSearch.wildcard.attributeName) {
        tmp.push({
          type: "wildcard",
          field: "attribute_name",
          value: this.advancedSearch.wildcard.attributeName,
        })
      }

      if (this.advancedSearch.exclude) {
        tmp.push({
          type: "exclude",
          value: this.advancedSearch.exclude,
        })
      }

      this.$set(this.searchOpts, 'advanced', {
        enabled: this.advancedSearchEnabled,
        items: tmp
      })

      this.updateSearchOpts();
    },
    search(val) {
      if (this.search_opt === "all") {
        this.$router.push(
          {
            name: 'Search',
            query: { s: val }
          }
        ).catch(err => {
          this.$router.push(
            {
              name: 'Search',
              query: { s: s , retry: true},

            }
          )
        })
      } else {
        this.$router.push({
          name: 'Search',
          query: {
            s: val,
            more: this.search_opt,
            page: 0
          },
        }).catch(err => {
          this.$router.push({
            name: 'Search',
            query: {
              s: val,
              more: this.search_opt,
              page: 0,
              retry: true
            },
          })
        })
      }
    }
  },
}
</script>
<style>
.link-detail:hover {
    color: #929292;
}

.width-100 {
  width:100%;
}
</style>
