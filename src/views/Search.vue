<template>
  <v-container class="pl-16 pr-16 pt-12">
    <v-row>
      <v-col
        v-if="$route.query.more"
        cols="12"
        sm="12"
        md="9"
      >
        <v-row
          justify="center"
          align="center"
        >
          <v-col
            cols="3"
            :class="{
              'd-none': $vuetify.breakpoint.xs
            }"
          >
            <div
              class="text-right text-h4"
              style="white-space: nowrap;"
            >
              검색결과
            </div>
          </v-col>
          <v-col cols="9">
            <div
              v-if="total.value"
              class="text-h7 ml-3"
            >
              {{ $route.query.page*searchOpts.pagesize.single+1 }}
              -
              {{ (Number($route.query.page)+1)*searchOpts.pagesize.single > total.value ? total.value : (Number($route.query.page)+1)*searchOpts.pagesize.single }}
              /
              {{ total.value }}
            </div>
            <div
              v-else
              class="text-h7 ml-3"
            >
              검색 결과가 없습니다.
            </div>
          </v-col>
          <v-spacer />
        </v-row>

        <v-row v-if="searchResult.tables.length || searchResult.columns.length || searchResult.codes.length || searchResult.comments.length">
          <v-col
            cols="12"
            sm="3"
          >
            <div
              class="text-h5 mt-2"
              :class="{
                'mb-n5': $vuetify.breakpoint.smAndDown,
                'text-left': $vuetify.breakpoint.xs,
                'text-right': $vuetify.breakpoint.smAndUp
              }"
            >
              <p v-if="$route.query.more==='tables'">
                테이블
              </p>
              <p v-else-if="$route.query.more==='columns'">
                컬럼
              </p>
              <p v-else-if="$route.query.more==='codes'">
                유효값
              </p>
              <p v-else-if="$route.query.more==='comments'">
                댓글
              </p>
            </div>
            <div
              class="mb-7"
              style="
                text-align: right;
                color: rgb(41, 90, 221);
                text-decoration: underline;
              "
            />
          </v-col>
          <v-col
            cols="12"
            sm="9"
          >
            <table-search-list
              v-if="$route.query.more==='tables'"
              :items="searchResult.tables"
            />
            <column-search-list
              v-if="$route.query.more==='columns'"
              :items="searchResult.columns"
            />
            <code-search-list
              v-if="$route.query.more==='codes'"
              :items="searchResult.codes"
            />
            <comment-search-list
              v-if="$route.query.more==='comments'"
              :items="searchResult.comments"
            />
          </v-col>
          <v-col cols="12">
            <div class="text-center pt-16 pb-10">
              <v-pagination
                v-model="currentPage"
                :length="Math.floor(Number(total.value) / searchOpts.pagesize.single) + 1"
                :total-visible="10"
                @input="handlePageChange"
              />
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        v-else
        cols="12"
        sm="12"
        md="9"
      >
        <v-row
          justify="center"
          align="center"
        >
          <v-col
            cols="3"
            :class="{
              'd-none': $vuetify.breakpoint.xs
            }"
          >
            <div
              class="text-right text-h4"
              style="white-space: nowrap;"
            >
              검색결과
            </div>
          </v-col>
          <v-col cols="9">
            <div
              v-if="searchResult.tables.length || searchResult.columns.length || searchResult.codes.length || searchResult.comments.length"
              class="text-h7 ml-3"
            >
              더보기 버튼을 눌러 항목별 검색결과를 더 확인하세요.
            </div>
            <div
              v-else
              class="text-h7 mt-7 ml-3"
            >
              검색결과가 없습니다.
            </div>
          </v-col>
          <v-spacer />
        </v-row>

        <v-row v-if="searchResult.tables.length">
          <v-col
            cols="12"
            sm="3"
          >
            <div
              class="text-h5 mt-2"
              :class="{
                'text-left': $vuetify.breakpoint.xs,
                'text-right': $vuetify.breakpoint.smAndUp
              }"
            >
              테이블
            </div>
            <div
              class="mb-7"
              :class="{
                'text-left': $vuetify.breakpoint.xs,
                'text-right': $vuetify.breakpoint.smAndUp,
                'mb-n3': $vuetify.breakpoint.xs,
              }"
              style="
                color: rgb(41, 90, 221);
                text-decoration: underline;
              "
            >
              <router-link
                :to="{query: {s: $route.query.s, more: 'tables', page: 0}}"
                tag="div"
                style="cursor:pointer;"
              >
                <span>더보기</span>
              </router-link>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="9"
          >
            <table-search-list :items="searchResult.tables" />
          </v-col>
          <v-spacer />
        </v-row>

        <v-row v-if="searchResult.columns.length">
          <v-col
            cols="12"
            sm="3"
          >
            <div
              class="text-h5 mt-2"
              :class="{
                'text-left': $vuetify.breakpoint.xs,
                'text-right': $vuetify.breakpoint.smAndUp
              }"
            >
              컬럼
            </div>
            <div
              class="mb-7"
              :class="{
                'text-left': $vuetify.breakpoint.xs,
                'text-right': $vuetify.breakpoint.smAndUp,
                'mb-n3': $vuetify.breakpoint.xs,
              }"
              style="
                color: rgb(41, 90, 221);
                text-decoration: underline;
              "
            >
              <router-link
                :to="{query: {s: $route.query.s, more: 'columns', page: 0}}"
                tag="div"
                style="cursor:pointer;"
              >
                더보기
              </router-link>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="9"
          >
            <column-search-list :items="searchResult.columns" />
          </v-col>
          <v-spacer />
        </v-row>

        <v-row v-if="searchResult.codes.length">
          <v-col
            cols="12"
            sm="3"
          >
            <div
              class="text-h5 mt-2"
              :class="{
                'text-left': $vuetify.breakpoint.xs,
                'text-right': $vuetify.breakpoint.smAndUp
              }"
            >
              코드
            </div>
            <div
              class="mb-7"
              :class="{
                'text-left': $vuetify.breakpoint.xs,
                'text-right': $vuetify.breakpoint.smAndUp,
                'mb-n3': $vuetify.breakpoint.xs,
              }"
              style="
                color: rgb(41, 90, 221);
                text-decoration: underline;
              "
            >
              <router-link
                :to="{query: {s: $route.query.s, more: 'codes', page: 0}}"
                tag="div"
                style="cursor:pointer;"
              >
                더보기
              </router-link>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="9"
          >
            <code-search-list :items="searchResult.codes" />
          </v-col>
          <v-spacer />
        </v-row>

        <v-row v-if="searchResult.comments.length">
          <v-col
            cols="12"
            sm="3"
          >
            <div
              class="text-h5 mt-2"
              :class="{
                'text-left': $vuetify.breakpoint.xs,
                'text-right': $vuetify.breakpoint.smAndUp
              }"
            >
              댓글
            </div>
            <div
              class="mb-7"
              :class="{
                'text-left': $vuetify.breakpoint.xs,
                'text-right': $vuetify.breakpoint.smAndUp,
                'mb-n3': $vuetify.breakpoint.xs,
              }"
              style="
                color: rgb(41, 90, 221);
                text-decoration: underline;
              "
            >
              <router-link
                :to="{query: {s: $route.query.s, more: 'comments', page: 0}}"
                tag="div"
                style="cursor:pointer;"
              >
                더보기
              </router-link>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="9"
          >
            <comment-search-list :items="searchResult.comments" />
          </v-col>
          <v-spacer />
        </v-row>
        <v-row class="mt-16" />
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="3"
      >
        <sidebar
          class="mb-12"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import * as httpApi from '@/api/httpApi';
