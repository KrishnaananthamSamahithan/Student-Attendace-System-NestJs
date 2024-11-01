import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth/auth.module';
import { UserModule } from './auth/user/user.module';
import { HomeModule } from './home/home.module'; // Import HomeModule

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    HomeModule, // Add HomeModule to imports
  ],
})
export class AppModule {}
