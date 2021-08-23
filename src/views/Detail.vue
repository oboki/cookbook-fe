<template>
  <v-container style="height: calc(100vh)">
    <v-row>
      <v-col>
        <v-card
          class="mx-auto pa-7"
          flat
        >
          <v-row>
            <v-col
              cols="2"
            />
            <v-col cols="4">
              <v-row
                class="ml-n4"
              >
                <div class="text-left">
                  <v-btn
                    icon
                    color="black"
                    @click="$router.go(-1)"
                  >
                    <v-icon
                      size="45"
                    >
                      mdi-arrow-left-thick
                    </v-icon>
                  </v-btn>
                  <v-dialog
                    v-model="dialog"
                    width="900"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        class="ma-1"
                        v-on="on"
                      >
                        <v-icon size="45">
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
                  <v-btn
                    icon
                  >
                    <v-icon size="45">
                      mdi-star
                    </v-icon>
                  </v-btn>
                </div>
              </v-row>
              <v-row>
                <div class="text-h4 text-left pt-2">
                  {{ tableInfo.db_name }}.{{ tableInfo.table_name }}
                </div>
              </v-row>
              <v-row>
                <div
                  class="text-h5 text-left editable_div"
                  contenteditable="true"
                >
                  <i>{{ tableInfo.entity_name }}</i>
                </div>
              </v-row>
            </v-col>
            <v-col
              cols="4"
              class="d-flex align-end flex-column"
              flat
              height="100%"
            >
              <div
                class="d-flex align-end flex-column mt-auto"
                flat
              >
                편집
              </div>
            </v-col>
            <v-col cols="2" />
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          class="mx-auto pa-7 mt-n8"
          flat
        >
          <v-row>
            <v-col
              cols="2"
            />
            <v-col cols="8">
              <v-textarea
                outlined
                label="테이블 설명"
                disabled
                :value="tableInfo.description"
                rows="5"
              />
            </v-col>
            <v-col
              cols="2"
            />
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          class="mx-auto pa-7 mt-n16"
          flat
        >
          <v-row
            class="mt-n8"
          >
            <v-col
              cols="2"
            />
            <v-col
              cols="8"
            >
              <v-textarea
                outlined
                label="스토리지 타입"
                disabled
                :value="tableInfo.storage_type"
                rows="1"
              />
            </v-col>
            <v-col cols="2" />
          </v-row>
          <v-row
            class="mt-n8"
          >
            <v-col
              cols="2"
            />
            <v-col cols="8">
              <v-textarea
                outlined
                label="파티션"
                disabled
                :value="tableInfo.partition_key + ': ' + tableInfo.partition_range_from + ' ~ ' + tableInfo.partition_range_to"
                rows="1"
              />
            </v-col>
            <v-col cols="2" />
          </v-row>
          <v-row
            class="mt-n8"
          >
            <v-col
              cols="2"
            />
            <v-col cols="8">
              <v-textarea
                outlined
                label="담당자"
                disabled
                value="-"
                rows="1"
              />
            </v-col>
            <v-col cols="2" />
          </v-row>
          <v-row
            class="mt-n8"
          >
            <v-col
              cols="2"
            />
            <v-col cols="8">
              <v-textarea
                outlined
                label="태그"
                disabled
                value="-"
                rows="1"
              />
            </v-col>
            <v-col cols="2" />
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card
          class="mx-auto pa-7"
          flat
        >
          <v-row
            class="mt-n14"
          >
            <v-col cols="2">
              <div class="text-h6 font-weight-black text-right" />
            </v-col>
            <v-col cols="8">
              <v-data-table
                :headers="tableHeaders"
                :items="columnInfo"
                :single-expand="singleExpand"
                :expanded.sync="expanded"
                item-key="position"
                show-expand
              >
                <template
                  v-slot:expanded-item="{ headers, item }"
                >
                  <td
                    :colspan="headers.length"
                    class="elevation-0"
                  >
                    <v-row class="mt-10">
                      <v-textarea
                        outlined
                        label="컬럼 설명"
                        disabled
                        :value="item.description"
                        rows="5"
                      />
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
                    <v-row class="mb-2 pb-7">
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
                              <tr
                                v-for="code in codesInfo[item.column_name]"
                                :key="code.id"
                              >
                                <td>{{ code.code }}</td>
                                <td>{{ code.description }}</td>
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
            <v-col cols="2" />
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="pb-7">
      <v-col>
        <v-card
          class="mx-auto pa-7"
          flat
        >
          <v-row>
            <v-col cols="2">
              <div class="text-h6 font-weight-black text-right" />
            </v-col>
            <v-col cols="8">
              <v-row
                v-for="item in commentsInfo"
                :key="item._id"
                justify="center"
                align="center"
                class="mt-n10"
              >
                <v-col
                  cols="2"
                  style="text-align: right"
                >
                  {{ item.author }}
                  <v-icon>mdi-emoticon-outline</v-icon>
                </v-col>
                <v-col cols="9">
                  <v-text-field
                    disabled
                    :value="item.comment"
                  >
                    <v-icon
                      slot="append"
                    >
                      mdi-minus
                    </v-icon>
                  </v-text-field>
                </v-col>
                <v-col cols="1" />
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
                <v-col cols="9">
                  <v-text-field>
                    <v-icon
                      slot="append"
                    >
                      mdi-plus
                    </v-icon>
                  </v-text-field>
                </v-col>
                <v-col cols="1" />
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      commentsInfo : [],
      codesInfo : {},
    };
  },
  watch: {
    expanded: {
      handler(val, oldVal){
        if(val.length >= oldVal.length){
          const columnName = (val.filter(x => !oldVal.includes(x))[0].column_name);
          this.fetchCodeInfo(columnName);
        }
      }
    },
  },
  created() {
    this.fetchTableInfo();
  },
  methods: {
    fetchCodeInfo(columnName){
      let BASE_URL = "http://172.21.22.195:8080/cookbookapi/v1/codes/search?s";
      console.log([[BASE_URL, columnName].join("="),"by-column-name=true"].join("&"));
      axios.get([[BASE_URL, columnName].join("="),"by-column-name=true"].join("&")).then((res) => {
        const codes = [];
        res.data.hits.forEach(item => {
          codes.push(item._source);
        });
        this.codesInfo[columnName] = codes;
        this.$forceUpdate();
      });

    },
    fetchTableInfo() {
      let BASE_URL = "http://172.21.22.195:8080/cookbookapi/v1/tables";
      let URL = [BASE_URL, this.$route.params.id].join("/");

      axios.get(`${URL}`).then((res) => {
        this.tableInfo = res.data;
      });

      BASE_URL = "http://172.21.22.195:8080/cookbookapi/v1/columns/search?s";
      axios.get([[BASE_URL, this.$route.params.id].join("="),"by-parent-id=true"].join("&")).then((res) => {
        this.columnInfo = [];
        console.log(res.data.hits);
        res.data.hits.forEach(item => {
          item._source['id'] = item._id;
          this.columnInfo.push(item._source)
          //this.expanded.push(item._source)
        });
      });

      BASE_URL = "http://172.21.22.195:8080/cookbookapi/v1/comments/search?s";
      axios.get([[BASE_URL, this.$route.params.id].join("="),"by-parent-id=true"].join("&")).then((res) => {
        this.commentsInfo = [];
        res.data.hits.forEach(item => {
          this.commentsInfo.push(item._source)
        });
      });
    },
  }
}
</script>
<style>
.v-data-table__expanded.v-data-table__expanded__content {
  box-shadow: none !important;
}

div[contenteditable] {
  border: 1px;
}
</style>
