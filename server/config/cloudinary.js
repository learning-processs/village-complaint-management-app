
// import dotenv from 'dotenv'
// dotenv.config()
// config/cloudinary.js

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: 'dez1lqudm',
  api_key: '674452491162843',
  api_secret: 'Sby4clROj0S1wQZ213z26RNR-HE',
})

export { cloudinary }