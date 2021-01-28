<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <!--  -->
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              <router-link :to="item.link">{{ item.title }}</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon color="green darken-2" @click="moveHome">mdi-home</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon color="blue darken-2" @click="moveLogin">mdi-account</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon color="red darken-2">mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main app>
      <v-container>
        <!-- <div class="headline mb-1">
          {{ $store.state.screenName }}
        </div> -->
        <v-card class="overflow-hidden" color="blue lighten-1" dark>
          <v-toolbar flat color="blue">
            <v-toolbar-title class="font-weight-light">
              {{ $store.state.screenName }}
            </v-toolbar-title>
          </v-toolbar>
        </v-card>
      </v-container>
      <router-view></router-view>
    </v-main>

    <v-footer padless app>
      <v-col class="text-center blue lighten-5" cols="12">
        <v-container fluid>
          <v-bottom-navigation :value="value" color="teal" background-color="blue lighten-5" grow>
            <v-btn>
              <span>Recents</span>

              <v-icon>mdi-history</v-icon>
            </v-btn>

            <v-btn>
              <span>Favorites</span>

              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn>
              <span>Nearby</span>

              <v-icon>mdi-map-marker</v-icon>
            </v-btn>
          </v-bottom-navigation>
        </v-container>
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', link: '/dashboard' },
        { title: 'Photos', icon: 'mdi-image', link: '/photo' },
        { title: 'About', icon: 'mdi-help-box', link: '/about' },
        { title: 'Notice Board', icon: 'mdi-note-text', link: '/board' },
        { title: 'User List', icon: 'mdi-account-multiple', link: '/userList' },
      ],
      right: null,
      icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
      value: 1,
    };
  },
  methods: {
    moveHome() {
      this.$router.push({
        path: '/',
      });
    },
    moveLogin() {
      this.$router.push({
        path: '/login',
      });
    },
  },
};
</script>
