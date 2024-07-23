import { GraphQLError } from "graphql";
import { signup } from "@/lib/auth";
import { validateEmail, validatePW } from "@/lib/form";

export const resolvers = {
  Query: {
    user: () => {
      return {
        token: "123",
        firstName: "John",
        lastName: "Doe",
        image: "",
      };
    },

    userProfile: () => {
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
    login: (_: any, { input }: any) => {
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

      return {
        id: "1",
        name: "John Doe",
        email: input.email,
        token: "123",
      };
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

      console.log("res: ", res);

      return res;
    },
  },
};
