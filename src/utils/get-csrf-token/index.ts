export function getCSRFToken(): string {
  // Get all cookies in document
  const cookies = document.cookie.split('; ')

  // Find CSRF Cookie
  const csrfCookie = cookies.find((cookie) => cookie.includes('csrftoken'))

  // Get CSRF Cookie value
  const csrfToken = csrfCookie?.split('=')[1]

  // Return value
  return csrfToken || ''
}
