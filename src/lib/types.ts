
export interface Location {
  address: string;
  lat: number;
  lng: number;
}

export interface BookingRequest {
  id: string;
  customerName: string;
  pickupLocation: Location;
  destination: Location;
  fareEstimate: number;
  estimatedTime: number; // in minutes
  distance: number; // in km
  riderPin: string;
  riderRating: number;
  paymentMode: 'Cash' | 'Card' | 'UPI';
  rideType: 'Standard' | 'Pool' | 'Rental';
  countdown: number;
}

export interface Ride {
  id: string;
  passengerId: string;
  driverId: string;
  pickupLocation: Location;
  dropoffLocation: Location;
  status: 'requested' | 'accepted' | 'ongoing' | 'completed' | 'cancelled';
  statusHistory: { status: string; timestamp: string }[];
  fare: number;
  distance: number;
  acceptedAt?: string;
  startedAt?: string;
  completedAt?: string;
  driverLocationAtAccept?: { lat: number; lng: number };
}

export interface DriverProfile {
  driverId: string;
  name: string;
  email: string;
  phone: string;
  profilePic?: string;
  dob?: string;
  address?: { street: string; city: string; country: string };
  emergencyContact?: { name: string; phone: string };
}

export interface Vehicle {
  vehicleId: string;
  make: string;
  model: string;
  plateNumber: string;
  type: string;
  capacity: number;
  insurance: { provider: string; policyNumber: string; expiry: string };
}

export interface Licensing {
  licenseNumber: string;
  licenseExpiry: string;
  vehicle: Vehicle;
  backgroundCheck: { status: string; date: string };
}

export interface DriverStatus {
  currentStatus: 'available' | 'on_ride' | 'offline';
  location: { lat: number; lng: number; timestamp: string };
  activeRideId: string | null;
  availabilityZone?: string;
}

export interface RideHistoryEntry {
  pickup: { lat: number; lng: number };
  dropoff: { lat: number; lng: number };
  pickupTime: string;
  dropoffTime: string;
  fare: number;
  passengerId: string;
  rating: number;
  distance: number;
}

export interface Financials {
  totalEarnings: number;
  paymentInfo: { bank: string; accountNumber: string };
  payouts: { transactionId: string; amount: number; date: string }[];
}

export interface Driver {
  profile: DriverProfile;
  licensing: Licensing;
  status: DriverStatus;
  rideHistory: Record<string, RideHistoryEntry>;
  financials: Financials;
  auth: {
    uid: string;
    accountStatus: 'active' | 'pending' | 'suspended';
    lastLogin: string;
    deviceToken?: string;
  };
  preferences: {
    preferredHours?: { start: string; end: string };
    notifications?: { email: boolean; sms: boolean };
    language?: string;
  };
  metrics: {
    rating: number;
    totalRides: number;
    avgResponseTime: number; // in seconds
    cancellationRate: number; // as percentage
    totalDistance: number; // in km
  };
}

// This is a simplified version for the current app state
export interface Trip extends Omit<BookingRequest, 'countdown'> {
  status: 'completed' | 'rejected' | 'in-progress';
  finalFare: number;
  tip: number;
  timestamp: string;
}
