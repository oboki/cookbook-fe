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
          :to="{path: /detail/+item._source.parent_id, hash: item._id}"
          tag="div"
          class="link-detail"
          style="cursor:pointer"
        >
          <div class="text-h6">
            {{ item._source.column_name }}
          </div>
          <div
            class="text-h6 mt-n2"
          >
            {{ item._source.attribute_name }}
          </div>
          <div
            class="mt-n1"
          >
            {{ item._source.db_name }}.{{ item._source.table_name }} | {{ item._source.entity_name }}
          </div>
          <div
            class="mb-n1"
          >
            {{ item._source.data_type }} | {{ item._source.data_length }}
            <span v-if="isEncrypted(item._source.is_encrypted)">
              | {{ isEncrypted(item._source.is_encrypted) }}
            </span>
            <span v-if="isProtected(item._source.is_protected)">
              | {{ isProtected(item._source.is_protected) }}
            </span>
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
  name: 'ColumnSearchList',
  props: {
    items: {
      type: Array,
      default: null
    }
  },
  methods: {
    isEncrypted(value) {
      return value === 'Y' ? "암호화필드" : null;
    },
    isProtected(value) {
      return value === 'Y' ? "개인정보포함" : null;
    }
  }

}
</script>
