import type { Film, FoodItem, Order, FoodOrder, Booking } from '../types';

export const mockFilms: Film[] = [
  {
    id: '1',
    title: 'The Last Guardian',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    duration: 142,
    rating: 8.5,
    ageRating: '13+',
    synopsis: 'Dalam dunia pasca-apokaliptik, seorang penjaga terakhir harus melindungi sisa-sisa peradaban dari ancaman yang datang dari luar angkasa.',
    posterUrl: 'https://images.unsplash.com/photo-1655367574486-f63675dd69eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NjUxMjM3NjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 45000,
    showtimes: [
      { id: 'st1', filmId: '1', roomId: 'r1', roomName: 'Theater 1', time: '12:00', date: '2025-12-08', availableSeats: 28, totalSeats: 40 },
      { id: 'st2', filmId: '1', roomId: 'r1', roomName: 'Theater 1', time: '15:00', date: '2025-12-08', availableSeats: 35, totalSeats: 40 },
      { id: 'st3', filmId: '1', roomId: 'r2', roomName: 'Theater 2', time: '18:30', date: '2025-12-08', availableSeats: 12, totalSeats: 40 },
      { id: 'st4', filmId: '1', roomId: 'r1', roomName: 'Theater 1', time: '21:00', date: '2025-12-08', availableSeats: 40, totalSeats: 40 },
    ]
  },
  {
    id: '2',
    title: 'Shadow of Fear',
    genre: ['Horror', 'Thriller'],
    duration: 98,
    rating: 7.8,
    ageRating: '17+',
    synopsis: 'Sebuah keluarga pindah ke rumah tua di pinggiran kota, tidak menyadari bahwa rumah tersebut menyimpan rahasia kelam yang mengerikan.',
    posterUrl: 'https://images.unsplash.com/photo-1630338679229-99fb150fbf88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBtb3ZpZSUyMGRhcmt8ZW58MXx8fHwxNzY1MTc5MDkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 40000,
    showtimes: [
      { id: 'st5', filmId: '2', roomId: 'r3', roomName: 'Theater 3', time: '14:00', date: '2025-12-08', availableSeats: 22, totalSeats: 30 },
      { id: 'st6', filmId: '2', roomId: 'r3', roomName: 'Theater 3', time: '19:00', date: '2025-12-08', availableSeats: 8, totalSeats: 30 },
      { id: 'st7', filmId: '2', roomId: 'r3', roomName: 'Theater 3', time: '21:30', date: '2025-12-08', availableSeats: 18, totalSeats: 30 },
    ]
  },
  {
    id: '3',
    title: 'Love in Paris',
    genre: ['Romance', 'Drama'],
    duration: 112,
    rating: 8.2,
    ageRating: 'SU',
    synopsis: 'Kisah cinta dua orang dari latar belakang berbeda yang bertemu di Paris dan menemukan arti cinta sejati di kota cahaya.',
    posterUrl: 'https://images.unsplash.com/photo-1514846528774-8de9d4a07023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbmNlJTIwY291cGxlfGVufDF8fHx8MTc2NTA5ODAwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 42000,
    showtimes: [
      { id: 'st8', filmId: '3', roomId: 'r2', roomName: 'Theater 2', time: '13:00', date: '2025-12-08', availableSeats: 30, totalSeats: 40 },
      { id: 'st9', filmId: '3', roomId: 'r2', roomName: 'Theater 2', time: '16:00', date: '2025-12-08', availableSeats: 25, totalSeats: 40 },
      { id: 'st10', filmId: '3', roomId: 'r1', roomName: 'Theater 1', time: '19:30', date: '2025-12-08', availableSeats: 15, totalSeats: 40 },
    ]
  },
  {
    id: '4',
    title: 'Speed Demon',
    genre: ['Action', 'Thriller'],
    duration: 126,
    rating: 7.5,
    ageRating: '13+',
    synopsis: 'Seorang pembalap profesional terjebak dalam konspirasi berbahaya dan harus menggunakan keahliannya untuk bertahan hidup.',
    posterUrl: 'https://images.unsplash.com/photo-1645808651017-c5e3018553c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHNjZW5lfGVufDF8fHx8MTc2NTE2NDY2MXww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 43000,
    showtimes: [
      { id: 'st11', filmId: '4', roomId: 'r1', roomName: 'Theater 1', time: '11:00', date: '2025-12-08', availableSeats: 32, totalSeats: 40 },
      { id: 'st12', filmId: '4', roomId: 'r2', roomName: 'Theater 2', time: '14:30', date: '2025-12-08', availableSeats: 20, totalSeats: 40 },
      { id: 'st13', filmId: '4', roomId: 'r3', roomName: 'Theater 3', time: '17:00', date: '2025-12-08', availableSeats: 28, totalSeats: 30 },
    ]
  },
];

