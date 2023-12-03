import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
    members: {
        type: Array
    },
    message: {
        type: String
    }
},
    {
        timestamps: true
    }
);

const conversation = mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);

export default conversation;