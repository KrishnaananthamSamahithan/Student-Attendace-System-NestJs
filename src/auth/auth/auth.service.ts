import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private users: { username: string; password: string }[] = [
    { username: 'test', password: bcrypt.hashSync('testpass', 10) },
  ];

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // Check predefined users first
    const predefinedUser = this.users.find(
      (user) => user.username === username,
    );
    if (
      predefinedUser &&
      (await bcrypt.compare(pass, predefinedUser.password))
    ) {
      return { username: predefinedUser.username };
    }

    // Check users from UserService
    const user = await this.userService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    const token = this.jwtService.sign(payload);
    console.log('JWT Token:', token); // Log the token to verify creation
    return {
      access_token: token,
    };
  }
}
