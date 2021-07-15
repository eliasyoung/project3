import http from "@/http/http";

export function fetchNewsData(params) {
  return http({
    url: "/news/list",
    method: "get",
    params,
  });
}

export function fetchHeroData(params) {
  return http({
    url: "/heroes/list",
    method: "get",
    params,
  });
}
