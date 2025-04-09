import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET( ) {
    const filePath = path.resolve(process.cwd(), 'utils', 'data.json');
    try {
        const fileData = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(fileData);
        return NextResponse.json(jsonData);
    } catch (error) {
        console.error("Error reading JSON file:", error);
        return NextResponse.json({ error: "Error reading data" }, { status: 500 });
    }
}
