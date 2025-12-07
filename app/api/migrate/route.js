import { promises as fs } from 'fs';
import path from 'path';
import dbConnect from '../../../lib/mongodb';
import Participant from '../../../models/Participant';

export async function GET() {
  
  const dataFilePath = path.join(process.cwd(), 'data.json');
  let migratedCount = 0;
  let errors = [];

  try {
    await dbConnect();

    const fileData = await fs.readFile(dataFilePath, 'utf8');
    const localParticipants = JSON.parse(fileData);

    for (const p of localParticipants) {
      try {
        // Check if exists
        const exists = await Participant.findOne({ id: p.id });
        if (!exists) {
          await Participant.create({
            ...p,
             // Ensure date format is correct if needed, but Mongoose is flexible
          });
          migratedCount++;
        }
      } catch (e) {
        errors.push(`Failed to migrate ${p.id}: ${e.message}`);
      }
    }

    return Response.json({ 
      success: true, 
      message: `Migration complete. Added ${migratedCount} new participants.`,
      totalLocal: localParticipants.length,
      errors 
    });

  } catch (error) {
    if (error.code === 'ENOENT') {
      return Response.json({ 
        success: true, 
        message: "No 'data.json' file found. Skipping migration.", 
        migratedCount: 0 
      });
    }
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
