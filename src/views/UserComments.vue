<template>
  <v-card
    class="mx-auto pa-7"
    flat
  >
    <v-row>
      <v-col cols="12">
        <v-row
          v-for="item in comments"
          :id="item.id"
          :key="item.id"
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
            />
          </v-col>
          <v-col cols="1">
            <v-btn
              icon
              @click="deleteComment(item.id)"
            >
              <v-icon>
                mdi-minus
              </v-icon>
            </v-btn>
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
            {{ username }}
            <v-icon>mdi-emoticon-outline</v-icon>
          </v-col>
          <v-col cols="9">
            <v-text-field
              v-model="comment"
              label="댓글을 남겨주세요."
            />
          </v-col>
          <v-col cols="1">
            <v-btn
              slot="append"
              icon
              @click="addComment"
            >
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import * as httpApi from '@/api/httpApi';
import { createNamespacedHelpers } from 'vuex'

const userHelper = createNamespacedHelpers('user')

export default {
  name: 'UserComments',
  props: {
    comments: {
      type: Array,
      default: null
    },
    tableId: {
      type: String,
      default: null
    },
    tableInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      comment: null
    }
  },
  computed: {
    ...userHelper.mapState({
      username: state => state.username
    }),
  },
  methods: {
    addComment(){
      const newComment = {
        "parent_id": this.tableId,
        "db_name": this.tableInfo.db_name,
        "table_name": this.tableInfo.table_name,
        "entity_name": this.tableInfo.entity_name,
        "comment": this.comment,
        "author": this.username
      }

      httpApi.addDocument('comments', newComment).then((res) => {
        newComment['id'] = res.data.created_doc_id;
      });

      this.comments.push(newComment);
      this.comment=null;
    },
    deleteComment(val){
      console.log('delete called');
      httpApi.deleteDocument('comments', val).then((res) => {
        console.log(res);
      });
      for(let i=0;i<this.comments.length;i++){
        if(this.comments[i].id === val){
          this.comments.splice(i,1);
        }
      }
    }
  }
}
</script>
