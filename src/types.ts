export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialty: string;
  experience: string;
  status: 'On Duty' | 'Away';
  avatar: string;
  rating?: number;
  reviewsCount?: number;
  yearsExp?: number;
}

export interface PriceBreakdown {
  standardCleaning: number;
  xRay?: number;
  serviceFee: number;
  total: number;
}

export interface Appointment {
  id: string;
  title: string;
  date: string; // e.g. "Tuesday, Oct 24, 2023"
  dateRaw: string; // "2026-10-24"
  time: string; // "10:00 AM — 11:00 AM"
  duration: string; // "60 min"
  location: string;
  suite: string;
  doctorId: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  patientName: string;
  patientPhone: string;
  room: string;
  paymentStatus: 'Paid' | 'Unpaid';
  priceBreakdown: PriceBreakdown;
  preVisitInstructions?: string[];
  timeline: {
    created: string;
    confirmed?: string;
    remindersSent?: string;
    sessionStart?: string;
  };
}

export interface WorkingDayHours {
  day: string;
  active: boolean;
  start: string;
  end: string;
  note?: string; // e.g. "13:00 - 14:00"
  isLateHours?: boolean;
}

export interface BookingLogic {
  defaultSlotDuration: '30 min' | '45 min' | '60 min';
  maxConcurrentBookings: number;
  instantBooking: boolean;
  patientPortalAccess: boolean;
}

export interface ActivityLog {
  id: string;
  type: 'appointment_confirmed' | 'payment_received' | 'system_update' | 'custom';
  title: string;
  description: string;
  time: string; // "2m ago", "45m ago", etc.
}

export type ActiveTab = 'Dashboard' | 'Calendar' | 'Bookings' | 'Notifications' | 'Clinic Settings';

export interface UserState {
  role: 'patient' | 'staff' | null;
  phone: string;
  name: string;
}
