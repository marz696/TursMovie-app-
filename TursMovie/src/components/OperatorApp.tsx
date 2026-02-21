import { useState } from 'react';
import type { User } from '../types';
import { mockFilms } from '../data/mockData';
import type { Film } from '../types';
import { Film as FilmIcon, Calendar, Clock, Users, LogOut, Check, Play, List, Settings } from 'lucide-react';
import { FilmManagement } from './operator/FilmManagement';

interface OperatorAppProps {
  user: User;
  onLogout: () => void;
}

interface Screening {
  id: string;
  film: Film;
  showtime: {
    id: string;
    time: string;
    date: string;
    roomName: string;
  };
  ticketsSold: number;
  totalSeats: number;
  status: 'scheduled' | 'ready' | 'playing' | 'completed';
}

type OperatorScreen = 'screenings' | 'films';

export function OperatorApp({ user, onLogout }: OperatorAppProps) {
  const [currentScreen, setCurrentScreen] = useState<OperatorScreen>('screenings');
  // Mock screenings
  const [screenings, setScreenings] = useState<Screening[]>([
    {
      id: 's1',
      film: mockFilms[0],
      showtime: mockFilms[0].showtimes[2],
      ticketsSold: 28,
      totalSeats: 40,
      status: 'scheduled'
    },
    {
      id: 's2',
      film: mockFilms[2],
      showtime: mockFilms[2].showtimes[1],
      ticketsSold: 15,
      totalSeats: 40,
      status: 'ready'
    },
    {
      id: 's3',
      film: mockFilms[1],
      showtime: mockFilms[1].showtimes[0],
      ticketsSold: 22,
      totalSeats: 30,
      status: 'scheduled'
    },
  ]);

  const updateScreeningStatus = (id: string, status: Screening['status']) => {
    setScreenings(screenings.map(s => 
      s.id === id ? { ...s, status } : s
    ));
  };

  const getStatusColor = (status: Screening['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-yellow-100 text-yellow-700';
      case 'ready': return 'bg-green-100 text-green-700';
      case 'playing': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: Screening['status']) => {
    switch (status) {
      case 'scheduled': return 'Terjadwal';
      case 'ready': return 'Siap';
      case 'playing': return 'Sedang Tayang';
      case 'completed': return 'Selesai';
    }
  };

  const scheduledScreenings = screenings.filter(s => s.status === 'scheduled');
  const readyScreenings = screenings.filter(s => s.status === 'ready');
  const playingScreenings = screenings.filter(s => s.status === 'playing');

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-red-50/30">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 px-4 pt-12 pb-6 sticky top-0 z-40 shadow-lg rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
              <FilmIcon className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-white">Film Operator</h1>
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

        {/* Stats Cards - only show on screenings screen */}
        {currentScreen === 'screenings' && (
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 text-center border border-white/30">
              <div className="w-8 h-8 bg-yellow-400 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Calendar className="w-4 h-4 text-yellow-900" />
              </div>
              <p className="text-2xl text-white mb-0.5">{scheduledScreenings.length}</p>
              <p className="text-red-100 text-[10px]">Jadwal</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 text-center border border-white/30">
              <div className="w-8 h-8 bg-green-400 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Check className="w-4 h-4 text-green-900" />
              </div>
              <p className="text-2xl text-white mb-0.5">{readyScreenings.length}</p>
              <p className="text-red-100 text-[10px]">Siap</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 text-center border border-white/30">
              <div className="w-8 h-8 bg-blue-400 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Play className="w-4 h-4 text-blue-900" />
              </div>
              <p className="text-2xl text-white mb-0.5">{playingScreenings.length}</p>
              <p className="text-red-100 text-[10px]">Tayang</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-3 text-center border border-white/30">
              <div className="w-8 h-8 bg-pink-400 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Users className="w-4 h-4 text-pink-900" />
              </div>
              <p className="text-2xl text-white mb-0.5">112</p>
              <p className="text-red-100 text-[10px]">Penonton</p>
            </div>
          </div>
        )}
      </header>

      {/* Content */}
      {currentScreen === 'screenings' ? (
        <div className="px-4 py-6 space-y-5 pb-20">
          {/* Scheduled */}
          {scheduledScreenings.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <h2 className="text-gray-900 text-sm">Jadwal Penayangan</h2>
                  <p className="text-gray-500 text-xs">{scheduledScreenings.length} film terjadwal</p>
                </div>
              </div>
              <div className="space-y-3">
                {scheduledScreenings.map((screening) => (
                  <div key={screening.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="flex gap-3 p-3">
                      <img 
                        src={screening.film.posterUrl} 
                        alt={screening.film.title}
                        className="w-20 h-28 object-cover rounded-xl flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-gray-900 text-sm truncate pr-2">{screening.film.title}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs flex-shrink-0 ${getStatusColor(screening.status)}`}>
                            {getStatusLabel(screening.status)}
                          </span>
                        </div>
                        <div className="space-y-1.5 text-xs mb-2">
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">{screening.showtime.date} • {screening.showtime.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <FilmIcon className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">{screening.showtime.roomName}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <Users className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{screening.ticketsSold}/{screening.totalSeats} kursi terisi</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2.5">
                          <div 
                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                            style={{ width: `${(screening.ticketsSold / screening.totalSeats) * 100}%` }}
                          ></div>
                        </div>
                        <button
                          onClick={() => updateScreeningStatus(screening.id, 'ready')}
                          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-1.5 text-sm"
                        >
                          <Check className="w-4 h-4" />
                          Tandai Siap
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ready */}
          {readyScreenings.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h2 className="text-gray-900 text-sm">Siap Ditayangkan</h2>
                  <p className="text-gray-500 text-xs">{readyScreenings.length} film siap</p>
                </div>
              </div>
              <div className="space-y-3">
                {readyScreenings.map((screening) => (
                  <div key={screening.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="flex gap-3 p-3">
                      <img 
                        src={screening.film.posterUrl} 
                        alt={screening.film.title}
                        className="w-20 h-28 object-cover rounded-xl flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-gray-900 text-sm truncate pr-2">{screening.film.title}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs flex-shrink-0 ${getStatusColor(screening.status)}`}>
                            {getStatusLabel(screening.status)}
                          </span>
                        </div>
                        <div className="space-y-1.5 text-xs mb-3">
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">{screening.showtime.date} • {screening.showtime.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <FilmIcon className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">{screening.showtime.roomName}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <Users className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{screening.ticketsSold} penonton</span>
                          </div>
                        </div>
                        <button
                          onClick={() => updateScreeningStatus(screening.id, 'playing')}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-1.5 text-sm"
                        >
                          <Play className="w-4 h-4" />
                          Mulai Penayangan
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Playing */}
          {playingScreenings.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center animate-pulse">
                  <Play className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-gray-900 text-sm">Sedang Tayang</h2>
                  <p className="text-gray-500 text-xs">{playingScreenings.length} film sedang tayang</p>
                </div>
              </div>
              <div className="space-y-3">
                {playingScreenings.map((screening) => (
                  <div key={screening.id} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg border-2 border-blue-200 overflow-hidden">
                    <div className="flex gap-3 p-3">
                      <img 
                        src={screening.film.posterUrl} 
                        alt={screening.film.title}
                        className="w-20 h-28 object-cover rounded-xl flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-gray-900 text-sm truncate pr-2">{screening.film.title}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs flex-shrink-0 ${getStatusColor(screening.status)}`}>
                            {getStatusLabel(screening.status)}
                          </span>
                        </div>
                        <div className="space-y-1.5 text-xs mb-3">
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>Durasi: {screening.film.duration} menit</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-600">
                            <FilmIcon className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">{screening.showtime.roomName}</span>
                          </div>
                        </div>
                        <div className="bg-blue-100 border-2 border-blue-300 rounded-xl p-2.5 flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                          <p className="text-blue-800 text-xs">Film sedang ditayangkan</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {screenings.length === 0 && (
            <div className="mt-20 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-[32px] flex items-center justify-center mx-auto mb-4">
                <FilmIcon className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-gray-900 mb-2">Tidak ada jadwal</h3>
              <p className="text-gray-500 text-sm">Jadwal penayangan akan muncul di sini</p>
            </div>
          )}
        </div>
      ) : (
        <FilmManagement />
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setCurrentScreen('screenings')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              currentScreen === 'screenings'
                ? 'text-red-600 bg-red-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List className="w-5 h-5" />
            <span className="text-xs">Penayangan</span>
          </button>
          <button
            onClick={() => setCurrentScreen('films')}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
              currentScreen === 'films'
                ? 'text-red-600 bg-red-50'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-xs">Kelola Film</span>
          </button>
        </div>
      </nav>
    </div>
  );
}