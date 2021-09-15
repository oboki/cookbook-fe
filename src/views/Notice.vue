<template>
  <v-container class="pa-16">
    <v-row>
      <v-col
        cols="12"
        lg="6"
      >
        <v-row>
          <h1 class="mb-4">
            가장 많이 북마크된 테이블
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
            v-for="item in post.bookmark"
            :key="item.id"
            cols="12"
            md="6"
            class="mb-n7"
          >
            <ul>
              <li>
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
              </li>
            </ul>
          </v-col>
        </v-row>
        <v-row>
          <h1 class="pt-7 mb-n5">
            최근 변경
          </h1>
        </v-row>
        <v-row>
          <v-col>
            <ul>
              <li
                v-for="item in post.updates"
                :key="item.id"
              >
                <v-card
                  class="d-flex justify-space-between"
                  flat
                >
                  <v-card flat>
                    <router-link
                      :to="{path: /detail/+item.id}"
                      tag="div"
                      style="cursor:pointer;"
                      class="link-detail"
                    >
                      <p class="mt-6 text-h6 text-truncate">
                        {{ item.db_name }}.{{ item.table_name }}
                      </p>
                      <p
                        class="mt-n6 mb-n1 text-truncate"
                        style="font-style: italic;"
                      >
                        {{ item.entity_name }}
                      </p>
                    </router-link>
                  </v-card>
                  <v-card
                    flat
                    class="pr-12"
                  >
                    <p class="mt-7 text-truncate">
                      {{ item.max_modified_ts }}
                    </p>
                  </v-card>
                </v-card>
                <ul>
                  <li
                    v-for="column in item.columns"
                    :key="column.id"
                  >
                    <v-card
                      class="d-flex justify-space-between"
                      flat
                    >
                      <v-card flat>
                        <router-link
                          :to="{path: /detail/+column.parent_id, hash: column.id}"
                          tag="div"
                          class="link-detail"
                          style="cursor:pointer"
                        >
                          <p class="mt-1 font-weight-bold text-truncate">
                            {{ column.column_name }}
                          </p>
                          <p
                            class="mt-n5 mb-n1 text-truncate"
                            style="font-style: italic;"
                          >
                            {{ column.attribute_name }}
                          </p>
                          <p
                            class="mt-n1 mb-n1 text-truncate"
                            style="font-style: italic;"
                          >
                            {{ column.data_type }}
                          </p>
                          <p
                            class="mt-n1 mb-n1 text-truncate"
                            style="font-style: italic;"
                          >
                            {{ column.description }}
                          </p>
                        </router-link>
                      </v-card>
                      <v-card
                        flat
                        class="pr-12 text-truncate"
                      >
                        &nbsp;
                      </v-card>
                    </v-card>
                  </li>
                </ul>
              </li>
            </ul>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        lg="6"
      >
        <v-row>
          <h1
            class="mb-4"
            :class="{
              'pt-9': $vuetify.breakpoint.mdAndDown
            }"
          >
            공지사항
          </h1>
        </v-row>
        <v-row>
          <v-col>
            <ul>
              <li
                v-for="item in post.notice"
                :key="item.content"
              >
                <v-card
                  class="d-flex justify-space-between"
                  flat
                >
                  <v-card flat>
                    {{ item.content }}
                  </v-card>
                  <v-card
                    flat
                    class="pr-12 pb-5"
                  >
                    {{ item.date }}
                  </v-card>
                </v-card>
              </li>
            </ul>
          </v-col>
        </v-row>
        <v-row
          class="pa-12"
          :class="{
            'd-none': $vuetify.breakpoint.mdAndDown
          }"
        />
        <v-row
          class="pa-13"
          :class="{
            'd-none': $vuetify.breakpoint.mdAndDown
          }"
        />
        <v-row>
          <h1 class="pt-10 mb-4">
            쿡북 사용법
          </h1>
        </v-row>
        <v-row>
          <span v-html="post.guide" />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import * as httpApi from '@/api/httpApi';
import { createNamespacedHelpers } from 'vuex'

const userHelper = createNamespacedHelpers('user')

export default {
  name: 'NoticeView',
  data() {
    return {
      post: null,
    }
  },
  computed: {
    ...userHelper.mapState({
      username: state => state.username
    }),
  },
  created() {
    httpApi.list('posts').then((res) => {
      this.post = res.data.hits[0]._source;
      console.log(this.post);
    });
  }
}
</script>
<style>
.link-detail:hover {
    color: #929292;
}
</style>
