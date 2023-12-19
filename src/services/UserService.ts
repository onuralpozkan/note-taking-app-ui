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
class UserService extends BaseHttpService {
  public async registerUser(data: RegisterUserType) {
    return this.post('api/auth/register', data);
  }

  public async loginUser(data: LoginUserType) {
    return this.post('api/auth/login', data);
  }

  //   public async getUserById(userId: string) {
  //     return this.get<User>(`/users/${userId}`);
  //   }

  //   public async updateUser(userId: string, updatedData: Partial<User>) {
  //     return this.put<User>(`/users/${userId}`, updatedData);
  //   }

  // You can add more methods for user-related API calls
}

export default UserService;
