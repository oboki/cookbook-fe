import http from './http';

export function search(
  index, val, size=4, page=0, opts=[],
  advancedSearchEnabled=false, advanced=[]
) {
  let URL = [
    "/", index, "/search?s=", val,
    "&size=", size, "&page=", page
  ].join("");
  opts.forEach(opt => {
    URL = [URL, ["&", opt, "=true"].join("")].join("")
  })

  if (advancedSearchEnabled) {
    return http.post(`${URL}`, {
      data: advanced
    });
  } else {
    return http.get(`${URL}`)
  }

}

export function get(val) {
  return http.get(`${val}`)
}

export function getDocument(
  index, val
) {
  let URL = [
    "/", index, "/", val
  ].join("");

  return http.get(`${URL}`)
}

export function addDocument(
  index, data
) {
  let URL = ["/", index, "/add"].join("");

  return http.post(`${URL}`, {
    data: data
  });
}

export function deleteDocument(
  index, val
) {
  let URL = [
    "/", index, "/delete/", val
  ].join("");

  return http.post(`${URL}`)
}

export function updateDocument(index, id, doc){
  return new Promise((resolve, reject) => {
    http.post('/'+index+'/edit/'+id, {
      data: doc
    }).then((res) => {
      resolve(res);
    });
  })
}
