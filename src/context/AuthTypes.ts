export type AuthContextType = {
  username: string | null
  logout: () => void
  login: (accessToken: string | null, username: string | null) => void
}
