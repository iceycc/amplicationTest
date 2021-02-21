import { Module, forwardRef } from "@nestjs/common";
import { MorganModule } from "nest-morgan";
import { PrismaModule } from "nestjs-prisma";
import { ACLModule } from "../auth/acl.module";
import { AuthModule } from "../auth/auth.module";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";
import { RolesResolver } from "./roles.resolver";

@Module({
  imports: [
    ACLModule,
    forwardRef(() => AuthModule),
    MorganModule,
    PrismaModule,
  ],
  controllers: [RolesController],
  providers: [RolesService, RolesResolver],
  exports: [RolesService],
})
export class RolesModule {}