export const mockFoodItems: FoodItem[] = [
  {
    id: 'f1',
    name: 'Popcorn Regular',
    category: 'popcorn',
    price: 25000,
    imageUrl: 'https://images.unsplash.com/photo-1584474345633-cfd33a207dc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hfGVufDF8fHx8MTc2NTA4MzQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
  {
    id: 'f2',
    name: 'Popcorn Large',
    category: 'popcorn',
    price: 35000,
    imageUrl: 'https://images.unsplash.com/photo-1584474345633-cfd33a207dc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Bjb3JuJTIwY2luZW1hfGVufDF8fHx8MTc2NTA4MzQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
  {
    id: 'f3',
    name: 'Coca Cola Regular',
    category: 'drinks',
    price: 15000,
    imageUrl: 'https://images.unsplash.com/photo-1735643434124-f51889fa1f8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2RhJTIwZHJpbmt8ZW58MXx8fHwxNzY1MTc2MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
  {
    id: 'f4',
    name: 'Coca Cola Large',
    category: 'drinks',
    price: 20000,
    imageUrl: 'https://images.unsplash.com/photo-1735643434124-f51889fa1f8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2RhJTIwZHJpbmt8ZW58MXx8fHwxNzY1MTc2MzM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
  {
    id: 'f5',
    name: 'Nachos Cheese',
    category: 'snacks',
    price: 30000,
    imageUrl: 'https://images.unsplash.com/photo-1612773843298-44dcdd45d865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWNob3MlMjBzbmFja3N8ZW58MXx8fHwxNzY1MTg4MTQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
  {
    id: 'f6',
    name: 'Hot Dog',
    category: 'snacks',
    price: 28000,
    imageUrl: 'https://images.unsplash.com/photo-1612773843298-44dcdd45d865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWNob3MlMjBzbmFja3N8ZW58MXx8fHwxNzY1MTg4MTQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
];

// Generate mock seats for a theater
export const generateSeats = (totalSeats: number, bookedSeats: string[] = []) => {
  const seats = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = Math.ceil(totalSeats / rows.length);
  
  for (let i = 0; i < rows.length; i++) {
    for (let j = 1; j <= seatsPerRow; j++) {
      const seatId = `${rows[i]}${j}`;
      seats.push({
        id: seatId,
        row: rows[i],
        number: j,
        status: bookedSeats.includes(seatId) ? 'booked' : 'available'
      });
    }
  }
  
  return seats.slice(0, totalSeats);
};

// Mock orders for kasir
export const mockOrders: Order[] = [
  {
    id: 'ord1',
    customerId: '1',
    customerName: 'Budi Santoso',
    film: mockFilms[0],
    showtime: mockFilms[0].showtimes[2],
    seats: [
      { id: 'A5', row: 'A', number: 5, status: 'selected' },
      { id: 'A6', row: 'A', number: 6, status: 'selected' }
    ],
    foodItems: [
      { foodItem: mockFoodItems[1], quantity: 1 },
      { foodItem: mockFoodItems[3], quantity: 2 }
    ],
    totalPrice: 165000,
    paymentMethod: 'ewallet',
    paymentStatus: 'paid',
    orderStatus: 'confirmed',
    createdAt: '2025-12-08T10:30:00',
    qrCode: 'QR-ORD1-12345'
  }
];

// Mock food orders for chef
export const mockFoodOrders: FoodOrder[] = [
  {
    id: 'fo1',
    orderId: 'ord1',
    items: [
      { foodItem: mockFoodItems[1], quantity: 1 },
      { foodItem: mockFoodItems[3], quantity: 2 }
    ],
    status: 'pending',
    priority: 1,
    createdAt: '2025-12-08T10:35:00',
    customerName: 'Budi Santoso'
  },
  {
    id: 'fo2',
    orderId: 'ord2',
    items: [
      { foodItem: mockFoodItems[0], quantity: 2 },
      { foodItem: mockFoodItems[4], quantity: 1 }
    ],
    status: 'cooking',
    priority: 2,
    createdAt: '2025-12-08T10:20:00',
    customerName: 'Ani Wijaya'
  }
];

// Mock bookings for kasir
export const mockBookings: Booking[] = [
  {
    id: 'bk1',
    customerId: '1',
    customerName: 'Budi Santoso',
    filmId: '1',
    showtime: mockFilms[0].showtimes[2],
    seats: ['A5', 'A6'],
    totalPrice: 90000,
    paymentMethod: 'ewallet',
    paymentStatus: 'paid',
    status: 'confirmed',
    createdAt: '2025-12-08T10:30:00',
    qrCode: 'QR-BK1-12345'
  },
  {
    id: 'bk2',
    customerId: '2',
    customerName: 'Siti Aminah',
    filmId: '1',
    showtime: mockFilms[0].showtimes[2],
    seats: ['B3', 'B4', 'B5'],
    totalPrice: 135000,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    status: 'confirmed',
    createdAt: '2025-12-08T09:15:00',
    qrCode: 'QR-BK2-67890'
  },
  {
    id: 'bk3',
    customerId: '3',
    customerName: 'Rudi Hartono',
    filmId: '2',
    showtime: mockFilms[1].showtimes[1],
    seats: ['C7', 'C8'],
    totalPrice: 80000,
    paymentMethod: 'cash',
    paymentStatus: 'pending',
    status: 'pending',
    createdAt: '2025-12-08T11:20:00',
    qrCode: 'QR-BK3-11223'
  },
  {
    id: 'bk4',
    customerId: '4',
    customerName: 'Dewi Lestari',
    filmId: '3',
    showtime: mockFilms[2].showtimes[2],
    seats: ['D1', 'D2'],
    totalPrice: 84000,
    paymentMethod: 'ewallet',
    paymentStatus: 'paid',
    status: 'confirmed',
    createdAt: '2025-12-08T08:45:00',
    qrCode: 'QR-BK4-33445'
  },
  {
    id: 'bk5',
    customerId: '5',
    customerName: 'Ahmad Yani',
    filmId: '1',
    showtime: mockFilms[0].showtimes[0],
    seats: ['E4', 'E5', 'E6', 'E7'],
    totalPrice: 180000,
    paymentMethod: 'ewallet',
    paymentStatus: 'paid',
    status: 'confirmed',
    createdAt: '2025-12-08T07:30:00',
    qrCode: 'QR-BK5-55667'
  },
  {
    id: 'bk6',
    customerId: '6',
    customerName: 'Rina Wijaya',
    filmId: '4',
    showtime: mockFilms[3].showtimes[1],
    seats: ['A1'],
    totalPrice: 43000,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    status: 'confirmed',
    createdAt: '2025-12-08T10:00:00',
    qrCode: 'QR-BK6-77889'
  },
  {
    id: 'bk7',
    customerId: '7',
    customerName: 'Hendra Kusuma',
    filmId: '2',
    showtime: mockFilms[1].showtimes[0],
    seats: ['F2', 'F3'],
    totalPrice: 80000,
    paymentMethod: 'ewallet',
    paymentStatus: 'paid',
    status: 'confirmed',
    createdAt: '2025-12-08T09:30:00',
    qrCode: 'QR-BK7-99001'
  },
  {
    id: 'bk8',
    customerId: '8',
    customerName: 'Lisa Permata',
    filmId: '3',
    showtime: mockFilms[2].showtimes[1],
    seats: ['C5', 'C6'],
    totalPrice: 84000,
    paymentMethod: 'cash',
    paymentStatus: 'paid',
    status: 'completed',
    createdAt: '2025-12-07T15:00:00',
    qrCode: 'QR-BK8-22334'
  },
];