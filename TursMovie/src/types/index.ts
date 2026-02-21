export interface Film {
  id: string;
  title: string;
  genre: string[];
  duration: number; // in minutes
  rating: number; // 0-10
  ageRating: string; // SU, 13+, 17+, 21+
  synopsis: string;
  posterUrl: string;
  price: number;
  showtimes: Showtime[];
}

export interface Showtime {
  id: string;
  filmId: string;
  roomId: string;
  roomName: string;
  time: string;
  date: string;
  availableSeats: number;
  totalSeats: number;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'booked' | 'selected';
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'popcorn' | 'drinks' | 'snacks';
  price: number;
  imageUrl: string;
  available: boolean;
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  film: Film;
  showtime: Showtime;
  seats: Seat[];
  foodItems: CartItem[];
  totalPrice: number;
  paymentMethod: 'ewallet' | 'card' | 'cash';
  paymentStatus: 'pending' | 'paid' | 'cancelled';
  orderStatus: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
  qrCode?: string;
}

export interface FoodOrder {
  id: string;
  orderId: string;
  items: CartItem[];
  status: 'pending' | 'cooking' | 'ready' | 'completed';
  priority: number;
  createdAt: string;
  customerName: string;
}

export interface SalesReport {
  date: string;
  totalSales: number;
  totalTransactions: number;
  filmSales: number;
  foodSales: number;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  filmId: string;
  film?: Film;
  showtime: Showtime;
  seats: string[];
  totalPrice: number;
  paymentMethod: 'ewallet' | 'card' | 'cash';
  paymentStatus: 'pending' | 'paid' | 'cancelled';
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
  qrCode?: string;
}

export type UserRole = 'customer' | 'kasir' | 'chef' | 'operator' | null;

export interface User {
  id: string;
  username: string;
  role: UserRole;
  name: string;
}