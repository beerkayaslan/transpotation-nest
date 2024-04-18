import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { DiscountsModule } from './modules/transporters/discount/discounts.module';
import { RolesGuard } from './auth/roles.guard';
import { FollowedTransporterModule } from './modules/customers/followed-transporters/followed-transporter.module';
import { CreateCargoModule } from './modules/customers/create-cargo/create-cargo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(config().DB_HOST, {
      dbName: config().DB_NAME,
    }),
    JwtModule.register({}),
    AuthModule,
    DiscountsModule,
    FollowedTransporterModule,
    CreateCargoModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule { }
