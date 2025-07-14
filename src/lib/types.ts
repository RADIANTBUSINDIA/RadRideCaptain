export interface Location {
  name: string;
  lat: number;
  lng: number;
}

export interface BookingRequest {
  id: string;
  customerName: string;
  pickupLocation: Location;
  destination: Location;
  fareEstimate: number;
}

export interface Trip extends BookingRequest {
  status: 'completed' | 'rejected' | 'in-progress';
  finalFare: number;
  tip: number;
  timestamp: string;
}
