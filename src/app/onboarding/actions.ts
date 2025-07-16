"use server";

import mysql from 'mysql2/promise';

// This is a Server Action. It runs only on the server.
// It's safe to use database credentials here because this code
// will never be sent to the user's browser.

// Function to convert file to base64, as we can't send File objects to server actions
async function fileToBase64(file: File | null) {
    if (!file) return null;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    return buffer.toString('base64');
}

export async function submitOnboarding(formData: any) {
  try {
    console.log("Submitting onboarding data to server...");
    
    // In a real application, you would connect to your database here.
    // The credentials should be stored in environment variables, not hardcoded.
    // Example using mysql2/promise:
    /*
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    console.log("Database connected successfully.");

    const [rows] = await connection.execute(
        'INSERT INTO DRIVER_DETAILS (DD_FULL_NAME, DD_EMAIL_ID, DD_MOBILE_NO, DD_GENDER, DD_ADDRESS, DD_VEHICLE_TYPE, DD_VEHICLE_MODEL, DD_VEHICLE_COLOUR, DD_VEHICLE_NUMBER, DD_STATUS, DD_CREATEBY) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            formData.name,
            formData.email,
            formData.phone,
            formData.gender ? formData.gender.charAt(0).toUpperCase() : null,
            formData.address,
            formData.vehicleType,
            formData.vehicleModel,
            formData.vehicleColor,
            formData.vehicleNumber,
            'A', // Default status
            1 // Default creator ID, you might want to change this
        ]
    );

    await connection.end();
    console.log("Data inserted successfully, connection closed.");
    */

    // Simulating a successful database operation for now.
    console.log("Simulating successful database insertion for:", formData.name);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network latency

    return { success: true };

  } catch (error) {
    console.error("Error in server action:", error);
    // In a real app, you would log this error to a monitoring service.
    return { success: false, error: "A server error occurred." };
  }
}
