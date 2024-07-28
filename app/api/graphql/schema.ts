export const schema = `#graphql

   type User {
      firstName: String
      lastName: String
      image: String
      email: String
   }

   type UserProfile {
      id: ID!
      userId: ID!
      firstName: String
      lastName: String
      email: String
      image: String
      links: JSON
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

   scalar JSON

   input EditLinksInput {
      platform: String
      url: String
   }

   input AuthInput {
      email: String!
      password: String!
   }

   type AuthResponse {
      token: String
      user: User
      links: JSON
   }

   input EditProfileInput {
      firstName: String
      lastName: String
      email: String
      image: String
   }

   type Query {
      userProfile: UserProfile
   }

   type Mutation {
      login(input: AuthInput): AuthResponse
      signup(input: AuthInput): AuthResponse
      editProfile(input: EditProfileInput): UserProfile
      editLinks(input: JSON): UserProfile
   }
`;
