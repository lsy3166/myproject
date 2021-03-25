<template>
  <v-container>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="boards"
      :single-select="singleSelect"
      item-key="_id"
      show-select
      class="elevation-1"
      @click:row="clickRow"
    >
      <template v-slot:top>
        <v-container>
          <v-card flat>
            <v-row align="center">
              <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
              <v-spacer></v-spacer>
              <v-btn color="primary" dark m-5 @click="createRow">
                New Item
              </v-btn>
            </v-row>
          </v-card>
        </v-container>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { api } from '../helpers/helpers';
export default {
  async mounted() {
    this.$store.state.screenName = 'DB Board';
    this.boards = await api.getboards();
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
          value: 'seq',
          class: 'indigo darken-2 lime--text text--lighten-3'
        },
        // {
        //   text: 'ID',
        //   align: 'start',
        //   sortable: false,
        //   value: '_id',
        //   class: 'indigo darken-2 lime--text text--lighten-3'
        // },
        { text: '제목', value: 'title', class: 'indigo darken-2 lime--text text--lighten-3' },
        { text: 'e-mail', value: 'email', class: 'indigo darken-2 lime--text text--lighten-3' },
        { text: '글쓴이', value: 'writer', class: 'indigo darken-2 lime--text text--lighten-3' },
        { text: '조회수', value: 'count', class: 'indigo darken-2 lime--text text--lighten-3' },
        { text: '게시일', value: 'createAt', class: 'indigo darken-2 lime--text text--lighten-3' },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
          class: 'indigo darken-2 lime--text text--lighten-3'
        }
      ],
      boards: []
    };
  },
  methods: {
    createRow() {
      this.$router.push({ path: '/dbboard/write' });
    },
    clickRow(item) {
      this.$router.push({ path: '/dbboard/write/' + item._id });
    }
  }
};
</script>

<style></style>
