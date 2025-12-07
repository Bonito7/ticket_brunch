import dbConnect from '../../../lib/mongodb';
import Participant from '../../../models/Participant';

export async function DELETE(request) {
  try {
    await dbConnect();
    const { id } = await request.json();
    await Participant.deleteOne({ id });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to delete participant' }, { status: 500 });
  }
}
