
"use server";

import { database } from '@/lib/firebase';
import { ref, get } from 'firebase/database';

/**
 * Checks if a driver exists in the Firebase Realtime Database.
 * @param phone - The phone number to check.
 * @returns A promise that resolves to true if the driver exists, false otherwise.
 */
export async function checkDriverExists(phone: string): Promise<boolean> {
  try {
    if (!phone) {
        console.log("Phone number is empty, cannot check driver.");
        return false;
    }
    const driverRef = ref(database, 'drivers/' + phone);
    const snapshot = await get(driverRef);
    console.log(`Checking for driver with phone ${phone}. Exists: ${snapshot.exists()}`);
    return snapshot.exists();
  } catch (error) {
    console.error("Error checking if driver exists in Firebase:", error);
    // In case of error, we can assume the driver doesn't exist to allow for registration attempts.
    // Or handle it more gracefully depending on desired UX.
    return false;
  }
}
