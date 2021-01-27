<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field
            v-model="title"
            :rules="titleRules"
            counter="50"
            hint="Enter the Title less than 25"
            label="Title"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-text-field
            v-model="writer"
            :rules="writerRules"
            counter="20"
            hint="Enter the Writer less than 20"
            label="Writer"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <v-textarea
            v-model="content"
            counter="200"
            label="Content"
            hint="Enter the Content less than 200"
            :rules="contentRules"
            clearable
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row>
        <v-col style="text-align:center">
          <v-btn depressed color="primary" @click="write" style="margin:3px">
            <v-icon left>
              mdi-pencil
            </v-icon>
            {{ pContentId === undefined ? '등록' : '수정' }}
          </v-btn>
          <v-btn depressed color="primary" @click="moveList" style="margin:3px">
            <v-icon left>
              mdi-playlist-edit
            </v-icon>
            목록
          </v-btn>
          <v-btn depressed color="error" @click="deleteContent" style="margin:3px">
            <v-icon left>
              mdi-delete
            </v-icon>
            삭제
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import notices from '../data/notice';
export default {
  mounted() {
    this.pContentId = this.$route.params.contentId;
    if (this.pContentId !== undefined) {
      const selectedItem = this.notices[this.pContentId];
      this.title = selectedItem.title;
      this.writer = selectedItem.writer;
      this.content = selectedItem.content;
      this.pointviews = 1;
    }
  },
  data() {
    return {
      title: '',
      writer: '',
      content: '',
      pointviews: '',
      pContentId: '',
      notices: notices,
      titleRules: [(v) => !!v || 'Required.', (v) => v.length <= 50 || 'Max 50 characters'],
      writerRules: [(v) => !!v || 'Required.', (v) => v.length <= 20 || 'Max 20 characters'],
      contentRules: [(v) => !!v || 'Required.', (v) => v.length <= 200 || 'Max 200 characters'],
      //wordsRules: [(v) => v.trim().split(' ').length <= 5 || 'Max 5 words'],
    };
  },

  methods: {
    write() {
      if (this.pContentId === undefined) {
        this.notices.push({
          title: this.title,
          writer: this.writer,
          content: this.content,
          pointviews: 1,
        });
      } else {
        this.notices[this.pContentId].title = this.title;
        this.notices[this.pContentId].writer = this.writer;
        this.notices[this.pContentId].content = this.content;
        this.notices[this.pContentId].pointviews = 2;
      }
      this.$router.push({
        path: '/board',
      });
    },
    moveList() {
      this.$router.push({
        path: '/board',
      });
    },
    deleteContent() {
      this.notices.splice(this.pContentId, 1);
      this.$router.push({
        path: '/board',
      });
    },
  },
};
</script>

<style></style>
