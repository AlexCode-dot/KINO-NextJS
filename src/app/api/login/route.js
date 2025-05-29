export async function POST(request) {
  const payload = await request.json()

  // Log the payload for debugging
  console.log(`${payload.Username} and ${payload.Password} received in the login API`)
  console.log(`Login attempt with username: ${payload.Username} and password: ${payload.Password}`)

  // Verify if username and password match login info
  if (payload.Username === 'admin' && payload.Password === 'password') {
    return new Response(JSON.stringify({ message: 'Login successful' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } else {
    return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
