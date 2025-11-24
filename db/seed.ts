import { usersTable } from './data/schema';
import db from './connection';

export async function seed() {
    const user: typeof usersTable.$inferInsert = {
        username: 'Gilson'
    }

    await db.insert(usersTable).values(user);
    console.log('New user created!')

}

