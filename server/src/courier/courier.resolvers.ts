
import {CourierInput,Courier } from "../graphql/gql-types";
import courierModel from "./courier.model";
import CryptoJS from "crypto-js";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { ApolloError } from "apollo-server-express";


export const extractCourier = async (Id?: ObjectId) => {
  try {
    const t = await courierModel.findById(Id);
    if (!t) throw new Error("Courier Not Found");
    return {
      id: t.id,
      courierDesc: t.courierDesc,
      courierType: t.courierType,  
      destinationAddress: t.destinationAddress,
      returnAddress: t.returnAddress,
      status: t.status,
      arrivalDate: t.arrivalDate,
      weight: t.weight,
      cost: t.cost,
    };
  } catch (err) {
    throw err;
  }
};
module.exports = {
  Query: {
    fetchCouriers: async () => {
      try {
        const couriers= await courierModel.find();
        return couriers;
      } catch {
        console.log("Couriers Not Found");
      }
    },
    fetchCourierById: async (_: any, args: CourierInput) => {
      try {
        const courier= await courierModel.findOne({ _id: args.id });
        if (!courier) {
          throw new Error("Courier Not Found");
        }
        return {
          id:courier.id,
          courierDesc: courier.courierDesc,
          courierType: courier.courierType,
          destinationAddress: courier.destinationAddress,
          returnAddress: courier.returnAddress,
          status: courier.status,
          arrivaldate: courier.arrivalDate,
          weight:courier.weight,
          cost: courier.cost,
          createdAt: courier.createdAt,
          updatedAt: courier.updatedAt,
         
        };
      } catch {
        console.log("Error fetching customer");
      }
    },

  },
  Mutation: {
    createCourier: async (_: any, args: { input: CourierInput }) => {
      try {
        const courier = await courierModel.create({
          ...args.input,
          createdAt: new Date().toISOString(),
        });
        return {
          id: courier.id,
          courierDesc: courier.courierDesc,
        };
      } catch {
        console.log("Error creating courier");
      }
    },
    updateCourier: async (_: any, args: { input: CourierInput })=> {
      try {
      
        const courier = await courierModel.findOneAndUpdate(
          { id: args.input.id },
          {
            ...args.input,
            updatedAt: new Date().toISOString(),
                      }
        );
        if (!courier) {
          throw new Error("customer not found");
        }
        return {
          id: courier.id,
          courierDesc: courier.courierDesc,
        };
      } catch (e: any) {
        console.log("Error updating an Courier", e.message);
      }
    },

    
  },
};
