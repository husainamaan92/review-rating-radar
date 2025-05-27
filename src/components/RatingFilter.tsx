
import React from 'react';
import StarRating from './StarRating';

interface RatingFilterProps {
  selectedRating: number | null;
  onRatingChange: (rating: number | null) => void;
  ratingsDistribution: { [key: number]: number };
}

const RatingFilter: React.FC<RatingFilterProps> = ({
  selectedRating,
  onRatingChange,
  ratingsDistribution
}) => {
  const totalReviews = Object.values(ratingsDistribution).reduce((sum, count) => sum + count, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Rating</h3>
      
      <div className="space-y-3">
        <button
          onClick={() => onRatingChange(null)}
          className={`w-full text-left p-2 rounded-lg transition-colors duration-200 ${
            selectedRating === null
              ? 'bg-blue-100 text-blue-700'
              : 'hover:bg-gray-50'
          }`}
        >
          <span className="font-medium">All Ratings</span>
          <span className="text-gray-500 ml-2">({totalReviews})</span>
        </button>
        
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = ratingsDistribution[rating] || 0;
          const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
          
          return (
            <button
              key={rating}
              onClick={() => onRatingChange(rating)}
              className={`w-full text-left p-2 rounded-lg transition-colors duration-200 ${
                selectedRating === rating
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <StarRating rating={rating} size={16} />
                  <span className="text-sm">({count})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 w-8">
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RatingFilter;
