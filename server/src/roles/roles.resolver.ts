import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import * as gqlBasicAuthGuard from "../auth/gqlBasicAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import * as gqlUserRoles from "../auth/gqlUserRoles.decorator";
import * as abacUtil from "../auth/abac.util";
import { isRecordNotFoundError } from "../prisma.util";
import { RolesService } from "./roles.service";
import { CreateRolesArgs } from "./CreateRolesArgs";
import { UpdateRolesArgs } from "./UpdateRolesArgs";
import { DeleteRolesArgs } from "./DeleteRolesArgs";
import { FindManyRolesArgs } from "./FindManyRolesArgs";
import { FindOneRolesArgs } from "./FindOneRolesArgs";
import { Roles } from "./Roles";

@graphql.Resolver(() => Roles)
@common.UseGuards(gqlBasicAuthGuard.GqlBasicAuthGuard, gqlACGuard.GqlACGuard)
export class RolesResolver {
  constructor(
    private readonly service: RolesService,
    @nestAccessControl.InjectRolesBuilder()
    private readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => [Roles])
  @nestAccessControl.UseRoles({
    resource: "Roles",
    action: "read",
    possession: "any",
  })
  async roles(
    @graphql.Args() args: FindManyRolesArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Roles[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Roles",
    });
    const results = await this.service.findMany(args);
    return results.map((result) => permission.filter(result));
  }

  @graphql.Query(() => Roles, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Roles",
    action: "read",
    possession: "own",
  })
  async roles(
    @graphql.Args() args: FindOneRolesArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Roles | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Roles",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Roles)
  @nestAccessControl.UseRoles({
    resource: "Roles",
    action: "create",
    possession: "any",
  })
  async createRoles(
    @graphql.Args() args: CreateRolesArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Roles> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Roles",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Roles"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: args.data,
    });
  }

  @graphql.Mutation(() => Roles)
  @nestAccessControl.UseRoles({
    resource: "Roles",
    action: "update",
    possession: "any",
  })
  async updateRoles(
    @graphql.Args() args: UpdateRolesArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Roles | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Roles",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"Roles"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: args.data,
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => Roles)
  @nestAccessControl.UseRoles({
    resource: "Roles",
    action: "delete",
    possession: "any",
  })
  async deleteRoles(
    @graphql.Args() args: DeleteRolesArgs
  ): Promise<Roles | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
