import http from "@/http/http";

export function fetchArticleById(id, params) {
  return http({
    url: `/articles/${id}`,
    method: "get",
    params,
  });
}
