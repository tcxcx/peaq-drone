import axios from 'axios';
import { toast } from 'sonner';

const useOrderActions = () => {

  const createOrder = async (walletAddress, droneId, address, description) => {
    try {
      const response = await axios.post('http://localhost:5000/orders/create-order', 
        { walletAddress, droneId, address, description }
      );
      toast.success('Order created successfully');
      return response.data.orderId;
    } catch (error) {
      console.error('Failed to create order:', error);
      toast.error('Failed to create order');
      return null;
    }
  };

  const updateOrderStatus = async (orderId, orderStatus) => {
    try {
      await axios.put(`http://localhost:5000/orders/update-order/${orderId}`, 
        { orderStatus }
      );
      toast.success('Order updated successfully');
    } catch (error) {
      console.error('Failed to update order:', error);
      toast.error('Failed to update order');
    }
  };

  const submitRating = async (orderId, rating, comment) => {
    try {
      await axios.post(`http://localhost:5000/orders/submit-rating/${orderId}`, 
        { rating, comment }
      );
      toast.success('Rating submitted successfully');
    } catch (error) {
      console.error('Failed to submit rating:', error);
      toast.error('Failed to submit rating');
    }
  };

  return { createOrder, updateOrderStatus, submitRating };
};

export default useOrderActions;
