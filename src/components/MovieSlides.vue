<template>
  <div>
    <!-- Hanya tampilkan jika ada movie -->
    <v-card-title v-if="movies.length !== 0" class="mb-n5">{{
      title
    }}</v-card-title>

    <!-- Slide group untuk movie -->
    <v-slide-group
      v-model="selected"
      class="pa-4 mb-n3"
      center-active
      show-arrows
      v-if="movies.length !== 0"
    >
      <v-slide-item
        v-for="(movie, index) in movies"
        :key="index"
        :class="`elevation-${index}`"
      >
        <v-card
          class="ma-5"
          height="200"
          width="150"
          @click="showPlayer(movie)"
        >
          <v-img
            :src="movie.img"
            class="white--text"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          ></v-img>
        </v-card>
      </v-slide-item>
    </v-slide-group>

    <!-- Video player -->
    <VideoPlayer
      v-if="showVideoPlayer"
      ref="videoPlayer"
      :showVideoPlayer="showVideoPlayer"
      :videoPlayerDetails="videoPlayerDetails"
      @closeVideoPlayer="showVideoPlayer = false"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import VideoPlayer from "./VideoPlayer.vue";

export default defineComponent({
  name: "MovieSlides",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    movies: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    VideoPlayer,
  },
  setup() {
    const selected = ref(0);
    const showVideoPlayer = ref(false);
    const videoPlayerDetails = ref({});

    const showPlayer = (movie) => {
      showVideoPlayer.value = true;
      videoPlayerDetails.value = movie;
    };

    return {
      selected,
      showVideoPlayer,
      videoPlayerDetails,
      showPlayer,
    };
  },
});
</script>

<style scoped></style>
