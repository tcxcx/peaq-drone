import { create } from 'zustand';

interface WalletState {
    walletAddress: string | null;
    jwtToken: string | null;
    setWallet: (address: string | null, token: string | null) => void;
    clearWallet: () => void;
  }  
  const useWalletStore = create<WalletState>((set) => ({
    walletAddress: null,
    jwtToken: null,
    setWallet: (address, token) => set({ walletAddress: address, jwtToken: token }),
    clearWallet: () => set({ walletAddress: null, jwtToken: null }),
  }));
  
  export default useWalletStore;
  