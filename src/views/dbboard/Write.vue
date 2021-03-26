<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="title"
        :counter="10"
        :rules="nameRules"
        label="제목"
        required
      ></v-text-field>

      <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

      <v-text-field
        v-model="writer"
        :counter="10"
        :rules="nameRules"
        label="글쓴이"
        required
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">
        Submit
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset">
        Reset Form
      </v-btn>

      <v-btn color="warning" @click="resetValidation">
        Reset Validation
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { api } from '../../helpers/helpers';
export default {
  async mounted() {
    this.$store.state.screenName = 'DB Board Write';
    if (this.$route.params.boardId) {
      this.boardId = this.$route.params.boardId;
      const board = await api.getboard(this.boardId);
      this.title = board.title;
      this.writer = board.writer;
      this.email = board.email;
    }
  },
  data: () => ({
    boardId: null,
    valid: true,
    title: '',
    writer: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    checkbox: false
  }),

  methods: {
    async submit() {
      this.$refs.form.validate();
      let dateTime = new Date();
      const nowtime = `${dateTime.getFullYear()}-${dateTime.getMonth() +
        1}-${dateTime.getDate()} ${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;

      const boards = {
        title: this.title,
        email: this.email,
        writer: this.writer,
        count: 0,
        createAt: nowtime
      };
      if (this.$route.params.boardId) {
        await api.updateboard(boards, this.boardId);
        this.flash('task updated sucessfully!', 'success');
        this.$router.push(`../`);
      } else {
        const res = await api.createboard(boards);
        this.flash('board created', 'success');
        console.log(res._id);
        this.$router.push(`./`);
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>

<style></style>
