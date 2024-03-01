import { config } from "dotenv";
// despues de npm install dotenv para que lea variables de entrono del archivo .env

config()

export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME
export const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION
export const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY
export const AWS_SECRET_KEY= process.env.AWS_SECRET_KEY

// console.log(AWS_BUCKET_NAME,AWS_BUCKET_REGION,AWS_PUBLIC_KEY,AWS_SECRET_KEY)