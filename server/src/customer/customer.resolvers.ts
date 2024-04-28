
import { LoginInput, CustomerInput, Customer } from "../graphql/gql-types";
import CustomerModel from "./customer.model";
import CryptoJS from "crypto-js";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { ApolloError } from "apollo-server-express";

dotenv.config().parsed;
export const extractcustomer = async (customerId?: ObjectId) => {
  try {
    const t = await CustomerModel.findById(customerId);
    if (!t) throw new Error("Customer doesn't Exist");
    return {
      id: t.id,
      name: t.name,
      phone: t.phone,   
    };
  } catch (err) {
    throw err;
  }
};
module.exports = {
  Query: {
    fetchCustomers: async () => {
      try {
        const customers = await CustomerModel.find();
        return customers;
      } catch {
        console.log("Error Fetching Customers");
      }
    },
    fetchCustomerById: async (_: any, args: CustomerInput) => {
      try {
        const customer= await CustomerModel.findOne({ _id: args.id });
        if (!customer) {
          throw new Error("customer not found");
        }
        return {
          id:customer.id,
          name: customer.name,
          phone: customer.phone,
          createdAt: customer.createdAt,
          updatedAt: customer.updatedAt,
        };
      } catch {
        console.log("Error fetching customer");
      }
    },
    checkCustomerExists: async (
      _: any,
      args: {
        phone: string;
      }
    ) => {
      try {
        const customer = await CustomerModel.findOne({ phone: args.phone});
        if (!customer) {
          return false;
        }
        return true;
      } catch {
        console.log("Error fetching customer");
      }
    },
  },
  Mutation: {
    createCustomer: async (_: any, args: { input: CustomerInput }) => {
      try {
        const ifcustomerExists = await CustomerModel.findOne({
          phone: args.input.phone,
        });
        if (ifcustomerExists) {
          throw new Error("customer already exists");
        }
       
        const customer = await CustomerModel.create({
          ...args.input,
          createdAt: new Date().toISOString(),
        });
        return {
          id: customer.id,
          name: customer.name,
          phone: customer.phone
        };
      } catch {
        console.log("Error creating customer");
      }
    },
    updateCustomer: async (_: any, args: { input: CustomerInput })=> {
      try {
      
        const customer = await CustomerModel.findOneAndUpdate(
          { id: args.input.id },
          {
            ...args.input,
            updatedAt: new Date().toISOString(),
                      }
        );
        if (!customer) {
          throw new Error("customer not found");
        }
        return {
          id: customer.id,
          name: customer.name,
          phone: customer.phone,
        };
      } catch (e: any) {
        console.log("Error updating customer", e.message);
      }
    },

    
  },
};
