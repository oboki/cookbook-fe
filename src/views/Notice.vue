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
          <h1 class="pt-7 mb-n4">
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
                      <p class="mt-5 text-h6 text-truncate">
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
                            v-if="column.description"
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
          <ol>
            <li>
              쿡북은 함께 만들어가는 데이터 탐색 도구입니다.  <ul>
                <li>
                  쿡북의 데이터는 누구나 수정 가능합니다. 잘못된 데이터가 있다면 수정
                  <i
                    class="v-icon notranslate mdi mdi-square-edit-outline"
                    style="font-size: 20px;"
                  />
                  버튼을 눌러 고쳐주세요.
                </li>
                <li> 편집된 내용과 댓글은 검색 결과에 거의(?) 실시간으로 반영됩니다.  </li>
                <li>
                  동료가 데이터를 찾는데 도움이 될 수 있도록 데이터 탐색 도중 알게된 뜻밖의 사실이나 사용처 등을 자유롭게 남겨주세요.
                </li>
              </ul>
            </li>
            <li> 쿡북은 포탈 검색엔진과 같은 `term query` 를 사용합니다.  <ul> <li> 많은 단어를 포함시킬수록 검색 정확도가 높아집니다.  </li> <li> `elastic.co` 에서 기본 제공하는 한국어 형태소 분석기 `nori`를 사용합니다.  <br> <a href="https://elastic.co/guide/en/elasticsearch/plugins/master/analysis-nori-tokenizer.html">https://elastic.co/guide/en/elasticsearch/plugins/master/analysis-nori-tokenizer.html</a> </li> <li>금융용어 등 일반적이지 않은 단어는 사전에 별도로 추가해야합니다. 검색되지 않는 단어가 있다면 제보해주세요.</li> </ul> </li>
            <li>
              설정
              <i
                class="v-icon notranslate mdi mdi-cog"
                style="font-size: 20px;"
              />
              버튼을 눌러 검색 대상이나 검색 결과 페이지 크기를 설정할 수 있습니다. <br>
            </li>
            <li>
              `고급검색` 기능을 이용해서 검색 조건을 추가할 수 있습니다.
              <ul>
                <li>`필터`에 특정 데이터베이스를 지정하면 해당 데이터베이스에 속한 결과만 검색할 수 있습니다.</li> <li>`와일드카드`를 이용해 특정 문자열 패턴을 포함하는 결과를 검색할 수 있습니다. 예) *카카*크*</li>
                <li>
                  `제외 검색어`를 이용해 특정 단어가 포함된 결과를 제외할 수 있습니다.<br>
                </li>
              </ul>
            </li>
            <li>
              개인
              <i
                class="v-icon notranslate mdi mdi-account"
                style="font-size: 20px;"
              />
              페이지에서는 사용자별로 북마크한 테이블과 댓글들을 확인할 수 있습니다.
            </li>
          </ol>
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
    });
  }
}
</script>
<style>
.link-detail:hover {
    color: #929292;
}
</style>
