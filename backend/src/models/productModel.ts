import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  productId: string;
}

const productSchema = new Schema<IProduct>({
  productId: { type: String, required: true },
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
