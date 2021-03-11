<template>
  <v-card v-if="isShow" width="400">
    <v-row justify="start" class="pt-3">
      <v-toolbar-title class="title black--text pl-5">
        <v-icon>mdi-plus-box</v-icon> Add My Works
      </v-toolbar-title>
      <v-card-text class="pt-0 pb-10">
        <v-text-field v-model="from" label="From" :rules="rules" hide-details="auto"></v-text-field>
        <v-text-field
          v-model="message"
          label="Message"
          :rules="rules"
          hide-details="auto"
        ></v-text-field>
        <!-- <v-text-field v-model="time" label="Time" :rules="rules" hide-details="auto"></v-text-field> -->
        <v-row>
          <v-col>
            <v-menu
              ref="menu"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="time"
                  label="Time"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  hide-details="false"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu2"
                v-model="time"
                full-width
                format="ampm"
                @click:minute="$refs.menu.save(time)"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-text-field
          v-model="color"
          label="Color"
          :rules="rules"
          hide-details="auto"
        ></v-text-field>
        <v-row justify="space-around" class="mt-3">
          <v-btn color="primary" @click="addTodo">
            Add
          </v-btn>
        </v-row>
      </v-card-text>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      from: '',
      message: '',
      color: '',
      time: null,
      time_ampm: null,
      menu2: false,
      modal2: false,
      rules: [
        (value) => !!value || 'Required.',
        (value) => (value && value.length >= 3) || 'Min 3 characters'
      ]
    };
  },
  props: {
    messages: {
      type: Array,
      require: true
    },
    isShow: {
      type: Boolean,
      require: true
    }
  },
  watch: {
    time(newValue) {
      var timeString = newValue + '00';
      var H = +timeString.substr(0, 2);
      var h = H % 12 || 12;
      var ampm = H < 12 || H === 24 ? 'am' : 'pm';
      timeString = h + timeString.substr(2, 3) + ampm;
      this.time_ampm = timeString;
    }
  },
  methods: {
    addTodo() {
      this.$emit('add-work-list', {
        from: this.from,
        message: this.message,
        time: this.time_ampm,
        color: this.color,
        checked: false
      });
      this.from = '';
      this.message = '';
      this.time = '';
      this.time_ampm = '';
      this.color = '';
    }
  }
};
</script>

<style></style>
