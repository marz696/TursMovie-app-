import { useState } from 'react';
import { mockFilms } from '../../data/mockData';
import type { Film } from '../../types';
import { Plus, Edit, Trash2, Search, Film as FilmIcon, Check, X, Calendar, Clock } from 'lucide-react';

export function FilmManagement() {
  const [films, setFilms] = useState<Film[]>(mockFilms);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingFilm, setIsAddingFilm] = useState(false);
  const [editingFilm, setEditingFilm] = useState<Film | null>(null);

  const filteredFilms = films.filter(film =>
    film.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    film.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const deleteFilm = (filmId: string) => {
    if (confirm('Yakin ingin menghapus film ini?')) {
      setFilms(films.filter(film => film.id !== filmId));
    }
  };

  const handleAddFilm = () => {
    const newFilm: Film = {
      id: `f${Date.now()}`,
      title: 'Film Baru',
      genre: ['Drama'],
      duration: 120,
      rating: 0,
      ageRating: 'SU',
      synopsis: 'Deskripsi film baru',
      posterUrl: 'https://images.unsplash.com/photo-1655367574486-f63675dd69eb?w=400',
      price: 45000,
      showtimes: []
    };
    setFilms([...films, newFilm]);
    setEditingFilm(newFilm);
    setIsAddingFilm(false);
  };

  const addShowtime = (filmId: string) => {
    const film = films.find(f => f.id === filmId);
    if (!film) return;

    const newShowtime = {
      id: `st${Date.now()}`,
      filmId: filmId,
      roomId: 'r1',
      roomName: 'Theater 1',
      time: '12:00',
      date: '2025-12-08',
      availableSeats: 40,
      totalSeats: 40
    };

    setFilms(films.map(f =>
      f.id === filmId
        ? { ...f, showtimes: [...f.showtimes, newShowtime] }
        : f
    ));
  };

  const removeShowtime = (filmId: string, showtimeId: string) => {
    setFilms(films.map(f =>
      f.id === filmId
        ? { ...f, showtimes: f.showtimes.filter(st => st.id !== showtimeId) }
        : f
    ));
  };

  return (
    <div className="p-4 space-y-4 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-sm p-4 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <FilmIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm">Kelola Film</h2>
            <p className="text-red-100 text-xs">Atur film & jadwal tayang</p>
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
              placeholder="Cari film..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button
            onClick={() => setIsAddingFilm(true)}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add Film Dialog */}
      {isAddingFilm && (
        <div className="bg-white rounded-xl shadow-lg border-2 border-red-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-900 text-sm">Tambah Film Baru</h3>
            <button
              onClick={() => setIsAddingFilm(false)}
              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200"
            >
              <X className="w-4 h-4 text-gray-700" />
            </button>
          </div>
          <p className="text-gray-600 text-xs mb-3">
            Film baru akan ditambahkan dengan data default. Anda bisa mengedit setelah ditambahkan.
          </p>
          <button
            onClick={handleAddFilm}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Film
          </button>
        </div>
      )}

      {/* Edit Film Dialog */}
      {editingFilm && (
        <div className="bg-white rounded-xl shadow-lg border-2 border-blue-200 p-4 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-900 text-sm">Edit Film</h3>
            <button
              onClick={() => setEditingFilm(null)}
              className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200"
            >
              <X className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          <div>
            <label className="block text-gray-700 text-xs mb-1">Judul Film</label>
            <input
              type="text"
              value={editingFilm.title}
              onChange={(e) => setEditingFilm({ ...editingFilm, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-700 text-xs mb-1">Durasi (menit)</label>
              <input
                type="number"
                value={editingFilm.duration}
                onChange={(e) => setEditingFilm({ ...editingFilm, duration: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xs mb-1">Rating</label>
              <input
                type="number"
                step="0.1"
                value={editingFilm.rating}
                onChange={(e) => setEditingFilm({ ...editingFilm, rating: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-700 text-xs mb-1">Rating Usia</label>
              <select
                value={editingFilm.ageRating}
                onChange={(e) => setEditingFilm({ ...editingFilm, ageRating: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="SU">SU</option>
                <option value="13+">13+</option>
                <option value="17+">17+</option>
                <option value="21+">21+</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-xs mb-1">Harga (Rp)</label>
              <input
                type="number"
                value={editingFilm.price}
                onChange={(e) => setEditingFilm({ ...editingFilm, price: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-xs mb-1">Genre (pisahkan dengan koma)</label>
            <input
              type="text"
              value={editingFilm.genre.join(', ')}
              onChange={(e) => setEditingFilm({ ...editingFilm, genre: e.target.value.split(',').map(g => g.trim()) })}
              placeholder="Action, Adventure, Sci-Fi"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-xs mb-1">Sinopsis</label>
            <textarea
              value={editingFilm.synopsis}
              onChange={(e) => setEditingFilm({ ...editingFilm, synopsis: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-xs mb-1">URL Poster</label>
            <input
              type="text"
              value={editingFilm.posterUrl}
              onChange={(e) => setEditingFilm({ ...editingFilm, posterUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Showtimes */}
          <div className="border-t border-gray-200 pt-3">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-gray-700 text-xs">Jadwal Tayang</label>
              <button
                onClick={() => addShowtime(editingFilm.id)}
                className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                Tambah
              </button>
            </div>
            <div className="space-y-2">
              {editingFilm.showtimes.map(showtime => (
                <div key={showtime.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <div className="flex-1 text-xs text-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>{showtime.date}</span>
                      <Clock className="w-3 h-3 ml-2" />
                      <span>{showtime.time}</span>
                      <span className="ml-auto">{showtime.roomName}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeShowtime(editingFilm.id, showtime.id)}
                    className="w-6 h-6 bg-red-100 rounded flex items-center justify-center hover:bg-red-200 transition-colors"
                  >
                    <X className="w-3 h-3 text-red-600" />
                  </button>
                </div>
              ))}
              {editingFilm.showtimes.length === 0 && (
                <p className="text-gray-500 text-xs text-center py-2">Belum ada jadwal tayang</p>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              setFilms(films.map(film =>
                film.id === editingFilm.id ? editingFilm : film
              ));
              setEditingFilm(null);
            }}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            Simpan Perubahan
          </button>
        </div>
      )}

      {/* Films List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-gray-600 text-sm">{filteredFilms.length} film ditemukan</p>
        </div>

        {filteredFilms.map(film => (
          <div
            key={film.id}
            className="bg-white rounded-xl shadow-sm border-2 border-gray-200 overflow-hidden"
          >
            <div className="p-3">
              <div className="flex gap-3">
                <img 
                  src={film.posterUrl} 
                  alt={film.title}
                  className="w-20 h-28 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-gray-900 text-sm truncate">{film.title}</h3>
                      <p className="text-gray-600 text-xs">{film.genre.join(', ')}</p>
                      <p className="text-gray-600 text-xs">{film.duration} min • {film.ageRating}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() => setEditingFilm(film)}
                        className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => deleteFilm(film.id)}
                        className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                  <p className="text-purple-600 mb-2 text-sm">Rp {film.price.toLocaleString()}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">⭐ {film.rating}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-600">{film.showtimes.length} jadwal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredFilms.length === 0 && (
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
            <FilmIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Tidak ada film yang ditemukan</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="text-gray-900 text-sm mb-3">Statistik Film</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-2xl text-gray-900">{films.length}</p>
            <p className="text-gray-600 text-xs">Total Film</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-purple-600">{films.reduce((sum, f) => sum + f.showtimes.length, 0)}</p>
            <p className="text-gray-600 text-xs">Total Jadwal</p>
          </div>
          <div className="text-center">
            <p className="text-2xl text-pink-600">{Math.round(films.reduce((sum, f) => sum + f.rating, 0) / films.length * 10) / 10}</p>
            <p className="text-gray-600 text-xs">Rating Avg</p>
          </div>
        </div>
      </div>
    </div>
  );
}