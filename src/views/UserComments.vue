<template>
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
            <v-text-field
              v-model="comment"
              label="댓글을 남겨주세요."
            >
              <v-btn
                slot="append"
                icon
                @click="addComment"
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
</template>
<script>
import http from '@/api/http';

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
    }
  },
  data() {
    return {
      comment: null
    }
  },
  methods: {
    addComment(){
      const newComment = {
        "parent_id": this.tableId,
        "comment": this.comment,
        "author": "dylan.1"
      }

      http.post('/comments/add', {
        data: newComment
      }).then((res) => {
        newComment['id'] = res.data.created_doc_id;
      });

      this.comments.push(newComment);
      this.comment=null;
    }
  }
}
</script>
