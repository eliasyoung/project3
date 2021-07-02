import http from "./http";

export function articleCreate(data, params) {
  return http({
    url: "rest/articles",
    method: "post",
    data,
    params,
  });
}

export function articleUpdate(id, data, params) {
  return http({
    url: `rest/articles/${id}`,
    method: "put",
    data,
    params,
  });
}

export function getArticle(params) {
  return http({
    url: "rest/articles",
    method: "get",
    params,
  });
}

export function getArticleById(id, params) {
  return http({
    // url: "articles",
    url: `rest/articles/${id}`,
    method: "get",
    params,
  });
}

export function articleDeleteById(id, params) {
  return http({
    url: `rest/articles/${id}`,
    method: "delete",
    params,
  });
}

export function uploadMdImage(uploadData, params) {
  return http({
    url: `upload`,
    method: "post",
    data: uploadData,
    params,
  });
}
