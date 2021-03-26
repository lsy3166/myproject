<template>
  <v-card>
    <v-card-title class="headline blue--text text--darken-5 font-weight-bold"
      >게시글 상세</v-card-title
    >
    <v-container fluid>
      <v-row>
        <v-col cols="4">
          <v-subheader class="blue--text text--darken-3 font-weight-bold">번호</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field label="" :value="item.seq" prefix="No. " disabled></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-subheader class="blue--text text--darken-3 font-weight-bold">제목</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field
            label="Title"
            :value="item.title"
            prefix="▶"
            suffix="★"
            append-icon="mdi-format-title"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-subheader class="blue--text text--darken-3 font-weight-bold"
            >Email address</v-subheader
          >
        </v-col>
        <v-col cols="8">
          <v-text-field
            label="Email address"
            :value="item.email"
            append-icon="mdi-email"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-subheader class="blue--text text--darken-3 font-weight-bold">게시일</v-subheader>
        </v-col>
        <v-col cols="8">
          <v-text-field
            label="게시일"
            :value="item.createAt"
            append-icon="mdi-calendar-range"
            suffix="PST"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeDetail">Close</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    dialogDetail: {
      type: Boolean,
      default: true
    },
    item: {
      type: Object
    }
  },
  watch: {
    dialogDetail(val) {
      val || this.closeDetail();
    }
  },
  methods: {
    closeDetail() {
      this.$emit('close-detail', false);
    }
  }
};
</script>

<style></style>
