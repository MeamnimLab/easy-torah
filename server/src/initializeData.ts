import { Database } from './databases/database';

async function initializeData() {
  try {
    const db: Database = await Database.getInstance();
    await db.initializeData();
    process.exit(0);
  } catch (error) {
    console.error('Error initializing tables:', error);
    process.exit(1);
  }
}

initializeData();
