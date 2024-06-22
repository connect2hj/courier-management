import { CourierInput, Courier } from "../graphql/gql-types";
import CourierModel from "./courier.model";
import CryptoJS from "crypto-js";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { ApolloError } from "apollo-server-express";
import { id } from "fp-ts/lib/Refinement";
import customerModel from "../customer/customer.model";

dotenv.config().parsed;
export const extractCourier = async (Id?: ObjectId) => {
  try {
    const t = await CourierModel.findById(Id);
    if (!t) throw new Error("Courier Not Found");
    return {
      id: t.id,
      courierDesc: t.courierDesc,
      courierType: t.courierType,
      destinationAddress: t.destinationAddress,
      returnAddress: t.returnAddress,
      courierStatus: t.courierStatus,
      arrivalDate: t.arrivalDate,
      courierWeight: t.courierWeight,
      courierCost: t.courierCost,
    };
  } catch (err) {
    throw err;
  }
};
const addCourier = (model: InstanceType<typeof CourierModel>): Courier => {
  return {
    id: model.id, // predefined
    courierDesc: model.courierDesc || "", // Returns a Value or Null
    courierType: model.courierType || "",
    destinationAddress: model.destinationAddress || "",
    returnAddress: model.returnAddress || "",
    courierStatus: model.courierStatus || "", //predefined
    arrivalDate: model.arrivalDate || "",
    courierWeight: model.courierWeight || "",
    courierCost: model.courierCost || "",
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  };
};

module.exports = {
  Query: {
    fetchCouriers: async () => {
      try {
        const couriers = await CourierModel.find();
        return couriers.map(addCourier);
      } catch {
        console.log("Couriers Not Found");
      }
    },
    fetchCourierById: async (_: any, args: CourierInput) => {
      try {
        const courier = await CourierModel.findOne({ _id: args.id });
        if (!courier) {
          throw new Error("Courier Not Found");
        }
        return addCourier(courier);
        // return {
        //   id: courier.id,
        //   courierDesc: courier.courierDesc,
        //   courierType: courier.courierType,
        //   destinationAddress: courier.destinationAddress,
        //   returnAddress: courier.returnAddress,
        //   courierStatus: courier.courierStatus,
        //   arrivaldate: courier.arrivalDate,
        //   courierWeight: courier.courierWeight,
        //   courierCost: courier.courierCost,
        //   createdAt: courier.createdAt,
        //   updatedAt: courier.updatedAt,
        // };
      } catch {
        console.log("Error fetching customer");
      }
    },
  },
  // CRUD Operations
  Mutation: {
    createCourier: async (_: any, args: { input: CourierInput }) => {
      console.log("we Reached here", args);
      try {
        const courier = await CourierModel.create({
          ...args.input,

          createdAt: new Date().toISOString(),
        });
        // return addCourier(courier);
        // console.log("Courier created");
        return {
          courierDesc: courier.courierDesc,
          courierType: courier.courierType,
          destinationAddress: courier.destinationAddress,
          returnAddress: courier.returnAddress,
          arrivalDate: courier.arrivalDate,
          courierWeight: courier.courierWeight,
          courierCost: courier.courierCost,
        };
      } catch {
        console.log("Error creating courier");
      }
    },
    updateCourier: async (_: any, args: { input: CourierInput }) => {
      try {
        const courier = await CourierModel.findOneAndUpdate(
          { id: args.input.id },
          {
            ...args.input,
            updatedAt: new Date().toISOString(),
          }
        );
        if (!courier) {
          throw new Error("Courier not found");
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
