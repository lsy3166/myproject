<template>
  <v-container>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="boards"
      :single-select="singleSelect"
      item-key="name"
      show-select
      class="elevation-1"
      @click:row="clickRow"
    >
      <template v-slot:top>
        <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$store.state.screenName = 'DB Board';
  },
  data() {
    return {
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: '번호',
          align: 'start',
          sortable: false,
          value: 'number',
          class: 'indigo darken-2 lime--text text--lighten-3'
        },
        { text: '제목', value: 'title', class: 'indigo darken-2 lime--text text--lighten-3' },
        { text: 'e-mail', value: 'email', class: 'indigo darken-2 lime--text text--lighten-3' },
        { text: '글쓴이', value: 'writer', class: 'indigo darken-2 lime--text text--lighten-3' },
        { text: '조회수', value: 'count', class: 'indigo darken-2 lime--text text--lighten-3' },
        { text: '게시일', value: 'createAt', class: 'indigo darken-2 lime--text text--lighten-3' }
      ],
      boards: [
        {
          number: 1,
          title: '게시판 글1',
          email: 'lsy@test.com',
          writer: '수이밍',
          count: 5,
          createAt: new Date()
        }
      ]
    };
  },
  methods: {
    clickRow() {
      this.$router.push({ path: '/dbboard/write' });
    }
  }
};
</script>

<style></style>
