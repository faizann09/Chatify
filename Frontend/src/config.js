export const BASE_URL =
  import.meta.env.VITE_NODE_ENV === "production"
    ? "https://chatify-tihl.onrender.com"
    : "http://localhost:4001";
