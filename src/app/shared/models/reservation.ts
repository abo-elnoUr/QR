export interface Reservation {
  id: number;
  visitorName: string;
  sSN: string;
  visitorPhone: string;
  unitName: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  approve: boolean;
  startDate: string;
  endDate: string;
  visitorIdentifer: string;
}
