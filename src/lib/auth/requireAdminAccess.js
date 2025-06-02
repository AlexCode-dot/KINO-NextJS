// Will be updated to check if user is admin (need login/sign in for this)
export function requireAdminAccess() {
  return process.env.NODE_ENV === 'production'
}
