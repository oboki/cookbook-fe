<template>
  <v-container style="height: calc(100vh)">
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
              통합검색 결과는 항목별로 5 건씩 조회됩니다.
            </div>
          </v-col>
          <v-spacer />
        </v-row>

        <v-row>
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
              <span>더보기</span>
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
                  :to="{path: /detail/+item._id, query:{db_name: item._source.db_name, table_name: item._source.table_name}}"
                  tag="div"
                >
                  <div class="text-h6 font-weight-bold">
                    {{ item._source.db_name }}.{{ item._source.table_name }}
                  </div>
                  <div class="text-h6 font-weight-bold">
                    {{ item._source.entity_name }}
                  </div>
                  <div class="mt-2">
                    {{ item._source.description }}
                  </div>
                  <div class="">
                    N 컬럼 | {KUDU|Parquet|Oracle}
                  </div>
                </router-link>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer />
        </v-row>

        <v-row>
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
              더보기
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
                <div class="text-h6 font-weight-bold">
                  {{ item._source.column_name }}
                </div>
                <div class="text-h6 font-weight-bold">
                  {{ item._source.attribute_name }}
                </div>
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

        <v-row>
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
              더보기
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
                <div class="text-h6 font-weight-bold">
                  {{ item._source.code }}
                </div>
                <div class="text-h6 font-weight-bold">
                  {{ item._source.description }}
                </div>
                <div class="">
                  {{ item._source.column_name }} {{ item._source.attribute_name }}
                </div>
              </v-col>
            </v-row>
          </v-col>
          <v-spacer />
        </v-row>

        <v-row>
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
              더보기
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
        <v-row
          justify="center"
          align="center"
        >
          <v-col
            cols="10"
            class="text-h6 mt-9 ml-3"
          >
            <div>최근 검색어</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="ml-3">
            <ul>
              <li>고객 구분</li>
              <li>이체 거래 입금계좌번호</li>
              <li>수신 이체</li>
              <li>거래내역</li>
              <li>입금계좌</li>
              <li>출금</li>
              <li>받는 사람</li>
              <li>선불전자지급수단</li>
              <li>미니계좌</li>
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
    };
  },
  watch: {
    '$route.query.s'() {
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
      URL = [BASE_URL, "tables", "/search?s=", this.$route.query.s].join("")
      axios.get(`${URL}`).then((res) => {
        this.tableSearchResult = res.data;
      });
      URL = [BASE_URL, "columns", "/search?s=", this.$route.query.s].join("")
      axios.get(`${URL}`).then((res) => {
        this.columnSearchResult = res.data;
      });
      URL = [BASE_URL, "codes", "/search?s=", this.$route.query.s].join("")
      axios.get(`${URL}`).then((res) => {
        this.codeSearchResult = res.data;
      });
      URL = [BASE_URL, "comments", "/search?s=", this.$route.query.s].join("")
      axios.get(`${URL}`).then((res) => {
        this.commentSearchResult = res.data;
      });
    },
    moreTables() {
      this.$router.push(
        {
          query: Object.assign(this.$route.query, { more: 'tables' })
        }
      );
    },
  }
}
</script>
<style>

</style>
