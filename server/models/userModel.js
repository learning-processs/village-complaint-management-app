import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name'],
        trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
      trim: true,
    },

    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [6, 'Password must be at least 6 characters'],
    },

    role: {
      type: String,
      enum: ['villager', 'admin'],
      default: 'villager',
    },

    village: {
      type: String,
      required: [true, 'Please add your village name'],
      trim: true,
    },
},{timestamps:true});

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel;