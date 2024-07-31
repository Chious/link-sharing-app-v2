import { GraphQLError } from "graphql";
import { signup, login, verifyToken } from "@/lib/auth";
import { validateEmail, validatePW } from "@/lib/form";
import { editLinks, editProfile, getUser } from "@/lib/user";
import { GraphQLJSON } from "graphql-type-json";
import { GraphQLUpload } from "graphql-upload-ts";

export const resolvers = {
  JSON: GraphQLJSON,
  Upload: GraphQLUpload,
  Query: {
    userProfile: async (obj: any, args: any, ctx: any) => {
      let getUserFromDB;

      if (ctx) {
        const userId = await verifyToken(ctx.user);
        if (!userId) return;
        getUserFromDB = await getUser(userId);
      } else {
        getUserFromDB = await getUser(args.userId);
      }

      if (!getUserFromDB) {
        return new GraphQLError("No User Found!", {
          extensions: {
            code: 400,
          },
        });
      }

      return {
        id: getUserFromDB.id,
        userId: getUserFromDB.userId,
        links: getUserFromDB.links ? JSON.parse(getUserFromDB.links) : [],
        firstName: getUserFromDB.firstName,
        lastName: getUserFromDB.lastName,
        email: getUserFromDB.email,
        image: getUserFromDB.image,
      };
    },
  },

  Mutation: {
    login: async (_: any, { input }: any) => {
      if (!validateEmail(input.email)) {
        return new GraphQLError("Invalid email", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      if (!validatePW(input.password)) {
        return new GraphQLError("Invalid password", {
          extensions: {
            code: 400,
          },
        });
      }

      const res = await login({
        email: input.email,
        password: input.password,
      });

      return res;
    },

    signup: async (_: any, { input }: any) => {
      // vaildate
      if (!validateEmail(input.email)) {
        return new GraphQLError("Invalid email", {
          extensions: {
            code: 400,
          },
        });
      }

      if (!validatePW(input.password)) {
        return new GraphQLError("Invalid password", {
          extensions: {
            code: 400,
          },
        });
      }

      const res = await signup({
        email: input.email,
        password: input.password,
      });

      return res;
    },

    editProfile: async (_: any, { input }: any, ctx: any) => {
      if (!ctx.user) {
        return new GraphQLError("Unauthorized", {
          extensions: {
            code: 401,
          },
        });
      }
      const res = await editProfile(input, ctx);

      return {
        id: res[0].id,
        userId: res[0].userId,
        firstName: res[0].firstName,
        lastName: res[0].lastName,
        email: res[0].email,
        image: res[0].image,
      };
    },

    singleFileUpload: async (_: any, { input }: any, ctx: any) => {
      return {
        filename: "hello",
        mimetype: "image/jpeg",
        encoding: "7bit",
      };
    },

    editLinks: async (_: any, { input }: any, ctx: any) => {
      if (!ctx.user) {
        return new GraphQLError("Unauthorized", {
          extensions: {
            code: 401,
          },
        });
      }

      const res = await editLinks(input, ctx);

      if (!res) {
        return new GraphQLError("Failed to edit links", {
          extensions: {
            code: 400,
          },
        });
      }

      return {
        id: res.id,
        userId: res.userId,
        links: res.links ? JSON.parse(res.links) : [],
      };
    },
  },
};
