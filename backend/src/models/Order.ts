import { Schema, model, Document } from 'mongoose';

export interface IOrder extends Document {
  userId: Schema.Types.ObjectId;
  items: Array<{
    id: string;  // Changed from number to string to match MongoDB ObjectId
    title: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }>;
  total: number;
  paymentMethod: string;
  paymentDetails?: any;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    id: {
      type: String,  // Changed from Number to String
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  paymentDetails: {
    type: Object
  },
  status: {
    type: String,
    default: 'pending'
  }
}, { timestamps: true });

export const Order = model<IOrder>('Order', orderSchema);