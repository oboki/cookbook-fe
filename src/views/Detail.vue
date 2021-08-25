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
                      mdi-arrow-top-left-thick
                    </v-icon>
                  </v-btn>
                </div>
              </v-row>
              <v-row>
                <div class="text-h4 text-left">
                  {{ tableInfo.db_name }}.{{ tableInfo.table_name }}
                </div>
              </v-row>
              <v-row>
                <div
                  class="text-h5 text-left cookbook-editable"
                  style="display:block"
                  contenteditable="false"
                >
                  <i>{{ tableInfo.entity_name }}</i>
                </div>
                <div
                  class="text-h5 text-left cookbook-editable"
                  contenteditable="true"
                  style="display:none"
                >
                  <i>{{ tableInfo.entity_name }}</i>
                </div>
              </v-row>
            </v-col>
            <v-col
              cols="4"
              flat
              height="100%"
              class="d-flex align-end mt-auto flex-row-reverse"
            >
              <v-btn
                icon
                class="cookbook-editable"
                style="display:block"
                @click="toggleEditable"
              >
                <v-icon
                  size="30"
                >
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn
                icon
                class="cookbook-editable"
                style="display:none"
                @click="toggleEditable"
              >
                <v-icon
                  size="30"
                >
                  mdi-close
                </v-icon>
              </v-btn>
              <v-btn
                icon
                class="cookbook-editable"
                style="display:none"
                @click="toggleEditable"
              >
                <v-icon
                  size="30"
                >
                  mdi-check
                </v-icon>
              </v-btn>
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
                style="display:block"
                class="cookbook-editable"
              />
              <v-textarea
                outlined
                label="테이블 설명"
                :value="tableInfo.description"
                rows="5"
                style="display:none"
                class="cookbook-editable"
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
                class="cookbook-editable"
                style="display:block"
              />
              <v-textarea
                outlined
                label="담당자"
                value="-"
                rows="1"
                class="cookbook-editable"
                style="display:none"
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
                    <v-row class="pt-10">
                      <v-col
                        cols="10"
                      >
                        <v-row>
                          <div class="text-h5 text-left">
                            {{ item.column_name }}
                          </div>
                        </v-row>
                        <v-row>
                          <div
                            class="text-h6 text-left cookbook-editable"
                            style="display:block"
                            contenteditable="false"
                          >
                            <i>{{ item.attribute_name }}</i>
                          </div>
                          <div
                            class="text-h6 text-left cookbook-editable"
                            contenteditable="true"
                            style="display:none"
                          >
                            <i>{{ item.attribute_name }}</i>
                          </div>
                        </v-row>
                      </v-col>
                      <v-spacer />
                      <v-col
                        cols="2"
                        flat
                        class="d-flex align-end mt-auto flex-row-reverse"
                      >
                        <v-btn
                          icon
                          class="cookbook-editable"
                          style="display:block"
                          @click="toggleEditable"
                        >
                          <v-icon
                            size="30"
                          >
                            mdi-pencil
                          </v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          class="cookbook-editable"
                          style="display:none"
                          @click="toggleEditable"
                        >
                          <v-icon
                            size="30"
                          >
                            mdi-close
                          </v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          class="cookbook-editable"
                          style="display:none"
                          @click="toggleEditable"
                        >
                          <v-icon
                            size="30"
                          >
                            mdi-check
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row class="mt-10">
                      <v-textarea
                        outlined
                        label="컬럼 설명"
                        disabled
                        :value="item.description"
                        rows="5"
                        class="cookbook-editable"
                        style="display:block"
                      />
                      <v-textarea
                        outlined
                        label="컬럼 설명"
                        :value="item.description"
                        rows="5"
                        class="cookbook-editable"
                        style="display:none"
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
                              <tr>
                                <td><v-text-field /></td>
                                <td><v-text-field /></td>
                                <td>
                                  <v-btn icon>
                                    <v-icon>
                                      mdi-plus
                                    </v-icon>
                                  </v-btn>
                                </td>
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
                    <v-btn
                      slot="append"
                      icon
                    >
                      <v-icon>
                        mdi-minus
                      </v-icon>
                    </v-btn>
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
                    <v-btn
                      slot="append"
                      icon
                    >
                      <v-icon>
                        mdi-plus
                      </v-icon>
                    </v-btn>
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
      let BASE_URL = "http://172.21.22.195:9090/cookbookapi/v1/codes/search?s";
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
      let BASE_URL = "http://172.21.22.195:9090/cookbookapi/v1/tables";
      let URL = [BASE_URL, this.$route.params.id].join("/");

      axios.get(`${URL}`).then((res) => {
        this.tableInfo = res.data;
      });

      BASE_URL = "http://172.21.22.195:9090/cookbookapi/v1/columns/search?s";
      axios.get([[BASE_URL, this.$route.params.id].join("="),"by-parent-id=true"].join("&")).then((res) => {
        this.columnInfo = [];
        console.log(res.data.hits);
        res.data.hits.forEach(item => {
          item._source['id'] = item._id;
          this.columnInfo.push(item._source)
          //this.expanded.push(item._source)
        });
      });

      BASE_URL = "http://172.21.22.195:9090/cookbookapi/v1/comments/search?s";
      axios.get([[BASE_URL, this.$route.params.id].join("="),"by-parent-id=true"].join("&")).then((res) => {
        this.commentsInfo = [];
        res.data.hits.forEach(item => {
          this.commentsInfo.push(item._source)
        });
      });
    },
    toggleEditable(){
      const l = document.getElementsByClassName("cookbook-editable");
      l.forEach(item => {
        if(item.style.display === 'none'){
          item.style.display = 'block'
        } else {
          item.style.display = 'none'
        }
      });
      console.log(l);
    },
  }
}
</script>
<style>
.v-data-table__expanded.v-data-table__expanded__content {
  box-shadow: none !important;
}

div[contenteditable="false"] {
  border: 1px;
  border-radius: 3px;
  padding: 1px;
}

div[contenteditable="true"] {
  border: solid 1px;
  border-radius: 3px;
}
</style>
