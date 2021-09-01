<template>
  <v-container>
    <v-row>
      <v-col cols="2" />
      <v-col cols="8">
        <v-row class="mt-10">
          <v-col>
            <v-row>
              <h2>북마크</h2>
            </v-row>
            <v-row>
              <ul class="mt-7">
                <li
                  v-for="item in bookmark"
                  :key="item.id"
                >
                  <router-link
                    :to="{path: /detail/+item.id}"
                    tag="div"
                    style="cursor:pointer;"
                  >
                    <p class="mt-n2">
                      {{ item.db_name }}.{{ item.table_name }}
                    </p>
                    <p class="mt-n5">
                      {{ item.entity_name }}
                    </p>
                  </router-link>
                </li>
              </ul>
            </v-row>
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col>
            <v-row>
              <h2>내가 남긴 댓글</h2>
            </v-row>
            <v-row>
              <ul class="mt-7">
                <li
                  v-for="item in comments"
                  :key="item._id"
                >
                  <router-link
                    :to="{
                      path: /detail/+item._source.parent_id,
                      hash: item._id
                    }"
                    tag="div"
                    style="cursor:pointer;"
                  >
                    <p class="mt-n2">
                      {{ item._source.table_name }}
                    </p>
                    <p class="mt-n5">
                      {{ item._source.comment }}
                    </p>
                  </router-link>
                </li>
              </ul>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2" />
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
      comments: null
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
        'comments', this.username,
        1000, 0, ['by-author']
      ).then((res) => {
        this.comments = res.data.hits;
      });
    }
  },
}
</script>
<style>
.cookbook-display-block {
  display:inline;
}

.cookbook-display-none {
  display:none
}
</style>
