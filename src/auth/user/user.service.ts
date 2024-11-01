import { Injectable } from '@nestjs/common';
import { User } from './entities/user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  constructor() {
    this.initializeUsers();
  }

  private async initializeUsers() {
    const hashedPassword = await bcrypt.hash('password', 10); // Ensure this matches the password you are sending
    this.users.push({
      userId: 1,
      username: 'test',
      password: hashedPassword,
    });
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
