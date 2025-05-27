
import React from 'react';
import ProductCard from './ProductCard';
import ReviewCard from './ReviewCard';
import RatingFilter from './RatingFilter';
import ReviewForm from './ReviewForm';
import StarRating from './StarRating';

// Sample data
const sampleProducts = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    averageRating: 4.2,
    totalReviews: 128,
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    averageRating: 4.5,
    totalReviews: 256,
    description: 'Advanced fitness tracking with heart rate monitoring and GPS capabilities.'
  },
  {
    id: '3',
    name: 'USB-C Fast Charger',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1609592509749-8a5fbf5b0615?w=400&h=300&fit=crop',
    averageRating: 4.7,
    totalReviews: 89,
    description: 'Ultra-fast charging adapter compatible with all USB-C devices.'
  }
];

const sampleReviews = [
  {
    id: '1',
    productId: '1',
    customerName: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely love these headphones! The sound quality is incredible and the noise cancellation works perfectly. Worth every penny.',
    date: '2024-01-15',
    helpful: 12,
    notHelpful: 1,
    verified: true
  },
  {
    id: '2',
    productId: '1',
    customerName: 'Mike Chen',
    rating: 4,
    comment: 'Great headphones overall. Battery life is excellent and they are very comfortable. Only minor complaint is that they can feel a bit heavy after long use.',
    date: '2024-01-10',
    helpful: 8,
    notHelpful: 0,
    verified: true
  },
  {
    id: '3',
    productId: '1',
    customerName: 'Emily Davis',
    rating: 3,
    comment: 'Good quality but had some connectivity issues with my phone. Customer service was helpful though.',
    date: '2024-01-08',
    helpful: 3,
    notHelpful: 2,
    verified: false
  },
  {
    id: '4',
    productId: '2',
    customerName: 'Alex Rodriguez',
    rating: 5,
    comment: 'This watch has completely changed my fitness routine. The heart rate monitoring is spot on and the GPS tracking is very accurate.',
    date: '2024-01-12',
    helpful: 15,
    notHelpful: 0,
    verified: true
  },
  {
    id: '5',
    productId: '2',
    customerName: 'Lisa Thompson',
    rating: 4,
    comment: 'Really impressed with the build quality and features. The battery lasts for days and the interface is intuitive.',
    date: '2024-01-09',
    helpful: 7,
    notHelpful: 1,
    verified: true
  }
];

const ProductRatingSystem: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = React.useState<string | null>(null);
  const [selectedRating, setSelectedRating] = React.useState<number | null>(null);
  const [showReviewForm, setShowReviewForm] = React.useState(false);
  const [reviews, setReviews] = React.useState(sampleReviews);
  const [sortBy, setSortBy] = React.useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');

  const selectedProductData = selectedProduct 
    ? sampleProducts.find(p => p.id === selectedProduct)
    : null;

  const productReviews = selectedProduct
    ? reviews.filter(r => r.productId === selectedProduct)
    : [];

  const filteredReviews = selectedRating
    ? productReviews.filter(r => r.rating === selectedRating)
    : productReviews;

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const ratingsDistribution = productReviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as { [key: number]: number });

  const handleViewReviews = (productId: string) => {
    setSelectedProduct(productId);
    setSelectedRating(null);
    setShowReviewForm(false);
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setSelectedRating(null);
    setShowReviewForm(false);
  };

  const handleSubmitReview = (reviewData: {
    rating: number;
    comment: string;
    customerName: string;
  }) => {
    const newReview = {
      id: Date.now().toString(),
      productId: selectedProduct!,
      ...reviewData,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      notHelpful: 0,
      verified: false
    };
    
    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
  };

  // For demo purposes, we'll assume the current user can delete reviews with customerName "Sarah Johnson"
  const canDeleteReview = (review: any) => {
    return review.customerName === "Sarah Johnson";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {!selectedProduct ? (
          // Products Grid View
          <div>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Product Rating System
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover what customers think about our products. Read genuine reviews and make informed decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewReviews={handleViewReviews}
                />
              ))}
            </div>
          </div>
        ) : (
          // Product Reviews View
          <div>
            <div className="mb-6">
              <button
                onClick={handleBackToProducts}
                className="text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors duration-200"
              >
                ← Back to Products
              </button>
              
              {selectedProductData && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                    <img
                      src={selectedProductData.image}
                      alt={selectedProductData.name}
                      className="w-full md:w-32 h-32 object-cover rounded-lg mb-4 md:mb-0"
                    />
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {selectedProductData.name}
                      </h2>
                      <p className="text-gray-600 mb-3">{selectedProductData.description}</p>
                      <div className="flex items-center space-x-4">
                        <StarRating rating={selectedProductData.averageRating} size={20} />
                        <span className="font-semibold text-lg">
                          {selectedProductData.averageRating.toFixed(1)}
                        </span>
                        <span className="text-gray-500">
                          ({selectedProductData.totalReviews} reviews)
                        </span>
                        <span className="text-2xl font-bold text-blue-600">
                          ${selectedProductData.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {showReviewForm ? (
              <ReviewForm
                productId={selectedProduct}
                onSubmit={handleSubmitReview}
                onCancel={() => setShowReviewForm(false)}
              />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1">
                  <RatingFilter
                    selectedRating={selectedRating}
                    onRatingChange={setSelectedRating}
                    ratingsDistribution={ratingsDistribution}
                  />
                </div>

                <div className="lg:col-span-3">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                      <h3 className="text-xl font-semibold text-gray-900">
                        Customer Reviews ({filteredReviews.length})
                      </h3>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="highest">Highest Rating</option>
                        <option value="lowest">Lowest Rating</option>
                      </select>
                    </div>
                    <button
                      onClick={() => setShowReviewForm(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                      Write Review
                    </button>
                  </div>

                  <div className="space-y-6">
                    {sortedReviews.length > 0 ? (
                      sortedReviews.map(review => (
                        <ReviewCard 
                          key={review.id} 
                          review={review} 
                          onDelete={handleDeleteReview}
                          canDelete={canDeleteReview(review)}
                        />
                      ))
                    ) : (
                      <div className="text-center py-12 bg-white rounded-lg shadow-md">
                        <p className="text-gray-500 text-lg">
                          {selectedRating 
                            ? `No reviews found with ${selectedRating} star${selectedRating > 1 ? 's' : ''}`
                            : 'No reviews yet. Be the first to write one!'
                          }
                        </p>
                        {!selectedRating && (
                          <button
                            onClick={() => setShowReviewForm(true)}
                            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                          >
                            Write First Review
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductRatingSystem;