import Sidebar from '@/views/Sidebar'
import TableSearchList from '@/views/TableSearchList'
import ColumnSearchList from '@/views/ColumnSearchList'
import CodeSearchList from '@/views/CodeSearchList'
import CommentSearchList from '@/views/CommentSearchList'
import { createNamespacedHelpers } from 'vuex'

const userHelper = createNamespacedHelpers('user')

export default {
  name: "SearchView",
  components: {
    Sidebar,
    TableSearchList,
    ColumnSearchList,
    CodeSearchList,
    CommentSearchList,
  },
  data() {
    return {
      searchTargets: [
        'tables',
        'columns',
        'codes',
        'comments'
      ],
      searchResult: {
        'tables': [],
        'columns': [],
        'codes': [],
        'comments': [],
      },
      total: {value: 0},
      more: null,
      currentPage: 1
    };
  },
  computed: {
    ...userHelper.mapState({
      searchOpts : state => state.searchOpts,
    }),
  },
  watch: {
    '$route.query.s'() {
      this.appendSearchKeyword(this.$route.query.s);
      this.fetchSearchResult();
    },
    '$route.query.more'() {
      this.fetchSearchResult();
    },
    '$route.query.page'() {
      this.fetchSearchResult();
    },
    '$route.query.retry'() {
      this.fetchSearchResult();
    }
  },
  beforeMount() {
    this.appendSearchKeyword(this.$route.query.s);
    this.fetchSearchResult();
  },
  created() {
    this.appendSearchKeyword(this.$route.query.s);
    this.fetchSearchResult();
  },
  methods: {
    fetchSearchResult() {
      if (this.$route.query.more){
        httpApi.search(
          this.$route.query.more,
          this.$route.query.s,
          this.searchOpts.pagesize.single,
          this.$route.query.page,
          [],
          this.searchOpts.advanced.enabled,
          this.searchOpts.advanced.items,
        ).then((res) => {
          this.$set(
            this.searchResult,
            this.$route.query.more, []
          );
          this.$set(
            this.searchResult,
            this.$route.query.more, res.data.hits
          );
          this.total = res.data.total;
        });
      } else {
        this.searchTargets.forEach(target => {
          httpApi.search(
            target,
            this.$route.query.s,
            this.searchOpts.pagesize.all, 0, [],
            this.searchOpts.advanced.enabled,
            this.searchOpts.advanced.items,
          ).then((res) => {
            this.$set(this.searchResult, target, []);
            this.$set(this.searchResult, target, res.data.hits);
          });
        })
      }
    },
    handlePageChange(value) {
      this.currentPage = value;
      this.$router.push(
        {
          query: {
            s: this.$route.query.s,
            more: this.$route.query.more,
            page: Number(value) -1
          }
        }
      );
    },
    ...userHelper.mapActions([
      'appendSearchKeyword'
    ]),
  }
}
</script>
<style>
.link-detail:hover {
    color: #929292;
}
</style>
