import mongoose, { Schema, Document } from 'mongoose';

interface IOrder extends Document {
  orderID: string;
  productId: string;
  orderedOn: Date;
  userId: mongoose.Types.ObjectId;
}

const orderSchema = new Schema<IOrder>({
  orderID: { type: String, required: true },
  productId: { type: String, required: true },
  orderedOn: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
