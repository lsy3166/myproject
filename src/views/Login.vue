<template>
  <v-container fill-height>
    <v-card class="mx-auto" max-width="800" width="80%" tile>
      <v-responsive :aspect-ratio="9 / 3">
        <v-alert
          text
          prominent
          type="error"
          icon="mdi-cloud-alert"
          :value="isLoginError"
          class="mb-3"
        >
          {{ errorMsg }}
        </v-alert>
        <v-alert type="success" :value="isLogin" class="mb-3">
          {{ successMsg }}
        </v-alert>
        <v-list rounded>
          <v-subheader dark class="blue darken-5 rounded subtitle-1">SING IN</v-subheader>
          <div class="py-4"></div>
          <v-icon v-text="'mdi-account'"></v-icon>
          <v-col cols="12" sm="6" md="12">
            <v-text-field
              v-model="email"
              :value="useremail"
              :label="'E - mail'"
              :rules="emailRules"
            ></v-text-field>
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
            <v-btn rounded color="blue darken-5" block dark @click="login">
              Sign-In
            </v-btn>
          </div>
        </v-list>
      </v-responsive>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  mounted() {
    this.$store.state.screenName = 'Sign In';
  },
  data() {
    return {
      email: null,
      password: null,
      show1: false,
      selectedItem: 1,
      items: [
        { text: 'E-mail', icon: 'mdi-account' },
        { text: 'Password', icon: 'mdi-lock' },
        { text: 'Conversions', icon: 'mdi-clock' }
      ],
      passwordRules: [
        (value) => !!value || 'Required.',
        (value) => (value || '').length <= 30 || 'Max 30 characters'
      ],
      emailRules: [
        (value) => !!value || 'Required.',
        (value) => (value || '').length <= 50 || 'Max 50 characters',
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || 'Invalid e-mail.';
        }
      ]
    };
  },
  computed: {
    ...mapState([
      'screenName',
      'users',
      'isLogin',
      'isLoginError',
      'successMsg',
      'errorMsg',
      'useremail'
    ])
  },
  methods: {
    // Shanna@melissa.tv / 2
    login() {
      this.$store.dispatch('ac_login', {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>

<style></style>
