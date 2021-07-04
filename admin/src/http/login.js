import http from "@/http/http.js";

export function Login(data) {
  return http({
    url: `login`,
    method: "post",
    data,
  });
}
