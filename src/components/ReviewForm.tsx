
import React from 'react';
import StarRating from './StarRating';

interface ReviewFormProps {
  productId: string;
  onSubmit: (review: {
    rating: number;
    comment: string;
    customerName: string;
  }) => void;
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onSubmit, onCancel }) => {
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const [customerName, setCustomerName] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim() || !customerName.trim()) {
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    
    onSubmit({
      rating,
      comment: comment.trim(),
      customerName: customerName.trim()
    });
    
    setIsSubmitting(false);
  };

  const isValid = rating > 0 && comment.trim().length > 0 && customerName.trim().length > 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name
          </label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex items-center space-x-2">
            <StarRating
              rating={rating}
              interactive={true}
              onRatingChange={setRating}
              size={24}
            />
            <span className="text-sm text-gray-600">
              {rating > 0 ? `${rating} out of 5 stars` : 'Click to rate'}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Share your experience with this product..."
            required
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {comment.length}/500 characters
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
              isValid && !isSubmitting
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
