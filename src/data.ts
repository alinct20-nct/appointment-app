import { Doctor, Appointment, WorkingDayHours, BookingLogic, ActivityLog } from './types';

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'dr-wilson',
    name: 'Dr. James Wilson',
    email: 'james.w@smilebook.com',
    specialty: 'Orthodontics',
    experience: '12 Years',
    status: 'On Duty',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEeReKzjLFNZcVu8JppKAR1Zk6OJ4ZYz-a27kZ1eTJls6QDPgrRDpXBIGOm5orkNJJ_VJX_QUsp26txRDMkkJEHOao7Csa1Rp8EkKJyc-2AcRafLIZVG6UkDJW15SZ7MwFahjkz_Ztx4YNn398kCu1KqAV2ja4RWunsmv6pKHU9x2czzdq-rkc2_IQVKIyAUBH8YHy9K_bYLZ_m4WDiyE8XhfuNJXF6lN28sfAVa9qEc-aph177RlvEQ',
    rating: 4.8,
    reviewsCount: 950,
    yearsExp: 12
  },
  {
    id: 'dr-rodriguez',
    name: 'Dr. Elena Rodriguez',
    email: 'e.rodriguez@smilebook.com',
    specialty: 'Pedodontics',
    experience: '8 Years',
    status: 'On Duty',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxWgD5cQBUY4hh619IYSWOAhhRy4WKPVJdNuMXKSEgNbiRVHW6TcjKft9RCNIJbVJredmZ_c3scwuvGwljJj_z-B02Eq2rDLXdjYmdYXHbcmH60SHc9BjZd6UGlogpozTJqy-M2upLRfE666HWVFv2evkGeTApKm0eOdZwff5eMfuJ4VEBLCCInEnWd_Q_GSfWe0E7nCuruVglNmr2naF8S1FBva1tAReY_GqGTc10vcLhUv0VamO7CA',
    rating: 4.9,
    reviewsCount: 840,
    yearsExp: 8
  },
  {
    id: 'dr-chen',
    name: 'Dr. Marcus Chen',
    email: 'm.chen@smilebook.com',
    specialty: 'Oral Surgery',
    experience: '15 Years',
    status: 'Away',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwPduslch5_sJHyeUtl0VTvmR4yKgrUIo05b14lRURDaru-sMm1E6iXEde6PDrKlx4nXrkMhMHlGPwF76A08pKrg6umOI10JWrxddIoJQkjAeYtA9fkSkFGz4omfhdvq7GcTRCl-prMPZXMC60i_iaN_1IqPn6mm8p-6CqAPbYRNmn7pLoc22mCAb-aXbcpyfCBGHJ9tM3kKIwY6D8ZMdy6Kkp-AjULeD31_sUlus5ybD49HezwU9LIQ',
    rating: 4.7,
    reviewsCount: 1100,
    yearsExp: 15
  },
  {
    id: 'dr-aris',
    name: 'Dr. Jonathan Aris',
    email: 'j.aris@smilebook.com',
    specialty: 'Senior Dental Surgeon',
    experience: '15+ Years',
    status: 'On Duty',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfRbot8lNNTfmUy2CZ8v4RcedcF_poyFJNnsXwBfmjwaawE0stAgYud_8cnSX2PCRM6EeSjSgl1thgIfec_CyqjzlqAVWV9uxFxU3P0mtP2Ak48rMoKEr3NVy7eH8EpGaWzhIcZ8Ajh57ZBVS8z5JOG6e5qRzOCqxihmq63ZmV2KAoplgb77t47W3pcc7yWXxojpjtyUPq0tcOHqg-nxIwScSWPgRcGcW9UowGupzCghtL4K8VGNyMPw',
    rating: 4.9,
    reviewsCount: 1200,
    yearsExp: 15
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'SB-99201-C',
    title: 'Teeth Cleaning & Oral Wellness',
    date: 'Tuesday, Oct 24, 2023',
    dateRaw: '2023-10-24',
    time: '10:00 AM — 11:00 AM',
    duration: '60 min',
    location: 'SmileBook Downtown Clinic',
    suite: 'Suite 405, Medical Center Plaza',
    doctorId: 'dr-aris',
    status: 'Confirmed',
    patientName: 'Sarah Jenkins',
    patientPhone: '+1 (555) 000-0000',
    room: 'Room 04',
    paymentStatus: 'Unpaid',
    priceBreakdown: {
      standardCleaning: 120,
      xRay: 45,
      serviceFee: 10,
      total: 175
    },
    preVisitInstructions: [
      'Please arrive 15 minutes early for paperwork.',
      'Bring your valid insurance card.',
      'Avoid eating heavy meals 2 hours prior.'
    ],
    timeline: {
      created: 'Oct 12, 2023 · 02:30 PM',
      confirmed: 'Oct 12, 2023 · 04:15 PM',
      remindersSent: 'Oct 23, 2023 · 09:00 AM',
      sessionStart: 'Scheduled for Oct 24, 2023'
    }
  },
  {
    id: 'SB-99202-P',
    title: 'Root Canal Surgery',
    date: 'Tuesday, Oct 24, 2023',
    dateRaw: '2023-10-24',
    time: '09:30 AM — 10:30 AM',
    duration: '60 min',
    location: 'SmileBook Downtown Clinic',
    suite: 'Suite 405, Medical Center Plaza',
    doctorId: 'dr-wilson',
    status: 'Confirmed',
    patientName: 'James Wilson',
    patientPhone: '+1 (555) 111-2222',
    room: 'Room 04',
    paymentStatus: 'Paid',
    priceBreakdown: {
      standardCleaning: 350,
      serviceFee: 15,
      total: 365
    },
    preVisitInstructions: [
      'Avoid any caffeine or stimulants 4 hours prior.',
      'Take prescribed premedication if instructed.'
    ],
    timeline: {
      created: 'Oct 15, 2023 · 10:00 AM',
      confirmed: 'Oct 15, 2023 · 11:30 AM'
    }
  },
  {
    id: 'SB-99203-P',
    title: 'Consultation',
    date: 'Tuesday, Oct 24, 2023',
    dateRaw: '2023-10-24',
    time: '11:15 AM — 11:45 AM',
    duration: '30 min',
    location: 'SmileBook Downtown Clinic',
    suite: 'Suite 405, Medical Center Plaza',
    doctorId: 'dr-rodriguez',
    status: 'Confirmed',
    patientName: 'Elena Rodriguez',
    patientPhone: '+1 (555) 333-4444',
    room: 'Room 02',
    paymentStatus: 'Paid',
    priceBreakdown: {
      standardCleaning: 80,
      serviceFee: 5,
      total: 85
    },
    preVisitInstructions: [
      'Bring list of current medications and history.'
    ],
    timeline: {
      created: 'Oct 16, 2023 · 09:15 AM',
      confirmed: 'Oct 16, 2023 · 09:30 AM'
    }
  },
  {
    id: 'SB-99204-P',
    title: 'Crown Fitting & Polish',
    date: 'Wednesday, Oct 25, 2023',
    dateRaw: '2023-10-25',
    time: '02:00 PM — 03:00 PM',
    duration: '60 min',
    location: 'SmileBook Downtown Clinic',
    suite: 'Suite 405, Medical Center Plaza',
    doctorId: 'dr-chen',
    status: 'Confirmed',
    patientName: 'David Miller',
    patientPhone: '+1 (555) 777-8888',
    room: 'Room 01',
    paymentStatus: 'Unpaid',
    priceBreakdown: {
      standardCleaning: 200,
      xRay: 40,
      serviceFee: 10,
      total: 250
    },
    timeline: {
      created: 'Oct 18, 2023 · 01:10 PM',
      confirmed: 'Oct 18, 2023 · 02:00 PM'
    }
  }
];

