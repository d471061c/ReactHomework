import React from 'react'

const Notification = (message, type) => (
  <div className={type}>
    {message}
  </div>
)

export default Notification