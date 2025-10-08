import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/db';
import { usersTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function syncUser() {
  const user = await currentUser();

  if (!user) return null;

  // Check if user already exists in database
  const existingUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.clerkId, user.id),
  });

  if (existingUser) {
    return existingUser;
  }

  // Create new user in database
  const [newUser] = await db.insert(usersTable).values({
    clerkId: user.id,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    username: user.username || user.emailAddresses[0]?.emailAddress.split('@')[0] || '',
    email: user.emailAddresses[0]?.emailAddress || '',
    profileImage: user.imageUrl,
  }).returning();

  return newUser;
}
