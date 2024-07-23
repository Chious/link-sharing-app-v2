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
      return {
        id: "1",
        name: "John Doe",
        email: input.email,
        token: "123",
      };
    },

    signup: (_: any, { input }: any) => {
      return {
        id: "1",
        name: "John Doe",
        email: input.email,
        token: "123",
      };
    },
  },
};
