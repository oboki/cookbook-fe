<template>
  <v-container class="pa-16">
    <v-row>
      <v-col
        cols="12"
        lg="6"
      >
        <v-row>
          <h1 class="mb-4">
            Most Bookmarked Tables

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
          -
        </v-row>
        <v-row>
          <h1 class="pt-10 mb-4">
            최근 변경
          </h1>
        </v-row>
        <v-row>
          -
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
          <ul>
            <li>2021.09.07 - 쿡북 1.0.0 업그레이드</li>
          </ul>
        </v-row>
        <v-row>
          <h1 class="pt-10 mb-4">
            쿡북 사용법
          </h1>
        </v-row>
        <v-row>
          <ol>
            <li>
              쿡북은 함께 만들어가는 데이터 탐색 도구입니다.
              <ul>
                <li>
                  잘못된 데이터는 누구나 수정 가능합니다.
                </li>
                <li>
                  편집된 내용과 댓글은 검색 결과에 거의(?) 실시간으로 반영됩니다.
                </li>
                <li>
                  동료가 데이터를 찾는데 도움이 될 수 있도록 데이터 탐색 도중 알게된 뜻밖의 사실이나 사용처 등을 자유롭게 남겨주세요.
                </li>
              </ul>
            </li>
            <li>
              엘라스틱서치 기반으로 만들어진 쿡북은 기본적으로 포탈 검색엔진과 같은 `term query` 를 사용합니다.
              <ul>
                <li>
                  많은 단어를 포함시킬수록 검색 정확도가 높아집니다.
                </li>
                <li>
                  `elastic.co` 에서 기본 제공하는 한국어 형태소 분석기 `nori`를 사용합니다.
                  <br>
                  <a href="https://elastic.co/guide/en/elasticsearch/plugins/master/analysis-nori-tokenizer.html">https://elastic.co/guide/en/elasticsearch/plugins/master/analysis-nori-tokenizer.html</a>
                </li>
                <li>금융용어 등 일반적이지 않은 단어는 사전에 별도로 추가해야합니다. 검색되지 않는 단어가 있다면 gitlab에 이슈로 등록해주세요.</li>
              </ul>
            </li>
            <li>
              `고급검색` 기능을 이용해서 검색 조건을 추가할 수 있습니다.
              <ul>
                <li>`필터`에 특정 데이터베이스를 지정하면 해당 데이터베이스에 속한 결과만 검색할 수 있습니다.</li>
                <li>`와일드카드`를 이용해 특정 문자열 패턴을 포함하는 결과를 검색할 수 있습니다. 예) *카카*크*</li>
                <li>`제외 검색어`를 이용해 특정 단어가 포함된 결과를 제외할 수 있습니다.</li>
              </ul>
            </li>
          </ol>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'

const userHelper = createNamespacedHelpers('user')

export default {
  name: 'NoticeView',
  computed: {
    ...userHelper.mapState({
      username: state => state.username
    }),
  },
}
</script>
