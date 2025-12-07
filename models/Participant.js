import mongoose from 'mongoose';

const ParticipantSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxlength: 100,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
  },
  passType: {
    type: String,
    required: true,
    enum: ['Pass Adhérent', 'Pass Non-Adhérent', 'Pass Enfant'],
  },
  date: String,
  time: String,
  location: String,
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Participant || mongoose.model('Participant', ParticipantSchema);
