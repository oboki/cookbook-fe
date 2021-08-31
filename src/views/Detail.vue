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
            <v-col cols="7">
              <v-row
                :id="this.$route.params.id"
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
                  {{ detail.table.db_name }}.{{ detail.table.table_name }}
                </div>
              </v-row>
              <v-row>
                <v-text-field
                  v-model="detail.table.entity_name"
                  :disabled="!isEditable(this.$route.params.id)"
                  class="mt-n4 text-h5"
                />
              </v-row>
            </v-col>
            <v-col
              cols="1"
              flat
              height="100%"
              class="d-flex align-end mt-auto flex-row-reverse"
            >
              <v-btn
                icon
                :class="{
                  'cookbook-display-none': !isBookmarked(detail.table.id),
                  'cookbook-display-block': isBookmarked(detail.table.id)
                }"
                color="yellow"
                @click="toggleBookmarked()"
              >
                <v-icon
                  size="35"
                >
                  mdi-star
                </v-icon>
              </v-btn>
              <v-btn
                icon
                :class="{
                  'cookbook-display-none': isBookmarked(detail.table.id),
                  'cookbook-display-block': !isBookmarked(detail.table.id)
                }"
                @click="toggleBookmarked()"
              >
                <v-icon
                  size="35"
                >
                  mdi-star-outline
                </v-icon>
              </v-btn>
              <v-btn
                icon
                :class="{
                  'cookbook-display-none': isEditable(detail.table.id),
                  'cookbook-display-block': !isEditable(detail.table.id)
                }"
                @click="editable.push(detail.table.id)"
              >
                <v-icon
                  size="30"
                >
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn
                icon
                :class="{
                  'cookbook-display-block': isEditable(detail.table.id),
                  'cookbook-display-none': !isEditable(detail.table.id)
                }"
                @click="popEditable(detail.table.id)"
              >
                <v-icon
                  size="30"
                >
                  mdi-close
                </v-icon>
              </v-btn>
              <v-btn
                icon
                :class="{
                  'cookbook-display-block': isEditable(detail.table.id),
                  'cookbook-display-none': !isEditable(detail.table.id)
                }"
                @click="updateDocument('tables', detail.table.id)"
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
          class="mx-auto pa-7 mt-n13"
          flat
        >
          <v-row>
            <v-col
              cols="2"
            />
            <v-col cols="8">
              <v-textarea
                v-model="detail.table.description"
                outlined
                label="테이블 설명"
                :disabled="!isEditable(this.$route.params.id)"
                rows="5"
                style="display:block"
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
                v-model="detail.table.storage_type"
                outlined
                label="스토리지 타입"
                :disabled="!isEditable(this.$route.params.id)"
                rows="1"
              />
            </v-col>
            <v-col cols="2" />
          </v-row>
          <v-row
            class="mt-n8"
          >
            <v-col cols="2" />
            <v-col cols="8">
              <v-textarea
                v-model="detail.table.partition_key"
                outlined
                label="파티션 키"
                :disabled="!isEditable(this.$route.params.id)"
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
                v-model="detail.table.contact"
                outlined
                label="담당자"
                :disabled="!isEditable(this.$route.params.id)"
                rows="1"
                class="cookbook-editable"
                style="display:block"
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
                :items="detail.columns"
                :single-expand="singleExpand"
                :expanded.sync="expanded"
                :items-per-page="-1"
                item-key="position"
                show-expand
              >
                <template
                  :id="item.id"
                  v-slot:expanded-item="{ headers, item }"
                >
                  <div :id="item.id" />
                  <td
                    :colspan="headers.length"
                    class="elevation-0"
                  >
                    <v-row
                      class="pt-10"
                    >
                      <v-col
                        cols="10"
                      >
                        <v-row>
                          <div class="text-h5 text-left">
                            {{ item.column_name }}
                          </div>
                        </v-row>
                        <v-row>
                          <v-text-field
                            v-model="item.attribute_name"
                            :disabled="!isEditable(item.id)"
                            class="text-h6 text-left mt-n4"
                          />
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
                          :class="{
                            'cookbook-display-none': isEditable(item.id),
                            'cookbook-display-block': !isEditable(item.id)
                          }"
                          @click="editable.push(item.id)"
                        >
                          <v-icon
                            size="30"
                          >
                            mdi-pencil
                          </v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          :class="{
                            'cookbook-display-block': isEditable(item.id),
                            'cookbook-display-none': !isEditable(item.id)
                          }"
                          @click="popEditable(item.id)"
                        >
                          <v-icon
                            size="30"
                          >
                            mdi-close
                          </v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          :class="{
                            'cookbook-display-block': isEditable(item.id),
                            'cookbook-display-none': !isEditable(item.id)
                          }"
                          @click="updateDocument('columns', item.id)"
                        >
                          <v-icon
                            size="30"
                          >
                            mdi-check
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row class="mt-3">
                      <v-textarea
                        v-model="item.description"
                        outlined
                        label="컬럼 설명"
                        :disabled="!isEditable(item.id)"
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
                        <code-list
                          :table-id="item.parent_id"
                          :column-name="item.column_name"
                          :codes="codes[item.column_name]"
                        />
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
        <user-comments
          :comments="detail.comments"
          :table-id="this.$route.params.id"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import * as httpApi from '@/api/httpApi';
