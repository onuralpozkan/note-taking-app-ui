import BaseHttpService from './BaseHttpService';

export type RegisterUserType = {
  username: string;
  email: string;
  password: string;
};

export type LoginUserType = {
  username: string;
  password: string;
};

export type LoginResponseType = {
  statusCode: number;
  message: string;
  token: string;
};

class UserService extends BaseHttpService {
  public async registerUser(data: RegisterUserType) {
    return this.post('api/auth/register', data);
  }

  public async loginUser(data: LoginUserType): Promise<LoginResponseType> {
    return this.post('api/auth/login', data);
  }
}

export default new UserService();
