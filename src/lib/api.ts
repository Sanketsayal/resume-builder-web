import { api } from "./axios";

export const apiClient = {
  get: api.get,

  post: api.post,

  put: api.put,

  patch: api.patch,

  delete: api.delete,
};
