import { GraphQLError } from "graphql";
import { signup, login } from "@/lib/auth";
import { validateEmail, validatePW } from "@/lib/form";
import { editLinks, editProfile, getUser } from "@/lib/user";
import { GraphQLJSON } from "graphql-type-json";

export const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    userProfile: async (obj: any, args: any, ctx: any) => {
      if (!ctx.user) {
        return new GraphQLError("Unauthorized", {
          extensions: {
            code: 401,
          },
        });
      }

      const getUserFromDB = await getUser(ctx);

      if (!getUserFromDB) {
        return new GraphQLError("Failed to get user links", {
          extensions: {
            code: 400,
          },
        });
      }

      return {
        links: JSON.parse(getUserFromDB.links),
        userId: getUserFromDB.userId,
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
