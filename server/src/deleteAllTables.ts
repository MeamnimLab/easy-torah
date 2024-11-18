import { Database } from './databases/database';

async function deleteAllTables() {
  try {
    const db: Database = await Database.getInstance();
    await db.deleteAllTables();
    process.exit(0);
  } catch (error) {
    console.error('Error deleting tables:', error);
    process.exit(1);
  }
}

deleteAllTables();
