import React from 'react'

 
function LoadingAnimation() {
  return (
    <div className='w-full h-full flex items-center justify-center text-muted-foreground'>
    <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-primary border-solid'></div>
  </div>
  )
}

export default LoadingAnimation