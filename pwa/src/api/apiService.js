import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include token if available
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Movies API
export const moviesAPI = {
  getMovies: () => apiService.get("/movies"),
  getMovieById: (id) => apiService.get(`/movies/${id}`),
  addMovie: (movieData) => apiService.post("/movies", movieData),
  getMoviesByCategory: (category) =>
    apiService.get(`/movies?category=${category}`),
};

// Todos API
export const todosAPI = {
  getTodos: () => apiService.get("/todos"),
  addTodo: (todo) => apiService.post("/todos", { todo }),
  getTodoAtIndex: (index) => apiService.get(`/todos/${index}`),
  updateTodo: (index, todo) => apiService.put(`/todos/${index}`, { todo }),
  deleteTodo: (index) => apiService.delete(`/todos/${index}`),
};

// Users API
export const usersAPI = {
  register: (userData) => apiService.post("/users/register", userData),
  login: (credentials) => apiService.post("/users/login", credentials),
  getProfile: () => apiService.get("/users/profile"),
};

// Ratings API
export const ratingsAPI = {
  getRatings: (movieId) => apiService.get(`/ratings?movieId=${movieId}`),
  addRating: (ratingData) => apiService.post("/ratings", ratingData),
};

// Comments API
export const commentsAPI = {
  getComments: (movieId) => apiService.get(`/comments?movieId=${movieId}`),
  addComment: (commentData) => apiService.post("/comments", commentData),
};

export default apiService;
