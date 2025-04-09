import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
 
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;  
    const userIndex = parseInt(id);  
    if (isNaN(userIndex) || userIndex < 0 || userIndex > 20) {
        return new NextResponse('User not Found', { status: 400 });
      }
    const filePath = path.resolve(process.cwd(), 'utils', 'data.json');
    try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);
        const user = jsonData[userIndex-1];
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        console.error("Error reading JSON file:", error);
        return NextResponse.json({ error: "Error reading data" }, { status: 500 });
    }
}
