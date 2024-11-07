<template>
  <v-container fluid>
    <div v-if="isLoading" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-carousel v-else height="400" show-arrows="hover" class="rounded-xl">
      <v-carousel-item
        v-for="(movie, i) in featured"
        :key="i"
        :src="movie.banner"
        cover
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-chip class="text-h5 mt-2">
                {{ movie.title }}{{ " (" + movie.year + ") / " }}
                <span class="subtitle-2 font-weight-regular">
                  {{ movie.type === "tv" ? "TV Show" : "Movie" }}
                </span>
              </v-chip>
            </v-list-item-title>
            <v-list-item-subtitle>
              <v-chip class="mt-2">Director : {{ movie.director }}</v-chip>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-chip class="mt-2">Starring : {{ movie.maincast }}</v-chip>
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              <v-chip class="mt-2">Genre : {{ movie.genre }}</v-chip>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-carousel-item>
    </v-carousel>

    <MoviesSlides
      :show="trendingItems.length !== 0"
      :title="'Trending Now'"
      :movies="trendingItems"
    />
    <v-divider class="ma-3" />
    <MoviesSlides
      :show="topRatedItems.length !== 0"
      :title="'Top Rated'"
      :movies="topRatedItems"
    />
    <v-divider class="ma-3" />
    <MoviesSlides
      :show="actionItems.length !== 0"
      :title="'Action Movie'"
      :movies="actionItems"
    />
    <v-divider class="ma-3" />
    <MoviesSlides
      :show="anothersMovie.length !== 0"
      :title="'Anothers Movie'"
      :movies="anothersMovie"
    />
    <v-divider class="ma-3" />
  </v-container>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { fetchMovies } from "@/api/list";
import MoviesSlides from "@/components/MovieSlides.vue";

export default defineComponent({
  name: "Movies",
  components: {
    MoviesSlides,
  },
  setup() {
    const page = ref(1);
    const limit = 30;

    // Use Vue Query to fetch data
    const { data, isLoading, isError } = useQuery({
      queryKey: ["movies", page.value],
      queryFn: () => fetchMovies(page.value, limit),
    });

    // Directly access moviesData
    const moviesData = computed(() => data.value?.movies || []);
    const totalPages = computed(() =>
      data.value ? Math.ceil(data.value.totalCount / limit) : 0
    );

    // Filtered movies for different categories
    const featured = computed(() =>
      moviesData.value.filter((movie) => movie.isFeatured)
    );
    const trendingItems = computed(() =>
      moviesData.value.filter((movie) => movie.isTrending)
    );
    const topRatedItems = computed(() =>
      moviesData.value.filter((movie) => movie.rating >= 4.5)
    );
    const actionItems = computed(() =>
      moviesData.value.filter((movie) => movie.genre === "Action")
    );
    const anothersMovie = computed(() =>
      moviesData.value.filter(
        (movie) =>
          movie.genre !== "Action" &&
          movie.rating < 4.5 &&
          !movie.isTrending &&
          !movie.isFeatured
      )
    );

    return {
      page,
      totalPages,
      isLoading,
      isError,
      featured,
      trendingItems,
      topRatedItems,
      actionItems,
      anothersMovie,
    };
  },
});
</script>
