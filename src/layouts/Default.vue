<template>
  <v-app>
    <v-app-bar
      dark
      app
    >
      <v-container>
        <v-row>
          <v-app-bar-nav-icon />
          <v-toolbar-title class="mr-1 mt-2 text-h5">
            쿡북
          </v-toolbar-title>
          <v-combobox
            v-model="select"
            :loading="loading"
            :items="items"
            :search-input.sync="autocomplete"
            class="mx-4 mt-1 fixed-tabs-bar"
            flat
            dense
            hide-no-data
            hide-details
            label="검색어를 입력하세요."
            solo-inverted
            @change="search"
          >
            {{ select }}
          </v-combobox>
          <v-btn
            icon
            @click="search"
          >
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-dialog
            v-model="dialog"
            width="500"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-cog</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5 grey lighten-2">
                검색 옵션
              </v-card-title>

              <v-card-text class="mb-n7">
                <v-radio-group>
                  <v-radio label="통합검색" />
                  <v-radio label="테이블" />
                  <v-radio label="컬럼" />
                  <v-radio label="유효값" />
                  <v-radio label="사용자댓글" />
                </v-radio-group>
              </v-card-text>

              <v-divider />

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="primary"
                  text
                  @click="dialog = false"
                >
                  완료
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-btn icon>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <router-view :key="$route.path" />
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      select: this.$route.query.s,
      items: [],
      loading: false,
      dialog: false
    };
  },
  methods: {
    search() {
      const s = this.select;
      this.$router.push(
        {
          name: 'Search',
          query: { s: s }
        }
      )
    },
  }
}
</script>
<style>
</style>
