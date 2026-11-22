import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import FlatmateCard from '../components/cards/FlatmateCard';
import { initialUsers } from '../data/users';

const Matches = () => {
  // Show high compatibility matches (> 90%)
  const topMatches = initialUsers.filter((u) => u.compatibilityScore >= 90);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
          <Heart className="w-5 h-5 fill-rose-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Your Roommate Matches</h1>
          <p className="text-sm text-slate-500">
            Profiles with 90%+ compatibility with your living habits
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topMatches.map((user) => (
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

export default Matches;

