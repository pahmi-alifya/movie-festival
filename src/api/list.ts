export const fetchMovies = async (page = 1, limit = 10) => {
  const response = await fetch(
    `http://localhost:3000/movies?_page=${page}&_limit=${limit}`
  );
  const data = await response.json();
  const totalCount = response.headers.get("X-Total-Count");
  return { movies: data, totalCount: parseInt(totalCount || "0") };
};
