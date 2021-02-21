import { ArgsType, Field } from "@nestjs/graphql";
import { RolesCreateInput } from "./RolesCreateInput";

@ArgsType()
class CreateRolesArgs {
  @Field(() => RolesCreateInput, { nullable: false })
  data!: RolesCreateInput;
}

export { CreateRolesArgs };
