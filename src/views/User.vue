<template>
  <v-container class="pa-16">
    <v-row>
      <h1 class="mb-5">
        북마크
        <v-btn
          icon
          class="mb-2 ml-1"
          color="yellow"
        >
          <v-icon
            size="45"
          >
            mdi-star
          </v-icon>
        </v-btn>
      </h1>
    </v-row>
    <v-row>
      <v-col
        v-for="item in bookmark"
        :key="item.id"
        cols="12"
        md="6"
        lg="3"
        class="mt-n4"
      >
        <router-link
          :to="{path: /detail/+item.id}"
          tag="div"
          style="cursor:pointer;"
          class="link-detail"
        >
          <p class="mt-n2 text-h6 text-truncate">
            {{ item.db_name }}.{{ item.table_name }}
          </p>
          <p
            class="mt-n6 text-truncate"
            style="font-style: italic;"
          >
            {{ item.entity_name }}
          </p>
        </router-link>
      </v-col>
    </v-row>
    <v-row>
      <h1 class="mb-9 mt-4">
        내가 남긴 댓글
      </h1>
    </v-row>
    <v-row
      v-for="item in comments"
      :key="item._id"
      class="mt-n7"
    >
      <v-col>
        <router-link
          :to="{
            path: /detail/+item._source.parent_id,
            hash: item._id
          }"
          tag="div"
          style="cursor:pointer;"
          class="link-detail"
        >
          <p
            class="mt-n2 text-h6"
          >
            {{ item._source.table_name }}
          </p>
          <p
            class="mt-n4 text-truncate"
          >
            {{ item._source.comment }}
          </p>
        </router-link>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p
          v-if="hasMoreComment"
          style="color: rgb(41, 90, 221); text-decoration: underline; cursor: pointer;"
          class="mt-n7"
          @click="fetchMoreComment"
        >
          더 불러오기
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import * as httpApi from '@/api/httpApi';
import { createNamespacedHelpers } from 'vuex'

const userHelper = createNamespacedHelpers('user')

export default {
  name: 'UserView',
  components: {
  },
  data() {
    return {
      comments: [],
      currentPageForComment: 0,
      hasMoreComment: true
    }
  },
  computed: {
    ...userHelper.mapState({
      bookmark: state => state.bookmark,
      username: state => state.username,
    }),
  },
  created() {
    this.searchCommentbyAuthor();
  },
  methods: {
    searchCommentbyAuthor() {
      httpApi.search(
        'comments', this.username.toLowerCase(), 10,
        this.currentPageForComment, ['by-author']
      ).then((res) => {
        this.comments = this.comments.concat(res.data.hits);
        if (res.data.hits.length === 0) {
          this.hasMoreComment = false;
        }
      });
    },
    fetchMoreComment() {
      this.currentPageForComment = this.currentPageForComment + 1;
      this.searchCommentbyAuthor();
    },
  }
}
</script>
<style>
.cookbook-display-block {
  display:inline;
}

.cookbook-display-none {
  display:none
}

.link-detail:hover {
    color: #929292;
}
</style>
