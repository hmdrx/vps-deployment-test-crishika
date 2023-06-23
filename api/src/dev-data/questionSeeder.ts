require('dotenv').config();
import fs from 'fs';
import mongoose from 'mongoose';
import Question from '../models/question.model';

let DB = process.env.LOCAL_DATABASE!;

const data = JSON.parse(fs.readFileSync(`${__dirname}/question.json`, 'utf-8'));

const importData = async () => {
  mongoose.connect(DB).then(() => console.log('DB connection successful!'));
  try {
    await Question.create(data);
    console.log('data imported successfully!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  mongoose.connect(DB).then(() => console.log('DB connection successful!'));
  try {
    await Question.deleteMany();
    console.log('deleted everything!!!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// console.log(process.argv);
if (process.argv[2] === '--importprod') {
  DB = process.env.CLOUD_DATABASE!.replace(
    '<password>',
    process.env.CLOUD_DATABASE_PASSWORD!
  );
  importData();
} else if (process.argv[2] === '--deleteprod') {
  DB = process.env.CLOUD_DATABASE!.replace(
    '<password>',
    process.env.CLOUD_DATABASE_PASSWORD!
  );
  deleteData();
}
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
