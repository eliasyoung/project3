import http from "./http";

export function itemCreate(data, params) {
  return http({
    url: "rest/items",
    method: "post",
    data,
    params,
  });
}

export function itemUpdate(id, data, params) {
  return http({
    url: `rest/items/${id}`,
    method: "put",
    data,
    params,
  });
}

export function getItem(params) {
  return http({
    url: "rest/items",
    method: "get",
    params,
  });
}

export function getItemById(id, params) {
  return http({
    // url: "items",
    url: `rest/items/${id}`,
    method: "get",
    params,
  });
}

export function itemDeleteById(id, params) {
  return http({
    url: `rest/items/${id}`,
    method: "delete",
    params,
  });
}
