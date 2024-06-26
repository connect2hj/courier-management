import { LoginInput, UserInput } from "../graphql/gql-types";
import UserModel from "./user.model";
import CryptoJS from "crypto-js";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { ApolloError } from "apollo-server-express";
import { RootQuerySelector } from "mongoose";

dotenv.config().parsed;
export const extractUser = async (userId?: ObjectId) => {
  try {
    const t = await UserModel.findById(userId);
    if (!t) throw new Error("Item not found");
    return {
      id: t.id,
      name: t.name,
      phone: t.phone,
      email: t.email,
    };
  } catch (err: any) {
    throw console.log(err.message);
  }
};
module.exports = {
  Query: {
    fetchUsers: async () => {
      try {
        const users = await UserModel.find();
        return users;
      } catch {
        console.log("Error fetching users");
      }
    },
    fetchUserById: async (_: any, args: UserInput) => {
      try {
        const user = await UserModel.findOne({ _id: args.id });
        if (!user) {
          throw new Error("User not found");
        }
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          password: CryptoJS.AES.decrypt(
            user.password as string,
            process.env.SECRET_KEY as string
          ).toString(CryptoJS.enc.Utf8),
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      } catch (err: any) {
        console.log("Error fetching user", err.message);
      }
    },
    checkUserExists: async (
      _: any,
      args: {
        email: string;
      }
    ) => {
      try {
        const user = await UserModel.findOne({ email: args.email });
        if (!user) {
          return false;
        }
        return true;
      } catch {
        console.log("Error fetching user");
      }
    },
  },
  Mutation: {
    createUser: async (_: any, args: { input: UserInput }) => {
      console.log("you reached here", args); //Undo Changes Later.....
      try {
        const ifUserExists = await UserModel.findOne({
          email: args.input.email,
        });
        if (ifUserExists) {
          throw new Error("User already exists");
        }

        const user = await UserModel.create({
          ...args.input,
          password: args.input.password
            ? CryptoJS.AES.encrypt(
                args.input.password,
                process.env.SECRET_KEY as string
              )
            : null,
          createdAt: new Date().toISOString(),
        });
        return {
          id: user._id,
          token: jwt.sign(
            {
              id: user._id,
              email: user.email,
            },
            process.env.SECRET_KEY as string,
            { expiresIn: "1d" }
          ),
          name: user.name,
        };
      } catch (e: any) {
        console.log("Error creating user", e.message);
      }
    },
    updateUser: async (_: any, args: { input: UserInput }) => {
      try {
        const encryptedPassword = CryptoJS.AES.encrypt(
          args.input.password as string,
          process.env.SECRET_KEY as string
        ).toString();
        const user = await UserModel.findOneAndUpdate(
          { id: args.input.id },
          {
            ...args.input,
            password: encryptedPassword,
            updatedAt: new Date().toISOString(),
          }
        );
        if (!user) {
          throw new Error("User not found");
        }
        return {
          token: jwt.sign(
            {
              id: user.id,
              email: user?.email,
            },
            process.env.SECRET_KEY as string,
            { expiresIn: "1d" }
          ),
          name: user?.name,
          email: user?.email,
        };
      } catch (e: any) {
        console.log("Error updating user", e.message);
      }
    },

    validateUser: async (
      _: RootQuerySelector<string>,
      args: {
        input: LoginInput;
      }
    ) => {
      console.log("validate user", args);
      try {
        const user = await UserModel.findOne({ email: args.input.email });
        if (!user) {
          throw new ApolloError("User not found");
        }
        const bytes = CryptoJS.AES.decrypt(
          user.password as string,
          process.env.SECRET_KEY as string
        );
        const password = bytes.toString(CryptoJS.enc.Utf8);
        if (password !== args.input.password) {
          throw new ApolloError("Password is incorrect");
        }
        const token = jwt.sign(
          {
            id: user._id,
            email: user.email,
          },
          process.env.SECRET_KEY as string,
          { expiresIn: "1y" }
        );

        console.log("token", token);
        return {
          token,
          id: user.id,
          name: user.name,
          email: user.email,
        };
      } catch (e) {
        console.log(e);
      }
    },
  },
};
