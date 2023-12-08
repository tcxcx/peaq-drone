import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Drone = {
  droneId: string;
  title: string;
  description: string;
  ownerWalletAddress: string;
  imageUrl?: string;
};

const useFetchUserDrones = (walletAddress: string | null) => {
  return useQuery<Drone[], Error>({
    queryKey: ['UserDrones', walletAddress],
    queryFn: async () => {
      if (!walletAddress) return [];
      const { data } = await axios.get(`http://localhost:5000/drone-listing/user/${walletAddress}`);
      return data;
    },
    enabled: !!walletAddress
  });
};

export default useFetchUserDrones;
