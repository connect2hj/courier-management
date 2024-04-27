// seeders/vendorSeeder.js
const mongoose = require("mongoose");
import { connectDb } from "../server";
import { VendorType } from "../src/graphql/gql-types";
import VendorModel from "../src/vendors/vendors.model";
console.log("...seeding vendors");
// Connect to MongoDB
connectDb();

// Seed or update vendors with default type "consumer"
const seedOrUpdateVendors = async () => {
  try {
    // Find all vendors and update or create with default type "consumer"
    const vendors = await VendorModel.find({});

    for (let vendor of vendors) {
      vendor.type = VendorType.Customer;
      await vendor.save();
    }

    console.log("Vendors seeded or updated successfully");
  } catch (error) {
    console.error("Error seeding or updating vendors:", error);
  } finally {
    // Close the Mongoose connection
    mongoose.connection.close();
  }
};

seedOrUpdateVendors();
