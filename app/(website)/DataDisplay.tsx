"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '@/redux/dataSlice'
import { RootState, AppDispatch } from '@/redux/store'
import { Post } from '@/types/type'

const DataDisplay: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const { data, loading, error } = useSelector((state: RootState) => state.data)

  // Dispatch fetchData action on component mount
  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  // If data is loading, show a loading spinner or message
  if (loading) {
    return (
      <div className="loading-spinner">
        {/* You could use an actual spinner here */}
      </div>
    )
  }

  // If there was an error, display an error message
  if (error) {
    return (
      <div className="error-message">
        <p>Error: {error}</p>
      </div>
    )
  }

  // Once data is loaded, display the data
  return (
    <div>
      <h1>Data from API</h1>
      <ul>
        {data.map((item: Post) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default DataDisplay
