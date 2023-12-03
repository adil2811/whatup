import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const UserDataSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // You can specify additional properties for the image field if needed
  },
  emailVerified: {
    type: Boolean,
    default: false, // You can set a default value if necessary
  },
  // Add other fields as needed
});

const UserDataModel = mongoose.models.user || mongoose.model('user', UserDataSchema);

export default UserDataModel;
