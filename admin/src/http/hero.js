import http from "./http";

export function heroCreate(data, params) {
  return http({
    url: "rest/heroes",
    method: "post",
    data,
    params,
  });
}

export function heroUpdate(id, data, params) {
  return http({
    url: `rest/heroes/${id}`,
    method: "put",
    data,
    params,
  });
}

export function getHero(params) {
  return http({
    url: "rest/heroes",
    method: "get",
    params,
  });
}

export function getHeroById(id, params) {
  return http({
    // url: "heroes",
    url: `rest/heroes/${id}`,
    method: "get",
    params,
  });
}

export function heroDeleteById(id, params) {
  return http({
    url: `rest/heroes/${id}`,
    method: "delete",
    params,
  });
}
