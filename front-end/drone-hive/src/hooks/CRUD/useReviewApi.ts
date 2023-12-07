// hooks/useReviewApi.js
import useReviewStore, { Review } from '@/hooks/context/useReviewStore'
import useWalletStore from '@/hooks/context/useWalletStore'

const useReviewApi = () => {
    const { jwtToken } = useWalletStore()
    const { setReviews, addReview, updateReview, deleteReview } = useReviewStore()
  
    const fetchReviews = async (droneId: string) => {
      const response = await fetch(`/api/drone-review/reviews/${droneId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      const data: Review[] = await response.json()
      setReviews(data)
    }
  
    // Implement other CRUD operations similarly
  
    return { fetchReviews, addReview, updateReview, deleteReview }
  }
  
  export default useReviewApi