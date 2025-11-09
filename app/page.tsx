// app/page.tsx
'use client';

import { useState, useEffect } from 'react';

// TypeScript interfaces
interface Geo {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }

        const data: User[] = await response.json();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg">Error: {error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Users Directory</h1>
          <p className="text-gray-600 text-lg">
            Showing {users.length} users from JSONPlaceholder API
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* User Header */}
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                  {user.name.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-blue-600 font-medium">@{user.username}</p>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 mb-4">
                <div className="flex items-start">
                  <span className="text-gray-400 mr-3">📧</span>
                  <a
                    href={`mailto:${user.email}`}
                    className="text-gray-700 hover:text-blue-600 hover:underline break-all"
                  >
                    {user.email}
                  </a>
                </div>

                <div className="flex items-start">
                  <span className="text-gray-400 mr-3">📱</span>
                  <a
                    href={`tel:${user.phone}`}
                    className="text-gray-700 hover:text-blue-600 hover:underline"
                  >
                    {user.phone}
                  </a>
                </div>

                <div className="flex items-start">
                  <span className="text-gray-400 mr-3">🌐</span>
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-blue-600 hover:underline"
                  >
                    {user.website}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <span className="text-gray-400 mr-2">📍</span>
                  Address
                </h3>
                <p className="text-sm text-gray-600">
                  {user.address.street}, {user.address.suite}<br />
                  {user.address.city}, {user.address.zipcode}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  📍 Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
                </p>
              </div>

              {/* Company */}
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center">
                  <span className="text-gray-400 mr-2">🏢</span>
                  Company
                </h3>
                <p className="font-medium text-gray-800">{user.company.name}</p>
                <p className="text-sm text-gray-600 italic mt-1">
                  "{user.company.catchPhrase}"
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {user.company.bs}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500">
            Data fetched from <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">JSONPlaceholder</a>
          </p>
        </div>
      </div>
    </main>
  );
}