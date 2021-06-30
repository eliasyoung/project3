import http from "./http";

export function categoryCreate(data, params) {
  return http({
    url: "categories",
    method: "post",
    data,
    params,
  });
}

export function categoryUpdate(id, data, params) {
  return http({
    url: `categories/${id}`,
    method: "put",
    data,
    params,
  });
}

export function getCategory(params) {
  return http({
    url: "categories",
    method: "get",
    params,
  });
}

export function getCategoryById(id, params) {
  return http({
    // url: "categories",
    url: `categories/${id}`,
    method: "get",
    params,
  });
}

export function categoryDeleteById(id, params) {
  return http({
    url: `categories/${id}`,
    method: "delete",
    params,
  });
}
