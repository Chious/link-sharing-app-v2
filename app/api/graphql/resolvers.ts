import { GraphQLError } from "graphql";
import { signup, login } from "@/lib/auth";
import { validateEmail, validatePW } from "@/lib/form";
import { editProfile } from "@/lib/user";

export const resolvers = {
  Query: {
    user: () => {
      return {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        image: "",
      };
    },

    userProfile: (obj: any, args: any, ctx: any) => {
      if (!ctx.user) {
        return new GraphQLError("Unauthorized", {
          extensions: {
            code: 401,
          },
        });
      }

      return {
        id: "1",
        userId: "1",
        firstName: "John",
        lastName: "Doe",
        email: "",
        image: "",
      };
    },

    userLinks: () => {
      return {
        links: [
          {
            id: "1",
            platform: "Github",
            url: "",
          },
        ],
        userId: "1",
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
  },
};
