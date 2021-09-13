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
          :to="{path: /detail/+item._source.parent_id, hash: item._source.column_name}"
          tag="div"
          class="link-detail"
          style="cursor:pointer;"
        >
          <div class="text-h6">
            {{ item._source.code }}
          </div>
          <div
            class="text-h6 mt-n2"
          >
            {{ item._source.description }}
          </div>
          <div
            class="mt-n1"
          >
            {{ item._source.column_name }}
          </div>
          <div
            class="mb-n2"
          >
            {{ item._source.attribute_name }}
          </div>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'CodeSearchList',
  props: {
    items: {
      type: Array,
      default: null
    }
  }

}
</script>
