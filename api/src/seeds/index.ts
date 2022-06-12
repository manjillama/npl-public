/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/newline-after-import
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { keys } from '../config';
import Staff from '../models/staff.model';
import staffs from './staffs.json';

mongoose.connect(keys.MONGO_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Import data into database
const importData = async () => {
  try {
    const staff = Staff.create(staffs);
    await Promise.all([staff]);

    console.log('✨ Data successfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from collection
const deleteData = async () => {
  try {
    const staff = Staff.deleteMany({});

    await Promise.all([staff]);

    console.log('✨ Data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteData();
