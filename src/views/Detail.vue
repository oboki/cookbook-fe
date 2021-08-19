<template>
  <div>
    <v-container style="height: calc(100vh)">
      <v-row
        justify="center"
        align="center"
      >
        <div>
          <v-btn icon>
            <v-icon size="75">
              mdi-arrow-left-thick
            </v-icon>
          </v-btn>
        </div>
        <v-col>
          <div class="text-h4 mt-7 ml-3">
            {{ tableInfo.db_name }}.{{ tableInfo.table_name }}
          </div>
          <div class="text-h5 mb-7 ml-3">
            {{ tableInfo.entity_name }}
          </div>
        </v-col>
        <v-spacer />
        <v-col style="text-align: right">
          <v-dialog
            v-model="dialog"
            width="900"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                class="ma-3"
                v-on="on"
              >
                <v-icon size="50">
                  mdi-table-search
                </v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                데이터 미리보기
              </v-card-title>

              <v-card-text>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          base_dt
                        </th>
                        <th class="text-left">
                          user_mgmt_no
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr> <td>-</td> <td>-</td></tr>
                      <tr> <td>-</td> <td>-</td></tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>

              <v-divider />

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  text
                  @click="dialog = false"
                >
                  닫기
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-btn icon>
            <v-icon size="50">
              mdi-star
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card class="mx-auto pa-7">
            <v-row>
              <div class="text-h6 font-weight-black">
                기본 정보
              </div>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-row>
                  <v-col
                    cols="2"
                    style="text-align: right"
                    class="font-weight-bold"
                  >
                    설명
                  </v-col>
                  <v-col cols="10">
                    <v-row align="right">
                      <v-textarea
                        solo
                        label="이곳을 눌러 테이블 설명을 입력하세요."
                        full-width
                        disabled
                        class="ma-3"
                        :value="tableInfo.description"
                      />
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="6">
                <v-row>
                  <v-col
                    cols="3"
                    style="text-align: right"
                    class="font-weight-bold"
                  >
                    스토리지
                  </v-col>
                  <v-col cols="9">
                    kudu
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="3"
                    style="text-align: right"
                    class="font-weight-bold"
                  >
                    파티션
                  </v-col>
                  <v-col cols="9">
                    base_dt / 20170727 ~ 20210709
                  </v-col>
                </v-row>
                <v-row>
                  <v-col
                    cols="3"
                    style="text-align: right"
                    class="font-weight-bold"
                  >
                    태그
                  </v-col>
                  <v-col cols="9">
                    -
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card class="mx-auto pa-7">
            <v-row>
              <div class="text-h6 font-weight-black">
                컬럼
              </div>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  :headers="tableHeaders"
                  :items="columnInfo"
                  :single-expand="singleExpand"
                  :expanded.sync="expanded"
                  item-key="position"
                  show-expand
                  class="elevation-1"
                >
                  <template v-slot:expanded-item="{ headers }">
                    <td :colspan="headers.length">
                      <v-row class="mt-2">
                        <v-col
                          cols="2"
                          style="text-align: right"
                          class="font-weight-bold"
                        >
                          설명
                        </v-col>
                        <v-col cols="10">
                          <v-textarea
                            solo
                            name="input-7-4"
                            label="이곳을 눌러 컬럼 설명을 입력하세요."
                            full-width
                            disabled
                            class="ma-1"
                          />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col
                          cols="2"
                          style="text-align: right"
                          class="font-weight-bold"
                        >
                          통계정보
                        </v-col>
                        <v-col cols="10">
                          <v-simple-table>
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">
                                    # of distinct values
                                  </th>
                                  <th class="text-left">
                                    # nulls
                                  </th>
                                  <th class="text-left">
                                    max size
                                  </th>
                                  <th class="text-left">
                                    avg size
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>-</td>
                                  <td>-</td>
                                  <td>-</td>
                                  <td>-</td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-col>
                      </v-row>
                      <v-row class="mb-2">
                        <v-col
                          cols="2"
                          style="text-align: right"
                          class="font-weight-bold"
                        >
                          유효값
                        </v-col>
                        <v-col cols="10">
                          <v-simple-table>
                            <template v-slot:default>
                              <thead>
                                <tr>
                                  <th class="text-left">
                                    값
                                  </th>
                                  <th class="text-left">
                                    설명
                                  </th>
                                  <th class="text-left" />
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>00</td>
                                  <td>실명고객</td>
                                  <td />
                                </tr>
                                <tr>
                                  <td>01</td>
                                  <td>미거래고객</td>
                                  <td />
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-col>
                      </v-row>
                    </td>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card class="mx-auto pa-7">
            <v-row>
              <div class="text-h6 font-weight-black mb-10">
                사용자 댓글
              </div>
            </v-row>
            <v-row
              justify="center"
              align="center"
              class="mt-n10"
            >
              <v-col
                cols="2"
                style="text-align: right"
              >
                dylan.1
                <v-icon>mdi-emoticon-outline</v-icon>
              </v-col>
              <v-col cols="10">
                <v-text-field
                  disabled
                  label="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                >
                  <v-icon
                    slot="append"
                    color="red"
                  >
                    mdi-minus
                  </v-icon>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row
              justify="center"
              align="center"
              class="mt-n10"
            >
              <v-col
                cols="2"
                style="text-align: right"
              >
                dylan.1
                <v-icon>mdi-emoticon-outline</v-icon>
              </v-col>
              <v-col cols="10">
                <v-text-field
                  disabled
                  label="Contrary to popular belief, Lorem Ipsum is not simply random text"
                >
                  <v-icon
                    slot="append"
                    color="red"
                  >
                    mdi-minus
                  </v-icon>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row
              justify="center"
              align="center"
              class="mt-n10"
            >
              <v-col
                cols="2"
                style="text-align: right"
              >
                dylan.1
                <v-icon>mdi-emoticon-outline</v-icon>
              </v-col>
              <v-col cols="10">
                <v-text-field>
                  <v-icon
                    slot="append"
                    color="blue"
                  >
                    mdi-plus
                  </v-icon>
                </v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import axios from "axios"

export default {
  name: "DetailView",
  data() {
    return {
      tableInfo : null,
      expanded: [0],
      dialog: false,
      singleExpand : false,
      tableHeaders: [
        {
          text: "#",
          align: "start",
          sortable: false,
          value: "position",
        },
        { text: "컬럼명", value: "column_name" },
        { text: "속성명", value: "attribute_name" },
        { text: "데이터타입", value: "data_type" },
        { text: "PK여부", value: "is_pk" },
        { text: "개인정보항목여부", value: "protected" },
        { text: "", value: "data-table-expand" },
      ],
      columnInfo : [],
    };
  },
  created() {
    this.fetchTableInfo();
  },
  methods: {
    fetchTableInfo() {
      let BASE_URL = "http://172.21.22.195:8080/cookbookapi/v1/tables";
      let URL = [BASE_URL, this.$route.params.id].join("/");

      axios.get(`${URL}`).then((res) => {
        this.tableInfo = res.data;
      });

      BASE_URL = "http://172.21.22.195:8080/cookbookapi/v1/columns/search?s";

      axios.get([[BASE_URL, [this.$route.query.db_name, this.$route.query.table_name].join(".")].join("="),"exact=true"].join("&")).then((res) => {
        this.columnInfo = [];
        res.data.forEach(item => {
          this.columnInfo.push(item._source)
          this.expanded.push(item._source)
        });
        console.log(this.columnInfo);
      });
    },
  }
}
</script>
<style>

</style>
