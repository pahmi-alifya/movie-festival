<template>
  <v-dialog v-model="showVideoPlayer" fullscreen>
    <v-card tile>
      <v-toolbar dense>
        <v-toolbar-title>
          {{ videoPlayerDetails.title }} ({{ videoPlayerDetails.year }})
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
          text="Close"
          @click="
            $emit('closeVideoPlayer');
            isVideoReady = false;
          "
        ></v-btn>
      </v-toolbar>

      <v-card-text>
        <v-progress-linear
          v-if="!isVideoReady"
          indeterminate
          color="accent"
        ></v-progress-linear>

        <iframe
          @load="isVideoReady = true"
          id="video"
          width="100%"
          height="300"
          :src="'https://www.youtube.com/embed/' + videoPlayerDetails.link"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <v-card-subtitle class="pb-0">
          Director: {{ videoPlayerDetails.director }}
        </v-card-subtitle>
        <v-card-subtitle class="pb-0">
          Starring: {{ videoPlayerDetails.maincast }}
        </v-card-subtitle>
        <v-card-subtitle class="pb-0">
          Genre: {{ videoPlayerDetails.genre }}
        </v-card-subtitle>
      </v-card-text>

      <!-- Similiar Movies section -->
      <!-- <div class="mx-5">
        <MovieSlides
          :show="similiarMovies.length > 0"
          :title="'Similar Movies'"
          :movies="similiarMovies"
        />
      </div> -->
    </v-card>
  </v-dialog>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { fetchMovies } from "@/api/list";
// import MovieSlides from "./MovieSlides.vue";

export default defineComponent({
  name: "VideoPlayer",
  props: {
    showVideoPlayer: {
      type: Boolean,
      required: true,
    },
    videoPlayerDetails: {
      type: Object,
      required: true,
    },
  },
  components: {
    // MovieSlides,
  },
  setup(props) {
    const isVideoReady = ref(false);

    const { data, isLoading, isError } = useQuery({
      queryKey: ["movies-similiar"],
      queryFn: () => fetchMovies(1, 20),
    });
    const moviesData = computed(() => data.value?.movies || []);

    const similiarMovies = computed(() => {
      return moviesData.value.filter(
        (m) =>
          m.genre === props.videoPlayerDetails.genre &&
          m.title !== props.videoPlayerDetails.title &&
          m.year !== props.videoPlayerDetails.year
      );
    });

    return {
      isVideoReady,
      similiarMovies,
      isLoading,
      isError,
    };
  },
});
</script>

<style scoped></style>
