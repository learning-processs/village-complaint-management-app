// models/Complaint.js

import mongoose from 'mongoose'

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },

    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true,
    },

    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: ['road', 'water', 'electricity', 'sanitation', 'other'],
    },

    images: [
      {
        type: String,   // Cloudinary image URLs
      }
    ],

    status: {
      type: String,
      enum: ['pending', 'in-progress', 'resolved'],
      default: 'pending',
    },

    location: {
      type: String,
      required: [true, 'Please add a location'],
      trim: true,
    },

    villager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },

    adminResponse: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

const complaintModel =mongoose.models.complaint ||  mongoose.model('complaint', complaintSchema);

export default complaintModel