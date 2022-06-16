// ? This function gets token from local storage
export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('retro-shirt-final-db')
}

// ? this function takes the token, splits it up, returns the payload encoded using base64
// This function is not a default export so will be destructured when importing
export const getPayload = () => {
  const token = getTokenFromLocalStorage()
  if (!token) return
  // Get the payload section of the token by splitting and returning index 1
  const payload = token.split('.')[1]
  // convert the payload from a string into an object
  console.log(JSON.parse(atob(payload)))
  return JSON.parse(atob(payload))
}

// ? function that checks that user is authenticated
export const userIsAuthenticated = () => {
  // This function will get the payload for localstorage
  const payload = getPayload()
  // Check that payload exists
  if (!payload) return false
  // get todays time as a timestamp in seconds
  const currentTime = Math.floor(Date.now() / 1000)
  // Compare the token expiry and make sure the expiry is in the future
  // Return a boolean, true if valid, false if invalid
  return currentTime < payload.exp
}

// ? This function will check the user id from the payload matches the cheese user id
export const userIsOwner = (singleReview) => {
  // get payload and check it has a value
  const payload = getPayload()
  if (!payload) return
  return singleReview.user._id === payload.sub
}