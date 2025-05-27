
import React from 'react';
import StarRating from './StarRating';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  notHelpful: number;
  verified: boolean;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [helpfulCount, setHelpfulCount] = React.useState(review.helpful);
  const [notHelpfulCount, setNotHelpfulCount] = React.useState(review.notHelpful);
  const [userVote, setUserVote] = React.useState<'helpful' | 'not-helpful' | null>(null);

  const handleVote = (type: 'helpful' | 'not-helpful') => {
    if (userVote === type) {
      // Remove vote
      if (type === 'helpful') {
        setHelpfulCount(helpfulCount - 1);
      } else {
        setNotHelpfulCount(notHelpfulCount - 1);
      }
      setUserVote(null);
    } else {
      // Change or add vote
      if (userVote === 'helpful') {
        setHelpfulCount(helpfulCount - 1);
        setNotHelpfulCount(notHelpfulCount + 1);
      } else if (userVote === 'not-helpful') {
        setNotHelpfulCount(notHelpfulCount - 1);
        setHelpfulCount(helpfulCount + 1);
      } else {
        if (type === 'helpful') {
          setHelpfulCount(helpfulCount + 1);
        } else {
          setNotHelpfulCount(notHelpfulCount + 1);
        }
      }
      setUserVote(type);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {review.customerName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
            <div className="flex items-center space-x-2">
              <StarRating rating={review.rating} size={16} />
              <span className="text-sm text-gray-500">{review.date}</span>
              {review.verified && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Verified Purchase
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>
      
      <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-600">Was this helpful?</span>
        <button
          onClick={() => handleVote('helpful')}
          className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
            userVote === 'helpful'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <ThumbsUp size={14} />
          <span>{helpfulCount}</span>
        </button>
        <button
          onClick={() => handleVote('not-helpful')}
          className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
            userVote === 'not-helpful'
              ? 'bg-red-100 text-red-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <ThumbsDown size={14} />
          <span>{notHelpfulCount}</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
