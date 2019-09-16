import axios from "axios";
var jwt = require("jsonwebtoken");
// const encodedString = new Buffer('test').toString('base64');

export class Client {
  /**
   * API client that associates itself with a single host
   * @param host common base URL for all api endpoints
   * @param onError function to run on any API error e.g. logging or error toasts
   */
  constructor(getHost, onError) {
    this.getHost = getHost;
    this.onError = onError;
  }

  getJwt() {
    return localStorage.getItem("token");
  }

//esse refreshtoken aqui está fazendo o caminho inverso... o front chama pra renovar o token... o que tbm pode ser uma saida...
// mas por hr
  setJwt() {
    const url = new URL("renewJwt", this.getHost);
    const currentJwt = this.getJwt();
    const decoded = jwt.decode(currentJwt);
    axios.post(url.href, { token: currentJwt, id: decoded }).then(res => {
      if (res.data.code === 200) {
        localStorage.removeItem("token");
        localStorage.setItem("token", res.data.token);
      } else {
        localStorage.removeItem("jwtapp");
        return false;
      }
    });
  }

validateJwt() {
    if (this.getJwt() === null) {
      return false;
    }

    if (!this.getJwt()) {
      return false;
    }

    const decoded = jwt.decode(this.getJwt());

    var current_time = new Date().getTime() / 1000;
    if (current_time > decoded.exp) {
      return false;
    }

    return true;
  }

  /**
   * Make a GET request.
   * @param endpoint root-relative route of endpoint w/ query params e.g. 'v2/apples?green=yes'
   */
  get(endpoint, needValidation) {
    if (needValidation && !this.validateJwt()) {
      return false;
    }
    const url = new URL(endpoint, this.getHost);
    axios.defaults.headers.common["Authorization"] = "Bearer " + this.getJwt();
    axios.defaults.headers.common["x-access-token"] = this.getJwt();

    const data =  axios.get(url.href);

    // o que eu to fazendo aqui eh o seguinte: Toda vez que alguem chamar o metodo GET ele vai atualizar o token
    // qualquer um agora... pra isso vc criou um client...
      data.then((response)=> {
        if(response.data.auth === true && response.data.token)
        {
          localStorage.removeItem('token');
          localStorage.setItem('token', response.data.token);
        }
      });
    return data;
  }
  /**
   * Make a POST request.
   * @param endpoint root-relative route of endpoint w/ query params e.g. 'getData/coffee?decaf=true'
   * @param payload either a plain object that should be serialized to JSON or a File object
   */
  post(endpoint, payload, needValidation) {
    if (needValidation && !this.validateJwt()) {
      return false;
    }
    const token = this.getJwt();
    const url = new URL(endpoint, this.getHost);
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.common["x-access-token"] = token;

    const data =  axios.post(url.href, payload);
      data.then((response)=> {
        if(response.data.auth === true && response.data.token)
        {
          localStorage.removeItem('token');
          localStorage.setItem('token', response.data.token);
        }
      });
    return data;
  }

  /**
   * Make a PUT request.
   * @param endpoint root-relative route of endpoint w/ query params e.g. 'getData/coffee?decaf=true'
   * @param payload either a plain object that should be serialized to JSON or a File object
   */
  put(endpoint, payload) {
    if (!this.validateJwt()) {
      return false;
    }
    const token = this.getJwt();
    const url = new URL(endpoint, this.getHost);
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.common["x-access-token"] = token;

    const data =  axios.put(url.href, payload);
      data.then((response)=> {
        if(response.data.auth === true && response.data.token)
        {
          localStorage.removeItem('token');
          localStorage.setItem('token', response.data.token);
        }
      });
    return data;
  }

  /**
   * Make a Delete request.
   * @param endpoint root-relative route of endpoint w/ query params e.g. 'getData/coffee?decaf=true'
   */
  delete(endpoint) {
    if (!this.validateJwt()) {
      return false;
    }
    const token = this.getJwt();
    const url = new URL(endpoint, this.getHost);
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    axios.defaults.headers.common["x-access-token"] = token;
    
    const data =  axios.delete(url.href);
      data.then((response)=> {
        if(response.data.auth === true && response.data.token)
        {
          localStorage.removeItem('token');
          localStorage.setItem('token', response.data.token);
        }
      });
    return data;
  }
}

