import IUserLogin from '@/interfaces/IUserLogin';
import { clearStatusUserLog, StatusUserLog } from '@/store/StatusUserLog';
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
      StatusUserLog.name = user.name;
      StatusUserLog.role = data.role;
      StatusUserLog.token = data.token;
    }
    return response.data;
  }

  logout() {
    clearStatusUserLog();
  }
}

export default new AuthService();
