import { ArgsType, Field } from "@nestjs/graphql";
import { RolesWhereUniqueInput } from "./RolesWhereUniqueInput";

@ArgsType()
class FindOneRolesArgs {
  @Field(() => RolesWhereUniqueInput, { nullable: false })
  where!: RolesWhereUniqueInput;
}

export { FindOneRolesArgs };
