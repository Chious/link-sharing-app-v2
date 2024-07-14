export const schema = `#graphql

   type User {
      id: ID!
      name: String!
      email: String!
      token: String
   }

   type UserProfile {
      id: ID!
      userId: ID!
      firstName: String
      lastName: String
      email: String
      image: String
   }

   enum Platform {
   Gitub
   FrontendMentor
   Twitter
   LinkedIn
   Youtube
   Facebook
   Twitch
   Devto
   Codewars
   Codepen
   freeCodeCamp
   GitLab
   Hashnode
   StackOverflow
   }

   type Link {
      id: ID!
      userId: ID!
      platform: Platform
      url: String
   }

   type UserLinks {
      userId: ID!
      links: [Link]
   }

   input AuthInput {
      email: String!
      password: String!
   }

   type Query {
      user: User
      userProfile: UserProfile
      userLinks: UserLinks
   }

   type Mutation {
      login(input: AuthInput): User
      signup(input: AuthInput): User
   }
`;
