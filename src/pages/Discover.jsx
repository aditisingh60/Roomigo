import React from 'react';
import { Filter, Search } from 'lucide-react';
import FlatmateCard from '../components/cards/FlatmateCard';
import Button from '../components/common/Button';
import { initialUsers } from '../data/users';

const Discover = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Discover Flatmates</h1>
          <p className="text-sm text-slate-500">
            Browse compatible flatmates matching your preferences
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search location, lifestyle..."
              className="pl-9 pr-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <Button variant="outline" size="sm" icon={Filter}>
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialUsers.map((user) => (
          <FlatmateCard
            key={user.id}
            name={user.name}
            age={user.age}
            occupation={user.occupation}
            budget={user.budget}
            location={user.location}
            compatibilityScore={user.compatibilityScore}
            tags={user.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;