import http from '@/api/http';
import CodeList from '@/views/CodeList';
import UserComments from '@/views/UserComments.vue';
import { createNamespacedHelpers } from 'vuex'

const userHelper = createNamespacedHelpers('user')

export default {
  name: "DetailView",
  components: {
    CodeList,
    UserComments,
  },
  data() {
    return {
      expanded: [],
      editable: [],
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
      detail: {
        'table': {},
        'columns': [],
        'comments': [],
      },
      codes: {},
      testString: "This is Test",
    };
  },
  computed: {
    ...userHelper.mapState({
      bookmark: state => state.bookmark
    }),
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
    fetchCodeInfo(val){
      httpApi.search(
        'codes', val,
        1000, 0, ['by-column-name']
      ).then((res) => {
        const tmp = [];
        res.data.hits.forEach(item => {
          tmp.push(item._source);
        });
        this.$set(this.codes, val, tmp)
      });
    },
    fetchTableInfo() {
      httpApi.getDocument('tables', this.$route.params.id).then((res) => {
        res.data['id'] = this.$route.params.id;
        this.$set(this.detail, 'table', res.data);
      });

      httpApi.search(
        'columns', this.$route.params.id,
        1000, 0, ['by-parent-id']
      ).then((res) => {
        const tmp = [];
        res.data.hits.forEach(item => {
          item._source['id'] = item._id;
          if ('#'+item._id === this.$route.hash){
            this.expanded.push(item._source)
            this.fetchCodeInfo(item._source.column_name);
          }
          tmp.push(item._source);
        });
        this.$set(this.detail, 'columns', tmp)
      });

      httpApi.search(
        'comments', this.$route.params.id,
        1000, 0, ['by-parent-id']
      ).then((res) => {
        const tmp = [];
        res.data.hits.forEach(item => {
          item._source['id'] = item._id;
          tmp.push(item._source);
        });
        this.$set(this.detail, 'comments', tmp)
      });
    },
    isEditable(val){
      if (this.editable.includes(val)) {
        return true;
      }
      return false;
    },
    popEditable(val){
      const tmp = []
      this.editable.forEach(item => {
        if (item !== val) {
          tmp.push(item);
        }
      });
      this.editable = tmp;
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
    },
    isBookmarked(val){
      for (let i=0;i<this.bookmark.length;i++){
        if (this.bookmark[i].id === val){
          return true;
        }
      }
      return false;
    },
    toggleBookmarked(){
      if (this.isBookmarked(this.$route.params.id)){
        this.popBookmark({
          "id":this.$route.params.id,
          "db_name":this.detail.table.db_name,
          "table_name":this.detail.table.table_name,
          "entity_name":this.detail.table.entity_name
        });
      } else {
        this.appendBookmark({
          "id":this.$route.params.id,
          "db_name":this.detail.table.db_name,
          "table_name":this.detail.table.table_name,
          "entity_name":this.detail.table.entity_name
        });
      }
    },
    updateDocument(index, id){
      let doc = {}
      if (index === 'tables'){
        doc = this.detail.table;
      } else if (index === 'columns'){
        this.detail.columns.forEach(item => {
          if(item.id === id) {
            doc = item
          }
        })
      }
      http.post('/'+index+'/edit/'+id, {
        data: doc
      }).then((res) => {
        console.log(res.data.status)
      });
      this.popEditable(id);
    },
    ...userHelper.mapActions([
      'appendBookmark'
    ]),
    ...userHelper.mapActions([
      'popBookmark'
    ]),
  }
}
</script>
<style>
.v-data-table__expanded.v-data-table__expanded__content {
  box-shadow: none !important;
}
.v-text-field > .v-input__control > .v-input__slot:before {
  border: none;
}

.cookbook-display-block {
  display:block
}

.cookbook-display-none {
  display:none
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
