const BASE_API_URL =
  import.meta.env.MODE === "development"
    ? "/api"
    : "https://configuratore-lite.onrender.com";

export default BASE_API_URL;
