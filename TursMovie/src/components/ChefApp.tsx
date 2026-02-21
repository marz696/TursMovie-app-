import { useState } from 'react';
import type { User } from '../App';
import { mockFoodOrders } from '../data/mockData';
import type { FoodOrder } from '../types';
import { ChefHat, Clock, Check, LogOut, AlertCircle, Coffee, List } from 'lucide-react';
import { MenuManagement } from './chef/MenuManagement';

interface ChefAppProps {
  user: User;
  onLogout: () => void;
}

type ChefScreen = 'orders' | 'menu';

export function ChefApp({ user, onLogout }: ChefAppProps) {
  const [currentScreen, setCurrentScreen] = useState<ChefScreen>('orders');
  const [orders, setOrders] = useState<FoodOrder[]>(mockFoodOrders);

  const updateOrderStatus = (orderId: string, newStatus: FoodOrder['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const cookingOrders = orders.filter(o => o.status === 'cooking');
  const readyOrders = orders.filter(o => o.status === 'ready');
  const completedOrders = orders.filter(o => o.status === 'completed');

  const getStatusColor = (status: FoodOrder['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cooking': return 'bg-blue-100 text-blue-700';
      case 'ready': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: FoodOrder['status']) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'cooking': return 'Sedang Dimasak';
      case 'ready': return 'Siap';
      case 'completed': return 'Selesai';
    }
  };

  const renderOrderCard = (order: FoodOrder) => (
    <div key={order.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-gray-900">{order.customerName}</p>
            <p className="text-gray-600 text-sm">Order #{order.orderId}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
            {getStatusLabel(order.status)}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <Clock className="w-4 h-4" />
          <span>{new Date(order.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</span>
          {order.status === 'pending' && (
            <span className="ml-auto px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
              Prioritas {order.priority}
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="space-y-2 mb-4">
          {order.items.map((item) => (
            <div key={item.foodItem.id} className="flex items-center justify-between">
              <span className="text-gray-900">{item.quantity}x {item.foodItem.name}</span>
            </div>
          ))}
        </div>

        {order.status === 'pending' && (
          <button
            onClick={() => updateOrderStatus(order.id, 'cooking')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Mulai Memasak
          </button>
        )}

        {order.status === 'cooking' && (
          <button
            onClick={() => updateOrderStatus(order.id, 'ready')}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Tandai Siap
          </button>
        )}

        {order.status === 'ready' && (
          <button
            onClick={() => updateOrderStatus(order.id, 'completed')}
            className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Selesai & Ambil
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-red-50/30">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 px-4 pt-12 pb-6 sticky top-0 z-40 shadow-lg rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <ChefHat className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-white">Chef Kitchen</h1>
              <p className="text-red-100 text-xs">{user.name}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <LogOut className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Stats Cards - only show on orders screen */}
        {currentScreen === 'orders' && (
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 text-center border border-white/30">
              <div className="w-8 h-8 bg-yellow-400 rounded-xl flex items-center justify-center mx-auto mb-2">
                <AlertCircle className="w-4 h-4 text-yellow-900" />
              </div>
              <p className="text-2xl text-white mb-0.5">{pendingOrders.length}</p>
              <p className="text-red-100 text-[10px]">Baru</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 text-center border border-white/30">
              <div className="w-8 h-8 bg-blue-400 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Clock className="w-4 h-4 text-blue-900" />
              </div>
              <p className="text-2xl text-white mb-0.5">{cookingOrders.length}</p>
              <p className="text-red-100 text-[10px]">Masak</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 text-center border border-white/30">
              <div className="w-8 h-8 bg-green-400 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Check className="w-4 h-4 text-green-900" />
              </div>
              <p className="text-2xl text-white mb-0.5">{readyOrders.length}</p>
              <p className="text-red-100 text-[10px]">Siap</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 text-center border border-white/30">
              <div className="w-8 h-8 bg-gray-300 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Check className="w-4 h-4 text-gray-700" />
              </div>
              <p className="text-2xl text-white mb-0.5">{completedOrders.length}</p>
              <p className="text-red-100 text-[10px]">Selesai</p>
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      {currentScreen === 'orders' ? (
        <div className="px-4 py-6 space-y-5 pb-20">
          {/* Pending Orders */}
          {pendingOrders.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-gray-900 text-sm">Pesanan Baru</h2>
                  <p className="text-gray-500 text-xs">{pendingOrders.length} pesanan menunggu</p>
                </div>
              </div>
              <div className="space-y-3">
                {pendingOrders.map(renderOrderCard)}
              </div>
            </div>
          )}

          {/* Cooking Orders */}
          {cookingOrders.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-gray-900 text-sm">Sedang Dimasak</h2>
                  <p className="text-gray-500 text-xs">{cookingOrders.length} pesanan dalam proses</p>
                </div>
              </div>
              <div className="space-y-3">
                {cookingOrders.map(renderOrderCard)}
              </div>
            </div>
          )}

          {/* Ready Orders */}
          {readyOrders.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h2 className="text-gray-900 text-sm">Siap Diambil</h2>
                  <p className="text-gray-500 text-xs">{readyOrders.length} pesanan siap</p>
                </div>
              </div>
              <div className="space-y-3">
                {readyOrders.map(renderOrderCard)}
              </div>
            </div>
          )}

          {/* Empty State */}
          {pendingOrders.length === 0 && cookingOrders.length === 0 && readyOrders.length === 0 && (
            <div className="mt-20 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-red-100 rounded-[32px] flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-12 h-12 text-orange-400" />
              </div>
              <h3 className="text-gray-900 mb-2">Tidak ada pesanan</h3>
              <p className="text-gray-500 text-sm">Pesanan baru akan muncul di sini</p>
            </div>
          )}
        </div>
      ) : (
        <MenuManagement />
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setCurrentScreen('orders')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              currentScreen === 'orders'
                ? 'text-red-600 bg-red-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List className="w-5 h-5" />
            <span className="text-xs">Pesanan</span>
          </button>
          <button
            onClick={() => setCurrentScreen('menu')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              currentScreen === 'menu'
                ? 'text-red-600 bg-red-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Coffee className="w-5 h-5" />
            <span className="text-xs">Kelola Menu</span>
          </button>
        </div>
      </nav>
    </div>
  );
}