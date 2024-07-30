import { gql } from "@urql/next";

export const getUser = gql`
  query GetUser {
    user {
      firstName
      lastName
      email
      token
    }
  }
`;

export const userMutation = gql`
  mutation Mutation($input: EditProfileInput) {
    editProfile(input: $input) {
      id
      userId
      firstName
      lastName
      email
      image
    }
  }
`;

export const uploadFileMutation = gql`
  mutation Mutation($input: Upload) {
    singleFileUpload(input: $input) {
      filename
      mimetype
      encoding
    }
  }
`;

export const editLinksMutation = gql`
  mutation Mutation($input: JSON) {
    editLinks(input: $input) {
      links
      userId
    }
  }
`;
