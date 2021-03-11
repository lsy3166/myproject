<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="400" class="overflow-hidden">
        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list nav dense>
            <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
              <!-- <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title><router-link to="/">Home</router-link></v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title
                  ><router-link to="/login">Account</router-link></v-list-item-title
                >
              </v-list-item> -->

              <v-list-item v-if="!isShow">
                <v-list-item-icon>
                  <v-icon>mdi-plus-box</v-icon>
                </v-list-item-icon>
                <v-list-item-title><a href="#" @click="addWork">Add Work</a></v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-minus-box</v-icon>
                </v-list-item-icon>
                <v-list-item-title
                  ><a href="#" @click="deleteWork">Delete Work</a></v-list-item-title
                >
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
        <v-img
          height="200px"
          src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
        >
          <v-app-bar flat color="rgba(0, 0, 0, 0)">
            <v-app-bar-nav-icon color="white" @click="clickMenu"></v-app-bar-nav-icon>

            <v-toolbar-title class="title white--text pl-0">
              Today's My Works
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-menu left bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon color="white" icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item v-for="n in 1" :key="n" @click="() => {}">
                  <v-list-item-title @click="deleteWorkList">Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-app-bar>

          <v-card-title class="white--text mt-8">
            <v-avatar size="56">
              <img
                alt="user"
                src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
              />
            </v-avatar>
            <p class="ml-3">
              Lee Swimming
            </p>
          </v-card-title>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            Today
          </div>

          <v-timeline align-top dense>
            <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :color="message.color"
              small
            >
              <div>
                <div
                  class="font-weight-normal"
                  :style="message.checked ? 'color:red;text-decoration:line-through' : ''"
                >
                  <input
                    type="checkbox"
                    class="mr-2"
                    :checked="message.checked"
                    @click="checkDeleteWork($event, message)"
                    v-if="isDelete"
                  />
                  <strong>{{ message.from }}</strong> @{{ message.time }}
                </div>
                <div :style="message.checked ? 'color:red;text-decoration:line-through' : ''">
                  {{ message.message }}
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
      <add-work :isShow="isShow" @add-work-list="addWorkList" />
    </v-row>
  </v-container>
</template>

<script>
import AddWork from '../components/AddWork.vue';
export default {
  components: { AddWork },
  mounted() {
    this.$store.state.screenName = 'Work List';
  },
  data: () => ({
    drawer: false,
    group: null,
    isShow: false,
    isDelete: false,
    messages: [
      {
        from: 'You',
        message: 'Did you still want to grab lunch today?',
        time: '9:47am',
        color: 'deep-purple lighten-1',
        checked: false
      },
      {
        from: 'John Doe',
        message: 'Yeah, sure. Does 1:00pm work?',
        time: '10:37am',
        color: 'green',
        checked: false
      },
      {
        from: 'John Park',
        message: 'Yeah, sure. Does 2:00pm work?',
        time: '10:38am',
        color: 'blue',
        checked: false
      },
      {
        from: 'You',
        message: `Sure, I'll see you later.`,
        time: '10:42am',
        color: 'deep-purple lighten-1',
        checked: false
      }
    ]
  }),
  methods: {
    clickMenu() {
      this.drawer = true;
    },
    addWork() {
      this.isShow = !this.isShow;
      this.drawer = false;
      this.isDelete = false;
    },
    deleteWork() {
      this.isShow = false;
      this.drawer = false;
      this.isDelete = true;
    },
    addWorkList(message) {
      this.messages.push({
        from: message.from,
        message: message.message,
        time: message.time,
        color: message.color
      });
      this.messages // time별 정렬
        .sort((m1, m2) => {
          const ampm1 = m1.time.slice(-2);
          const ampm2 = m2.time.slice(-2);
          let m1time = m1.time.split(':')[0].length == 2 ? ampm1 + m1.time : ampm1 + '0' + m1.time;
          let m2time = m2.time.split(':')[0].length == 2 ? ampm2 + m2.time : ampm2 + '0' + m2.time;
          return m1time < m2time ? -1 : m1time > m2time ? 1 : 0;
        });
      this.isShow = false;
      this.drawer = false;
    },
    checkDeleteWork(e, checkedMessage) {
      this.messages.forEach((message) => {
        if (message.message == checkedMessage.message) {
          message.checked = e.target.checked;
        }
      });
    },
    deleteWorkList() {
      this.messages = this.messages.filter((message) => !message.checked);
      this.isDelete = false;
    }
  }
};
</script>

<style></style>
