import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";

import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/users.module";
import { TaskModule } from "./modules/task/task.module";
import { AccessTokenGuard } from "src/common/guards";

import "dotenv/config";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    UserModule,
    TaskModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: AccessTokenGuard }],
})
export class AppModule {}
