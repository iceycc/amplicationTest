import { ArgsType, Field } from "@nestjs/graphql";
import { RolesWhereUniqueInput } from "./RolesWhereUniqueInput";

@ArgsType()
class DeleteRolesArgs {
  @Field(() => RolesWhereUniqueInput, { nullable: false })
  where!: RolesWhereUniqueInput;
}

export { DeleteRolesArgs };
