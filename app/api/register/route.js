import dbConnect from '../../../lib/mongodb';
import Participant from '../../../models/Participant';

export async function GET() {
  try {
    await dbConnect();
    const participants = await Participant.find({}).sort({ registeredAt: -1 });
    return Response.json(participants);
  } catch (error) {
    return Response.json({ error: error.message || 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Create new participant directly in DB
    const participant = await Participant.create({
      ...body,
      registeredAt: new Date() // Mongoose puts this by default but explicit is fine
    });

    return Response.json({ success: true, data: participant });
  } catch (error) {
    console.error("MongoDB Save Error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
