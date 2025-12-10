/**
 * Script to update ticket dates from "13 Décembre 2024" to "13 Décembre 2025"
 * Run this script once to fix existing tickets in the database
 */

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Read .env.local manually
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

// Extract MONGODB_URI
let MONGODB_URI = null;
const lines = envContent.split(/\r?\n/);
for (const line of lines) {
  const trimmedLine = line.trim();
  if (trimmedLine.startsWith('MONGODB_URI=')) {
    MONGODB_URI = trimmedLine.substring('MONGODB_URI='.length).trim();
    break;
  }
}

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env.local');
  process.exit(1);
}

// Define the Participant schema inline
const participantSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  passType: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now }
});

const Participant = mongoose.models.Participant || mongoose.model('Participant', participantSchema);

async function updateTicketDates() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    // Find all tickets with the old date
    const oldDate = '13 Décembre 2024';
    const newDate = '13 Décembre 2025';

    console.log(`\nSearching for tickets with date: "${oldDate}"...`);
    const ticketsToUpdate = await Participant.find({ date: oldDate });
    
    console.log(`Found ${ticketsToUpdate.length} ticket(s) to update.`);

    if (ticketsToUpdate.length === 0) {
      console.log('No tickets need updating. All done! ✅');
      await mongoose.connection.close();
      return;
    }

    // Display tickets that will be updated
    console.log('\nTickets to update:');
    ticketsToUpdate.forEach((ticket, index) => {
      console.log(`  ${index + 1}. ${ticket.name} (${ticket.email}) - ID: ${ticket.id}`);
    });

    // Update all tickets
    console.log(`\nUpdating ${ticketsToUpdate.length} ticket(s)...`);
    const result = await Participant.updateMany(
      { date: oldDate },
      { $set: { date: newDate } }
    );

    console.log(`\n✅ Successfully updated ${result.modifiedCount} ticket(s)!`);
    console.log(`   Old date: "${oldDate}"`);
    console.log(`   New date: "${newDate}"`);

    // Verify the update
    const remainingOldTickets = await Participant.countDocuments({ date: oldDate });
    if (remainingOldTickets === 0) {
      console.log('\n✅ Verification passed: No tickets with old date remaining.');
    } else {
      console.log(`\n⚠️  Warning: ${remainingOldTickets} ticket(s) still have the old date.`);
    }

    await mongoose.connection.close();
    console.log('\nDatabase connection closed.');
    
  } catch (error) {
    console.error('❌ Error updating tickets:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the update
updateTicketDates();
