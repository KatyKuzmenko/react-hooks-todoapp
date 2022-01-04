import React from 'react'

export const Authorization = () => {
  return (
    <>
      <form>
        <input className="auth-input" type="text" placeholder='Login'/>
        <input className="auth-input" type="password" placeholder='Password' />
        <button type="submit" className="auth-button">Sign in</button>
      </form>
    </>
  )
}
