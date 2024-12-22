import { getModelForClass, index, modelOptions, pre, prop } from '@typegoose/typegoose';
import bcrypt from "bcryptjs";

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS || "10");
  return await bcrypt.hash(password, saltRounds);
};

@pre<User>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hashPassword(this.password);
  }
  next();
})
@modelOptions({
  schemaOptions: {
    timestamps: true, toJSON: {
      virtuals: true, transform: (_doc, ret) => {
        // Delete password from the serialized output
        delete ret.password;
        return ret;
      }
    }
  },
})
@index({ email: 1 }, { unique: true })
export class User {
  @prop({ required: true })
  public firstName!: string;
  @prop({ required: true })
  public lastName!: string;
  @prop({ required: true })
  public email!: string;
  @prop({ required: true })
  public password!: string;
  @prop({ required: true })
  public dob!: Date;

}
const UserModel = getModelForClass(User);
export default UserModel;
