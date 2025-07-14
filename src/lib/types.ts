export interface BookingRequest {
  id: string;
  customerName: string;
  pickupLocation: { name: string; lat: number; lng: number };
  destination: { name: string; lat: number; lng: number };
  fareEstimate: number;
}
