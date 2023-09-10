import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN as string);
    // eslint-disable-next-line no-console
    console.log('Database connected');
  } catch {
    throw new Error('Error on database connection');
  }
};
