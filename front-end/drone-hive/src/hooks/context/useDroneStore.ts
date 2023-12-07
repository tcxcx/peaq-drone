import { create } from 'zustand'

export interface Drone {
    droneId: string;
    ownerWalletAddress: string;
    title: string;
    description: string;
  }
  
  interface DroneStoreState {
    drones: Drone[];
    setDrones: (drones: Drone[]) => void;
    addDrone: (drone: Drone) => void;
    updateDrone: (updatedDrone: Drone) => void;
    deleteDrone: (droneId: string) => void;
  }
  
  const useDroneStore = create<DroneStoreState>(set => ({
    drones: [],
    setDrones: (drones) => set({ drones }),
    addDrone: (drone) => set(state => ({ drones: [...state.drones, drone] })),
    updateDrone: (updatedDrone) => set(state => ({
      drones: state.drones.map(drone => drone.droneId === updatedDrone.droneId ? updatedDrone : drone)
    })),
    deleteDrone: (droneId) => set(state => ({
      drones: state.drones.filter(drone => drone.droneId !== droneId)
    })),
  }))
  
  export default useDroneStore