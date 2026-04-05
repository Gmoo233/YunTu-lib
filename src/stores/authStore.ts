import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'reader' | 'librarian' | 'admin'

export interface AuthUser {
  id: string
  name: string
  studentNo: string
  role: UserRole
  email?: string
}

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: AuthUser | null
  login: (payload: { user: AuthUser; accessToken: string; refreshToken: string }) => void
  logout: () => void
  setTokens: (accessToken: string, refreshToken: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      login: ({ user, accessToken, refreshToken }) =>
        set({ user, accessToken, refreshToken }),
      logout: () => set({ user: null, accessToken: null, refreshToken: null }),
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
    }),
    { name: 'yuntu-auth' },
  ),
)
