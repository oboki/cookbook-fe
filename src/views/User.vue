<template>
  <v-container>
    <v-row>
      <v-col cols="2" />
      <v-col cols="8">
        <v-row class="mt-10">
          <v-col>
            <v-row> <h2>북마크</h2> </v-row>
            <v-row>{{ bookmark }}</v-row>
          </v-col>
        </v-row>
        <v-row class="mt-10">
          <v-col> <v-row> <h2>내가 남긴 댓글</h2> </v-row> <v-row> - </v-row> </v-col>
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
  name: 'UserView',
  computed: {
    ...userHelper.mapState({
      bookmark: state => state.bookmark,
    }),
  },
}
</script>
<style>

</style>
