<template>
  <v-container grid-list-xs>
    <v-card class="overflow-hidden" color="blue lighten-1" dark>
      <v-toolbar flat color="blue">
        <v-icon>mdi-account</v-icon>
        <v-toolbar-title class="font-weight-light"> {{ user.name }}'s Profile </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-3" fab small @click="moveUserList">
          <v-icon>
            mdi-account-multiple
          </v-icon>
        </v-btn>
        <v-btn color="blue darken-3" fab small @click="clickBtn">
          <v-icon v-if="isEditing">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-pencil
          </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-text-field
          :disabled="!isEditing"
          color="white"
          label="Name"
          v-model="name"
          clearable
        ></v-text-field>
        <v-text-field
          :disabled="!isEditing"
          color="white"
          label="User Name"
          v-model="username"
          clearable
        ></v-text-field>
        <v-text-field
          :disabled="!isEditing"
          color="white"
          label="E-mail"
          v-model="email"
          clearable
        ></v-text-field>
        <v-text-field
          :disabled="!isEditing"
          color="white"
          label="Address"
          v-model="address"
          clearable
        ></v-text-field>
        <v-text-field
          :disabled="!isEditing"
          color="white"
          label="Phone"
          v-model="phone"
          clearable
        ></v-text-field>
        <v-text-field
          :disabled="!isEditing"
          color="white"
          label="Website"
          v-model="website"
          clearable
        ></v-text-field>
        <v-text-field
          :disabled="!isEditing"
          color="white"
          label="Company"
          v-model="company"
          clearable
        ></v-text-field>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :disabled="!isEditing" color="success" @click="save">
          Save
        </v-btn>
      </v-card-actions>
      <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>
        Your profile has been updated
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$store.state.screenName = '';
    const user = this.$store.state.user;
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
    this.phone = user.phone;
    this.website = user.website;
  },
  data() {
    return {
      user: this.$store.state.user,
      hasSaved: false,
      isEditing: null,
      model: null,
      name: null,
      username: null,
      email: null,
      phone: null,
      website: null,
    };
  },
  computed: {
    address() {
      return (
        this.user.address.street +
        ' ' +
        this.user.address.suite +
        ' ' +
        this.user.address.city +
        ' ' +
        this.user.address.zipcode
      );
    },
    company() {
      return (
        this.user.company.name +
        ' | ' +
        this.user.company.catchPhrase +
        ' | ' +
        this.user.company.bs
      );
    },
  },
  methods: {
    save() {
      //this.isEditing = !this.isEditing;
      this.hasSaved = true;
      if (this.isEditing) {
        const index = this.$store.state.users.findIndex((user) => this.user.id === user.id);
        this.$store.commit('mu_modifyUser', {
          user: {
            name: this.name,
            username: this.username,
            email: this.email,
            phone: this.phone,
            website: this.website,
          },
          index: index,
        });
      }
      this.$router.push({
        path: '/userList',
      });
    },
    clickBtn() {
      this.isEditing = !this.isEditing;
    },
    moveUserList() {
      this.$router.push({
        path: '/userList',
      });
    },
  },
};
</script>
