<template>
  <v-container fill-height>
    <v-card class="mx-auto" min-width="800" tile>
      <v-responsive :aspect-ratio="9 / 3">
        <v-alert text prominent type="error" icon="mdi-cloud-alert" :value="isError" class="mb-3">
          {{ errorMsg }}
        </v-alert>
        <v-alert type="success" :value="isSuccess" class="mb-3">
          {{ successMsg }}
        </v-alert>
        <v-list rounded>
          <v-subheader dark class="blue darken-5 rounded subtitle-1">LOG IN</v-subheader>
          <div class="py-4"></div>
          <v-icon v-text="'mdi-account'"></v-icon>
          <v-col cols="12" sm="6" md="12">
            <v-text-field v-model="email" :label="'E - mail'" :rules="emailRules"></v-text-field>
          </v-col>
          <v-icon v-text="'mdi-lock'"></v-icon>
          <v-col cols="12" sm="6" md="12">
            <v-text-field
              v-model="password"
              :label="'Password'"
              :rules="passwordRules"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
          <div class="text-center">
            <v-btn rounded color="blue darken-5" width="300" dark @click="login">
              Log-In
            </v-btn>
          </div>
        </v-list>
      </v-responsive>
    </v-card>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$store.state.screenName = 'Log In';
    if (this.$store.state.users.length == 0) {
      this.$store.commit('mu_setUsers');
    }
  },
  data() {
    return {
      email: null,
      password: null,
      show1: false,
      selectedItem: 1,
      isError: false,
      errorMsg: null,
      isSuccess: false,
      successMsg: null,
      items: [
        { text: 'E-mail', icon: 'mdi-account' },
        { text: 'Password', icon: 'mdi-lock' },
        { text: 'Conversions', icon: 'mdi-clock' },
      ],
      passwordRules: [
        (value) => !!value || 'Required.',
        (value) => (value || '').length <= 20 || 'Max 20 characters',
      ],
      emailRules: [
        (value) => !!value || 'Required.',
        (value) => (value || '').length <= 20 || 'Max 20 characters',
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        },
      ],
    };
  },
  methods: {
    // Shanna@melissa.tv / 2
    login() {
      let users = this.$store.state.users;
      console.log(Object.values(users));
      let findUser = users.filter((user) => user.email === this.email);
      if (findUser == 0) {
        this.isError = true;
        this.errorMsg = '등록된 email이 존재하지 않습니다.';
      } else {
        if (this.password && findUser[0].id == this.password) {
          this.isError = false;
          this.isSuccess = true;
          this.successMsg = 'Sucess!!';
        } else {
          this.isError = true;
          this.errorMsg = 'Password가 일치하지 않습니다.';
        }
      }
    },
  },
};
</script>

<style></style>
