<template>
  <v-card>
    <v-card-title class="headline"
      >Are you sure you want to delete these checked items?</v-card-title
    >
    <v-divider></v-divider>
    <v-list class="transparent">
      <v-list-item v-for="item in selected" :key="item._id">
        <v-list-item-icon>
          <v-icon>mdi-circle-small</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>

        <v-list-item-subtitle class="text-right">
          {{ item.writer }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
      <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    selected: {
      type: Array
    }
  },
  methods: {
    closeDelete() {
      this.$emit('close-delete');
    },
    deleteItemConfirm() {
      this.$emit('delete-itemConfirm');
    }
  }
};
</script>

<style></style>
