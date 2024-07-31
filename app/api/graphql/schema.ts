export const schema = `#graphql

 type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

   type User {
      userId: ID
      firstName: String
      lastName: String
      image: String
      email: String
   }

   type UserProfile {
      id: ID
      userId: ID
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

   scalar Upload

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
   }

   type Query {
      userProfile(userId: String!): UserProfile
   }

   type Mutation {
      login(input: AuthInput): AuthResponse
      signup(input: AuthInput): AuthResponse
      editProfile(input: EditProfileInput): UserProfile
      singleFileUpload(input: Upload): File
      editLinks(input: JSON): UserProfile
   }
`;
