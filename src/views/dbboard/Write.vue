<template>
  <v-container>
    <input-form :isBtnShow="isBtnShow" :submitBtnName="submitBtnName"></input-form>
  </v-container>
</template>

<script>
import InputForm from './InputForm.vue';
export default {
  components: { InputForm },
  async mounted() {
    if (this.$route.params.boardId) {
      this.submitBtnName = '수정';
    }
    this.$store.state.screenName = `DB Board Write (${this.submitBtnName})`;
  },
  data() {
    return {
      isBtnShow: true,
      submitBtnName: '등록'
    };
  }
};
</script>

<style></style>
