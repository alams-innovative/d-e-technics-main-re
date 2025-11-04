import { Pool } from 'pg';

// Database connection configuration using Neon PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  min: 2,
  max: 10,
  idleTimeoutMillis: 30000,
});

// Get database connection
export async function getConnection() {
  try {
    return await pool.connect();
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Failed to connect to database');
  }
}

// Execute query with connection handling
export async function executeQuery(query, params = []) {
  let client;
  try {
    client = await getConnection();
    const result = await client.query(query, params);
    return result.rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    if (client) {
      client.release();
    }
  }
}

// Insert quote into database
export async function insertQuote(quoteData) {
  const { name, email, phone, country_code, product, message } = quoteData;
  
  const query = `
    INSERT INTO quotes (name, email, phone, country_code, product, message, created_at) 
    VALUES ($1, $2, $3, $4, $5, $6, NOW())
    RETURNING id
  `;
  
  const params = [name, email, phone, country_code, product, message];
  
  try {
    const result = await executeQuery(query, params);
    return result[0].id;
  } catch (error) {
    console.error('Error inserting quote:', error);
    throw error;
  }
}

// Get country information
export async function getCountryInfo(countryCode) {
  const query = 'SELECT country_name, flag_emoji FROM countries WHERE country_code = $1';
  
  try {
    const results = await executeQuery(query, [countryCode]);
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error('Error getting country info:', error);
    return null;
  }
}

// Get all countries for phone input dropdown
export async function getAllCountries() {
  const query = 'SELECT country_code, country_name, flag_emoji FROM countries ORDER BY country_name ASC';
  
  try {
    const results = await executeQuery(query);
    return results;
  } catch (error) {
    console.error('Error getting all countries:', error);
    throw error;
  }
}

// Get all quotes (for dashboard)
export async function getAllQuotes() {
  const query = 'SELECT * FROM quotes ORDER BY id DESC';
  
  try {
    return await executeQuery(query);
  } catch (error) {
    console.error('Error getting quotes:', error);
    throw error;
  }
}

// Get quote by ID
export async function getQuoteById(id) {
  const query = 'SELECT * FROM quotes WHERE id = $1';
  
  try {
    const results = await executeQuery(query, [id]);
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error('Error getting quote by ID:', error);
    throw error;
  }
}

// Update quote status
export async function updateQuoteStatus(id, status) {
  const query = 'UPDATE quotes SET status = $1 WHERE id = $2';
  
  try {
    const result = await executeQuery(query, [status, id]);
    return result.length > 0;
  } catch (error) {
    console.error('Error updating quote status:', error);
    throw error;
  }
}

// User authentication queries
export async function getUserByUsername(username) {
  const query = 'SELECT * FROM users WHERE username = $1';
  
  try {
    const results = await executeQuery(query, [username]);
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
}

export async function getUserById(id) {
  const query = 'SELECT * FROM users WHERE id = $1';
  
  try {
    const results = await executeQuery(query, [id]);
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error('Error getting user by ID:', error);
    throw error;
  }
}
