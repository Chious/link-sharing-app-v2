import { gql } from "@urql/next";

export const SignupMutation = gql`
  mutation Mutation($input: AuthInput) {
    signup(input: $input) {
      firstName
      image
      lastName
      token
    }
  }
`;

export const LoginMutation = gql`
  mutation Mutation($input: AuthInput) {
    login(input: $input) {
      firstName
      image
      lastName
      token
    }
  }
`;
