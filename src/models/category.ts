import { ObjectId, Schema, model } from 'mongoose';

interface ICategory {
  name: string;
  status: boolean;
  user: ObjectId;
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
});

CategorySchema.methods.toJSON = function () {
  const category = this.toObject();
  delete category.__v;
  delete category.status;
  return category;
};

export const Category = model<ICategory>('Category', CategorySchema);
