<template>
  <v-container fill-height>
    <v-card class="mx-auto" min-width="800" tile>
      <v-responsive :aspect-ratio="9 / 3">
        <v-list rounded>
          <v-subheader dark class="blue darken-5 rounded subtitle-1">LOG IN</v-subheader>
          <div class="py-4"></div>
          <v-icon v-text="'mdi-account'"></v-icon>
          <v-col cols="12" sm="6" md="12">
            <v-text-field :label="'E - mail'" :rules="emailRules"></v-text-field>
          </v-col>
          <v-icon v-text="'mdi-lock'"></v-icon>
          <v-col cols="12" sm="6" md="12">
            <v-text-field
              :label="'Password'"
              :rules="passwordRules"
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
          <div class="text-center">
            <v-btn rounded color="blue darken-5" width="300" dark>
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
  data() {
    return {
      show1: false,
      selectedItem: 1,
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
};
</script>

<style></style>
