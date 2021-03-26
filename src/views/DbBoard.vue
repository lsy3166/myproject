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
        <v-container>
          <v-card flat>
            <v-toolbar height="0px">
              <v-dialog v-model="dialogDelete" max-width="500px">
                <dialog-delete
                  @close-delete="closeDelete"
                  @delete-itemConfirm="deleteItemConfirm"
                  :selected="selected"
                ></dialog-delete>
              </v-dialog>
              <v-dialog v-model="dialogDetail" max-width="500px">
                <dialog-detail @close-detail="closeDetail" :item="item"></dialog-detail>
              </v-dialog>
            </v-toolbar>
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
      <template v-slot:item.title="{ item }">
        <v-card-actions @click="clickTitle(item)" style="margin:0px;padding:0px">
          <v-btn text color="teal accent-4" style="margin:0px;padding:0px" @click="reveal = false">
            {{ item.title }}
          </v-btn>
        </v-card-actions>
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
import DialogDelete from './dbboard/DialogDelete.vue';
import DialogDetail from './dbboard/DialogDetail.vue';
export default {
  components: {
    DialogDetail,
    DialogDelete
  },
  async mounted() {
    this.$store.state.screenName = 'DB Board';
    this.boards = await api.getboards();
  },
  data() {
    return {
      singleSelect: false,
      dialogDelete: false,
      dialogDetail: false,
      selected: [],
      item: null,
      headers: [
        {
          text: '번호',
          align: 'center',
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
        {
          text: '제목',
          value: 'title',
          class: 'indigo darken-2 lime--text text--lighten-3',
          align: 'start'
        },
        { text: 'e-mail', value: 'email', class: 'indigo darken-2 lime--text text--lighten-3' },
        { text: '글쓴이', value: 'writer', class: 'indigo darken-2 lime--text text--lighten-3' },
        {
          text: '조회수',
          value: 'count',
          class: 'indigo darken-2 lime--text text--lighten-3',
          align: 'center'
        },
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
      if (this.selected.length == 0) {
        alert('There is no selected item!');
      } else {
        this.dialogDelete = true;
      }
    },
    async detailItem(item) {
      item.count += 1;
      await api.updateboard(item, item._id);
      this.item = item;
      this.dialogDetail = true;
    },
    getColor(calories) {
      if (calories > 10) return 'red';
      else if (calories > 5) return 'orange';
      else return 'green';
    },
    async deleteItemConfirm() {
      await this.selected.forEach(async (item) => await api.deleteboard(item._id));
      await this.closeDelete();
      this.boards = await api.getboards();
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    closeDetail() {
      this.dialogDetail = false;
    },
    clickTitle(item) {
      this.detailItem(item);
    }
  }
};
</script>

<style></style>
