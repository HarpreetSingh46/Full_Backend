import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    variants: [
      {
        images: [
          {
            url: {
              type: String,
              required: true,
            },
          },
        ],
        stock: {
          type: Number,
          default: 0,
        },
        attributes: {
          type: Map,
          of: String,
        },
        price: {
          amount: {
            type: Number,  
            required: true, 
      },
      currency: {
        type: String,
        required: true,
        enum: ["USD", "EUR", "GBP", "JPY", "CNY", "INR"],
        default: "INR",
      },  
      
    }
  }
    ],

    price: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        required: true,
        enum: ["USD", "EUR", "GBP", "JPY", "CNY", "INR"],
        default: "INR",
      },
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },

  { timestamps: true },
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;
