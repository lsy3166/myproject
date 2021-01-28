/* eslint-disable */
<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="notices"
      item-key="title"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCapsText"
      calculate-widths
      no-results-text
      show-select
      @item-selected="handleSelection"
      @toggle-select-all="selectAll"
      @dblclick:row="dblclickRow"
      block
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"
          append-icon="mdi-magnify"
          append-outer-icon="mdi-pencil"
          @click:append-outer="write"
          clearable
        >
        </v-text-field>
      </template>
      <template v-slot:item.pointviews="{ item }">
        <v-chip :color="getColor(item.pointviews)" dark>
          {{ item.pointviews }}
        </v-chip>
      </template>
      <template v-slot:body.append>
        <tr v-if="isMobile === false">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <v-text-field v-model="pointviews" type="number" label="Less than"></v-text-field>
          </td>
        </tr>
        <tr style="text-align:center">
          <td colspan="5">
            <v-btn depressed color="primary" @click="write" style="margin:3px">
              <v-icon left>
                mdi-pencil
              </v-icon>
              작성
            </v-btn>

            <v-btn depressed color="error" @click="deleteContent" style="margin:3px">
              <v-icon left>
                mdi-delete
              </v-icon>
              삭제
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import notices from '../data/notice';
import { mapState } from 'vuex';

export default {
  mounted() {
    this.$store.state.screenName = 'Board';
  },
  data() {
    return {
      search: '',
      pointviews: '',
      contentId: '',
      notices: notices,
    };
  },
  computed: {
    ...mapState(['isMobile']),
    headers() {
      return [
        {
          text: 'Title',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        { text: 'Content', value: 'content' },
        { text: 'Writer', value: 'writer' },
        {
          text: 'pointviews',
          value: 'pointviews',
          filter: (value) => {
            if (!this.pointviews) return true;

            return value < parseInt(this.pointviews);
          },
        },
      ];
    },
  },
  methods: {
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === 'string' &&
        value
          .toString()
          .toLocaleUpperCase()
          .indexOf(search) !== -1
      );
    },
    write() {
      this.$router.push({
        path: '/write',
      });
    },
    handleSelection(object) {
      const index = this.notices.findIndex((notice) => notice.title === object.item.title);
      if (object.value) {
        this.notices[index].checked = true;
      } else {
        this.notices[index].checked = false;
      }
    },
    selectAll() {
      this.notices.forEach((element) => {
        element.checked = true;
      });
    },
    dblclickRow(object, row) {
      const index = this.notices.findIndex((notice) => notice.title === row.item.title);
      this.$router.push({
        path: '/write/' + index,
      });
    },
    deleteContent() {
      let newArray = this.notices.filter((notice) => !notice.checked);
      this.notices = newArray;
    },
    getColor(pointviews) {
      if (pointviews > 10) return 'red';
      else if (pointviews > 5) return 'orange';
      else return 'green';
    },
  },
};
</script>

<style scoped>
::v-deep .v-data-table-header {
  background-color: #ccc;
}

::v-deep th {
  color: #000 !important;
}
</style>
