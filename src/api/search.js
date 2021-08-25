import http from './http';

export async function search(index, val, opts=[]) {
  let URL = [
    "/", index, "/search?s=", val,
  ].join("");
  opts.forEach(opt => {
    URL = [URL, ["&", opt, "=true"].join("")].join("")
  })
  console.log(URL);
  return http.get(`${URL}`)
}
