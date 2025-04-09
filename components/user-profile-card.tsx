import { UserProfile } from '@/types/type'
import Image from 'next/image'
import React from 'react'
import LoadingAnimation from './loading-animation'
import { CircleDot, Mail, Phone, Pin, User } from 'lucide-react'

type Props = {
  data: UserProfile | null
  isLoading: boolean
}

function ProfileCard({ data, isLoading }: Props) {
  // Show a loading spinner if isLoading is true
  if (isLoading) {
    return (
      <LoadingAnimation />
    )
  }

  // If no data is available, show this message
  if (!data) {
    return (
      <div className='w-full h-full flex items-center justify-center text-muted-foreground'>
        No user data available
      </div>
    )
  }

  // Use the first user from the data for the profile card
  const user = data

  return (
    <div className='p-4 grid md:grid-cols-10 h-full  flex-1 gap-4'>
      <div className='md:col-span-4 md:border-r pr-4 h-full flex flex-col items-center justify-center gap-2'>
        {/* Profile Image with Transition on Hover */}
        <div className='relative aspect-square rounded-full w-[120px] overflow-hidden border-2 border-primary p-1 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg'>
          <div className='relative aspect-square rounded-full  overflow-hidden border-2'>
            <Image
              className="absolute aspect-square"
              src={`/api/images/users/${user.user_id}`}
              alt={`${user.first_name} ${user.last_name}`}
              width={300}

              height={300}
              priority
            />

          </div>
        </div>
        {/* Profile Name */}
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-xl font-semibold transition-colors duration-300 ease-in-out hover:text-primary'>
            {user.first_name} {user.last_name}
          </h1>
          {/* Profile Email */}
          <p className='text-sm text-muted-foreground'>{user.email}</p>
        </div>
      </div>
      <div className='md:col-span-6 flex flex-col justify-center gap-4 '>
        {/* Content for the right section */}
        <div className='flex justify-between'>
          <div className={` border w-fit text-xs px-2 py-1 flex items-center gap-1.5 `}><span><CircleDot size={12} className={`${user.is_active ? "text-green-500" : "text-red-500 "}`} /></span>{user.is_active ? "active" : "inactive"}</div>
          <span className='text-sm'><span className='text-muted-foreground text-sm'>userId: </span>{user.user_id}</span>
        </div>
        <div className='flex gap-2 items-center text-muted-foreground'>
          <User size={16} />{"@" + user.username}
        </div>
        <div className='flex gap-2 items-center text-muted-foreground'>
          <Mail size={16} />{user.email}
        </div>
        <div className='flex gap-2 items-center text-muted-foreground'>
          <Phone size={16} />{`(${user.phone_numbers[0].type}) `}{user.phone_numbers[0].number}
        </div>
        <div className='flex gap-2 items-center text-muted-foreground'>
          <Pin size={16} />{user.address.city + ", "}
          {user.address.state + ", "}
          {user.address.street + ", "}
          {user.address.zip_code}
        </div>

      </div>
    </div>
  )
}

export default ProfileCard
