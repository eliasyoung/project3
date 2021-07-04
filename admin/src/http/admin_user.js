import http from "./http";

export function admin_userCreate(data, params) {
  return http({
    url: "rest/admin_users",
    method: "post",
    data,
    params,
  });
}

export function admin_userUpdate(id, data, params) {
  return http({
    url: `rest/admin_users/${id}`,
    method: "put",
    data,
    params,
  });
}

export function getAdminUser(params) {
  return http({
    url: "rest/admin_users",
    method: "get",
    params,
  });
}

export function getAdminUserById(id, params) {
  return http({
    // url: "admin_users",
    url: `rest/admin_users/${id}`,
    method: "get",
    params,
  });
}

export function admin_userDeleteById(id, params) {
  return http({
    url: `rest/admin_users/${id}`,
    method: "delete",
    params,
  });
}
