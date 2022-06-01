/* eslint-disable no-unused-vars */

interface GrowthGroup {
  id: string;
  createdAt: string;
  lat: number;
  lng: number;
  name: string;
  whatsappLink: string;
  addressInfo: string;
  weekDay: string;
  scheduledTime: string;
  leadership: string[];
}

interface User {
  email: string;
  id: string;
  name: string;
  role: 'ADMIN' | 'USER';
  birthdate: Date;
  createdAt: Date;
}

interface Devotional {
  id: string;
  createdAt: string;
  scheduledTo: string;
  title: string;
  body: string;
  slug: string;
  author: string;
}

interface Stats {
  activeUsers: number;
  devotionals: number;
  groups: number;
}
