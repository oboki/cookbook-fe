<template>
  <div>
    <v-row
      v-for="item in items"
      :key="item._id"
    >
      <v-col
        cols="9"
        class="ml-2"
      >
        <router-link
          :to="{path: /detail/+item._id}"
          tag="div"
          class="link-detail"
          style="cursor:pointer"
        >
          <div class="text-h6">
            {{ item._source.db_name }}.{{ item._source.table_name }}
          </div>
          <div
            class="text-h6 mt-n2"
          >
            {{ item._source.entity_name }}
          </div>
          <div
            class="mt-n1"
          >
            {{ item._source.storage_type }}
          </div>
          <div
            class="mb-n2"
          >
            {{ item._source.description }}
          </div>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'TableSearchList',
  props: {
    items: {
      type: Array,
      default: null
    }
  }
}
</script>
