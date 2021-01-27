<template>
  <v-container fluid>
    <v-card class="mx-auto" max-width="1200" tile>
      <div class="d-flex">
        <v-checkbox v-model="disabled" label="Disabled"></v-checkbox>
      </div>

      <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
        <v-expansion-panel>
          <v-expansion-panel-header>Dashboard</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container fluid>
              <v-sparkline
                :fill="fill"
                :gradient="gradient"
                :line-width="width"
                :padding="padding"
                :smooth="radius || false"
                :value="value"
                auto-draw
              ></v-sparkline>

              <v-divider dark></v-divider>

              <v-row>
                <v-col cols="8" md="6">
                  <v-row class="fill-height" align="center">
                    <v-item-group v-model="selectedGradient" mandatory>
                      <v-row class="fill-height">
                        <v-item
                          v-for="(gradient, i) in gradients"
                          :key="i"
                          v-slot="{ active, toggle }"
                          :value="gradient"
                        >
                          <v-card
                            :style="{
                              background:
                                gradient.length > 1
                                  ? `linear-gradient(0deg, ${gradient})`
                                  : gradient[0],
                              border: '2px solid',
                              borderColor: active ? '#222' : 'white',
                            }"
                            width="30"
                            height="30"
                            class="mr-2"
                            @click.native="toggle"
                          ></v-card>
                        </v-item>
                      </v-row>
                    </v-item-group>
                  </v-row>
                </v-col>

                <v-col cols="4">
                  <v-row class="fill-height" align="center">
                    <v-switch v-model="fill" label="Filled"></v-switch>
                  </v-row>
                </v-col>

                <v-col cols="12" md="6">
                  <v-slider
                    v-model="width"
                    label="Width"
                    min="0.1"
                    max="10"
                    step="0.1"
                    thumb-label
                  ></v-slider>
                </v-col>

                <v-col cols="12" md="6">
                  <v-slider v-model="radius" label="Radius" min="0" max="25" thumb-label></v-slider>
                </v-col>

                <v-col cols="12" md="6" offset-md="6">
                  <v-slider
                    v-model="padding"
                    label="Padding"
                    min="0"
                    max="25"
                    thumb-label
                  ></v-slider>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>Panel 1</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container>
              <v-row justify="space-around">
                <v-card width="800">
                  <v-img
                    height="200px"
                    src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
                  >
                    <v-app-bar flat color="rgba(0, 0, 0, 0)">
                      <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

                      <v-toolbar-title class="title white--text pl-0">
                        Messages
                      </v-toolbar-title>

                      <v-spacer></v-spacer>

                      <v-btn color="white" icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </v-app-bar>

                    <v-card-title class="white--text mt-8">
                      <v-avatar size="56">
                        <img
                          alt="user"
                          src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg"
                        />
                      </v-avatar>
                      <p class="ml-3">
                        John Doe
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
                          <div class="font-weight-normal">
                            <strong>{{ message.from }}</strong> @{{ message.time }}
                          </div>
                          <div>{{ message.message }}</div>
                        </div>
                      </v-timeline-item>
                    </v-timeline>
                  </v-card-text>
                </v-card>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>Panel 2</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card class="mx-auto" max-width="344">
              <v-img
                src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                height="200px"
                width="500px"
                position="center center"
              ></v-img>

              <v-card-title>
                Top western road trips
              </v-card-title>

              <v-card-subtitle>
                1,000 miles of wonder
              </v-card-subtitle>

              <v-card-actions>
                <v-btn color="orange lighten-2" text>
                  Explore
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn icon @click="show = !show">
                  <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <div v-show="show">
                  <v-divider></v-divider>

                  <v-card-text>
                    I'm a thing. But, like most politicians, he promised more than he could deliver.
                    You won't have time for sleeping, soldier, not with all the bed making you'll be
                    doing. Then we'll go with that data file! Hey, you add a one and two zeros to
                    that or we walk! You're going to do his laundry? I've got to find a way to
                    escape.
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header>Panel 3</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card class="mx-auto" max-width="344">
              <v-card-text>
                <div>Word of the Day</div>
                <p class="display-1 text--primary">
                  el·ee·mos·y·nar·y
                </p>
                <p>adjective</p>
                <div class="text--primary">
                  relating to or dependent on charity; charitable.<br />
                  "an eleemosynary educational institution."
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn text color="teal accent-4" @click="reveal = true">
                  Learn More
                </v-btn>
              </v-card-actions>

              <v-expand-transition>
                <v-card
                  v-if="reveal"
                  class="transition-fast-in-fast-out v-card--reveal"
                  style="height: 100%;"
                >
                  <v-card-text class="pb-0">
                    <p class="display-1 text--primary">
                      Origin
                    </p>
                    <p>
                      late 16th century (as a noun denoting a place where alms were distributed):
                      from medieval Latin eleemosynarius, from late Latin eleemosyna ‘alms’, from
                      Greek eleēmosunē ‘compassion’
                    </p>
                  </v-card-text>
                  <v-card-actions class="pt-0">
                    <v-btn text color="teal accent-4" @click="reveal = false">
                      Close
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-expand-transition>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-container>
</template>

<script>
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
];
export default {
  data() {
    return {
      panel: [0, 1],
      disabled: false,
      readonly: false,
      show: false,
      reveal: false,
      fill: true,
      selectedGradient: gradients[4],
      gradients,
      padding: 8,
      radius: 10,
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      width: 2,
      messages: [
        {
          from: 'You',
          message: `Sure, I'll see you later.`,
          time: '10:42am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'John Doe',
          message: 'Yeah, sure. Does 1:00pm work?',
          time: '10:37am',
          color: 'green',
        },
        {
          from: 'You',
          message: 'Did you still want to grab lunch today?',
          time: '9:47am',
          color: 'deep-purple lighten-1',
        },
      ],
    };
  },
};
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
