import { NextResponse } from 'next/server';

const firstNames = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'Grace', 'Hannah', 'Ivy', 'Jack'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Garcia', 'Martinez', 'Hernandez'];
 
function generateRandomUsername(): string {
  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${randomFirstName}${randomLastName}`;
}

function generateUsers(): { user_id: number; username: string; image_url: string }[] {
  const users = [];
  const usernames = new Set();

  for (let i = 0; i < 10; i++) {
    let username;

    do {
      username = generateRandomUsername();
    } while (usernames.has(username)); 

    usernames.add(username);  

    
    users.push({
      user_id: i + 1,
      username,  
      image_url: `https://api.akashhkrishh.in/api/images/users/${i + 1}`,
    });
  }

  return users;
}

export async function GET() {
  try {
    
    const users = generateUsers();
    return NextResponse.json({ users, status: 'success' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
  }
}
