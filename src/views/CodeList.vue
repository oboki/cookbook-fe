<template>
  <div>
    <v-simple-table>
      <template>
        <thead>
          <tr>
            <th class="text-left">
              값
            </th>
            <th class="text-left">
              설명
            </th>
            <th class="text-left" />
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="code in codes"
            :key="code.id"
          >
            <td>{{ code.code }}</td>
            <td>{{ code.description }}</td>
            <td />
          </tr>
          <tr>
            <td><v-text-field /></td>
            <td><v-text-field /></td>
            <td>
              <v-btn icon>
                <v-icon>
                  mdi-plus
                </v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>
export default {
  name: 'CodeList',
  props: {
    columnName: {
      type: String,
      default: null
    },
    test: {
      type: String,
      default: null
    },
    codes: {
      type: Array,
      default: null
    }
  }
}
</script>
