import { create } from 'zustand'

export interface Review {
  reviewId: string;
  droneId: string;
  reviewerWalletAddress: string;
  rating: number;
  comment: string;
}

interface ReviewStoreState {
  reviews: Review[];
  setReviews: (reviews: Review[]) => void;
  addReview: (review: Review) => void;
  updateReview: (updatedReview: Review) => void;
  deleteReview: (reviewId: string) => void;
}

const useReviewStore = create<ReviewStoreState>(set => ({
  reviews: [],
  setReviews: (reviews) => set({ reviews }),
  addReview: (review) => set(state => ({ reviews: [...state.reviews, review] })),
  updateReview: (updatedReview) => set(state => ({
    reviews: state.reviews.map(review => review.reviewId === updatedReview.reviewId ? updatedReview : review)
  })),
  deleteReview: (reviewId) => set(state => ({
    reviews: state.reviews.filter(review => review.reviewId !== reviewId)
  })),
}))

export default useReviewStore
