// import { useState } from 'react';
// import { User } from '../App';
// import { KasirDashboard } from './kasir/KasirDashboard';
// import { IncomingOrders } from './kasir/IncomingOrders';
// import { FilmBookings } from './kasir/FilmBookings';
// import { OnsiteBooking } from './kasir/OnsiteBooking';
// import { CheckBooking } from './kasir/CheckBooking';
// import { SalesReport } from './kasir/SalesReport';
// import { KasirSettings } from './kasir/KasirSettings';
// import { LayoutDashboard, ShoppingCart, Ticket, PlusCircle, QrCode, BarChart3, Settings, LogOut, Menu, X } from 'lucide-react';

// interface KasirAppProps {
//   user: User;
//   onLogout: () => void;
// }

// type KasirScreen = 'dashboard' | 'orders' | 'bookings' | 'onsite' | 'check-booking' | 'reports' | 'settings';

// export function KasirApp({ user, onLogout }: KasirAppProps) {
//   const [currentScreen, setCurrentScreen] = useState<KasirScreen>('dashboard');
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const menuItems = [
//     { id: 'dashboard' as KasirScreen, label: 'Dashboard', icon: LayoutDashboard },
//     { id: 'orders' as KasirScreen, label: 'Pesanan', icon: ShoppingCart, badge: 3 },
//     { id: 'bookings' as KasirScreen, label: 'Daftar Booking', icon: Ticket },
//     { id: 'onsite' as KasirScreen, label: 'Booking Onsite', icon: PlusCircle },
//     { id: 'check-booking' as KasirScreen, label: 'Cek Booking', icon: QrCode },
//     { id: 'reports' as KasirScreen, label: 'Laporan', icon: BarChart3 },
//     { id: 'settings' as KasirScreen, label: 'Pengaturan', icon: Settings },
//   ];

//   const renderScreen = () => {
//     switch (currentScreen) {
//       case 'dashboard':
//         return <KasirDashboard onNavigate={setCurrentScreen} />;
//       case 'orders':
//         return <IncomingOrders />;
//       case 'bookings':
//         return <FilmBookings />;
//       case 'onsite':
//         return <OnsiteBooking />;
//       case 'check-booking':
//         return <CheckBooking />;
//       case 'reports':
//         return <SalesReport />;
//       case 'settings':
//         return <KasirSettings user={user} onLogout={onLogout} />;
//       default:
//         return <KasirDashboard onNavigate={setCurrentScreen} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Sidebar */}
//       <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ${
//         sidebarOpen ? 'translate-x-0' : '-translate-x-full'
//       }`}>
//         <div className="flex flex-col h-full">
//           {/* Logo */}
//           <div className="p-4 border-b border-gray-800">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
//                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
//                   </svg>
//                 </div>
//                 <div>
//                   <h2 className="text-white text-sm">TursMovie</h2>
//                   <p className="text-gray-400 text-xs">Kasir Panel</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setSidebarOpen(false)}
//                 className="text-gray-400 hover:text-white"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           {/* User Info */}
//           <div className="p-4 border-b border-gray-800">
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-purple-600 rounded-full flex items-center justify-center">
//                 <span className="text-white text-sm">{user.name.charAt(0)}</span>
//               </div>
//               <div>
//                 <p className="text-white text-sm">{user.name}</p>
//                 <p className="text-gray-400 text-xs">Kasir</p>
//               </div>
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 p-3 overflow-y-auto">
//             <div className="space-y-1">
//               {menuItems.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = currentScreen === item.id;
                
//                 return (
//                   <button
//                     key={item.id}
//                     onClick={() => {
//                       setCurrentScreen(item.id);
//                       setSidebarOpen(false);
//                     }}
//                     className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg transition-colors text-sm ${
//                       isActive
//                         ? 'bg-red-600 text-white'
//                         : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                     }`}
//                   >
//                     <Icon className="w-4 h-4" />
//                     <span className="flex-1 text-left">{item.label}</span>
//                     {item.badge && (
//                       <span className="px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">
//                         {item.badge}
//                       </span>
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//           </nav>

//           {/* Logout */}
//           <div className="p-3 border-t border-gray-800">
//             <button
//               onClick={onLogout}
//               className="w-full flex items-center gap-2 px-3 py-2.5 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition-colors text-sm"
//             >
//               <LogOut className="w-4 h-4" />
//               <span>Keluar</span>
//             </button>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1">
//         {/* Mobile Header */}
//         <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
//           <div className="flex items-center justify-between">
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="text-gray-600 hover:text-gray-900"
//             >
//               <Menu className="w-5 h-5" />
//             </button>
//             <h1 className="text-gray-900 text-sm">TursMovie Kasir</h1>
//             <div className="w-5"></div>
//           </div>
//         </header>

//         {/* Content */}
//         <main className="min-h-screen">
//           {renderScreen()}
//         </main>
//       </div>

//       {/* Overlay */}
//       {sidebarOpen && (
//         <div
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 bg-black/50 z-40"
//         ></div>
//       )}
//     </div>
//   );
// }