export const INITIAL_WORKING_HOURS: WorkingDayHours[] = [
  {
    day: 'Monday',
    active: true,
    start: '09:00 AM',
    end: '05:00 PM',
    note: '13:00 - 14:00'
  },
  {
    day: 'Tuesday',
    active: true,
    start: '09:00 AM',
    end: '05:00 PM',
    note: '13:00 - 14:00'
  },
  {
    day: 'Wednesday',
    active: true,
    start: '09:00 AM',
    end: '07:00 PM',
    note: 'Late Hours',
    isLateHours: true
  },
  {
    day: 'Thursday',
    active: true,
    start: '09:00 AM',
    end: '05:00 PM',
    note: '13:00 - 14:00'
  },
  {
    day: 'Friday',
    active: true,
    start: '09:00 AM',
    end: '05:00 PM',
    note: '13:00 - 14:00'
  },
  {
    day: 'Saturday',
    active: false,
    start: '10:00 AM',
    end: '02:00 PM'
  },
  {
    day: 'Sunday',
    active: false,
    start: '09:00 AM',
    end: '05:00 PM'
  }
];

export const INITIAL_BOOKING_LOGIC: BookingLogic = {
  defaultSlotDuration: '30 min',
  maxConcurrentBookings: 4,
  instantBooking: true,
  patientPortalAccess: true
};

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'log-1',
    type: 'appointment_confirmed',
    title: 'Appointment Confirmed',
    description: 'Michael Chen confirmed his surgery for tomorrow at 10 AM.',
    time: '2m ago'
  },
  {
    id: 'log-2',
    type: 'payment_received',
    title: 'Payment Received',
    description: 'Invoice #SB-99201 for $1,175.00 has been paid via Stripe.',
    time: '45m ago'
  },
  {
    id: 'log-3',
    type: 'system_update',
    title: 'System Update',
    description: 'Backup complete. Database performance optimized by 14%.',
    time: '2h ago'
  }
];
