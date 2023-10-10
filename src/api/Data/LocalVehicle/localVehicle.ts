export interface DataItem {
  id: number;
  name: string;
  vehicleRegistration: string;
  startDate: string;
  endDate: string;
  address: string;
  vehicleType: string;
  vehicleClass: string;
  createdAt: string;
  updatedAt: string;
  parkingSpotId: number | null;
}
