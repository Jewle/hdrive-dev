export  function requestConstructor(contentType, body,method='get') {
    method = method.toUpperCase()
    const req = {
        headers: {
            'Content-Type':contentType
        },
        method
    }
    if(method!=='GET'){
        req.body = JSON.stringify(body)
    }
  return req
}
