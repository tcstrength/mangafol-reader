import { axiosBaseUrl } from "../constants/Config";

const axios = require("axios");

export const api = axios.create({
  baseURL: axiosBaseUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json"
  },
});

api.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {

    if (error.response !== null && error.response !== undefined) {
      const status = error.response.status;
      if (status === 401 || status == 403) {
        window.location.href = "/login"
      }

    }
    return Promise.reject(error);
  }
);

export const accessToken = localStorage.getItem("accessToken")
export const bearerToken = "Bearer " + accessToken
export const authHeader = { "Authorization": bearerToken }
export const userProfile = JSON.parse(localStorage.getItem("userProfile"))
export const setAccessToken = (token) => localStorage.setItem("accessToken", token)
export const setUserProfile = (profile) => localStorage.setItem("userProfile", JSON.stringify(profile))

export const Store = {
  bearerToken: bearerToken,
  authHeader: authHeader,
  accessToken: accessToken,
  userProfile: userProfile,
  setAccessToken: setAccessToken,
  setUserProfile: setUserProfile
}

export const AuthActions = {
  login: async (body) => api.post("/auth/login", body),
  register: async (body) => api.post("/auth/register", body),
  logout: () => localStorage.clear()
}

export const UserActions = {
  profile: async () => api.get("/user/me", {
    headers: authHeader
  }),
  profile: async (token) => api.get("/user/me", {
    headers: { "Authorization": "Bearer " + token }
  })
}

export const TaleActions = {
  create: async (body) => api.post("/tale", body, {
    headers: authHeader
  }),
  search: async (text, limit) => api.get("/tale/search", {
    params: {
      text: text,
      limit: limit
    },
    headers: authHeader
  }),
  paging: async (offset, limit) => api.get("/tale/paging?sort=rating desc", {
    params: {
      offset: offset,
      limit: limit
    },
    headers: authHeader
  }),
  recent: async (limit) => api.get("/tale/paging", {
    params: {
      offset: 0,
      limit: limit
    },
    headers: authHeader
  }),
  getBySlug: async (slug) => api.get("/tale", {
    params: { slug: slug },
    headers: authHeader
  }),
  update: async (tale) => api.put("/tale", tale, {
    headers: authHeader
  }),
  delete: async (id) => api.delete("/tale", {
    params: { id: id },
    headers: authHeader
  }),
  addNotes: async (notes) => api.post("/tale/note", notes, {
    headers: authHeader
  }),
  delNotes: async (id) => api.delete("/tale/note", {
    params: { id: id },
    headers: authHeader
  }),
  getNotes: async (id, offset, limit) => api.get("/tale/note/paging", {
    params: {
      offset: offset,
      limit: limit,
      taleId: id
    },
    headers: authHeader
  })
}

export const FileActions = {
  uploadImgbb: async (file) => {
    var formData = new FormData();
    formData.append("file", file);
    return api.post('/file', formData, {
      params: {
        'storage': 'imgbb'
      },
      headers: {
        'Content-Type': 'multipart/form-data',
        ...authHeader
      }
    })
  }
}