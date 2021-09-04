<template>
  <v-container>
    <v-row>
      <v-col cols="2" />
      <v-col cols="8">
        <v-row class="mt-10">
          <v-col>
            <v-row>
              <h2>공지사항</h2>
            </v-row>
            <v-row>
              -
            </v-row>
            <v-row>
              <h2>가장 많은 관심을 받은 테이블</h2>
            </v-row>
            <v-row>
              -
            </v-row>
            <v-row>
              <h2>신규 테이블</h2>
            </v-row>
            <v-row>
              -
            </v-row>
            <v-row>
              <h2>신규 컬럼</h2>
            </v-row>
            <v-row>
              -
            </v-row>
            <v-row>
              <h2>최근 변경</h2>
            </v-row>
            <v-row>
              -
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2" />
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
