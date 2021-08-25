import http from './http';

export async function search(
  index, val, size=4, page=0, opts=[]
) {
  let URL = [
    "/", index, "/search?s=", val,
    "&size=", size, "&page=", page
  ].join("");
  opts.forEach(opt => {
    URL = [URL, ["&", opt, "=true"].join("")].join("")
  })

  return http.get(`${URL}`)
}

export function getDocument(
  index, val
) {
  let URL = [
    "/", index, "/", val
  ].join("");
  console.log(URL);

  return http.get(`${URL}`)
}
