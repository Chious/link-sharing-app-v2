import { gql } from "@urql/next";

export const SignupMutation = gql`
  mutation Mutation($input: AuthInput) {
    signup(input: $input) {
      token
      user {
        userId
        firstName
        image
        lastName
        email
      }
    }
  }
`;

export const LoginMutation = gql`
  mutation Mutation($input: AuthInput) {
    login(input: $input) {
      token
      user {
        userId
        firstName
        image
        lastName
        email
      }
      links
    }
  }
`;
