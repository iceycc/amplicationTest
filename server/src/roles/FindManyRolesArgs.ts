import { ArgsType, Field } from "@nestjs/graphql";
import { RolesWhereInput } from "./RolesWhereInput";

@ArgsType()
class FindManyRolesArgs {
  @Field(() => RolesWhereInput, { nullable: true })
  where?: RolesWhereInput;
}

export { FindManyRolesArgs };
