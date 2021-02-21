import { ArgsType, Field } from "@nestjs/graphql";
import { RolesWhereUniqueInput } from "./RolesWhereUniqueInput";
import { RolesUpdateInput } from "./RolesUpdateInput";

@ArgsType()
class UpdateRolesArgs {
  @Field(() => RolesWhereUniqueInput, { nullable: false })
  where!: RolesWhereUniqueInput;
  @Field(() => RolesUpdateInput, { nullable: false })
  data!: RolesUpdateInput;
}

export { UpdateRolesArgs };
