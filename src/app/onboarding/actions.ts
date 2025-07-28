
"use server";

import { database } from '@/lib/firebase';
import { ref, set } from 'firebase/database';
import type { Driver } from '@/lib/types';

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

    // Constructing the driver data according to the new schema
    const driverData: Partial<Driver> = {
      profile: {
        driverId: driverId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: {
            street: formData.address,
            city: "Bengaluru", // Assuming a default city for now
            country: "India"
        }
      },
      licensing: { // Placeholder data
        licenseNumber: `DL-${Math.random().toString().slice(2, 10)}`,
        licenseExpiry: "2028-12-31",
        vehicle: {
            vehicleId: `veh-${driverId}`,
            make: formData.vehicleModel.split(' ')[0] || "Unknown",
            model: formData.vehicleModel,
            plateNumber: formData.vehicleNumber,
            type: formData.vehicleType,
            capacity: 4,
            insurance: { provider: "Acko", policyNumber: "POL-123", expiry: "2026-12-31"}
        },
        backgroundCheck: { status: "pending", date: new Date().toISOString() }
      },
      status: {
        currentStatus: "offline",
        location: { lat: 12.9716, lng: 77.5946, timestamp: new Date().toISOString() }, // Default to Bangalore
        activeRideId: null
      },
      financials: {
        totalEarnings: 0,
        paymentInfo: { bank: "", accountNumber: "" },
        payouts: []
      },
      auth: {
        uid: driverId, // Using phone number as UID for simplicity
        accountStatus: 'pending',
        lastLogin: new Date().toISOString(),
      },
      preferences: {
        language: "en"
      },
      metrics: {
          rating: 0,
          totalRides: 0,
          avgResponseTime: 0,
          cancellationRate: 0,
          totalDistance: 0
      }
    };

    await set(driverRef, driverData);

    console.log("Data for driver", driverId, "saved successfully to Firebase.");

    return { success: true, driverId: driverId };

  } catch (error) {
    console.error("Error in server action:", error);
    if (error instanceof Error) {
       return { success: false, error: error.message };
    }
    return { success: false, error: "A server error occurred while saving to Firebase." };
  }
}
