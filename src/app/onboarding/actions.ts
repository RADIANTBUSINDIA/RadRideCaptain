
"use server";

import { database } from '@/lib/firebase';
import { ref, set } from 'firebase/database';

export async function submitOnboarding(formData: any, driverId: string) {
  try {
    console.log("Submitting onboarding data to Firebase for driver:", driverId);
    
    const driverRef = ref(database, 'drivers/' + driverId);
    
    // We can't store File objects in Firebase, so we'll just store their names for now.
    // In a real app, you'd upload these to Firebase Storage and store the URL.
    const documents = {
      rcFile: formData.rcFile?.name || null,
      licenseFile: formData.licenseFile?.name || null,
      insuranceFile: formData.insuranceFile?.name || null,
      fitnessCertificateFile: formData.fitnessCertificateFile?.name || null,
      vehiclePhotoFile: formData.vehiclePhotoFile?.name || null,
      userPhotoFile: formData.userPhotoFile?.name || null,
    };

    const driverData = {
        ...formData,
        ...documents, // replace file objects with just names
    };
    
    // Remove the original file objects
    delete driverData.rcFile;
    delete driverData.licenseFile;
    delete driverData.insuranceFile;
    delete driverData.fitnessCertificateFile;
    delete driverData.vehiclePhotoFile;
    delete driverData.userPhotoFile;


    await set(driverRef, {
        ...driverData,
        id: driverId,
        createdAt: new Date().toISOString(),
        status: 'pending_verification' // Set initial status
    });

    console.log("Data for driver", driverId, "saved successfully to Firebase.");

    return { success: true, driverId: driverId };

  } catch (error) {
    console.error("Error in server action:", error);
    return { success: false, error: "A server error occurred while saving to Firebase." };
  }
}
