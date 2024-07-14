import { gql } from "@urql/next";

export const SignupMutation = gql`
  mutation Mutation($input: AuthInput) {
    signup(input: $input) {
      id
      token
    }
  }
`;

export const LoginMutation = gql`
  mutation Mutation($input: AuthInput) {
    login(input: $input) {
      id
      token
    }
  }
`;
