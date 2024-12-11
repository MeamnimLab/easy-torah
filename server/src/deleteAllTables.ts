import { AppDataSource } from './databases/dataSource';

async function deleteAllTables() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected.');
    console.log('Dropping all tables...');
    await AppDataSource.dropDatabase();
    console.log('All tables dropped successfully.');
    await AppDataSource.destroy();
  } catch (error) {
    console.error('Error deleting tables:', error);
    process.exit(1);
  }
}

deleteAllTables();
