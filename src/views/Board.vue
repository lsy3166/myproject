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
          <template v-slot:append-outer>
            <v-menu>
              <template v-slot:activator="{ attrs }">
                <v-btn depressed color="primary" v-bind="attrs" @click="write" style="margin:3px">
                  <v-icon left>
                    mdi-pencil
                  </v-icon>
                  작성
                </v-btn>

                <v-btn
                  depressed
                  color="error"
                  v-bind="attrs"
                  @click="deleteContent"
                  style="margin:3px"
                >
                  <v-icon left>
                    mdi-delete
                  </v-icon>
                  삭제
                </v-btn>
              </template>
            </v-menu>
          </template>
        </v-text-field>
      </template>
      <template v-slot:item.pointviews="{ item }">
        <v-chip :color="getColor(item.pointviews)" dark>
          {{ item.pointviews }}
        </v-chip>
      </template>
      <template v-slot:body.append>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <v-text-field v-model="pointviews" type="number" label="Less than"></v-text-field>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import notices from '../data/notice';
export default {
  data() {
    return {
      search: '',
      pointviews: '',
      contentId: '',
      notices: notices,
    };
  },
  computed: {
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
