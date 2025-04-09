import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';  

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  let numericId = parseInt(id, 10);

  if (numericId <= 0 || numericId > 10) {
    numericId = Math.floor(Math.random() * 10) + 1;
    console.log(`ID out of range, generated random ID: ${numericId}`);
  }

  const imagePath = path.resolve(process.cwd(), 'public', 'users', `${numericId}.jpg`);
  
  try {
    if (fs.existsSync(imagePath)) {
      const imageBuffer = fs.readFileSync(imagePath);
    
      const optimizedImage = await sharp(imageBuffer)
        .resize(600)  
        .jpeg({ quality: 100 })  
        .toBuffer();  

      return new NextResponse(optimizedImage, {
        status: 200,
        headers: {
          'Content-Type': 'image/jpeg', // Image content type
          'Cache-Control': 'public, max-age=86400, s-maxage=86400', // Cache for 1 day
          'Content-Disposition': 'inline', // Inline image (can be 'attachment' for download)
          'Vary': 'Accept-Encoding', // Handle different encodings
          'X-Title': 'User Image', // Custom title header
        },
      });
    }

    return new NextResponse('Image not found', { status: 404 });
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
