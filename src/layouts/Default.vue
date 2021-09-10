<template>
  <v-app>
    <v-app-bar
      dark
      color="primary"
      app
      short
    >
      <v-container>
        <v-row>
          <v-btn
            icon
            :class="{
              'd-none': $vuetify.breakpoint.xs
            }"
            @click="$router.go(-1)"
          >
            <v-icon>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-app-bar-nav-icon
            class="ml-n4"
            :class="{
              'd-none': $vuetify.breakpoint.xs
            }"
            @click="drawer = true"
          />
          <v-toolbar-title
            class="mr-1 mt-2 text-h5"
            style="cursor:pointer"
            @click="$router.push('/')"
          >
            쿡북
          </v-toolbar-title>
          <v-combobox
            v-model="select"
            :loading="loading"
            :items="items"
            :search-input.sync="autocomplete"
            cache-items
            class="mx-4 mt-1 fixed-tabs-bar"
            flat
            dense
            hide-no-data
            hide-details
            label="검색어를 입력하세요."
            solo-inverted
            @change="search"
          />
          <v-btn
            icon
            :class="{
              'd-none': $vuetify.breakpoint.smAndDown
            }"
            @click="search"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-dialog
            v-model="dialog"
            width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-cog</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                검색 옵션
              </v-card-title>

              <v-card-text>
                <v-row>
                  <v-col>
                    <h3 class="pt-5">
                      검색 대상
                    </h3>
                    <v-radio-group
                      v-model="searchOpts.target"
                      @change="updateSearchOpts"
                    >
                      <v-radio
                        label="통합검색"
                        value="all"
                      />
                      <v-radio
                        label="테이블"
                        value="tables"
                      />
                      <v-radio
                        label="컬럼"
                        value="columns"
                      />
                      <v-radio
                        label="유효값"
                        value="codes"
                      />
                      <v-radio
                        label="사용자댓글"
                        value="comments"
                      />
                    </v-radio-group>
                  </v-col>
                  <v-col>
                    <h3 class="pt-5 pb-5">
                      통합검색 페이지크기
                    </h3>
                    <v-select
                      v-model="searchOpts.pagesize.all"
                      :items="selectPagesize"
                      label="Rows per page"
                      dense
                      outlined
                      :disabled="searchOpts.target!=='all'"
                      @change="updateSearchOpts"
                    />
                    <h3 class="mt-n3 pb-5">
                      단일검색 페이지크기
                    </h3>
                    <v-select
                      v-model="searchOpts.pagesize.single"
                      :items="selectPagesize"
                      label="Rows per page"
                      dense
                      outlined
                      :disabled="searchOpts.target==='all'"
                      @change="updateSearchOpts"
                    />
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider />

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  text
                  @click="dialog = false"
                >
                  완료
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-btn
            icon
            :to="{path: '/user'}"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group>
          <v-list-item @click="locationTo('/home')">
            <v-list-item-icon>
              <v-icon>mdi-airplane</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Airflow</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      {{ $route.windows }}
      <router-view :key="$route.path" />
    </v-main>
  </v-app>
</template>
<script>
import * as httpApi from '@/api/httpApi';
import { createNamespacedHelpers } from 'vuex'

const userHelper = createNamespacedHelpers('user')

export default {
  name: 'DefaultLayout',
  data() {
    return {
      select: this.$route.query.s,
      items: [],
      loading: false,
      dialog: false,
      autocomplete: null,
      drawer: false,
      selectPagesize: [4,7,10,20],
    };
  },
  computed: {
    ...userHelper.mapState({
      username: state => state.username,
      bookmark: state => state.bookmark,
      searchOpts : state => state.searchOpts,
      recentSearchKeywords : state => state.recentSearchKeywords,
    }),
  },
  watch: {
    autocomplete (val) {
      val && this.querySelections(val)
    },
    '$route.query.s'() {
      if (this.$route.name === 'Search') {
        this.select = this.$route.query.s;
      }
    },
  },
  created() {
    this.loadUserInfo();
  },
  methods: {
    ...userHelper.mapActions([
      'loadUserInfo'
    ]),
    ...userHelper.mapActions([
      'updateSearchOpts'
    ]),
    search() {
      const s = this.select;

      if (this.searchOpts.target === "all") {
        this.$router.push(
          {
            name: 'Search',
            query: { s: s }
          }
        ).catch(err => {
          this.$router.push(
            {
              name: 'Search',
              query: { s: s , retry: true },

            }
          )
        })
      } else {
        this.$router.push(
          {
            name: 'Search',
            query: {
              s: s,
              more: this.searchOpts.target,
              page: 0
            },
          }
        ).catch(err => {
          this.$router.push(
            {
              name: 'Search',
              query: {
                s: s,
                more: this.searchOpts.target,
                page: 0,
                retry: true
              },

            }
          )
        })
      }
    },
    querySelections(val) {
      this.loading = true;
      this.items = [];

      setTimeout(()=>{
        httpApi.search(
          'autocomplete_keywords', val,
          0, 0, ["wildcard"]
        ).then((res) => {
          res.data.hits.forEach(item => {
            this.items.push(item._source.keyword)
          });
        })
        this.loading = false;
      }, 500);
    },
    locationTo(val) {
      window.location.href = val;
    }
  }
}
</script>
<style>
body {
  min-width: 580px !important;
}
</style>
