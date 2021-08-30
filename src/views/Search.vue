<template>
  <v-container>
    <v-row>
      <v-col
        v-if="$route.query.more==='tables'"
        cols="9"
      >
        <v-row
          justify="center"
          align="center"
        >
          <v-col cols="3">
            <div
              class="text-h4 mt-7 ml-3"
              style="text-align: right"
            >
              검색결과
            </div>
          </v-col>
          <v-col cols="9">
            <div class="text-h7 mt-7 ml-3">
              {{ $route.query.page*10 + 1 }} - {{ (Number($route.query.page) + 1)* 10 }} / {{ total.value }}
            </div>
          </v-col>
          <v-spacer />
        </v-row>

        <v-row v-if="searchResult.tables.length">
          <v-col
            cols="3"
          >
            <div
              class="text-h5 mt-2"
              style="text-align: right"
            >
              테이블
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
          <v-col cols="9">
            <v-row
              v-for="item in searchResult.tables"
              :key="item._id"
            >
              <v-col
                cols="9"
                class="ml-2"
              >
                <router-link
                  :to="{path: /detail/+item._id}"
                  tag="div"
                  class="link-detail"
                  style="cursor:pointer"
                >
                  <div class="text-h6">
                    {{ item._source.db_name }}.{{ item._source.table_name }}
                  </div>
                  <div class="text-h6">
                    {{ item._source.entity_name }}
                  </div>
                  <div class="mt-2">
                    {{ item._source.description }}
                  </div>
                  <div class="">
                    - 컬럼 | {{ item._source.storage_type }}
                  </div>
                </router-link>
              </v-col>
            </v-row>
            <div class="text-center pt-16 pb-10">
              <v-pagination
                v-model="currentPage"
                :length="Math.floor(Number(total.value) / 10) + 1"
                :total-visible="10"
                @input="handlePageChange"
              />
            </div>
          </v-col>
          <v-spacer />
        </v-row>
      </v-col>
      <v-col
        v-else-if="$route.query.more==='columns'"
        cols="9"
      >
        columns
      </v-col>
      <v-col
        v-else
        cols="9"
      >
        <v-row
          justify="center"
          align="center"
        >
          <v-col cols="3">
            <div
              class="text-h4 mt-7 ml-3"
              style="text-align: right"
            >
              검색결과
            </div>
          </v-col>
          <v-col cols="9">
            <div class="text-h7 mt-7 ml-3">
              통합검색 결과는 항목별로 4 건씩 조회됩니다.
            </div>
          </v-col>
          <v-spacer />
        </v-row>

        <v-row v-if="searchResult.tables.length">
          <v-col
            cols="3"
          >
            <div
              class="text-h5 mt-2"
              style="text-align: right"
            >
              테이블
            </div>
            <div
              class="mb-7"
              style="
                text-align: right;
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
          <v-col cols="9">
            <v-row
              v-for="item in searchResult.tables"
              :key="item._id"
            >
              <v-col
                cols="9"
                class="ml-2"
              >
                <router-link
                  :to="{path: /detail/+item._id}"
                  tag="div"
                  class="link-detail"
                  style="cursor:pointer"
                >
                  <div class="text-h6">
                    {{ item._source.db_name }}.{{ item._source.table_name }}
                  </div>
                  <div class="text-h6">
                    {{ item._source.entity_name }}
                  </div>
                  <div class="mt-2">
                    {{ item._source.description }}
                  </div>
                  <div class="">
                    - 컬럼 | {{ item._source.storage_type }}
                  </div>
                </router-link>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer />
        </v-row>

        <v-row v-if="searchResult.columns.length">
          <v-col cols="3">
            <div
              class="text-h5 mt-2"
              style="text-align: right"
            >
              컬럼
            </div>
            <div
              class="mb-7"
              style="
                text-align: right;
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
          <v-col cols="9">
            <v-row
              v-for="item in searchResult.columns"
              :key="item._id"
            >
              <v-col
                cols="9"
                class="ml-2"
              >
                <router-link
                  :to="{path: /detail/+item._source.parent_id, hash: item._id}"
                  tag="div"
                  class="link-detail"
                  style="cursor:pointer"
                >
                  <div class="text-h6">
                    {{ item._source.column_name }}
                  </div>
                  <div class="text-h6">
                    {{ item._source.attribute_name }}
                  </div>
                  <div class="">
                    {{ item._source.db_name }}.{{ item._source.table_name }} | {{ item._source.entity_name }}
                  </div>
                  <div class="">
                    {{ item._source.data_type }} | {{ item._source.data_length }} | 암호화 X | 개인정보항목 X
                  </div>
                </router-link>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer />
        </v-row>

        <v-row v-if="searchResult.codes.length">
          <v-col cols="3">
            <div
              class="text-h5 mt-2"
              style="text-align: right"
            >
              코드
            </div>
            <div
              class="mb-7"
              style="
                text-align: right;
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
          <v-col cols="9">
            <v-row
              v-for="item in searchResult.codes"
              :key="item._id"
            >
              <v-col
                cols="9"
                class="ml-2"
              >
                <router-link
                  :to="{path: /detail/+item._source.parent_id, hash: item._source.column_name}"
                  tag="div"
                  class="link-detail"
                  style="cursor:pointer;"
                >
                  <div class="text-h6">
                    {{ item._source.code }}
                  </div>
                  <div class="text-h6">
                    {{ item._source.description }}
                  </div>
                  <div class="">
                    {{ item._source.column_name }} {{ item._source.attribute_name }}
                  </div>
                </router-link>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer />
        </v-row>

        <v-row v-if="searchResult.comments.length">
          <v-col cols="3">
            <div
              class="text-h5 mt-2"
              style="text-align: right"
            >
              댓글
            </div>
            <div
              class="mb-7"
              style="
                text-align: right;
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
          <v-col cols="9">
            <v-row
              v-for="item in searchResult.comments"
              :key="item._id"
            >
              <v-col
                cols="9"
                class="ml-2"
              >
                <router-link
                  :to="{path: /detail/+item._source.parent_id, hash: item._id}"
                  tag="div"
                  class="link-detail"
                  style="cursor:pointer;"
                >
                  <div class="text-h6">
                    {{ item._source.db_name }}.{{ item._source.table_name }}
                  </div>
                  <div class="text-h6">
                    {{ item._source.entity_name_name }}
                  </div>
                  <div class="">
                    {{ item._source.comment }}
                  </div>
                  <div class="">
                    {{ item._source.author }}
                  </div>
                </router-link>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer />
        </v-row>
      </v-col>
      <v-col cols="3">
        <sidebar />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import * as httpApi from '@/api/httpApi';
import Sidebar from '@/views/Sidebar'
import { createNamespacedHelpers } from 'vuex'

const userHelper = createNamespacedHelpers('user')

export default {
  name: "SearchView",
  components: {
    Sidebar
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
      total: null,
      more: null,
      currentPage: 1
    };
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
    }
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
          this.$route.query.s, 10,
          this.$route.query.page,
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
          httpApi.search(target, this.$route.query.s).then((res) => {
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
