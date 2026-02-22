// import { useState } from 'react';
// import type { User } from '../types';
// import type { Film, Showtime, Seat, CartItem, Order } from '../types';
// import { CustomerHome } from './customer/CustomerHome';
// import { FilmList } from './customer/FilmList';
// import { FilmDetail } from './customer/FilmDetail';
// import { SeatSelection } from './customer/SeatSelection';
// import { FoodMenu } from './customer/FoodMenu';
// import { OrderSummary } from './customer/OrderSummary';
// import { PaymentMethod } from './customer/PaymentMethod';
// import { OrderConfirmation } from './customer/OrderConfirmation';
// import { OrderHistory } from './customer/OrderHistory';
// import { UserProfile } from './customer/UserProfile';
// import { BottomNav } from './customer/BottomNav';
// import { Home, Film as FilmIcon, Clock, User as UserIcon } from 'lucide-react';

// interface CustomerAppProps {
//   user: User;
//   onLogout: () => void;
// }

// type CustomerScreen = 
//   | 'home' 
//   | 'films' 
//   | 'film-detail' 
//   | 'seat-selection' 
//   | 'food-menu' 
//   | 'order-summary' 
//   | 'payment' 
//   | 'confirmation'
//   | 'history'
//   | 'profile';

// export function CustomerApp({ user, onLogout }: CustomerAppProps) {
//   const [currentScreen, setCurrentScreen] = useState<CustomerScreen>('home');
//   const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
//   const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
//   const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
//   const [foodCart, setFoodCart] = useState<CartItem[]>([]);
//   const [paymentMethod, setPaymentMethod] = useState<'ewallet' | 'card' | 'cash'>('ewallet');
//   const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

//   const handleFilmSelect = (film: Film) => {
//     setSelectedFilm(film);
//     setCurrentScreen('film-detail');
//   };

//   const handleShowtimeSelect = (showtime: Showtime) => {
//     setSelectedShowtime(showtime);
//     setCurrentScreen('seat-selection');
//   };

//   const handleSeatsConfirm = (seats: Seat[]) => {
//     setSelectedSeats(seats);
//     setCurrentScreen('food-menu');
//   };

//   const handleFoodConfirm = (items: CartItem[]) => {
//     setFoodCart(items);
//     setCurrentScreen('order-summary');
//   };

//   const handleProceedToPayment = () => {
//     setCurrentScreen('payment');
//   };

//   const handlePaymentConfirm = (method: 'ewallet' | 'card' | 'cash') => {
//     setPaymentMethod(method);
    
//     // Create order
//     const order: Order = {
//       id: `ORD-${Date.now()}`,
//       customerId: user.id,
//       customerName: user.name,
//       film: selectedFilm!,
//       showtime: selectedShowtime!,
//       seats: selectedSeats,
//       foodItems: foodCart,
//       totalPrice: calculateTotal(),
//       paymentMethod: method,
//       paymentStatus: method === 'cash' ? 'pending' : 'paid',
//       orderStatus: 'confirmed',
//       createdAt: new Date().toISOString(),
//       qrCode: `QR-${Date.now()}`
//     };
    
//     setCompletedOrder(order);
//     setCurrentScreen('confirmation');
//   };

//   const handleBackToHome = () => {
//     // Reset all state
//     setSelectedFilm(null);
//     setSelectedShowtime(null);
//     setSelectedSeats([]);
//     setFoodCart([]);
//     setCompletedOrder(null);
//     setCurrentScreen('home');
//   };

//   const calculateTotal = () => {
//     const ticketPrice = selectedSeats.length * (selectedFilm?.price || 0);
//     const foodPrice = foodCart.reduce((sum, item) => sum + (item.foodItem.price * item.quantity), 0);
//     return ticketPrice + foodPrice;
//   };

//   const navItems = [
//     { id: 'home' as CustomerScreen, label: 'Home', icon: Home },
//     { id: 'films' as CustomerScreen, label: 'Films', icon: FilmIcon },
//     { id: 'history' as CustomerScreen, label: 'History', icon: Clock },
//     { id: 'profile' as CustomerScreen, label: 'Profile', icon: UserIcon },
//   ];

//   const renderScreen = () => {
//     switch (currentScreen) {
//       case 'home':
//         return <CustomerHome onFilmSelect={handleFilmSelect} onNavigate={setCurrentScreen} />;
//       case 'films':
//         return <FilmList onFilmSelect={handleFilmSelect} />;
//       case 'film-detail':
//         return (
//           <FilmDetail 
//             film={selectedFilm!} 
//             onShowtimeSelect={handleShowtimeSelect}
//             onBack={() => setCurrentScreen('films')}
//           />
//         );
//       case 'seat-selection':
//         return (
//           <SeatSelection
//             showtime={selectedShowtime!}
//             film={selectedFilm!}
//             onConfirm={handleSeatsConfirm}
//             onBack={() => setCurrentScreen('film-detail')}
//           />
//         );
//       case 'food-menu':
//         return (
//           <FoodMenu
//             initialCart={foodCart}
//             onConfirm={handleFoodConfirm}
//             onSkip={() => {
//               setFoodCart([]);
//               setCurrentScreen('order-summary');
//             }}
//             onBack={() => setCurrentScreen('seat-selection')}
//           />
//         );
//       case 'order-summary':
//         return (
//           <OrderSummary
//             film={selectedFilm!}
//             showtime={selectedShowtime!}
//             seats={selectedSeats}
//             foodItems={foodCart}
//             total={calculateTotal()}
//             onProceed={handleProceedToPayment}
//             onBack={() => setCurrentScreen('food-menu')}
//           />
//         );
//       case 'payment':
//         return (
//           <PaymentMethod
//             total={calculateTotal()}
//             onConfirm={handlePaymentConfirm}
//             onBack={() => setCurrentScreen('order-summary')}
//           />
//         );
//       case 'confirmation':
//         return (
//           <OrderConfirmation
//             order={completedOrder!}
//             onBackToHome={handleBackToHome}
//           />
//         );
//       case 'history':
//         return <OrderHistory customerId={user.id} />;
//       case 'profile':
//         return <UserProfile user={user} onLogout={onLogout} />;
//       default:
//         return <CustomerHome onFilmSelect={handleFilmSelect} onNavigate={setCurrentScreen} />;
//     }
//   };

//   // Don't show bottom nav during booking flow
//   const showBottomNav = ['home', 'films', 'history', 'profile'].includes(currentScreen);

//   return (
//     <div className="min-h-screen bg-gray-50 pb-20">
//       {renderScreen()}
//       {showBottomNav && (
//         <BottomNav
//           items={navItems}
//           currentScreen={currentScreen}
//           onNavigate={setCurrentScreen}
//         />
//       )}
//     </div>
//   );
// }
