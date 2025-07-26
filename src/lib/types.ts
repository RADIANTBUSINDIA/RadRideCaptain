
export interface BookingRequest {
  id: string;
  customerName: string;
  pickupLocation: string;
  destination: string;
  fareEstimate: number;
  estimatedTime: number; // in minutes
  distance: number; // in km
  riderPin: string;
}

export interface Trip extends BookingRequest {
  status: 'completed' | 'rejected' | 'in-progress';
  finalFare: number;
  tip: number;
  timestamp: string;
}
