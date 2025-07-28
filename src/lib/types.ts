
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

export interface Trip extends Omit<BookingRequest, 'countdown'> {
  status: 'completed' | 'rejected' | 'in-progress';
  finalFare: number;
  tip: number;
  timestamp: string;
}
