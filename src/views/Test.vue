<template>
  <div>
    <editable
      v-model="editableModel.text.a"
      :editable="true"
    />
    <h1>
      a
    </h1>
    <v-textarea
      value="abc"
      :disabled="disabled === 1"
    />
    <button @click="disabled = (disabled + 1) % 2">
      Toggle Enable
    </button>
    <input
      type="text"
      :disabled="disabled == 1"
    >
  </div>
</template>
<script>
import http from '@/api/http';
import Editable from '@/components/Editable.vue';

export default {
  name: 'Test',
  components: {
    Editable
  },
  data(){
    return {
      editable: 0,
      disabled: 0,
      editableModel: {text: {a: "abc"}}
    }
  },
  created() {
    this.test();
  },
  methods: {
    test() {
      console.log("test");
      http.post('/codes/add', {
        data: {
          "column_name": "a",
          "code_name": "b",
          "description": "c",
        }
      }).then((res) => {
        console.log(res.data);
      });
    }
  }
}
</script>
