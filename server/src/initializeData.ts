import { initalizeDataFromJsons } from "./databases/initData";
import { AppDataSource } from "./databases/dataSource";

async function initializeData() {
  try {
    // Step 1: Initialize Database
    await AppDataSource.initialize();
    console.log('Database connected.');

    // Step 2: Delete All Tables
    console.log('Dropping all tables...');
    await AppDataSource.dropDatabase();
    console.log('All tables dropped successfully.');

    // Step 3: Synchronize Schema
    console.log('Synchronizing schema...');
    await AppDataSource.synchronize();
    console.log('Schema synchronized.');

    // Step 4: Read JSON Files and Insert Data
    console.log('Initializing data from JSON files...');
    await initalizeDataFromJsons()
    console.log('Data initialization complete.');
  } catch (error) {
    console.error('Error initializing tables:', error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
  }
}

initializeData();
