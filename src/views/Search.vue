<template>
  <v-container
    v-if="$route.query.more==='tables'"
    style="height: calc(100vh);"
  >
    <v-row>
      <v-col cols="9">
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

        <v-row v-if="tableSearchResult.length">
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
              v-for="item in tableSearchResult"
              :key="item._id"
            >
              <v-col
                cols="9"
                class="ml-2"
              >
                <router-link
                  :to="{path: /detail/+item._id}"
                  tag="div"
                >
                  <div
                    class="text-h6 font-weight-bold"
                    style="cursor:pointer"
                  >
                    {{ item._source.db_name }}.{{ item._source.table_name }}
                  </div>
                  <div
                    class="text-h6 font-weight-bold"
                    style="cursor:pointer"
                  >
                    {{ item._source.entity_name }}
                  </div>
                </router-link>
                <div class="mt-2">
                  {{ item._source.description }}
                </div>
                <div class="">
                  - 컬럼 | {{ item._source.storage_type }}
                </div>
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
    </v-row>
  </v-container>
  <v-container
    v-else-if="$route.query.more==='columns'"
    style="height: calc(100vh)"
  >
    columns
  </v-container>
  <v-container
    v-else-if="$route.query.more==='codes'"
    style="height: calc(100vh)"
  >
    codes
  </v-container>
  <v-container
    v-else-if="$route.query.more==='comments'"
    style="height: calc(100vh)"
  >
    comments
  </v-container>
  <v-container
    v-else
    style="height: calc(100vh)"
  >
    <v-row>
      <v-col cols="9">
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

        <v-row v-if="tableSearchResult.length">
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
              v-for="item in tableSearchResult"
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
                >
                  <div
                    class="text-h6 font-weight-bold"
                    style="cursor:pointer"
                  >
                    {{ item._source.db_name }}.{{ item._source.table_name }}
                  </div>
                  <div
                    class="text-h6 font-weight-bold"
                    style="cursor:pointer"
                  >
                    {{ item._source.entity_name }}
                  </div>
                </router-link>
                <div class="mt-2">
                  {{ item._source.description }}
                </div>
                <div class="">
                  - 컬럼 | {{ item._source.storage_type }}
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer />
        </v-row>

        <v-row v-if="columnSearchResult.length">
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
              v-for="item in columnSearchResult"
              :key="item._id"
            >
              <v-col
                cols="9"
                class="ml-2"
              >
                <router-link
                  :to="{path: /detail/+item._source.parent_id}"
                  tag="div"
                >
                  <div
                    class="text-h6 font-weight-bold"
                    style="cursor:pointer"
                  >
                    {{ item._source.column_name }}
                  </div>
                  <div
                    class="text-h6 font-weight-bold"
                    style="cursor:pointer"
                  >
                    {{ item._source.attribute_name }}
                  </div>
                </router-link>
                <div class="">
                  {{ item._source.db_name }}.{{ item._source.table_name }} | {{ item._source.entity_name }}
                </div>
                <div class="">
                  {{ item._source.data_type }} | {{ item._source.data_length }} | 암호화 X | 개인정보항목 X
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer />
        </v-row>

        <v-row v-if="codeSearchResult.length">
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
              v-for="item in codeSearchResult"
              :key="item._id"
            >
              <v-col
                cols="9"
                class="ml-2"
              >
                <router-link
                  :to="{path: /detail/+item._source.parent_id}"
                  tag="div"
                >
                  <div
                    class="text-h6 font-weight-bold"
                    style="cursor:pointer"
                  >
                    {{ item._source.code }}
                  </div>
                  <div
                    class="text-h6 font-weight-bold"
                    style="cursor:pointer"
                  >
                    {{ item._source.description }}
                  </div>
                </router-link>
                <div class="">
                  {{ item._source.column_name }} {{ item._source.attribute_name }}
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer />
        </v-row>

        <v-row v-if="commentSearchResult.length">
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
              v-for="item in commentSearchResult"
              :key="item._id"
            >
              <v-col
                cols="9"
                class="ml-2"
              >
                <div class="text-h6 font-weight-bold">
                  {{ item._source.db_name }}.{{ item._source.table_name }}
                </div>
                <div class="text-h6 font-weight-bold">
                  {{ item._source.entity_name_name }}
                </div>
                <div class="">
                  {{ item._source.comment }}
                </div>
                <div class="">
                  {{ item._source.author }}
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer />
        </v-row>
      </v-col>
      <v-col cols="3">
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
              <li>newest</li>
              <li>oldest</li>
            </ul>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from "axios"

export default {
  name: "SearchView",
  data() {
    return {
      tableSearchResult: null,
      columnSearchResult: null,
      codeSearchResult: null,
      commentSearchResult: null,
      total: null,
      more: null,
      currentPage: 1
    };
  },
  watch: {
    '$route.query.s'() {
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
    this.fetchSearchResult();
  },
  methods: {
    fetchSearchResult() {
      let URL = "";
      const BASE_URL = "http://172.21.22.195:8080/cookbookapi/v1/";
      if (this.$route.query.more === 'tables'){
        this.tableSearchResult = [];
        URL = [BASE_URL, "tables", "/search?s=", this.$route.query.s, "&size=10", "&page=", this.$route.query.page].join("")
        axios.get(`${URL}`).then((res) => {
          this.tableSearchResult = res.data.hits;
          this.total = res.data.total;
        });
      } else if (this.$route.query.more === 'columns'){
        this.columnSearchResult = [];
        URL = [BASE_URL, "columns", "/search?s=", this.$route.query.s, "&size=10"].join("")
        axios.get(`${URL}`).then((res) => {
          this.columnSearchResult = res.data.hits;
        });
      } else if (this.$route.query.more === 'codes'){
        this.codeSearchResult = [];
        URL = [BASE_URL, "codes", "/search?s=", this.$route.query.s, "&size=10"].join("")
        axios.get(`${URL}`).then((res) => {
          this.codeSearchResult = res.data.hits;
        });
      } else if (this.$route.query.more === 'comments'){
        this.commentSearchResult = [];
        URL = [BASE_URL, "comments", "/search?s=", this.$route.query.s, "&size=10"].join("")
        axios.get(`${URL}`).then((res) => {
          this.commentSearchResult = res.data.hits;
        });
      } else {
        this.tableSearchResult = [];
        URL = [BASE_URL, "tables", "/search?s=", this.$route.query.s].join("")
        axios.get(`${URL}`).then((res) => {
          this.tableSearchResult = res.data.hits;
        });
        this.columnSearchResult = [];
        URL = [BASE_URL, "columns", "/search?s=", this.$route.query.s].join("")
        axios.get(`${URL}`).then((res) => {
          this.columnSearchResult = res.data.hits;
        });
        this.codeSearchResult = [];
        URL = [BASE_URL, "codes", "/search?s=", this.$route.query.s].join("")
        axios.get(`${URL}`).then((res) => {
          this.codeSearchResult = res.data.hits;
        });
        this.commentSearchResult = [];
        URL = [BASE_URL, "comments", "/search?s=", this.$route.query.s].join("")
        axios.get(`${URL}`).then((res) => {
          this.commentSearchResult = res.data.hits;
        });

      }
    },
    handlePageChange(value) {
      this.currentPage = value;
      console.log(value);
      this.$router.push(
        {
          query: { s: this.$route.query.s, more: this.$route.query.more, page: Number(value) -1 }
        }
      );
    },
  }
}
</script>
<style>
.link-detail:hover {
    color: #929292;
}
</style>
