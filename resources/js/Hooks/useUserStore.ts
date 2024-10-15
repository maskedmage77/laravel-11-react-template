import { User } from '@/Types';
import { create } from 'zustand';

interface UserState {
  user: User | undefined,
  setUser: (data: User) => void,
  roles: string[],
  setRole: (data: string) => void,
  permissions: string[],
  setPermission: (data: string) => void,
  clearUser: () => void,
}

const useUserStore = create<UserState>()((set) => ({
  
  setState: (data: UserState) => set(() => data),
  
  user: undefined,
  setUser: (data: User) => set((state: UserState) => ({ ...state, user: data })),

  roles: [],
  setRole: (data: string) => set((state: UserState) => ({ ...state, roles: [...state.roles, data] })),

  permissions: [],
  setPermission: (data: string) => set((state: UserState) => ({ ...state, permissions: [...state.permissions, data] })),

  clearUser: () => set(() => ({ user: undefined, roles: [], permissions: [] })),

}))

export default useUserStore;
