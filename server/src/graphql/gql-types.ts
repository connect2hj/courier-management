export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthenticatedUser = {
  __typename?: 'AuthenticatedUser';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  token: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<AuthenticatedUser>;
  updateUser?: Maybe<AuthenticatedUser>;
  validateUser?: Maybe<AuthenticatedUser>;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationUpdateUserArgs = {
  input: UserInput;
};


export type MutationValidateUserArgs = {
  input?: InputMaybe<LoginInput>;
};

export type Query = {
  __typename?: 'Query';
  checkUserExists?: Maybe<Scalars['Boolean']>;
  fetchUserById?: Maybe<User>;
  fetchUsers?: Maybe<Array<Maybe<User>>>;
};


export type QueryCheckUserExistsArgs = {
  email: Scalars['String'];
};


export type QueryFetchUserByIdArgs = {
  id: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type UserInput = {
  email: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  key: Scalars['ID'];
  name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
};
