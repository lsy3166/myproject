<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="$store.state.users"
      :items-per-page="10"
      class="elevation-1"
      calculate-widths
      no-results-text
      @dblclick:row="dblclickRow"
    ></v-data-table>
  </v-container>
</template>

<script>
export default {
  created() {
    this.$store.state.screenName = 'User List';
    if (this.$store.state.users.length == 0) {
      this.$store.commit('mu_setUsers');
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Username', value: 'username' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Website', value: 'website' },
      ],
    };
  },
  methods: {
    dblclickRow(object, row) {
      this.$store.commit('mu_setUser', row.item);
      this.$router.push({
        path: '/user',
      });
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
