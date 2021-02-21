import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import {
  FindOneRolesArgs,
  FindManyRolesArgs,
  RolesCreateArgs,
  RolesUpdateArgs,
  RolesDeleteArgs,
  Subset,
} from "@prisma/client";

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}
  findMany<T extends FindManyRolesArgs>(args: Subset<T, FindManyRolesArgs>) {
    return this.prisma.roles.findMany(args);
  }
  findOne<T extends FindOneRolesArgs>(args: Subset<T, FindOneRolesArgs>) {
    return this.prisma.roles.findOne(args);
  }
  create<T extends RolesCreateArgs>(args: Subset<T, RolesCreateArgs>) {
    return this.prisma.roles.create<T>(args);
  }
  update<T extends RolesUpdateArgs>(args: Subset<T, RolesUpdateArgs>) {
    return this.prisma.roles.update<T>(args);
  }
  delete<T extends RolesDeleteArgs>(args: Subset<T, RolesDeleteArgs>) {
    return this.prisma.roles.delete(args);
  }
}
