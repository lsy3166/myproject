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
    >
      <template v-slot:top>
        <v-toolbar>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete these checked items?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-container>
          <v-card flat>
            <v-row align="center">
              <v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
              <v-spacer></v-spacer>
              <v-btn color="primary" dark style="margin:5px" @click="createRow">
                New
              </v-btn>
              <v-btn color="red" dark @click="deleteRows">
                Delete
              </v-btn>
            </v-row>
          </v-card>
        </v-container>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="detailItem(item)">
          mdi-view-list
        </v-icon>
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:item.count="{ item }">
        <v-chip :color="getColor(item.count)" dark>
          {{ item.count }}
        </v-chip>
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
      dialogDelete: false,
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
  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  methods: {
    createRow() {
      this.$router.push({ path: '/dbboard/write' });
    },
    editItem(item) {
      this.$router.push({ path: '/dbboard/write/' + item._id });
    },
    async deleteItem(item) {
      const sure = window.confirm('Are you sure?');
      if (!sure) return;
      await api.deleteboard(item._id);
      this.flash('deleted sucessfully!', 'success');
      this.boards = await api.getboards();
    },
    deleteRows() {
      this.dialogDelete = true;
    },
    async detailItem(item) {
      item.count += 1;
      await api.updateboard(item, item._id);
    },
    getColor(calories) {
      if (calories > 10) return 'red';
      else if (calories > 5) return 'orange';
      else return 'green';
    },
    deleteItemConfirm() {
      // this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
      this.$nextTick(() => {
        this.deleteForEach();
      });
    },
    async deleteForEach() {
      await this.selected.forEach((item) => api.deleteboard(item._id));
      this.boards = await api.getboards();
    },
    closeDelete() {
      this.dialogDelete = false;
    }
  }
};
</script>

<style></style>
