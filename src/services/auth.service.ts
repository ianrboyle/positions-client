import axios from "axios";

const API_URL = "https://localhost:5001/api/account/";

class AuthService {
  async login(username: string, password: string) {
    return await axios
      .post(`${process.env.REACT_APP_API_URL}/account/login`, {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data
      })
      .catch((err) => {
        console.log("Error", err)
        return err;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username: string, email: string, password: string) {
    return axios.post(`${process.env.REACT_APP_API_URL}/account/register`, {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    console.log("GET CURRENT USER:", userStr)
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();