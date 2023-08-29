import { ObjectId, Schema, model } from 'mongoose';

export interface IProduct {
  name: string;
  status: boolean;
  category: ObjectId;
  user: ObjectId;
  description?: string;
  price?: number;
  inStock?: boolean;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: { type: String },
  price: {
    type: Number,
    default: 0,
  },
  inStock: { type: Boolean, default: true },
});

ProductSchema.methods.toJSON = function () {
  const category = this.toObject();
  delete category.__v;
  delete category.status;
  return category;
};

export const Product = model<IProduct>('Product', ProductSchema);
