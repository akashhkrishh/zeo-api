
export interface Post {
    id: number
    title: string
    body: string
}

export interface Address {
  city: string
  state: string
  street: string
  zip_code: string
}

export interface PhoneNumber {
  type: string
  number: string
}

export interface UserProfile {
  user_id: number
  username: string
  image_link?: string
  email: string
  first_name: string
  last_name: string
  age: number
  address: Address
  phone_numbers: PhoneNumber[]
  is_active: boolean
}

  