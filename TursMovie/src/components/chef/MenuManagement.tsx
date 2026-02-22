import { useState } from 'react';
import { mockFoodItems } from '../../data/mockData';
import type { FoodItem } from '../../types';
import { Plus, Edit, Trash2, Search, Coffee, Check, X } from 'lucide-react';

export function MenuManagement() {
  const [menuItems, setMenuItems] = useState<FoodItem[]>(mockFoodItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);

  const categories = [
    { id: 'all', label: 'Semua' },
    { id: 'popcorn', label: 'Popcorn' },
    { id: 'drinks', label: 'Minuman' },
    { id: 'snacks', label: 'Snacks' },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  const toggleAvailability = (itemId: string) => {
    setMenuItems(menuItems.map(item =>
      item.id === itemId ? { ...item, available: !item.available } : item
    ));
  };

  const deleteItem = (itemId: string) => {
    if (confirm('Yakin ingin menghapus item ini?')) {
      setMenuItems(menuItems.filter(item => item.id !== itemId));
    }
  };

  const handleAddItem = () => {
    const newItem: FoodItem = {
      id: `f${Date.now()}`,
      name: 'Item Baru',
      category: 'snacks',
      price: 0,
      imageUrl: 'https://images.unsplash.com/photo-1612773843298-44dcdd45d865?w=400',
      available: true,
    };
    setMenuItems([...menuItems, newItem]);
    setEditingItem(newItem);
    setIsAddingItem(false);
  };

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-sm p-4 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Coffee className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm">Kelola Menu F&B</h2>
            <p className="text-red-100 text-xs">Atur makanan & minuman</p>
          </div>
        </div>
      </div>

      {/* Search & Add */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-3">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari menu..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button
            onClick={() => setIsAddingItem(true)}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add Item Dialog */}
      {isAddingItem && (
        <div className="bg-white rounded-xl shadow-lg border-2 border-red-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-900 text-sm">Tambah Item Baru</h3>
            <button
              onClick={() => setIsAddingItem(false)}
              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200"
            >
              <X className="w-4 h-4 text-gray-700" />
            </button>
          </div>
          <p className="text-gray-600 text-xs mb-3">
            Item baru akan ditambahkan dengan data default. Anda bisa mengedit setelah ditambahkan.
          </p>
          <button
            onClick={handleAddItem}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Item
          </button>
        </div>
      )}

      {/* Edit Item Dialog */}
      {editingItem && (
        <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-4 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-900 text-sm">Edit Item</h3>
            <button
              onClick={() => setEditingItem(null)}
              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200"
            >
              <X className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          <div>
            <label className="block text-gray-700 text-xs mb-1">Nama Item</label>
            <input
              type="text"
              value={editingItem.name}
              onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-xs mb-1">Kategori</label>
            <select
              value={editingItem.category}
              onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popcorn">Popcorn</option>
              <option value="drinks">Minuman</option>
              <option value="snacks">Snacks</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-xs mb-1">Harga (Rp)</label>
            <input
              type="number"
              value={editingItem.price}
              onChange={(e) => setEditingItem({ ...editingItem, price: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-xs mb-1">URL Gambar</label>
            <input
              type="text"
              value={editingItem.imageUrl}
              onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="available"
              checked={editingItem.available}
              onChange={(e) => setEditingItem({ ...editingItem, available: e.target.checked })}
              className="w-4 h-4 text-orange-600 rounded focus:ring-2 focus:ring-orange-500"
            />
            <label htmlFor="available" className="text-gray-700 text-sm">Tersedia untuk dijual</label>
          </div>

          <button
            onClick={() => {
              setMenuItems(menuItems.map(item =>
                item.id === editingItem.id ? editingItem : item
              ));
              setEditingItem(null);
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            Simpan Perubahan
          </button>
        </div>
      )}

      {/* Menu Items */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-gray-600 text-sm">{filteredItems.length} item ditemukan</p>
        </div>

        {filteredItems.map(item => (
          <div
            key={item.id}
            className={`bg-white rounded-xl shadow-sm border-2 ${
              item.available ? 'border-gray-200' : 'border-red-200 bg-red-50/50'
            } overflow-hidden`}
          >
            <div className="p-3">
              <div className="flex gap-3">
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 text-sm truncate">{item.name}</h3>
                      <p className="text-gray-500 text-xs capitalize">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                  <p className="text-orange-600 mb-2">Rp {item.price.toLocaleString()}</p>
                  <button
                    onClick={() => toggleAvailability(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                      item.available
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    {item.available ? '✓ Tersedia' : '✗ Tidak Tersedia'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
            <Coffee className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Tidak ada item yang ditemukan</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="text-gray-900 text-sm mb-3">Statistik Menu</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-2xl text-gray-900">{menuItems.length}</p>
            <p className="text-gray-600 text-xs">Total Item</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-green-600">{menuItems.filter(i => i.available).length}</p>
            <p className="text-gray-600 text-xs">Tersedia</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-red-600">{menuItems.filter(i => !i.available).length}</p>
            <p className="text-gray-600 text-xs">Habis</p>
          </div>
        </div>
      </div>
    </div>
  );
}