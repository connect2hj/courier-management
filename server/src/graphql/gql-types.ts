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

export type Courier = {
  __typename?: 'Courier';
  arrivalDate: Scalars['String'];
  courierCost: Scalars['String'];
  courierDesc: Scalars['String'];
  courierType: Scalars['String'];
  courierWeight: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  destinationAddress: Scalars['String'];
  fkCustID?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  returnAddress: Scalars['String'];
  status: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type CourierInput = {
  arrivalDate: Scalars['String'];
  courierCost: Scalars['String'];
  courierDesc: Scalars['String'];
  courierStatus: Scalars['String'];
  courierType: Scalars['String'];
  courierWeight: Scalars['String'];
  destinationAddress: Scalars['String'];
  id: Scalars['String'];
  returnAddress: Scalars['String'];
};

export type Customer = {
  __typename?: 'Customer';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  phone: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type CustomerInput = {
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCourier?: Maybe<Courier>;
  createCustomer?: Maybe<Customer>;
  createUser?: Maybe<AuthenticatedUser>;
  deletecourier: Courier;
  updateCourier: Courier;
  updateCustomer?: Maybe<Customer>;
  updateUser?: Maybe<AuthenticatedUser>;
  validateUser?: Maybe<AuthenticatedUser>;
};


export type MutationCreateCourierArgs = {
  input: CourierInput;
};


export type MutationCreateCustomerArgs = {
  input: CustomerInput;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationDeletecourierArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateCourierArgs = {
  input: CourierInput;
};


export type MutationUpdateCustomerArgs = {
  input: CustomerInput;
};


export type MutationUpdateUserArgs = {
  input: UserInput;
};


export type MutationValidateUserArgs = {
  input?: InputMaybe<LoginInput>;
};

export type Query = {
  __typename?: 'Query';
  checkCustomerExists?: Maybe<Scalars['Boolean']>;
  checkUserExists?: Maybe<Scalars['Boolean']>;
  fetchCourierById?: Maybe<Courier>;
  fetchCouriers: Array<Courier>;
  fetchCustomerById?: Maybe<Customer>;
  fetchCustomers?: Maybe<Array<Maybe<Customer>>>;
  fetchUserById?: Maybe<User>;
  fetchUsers?: Maybe<Array<Maybe<User>>>;
};


export type QueryCheckCustomerExistsArgs = {
  phone: Scalars['String'];
};


export type QueryCheckUserExistsArgs = {
  email: Scalars['String'];
};


export type QueryFetchCourierByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFetchCustomerByIdArgs = {
  id: Scalars['ID'];
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
  phone: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type UserInput = {
  email: Scalars['String'];
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
};
