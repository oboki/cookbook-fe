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
            <td><v-text-field v-model="newCode.name" /></td>
            <td><v-text-field v-model="newCode.description" /></td>
            <td>
              <v-btn
                icon
                @click="addCode"
              >
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
import http from '@/api/http';
import { createNamespacedHelpers } from 'vuex'

const userHelper = createNamespacedHelpers('user')

export default {
  name: 'CodeList',
  props: {
    tableId: {
      type: String,
      default: null
    },
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
  },
  data() {
    return {
      newCode: {name: null, description: null},
    }
  },
  computed: {
    ...userHelper.mapState({
      username: state => state.username
    }),
  },
  methods: {
    addCode(){
      const newCode = {
        "parent_id": this.tableId,
        "column_name": this.columnName,
        "code": this.newCode.name,
        "description": this.newCode.description,
        "author": this.username
      }

      http.post('/codes/add', {
        data: newCode
      }).then((res) => {
        newCode['id'] = res.data.created_doc_id;
      });

      this.codes.push(newCode);
      this.newCode = {name: null, description: null};
    }
  }
}
</script>
