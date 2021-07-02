import http from "./http";

export function adCreate(data, params) {
  return http({
    url: "rest/ads",
    method: "post",
    data,
    params,
  });
}

export function adUpdate(id, data, params) {
  return http({
    url: `rest/ads/${id}`,
    method: "put",
    data,
    params,
  });
}

export function getAd(params) {
  return http({
    url: "rest/ads",
    method: "get",
    params,
  });
}

export function getAdById(id, params) {
  return http({
    // url: "ads",
    url: `rest/ads/${id}`,
    method: "get",
    params,
  });
}

export function adDeleteById(id, params) {
  return http({
    url: `rest/ads/${id}`,
    method: "delete",
    params,
  });
}
