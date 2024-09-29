import IUserLogin from '@/interfaces/IUserLogin';
import axios from 'axios';

const API_URL = 'https://apidev.cewallet.org/auth/';

class AuthService {
  async login(user: IUserLogin) {
    const response = await axios.post(API_URL + 'login', {
      username: user.name,
      password: user.password,
    });
    if (response.data) {
      const data = response.data.data;
      sessionStorage.setItem('bearer', data.token);
      sessionStorage.setItem('role', data.role);
    }
    return response.data;
  }

  logout() {
    sessionStorage.removeItem('bearer');
    sessionStorage.removeItem('role');
  }
}

export default new AuthService();
