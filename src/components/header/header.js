import { useEffect } from 'react'

const Header = () => {
  console.log('HEADER')
  useEffect(() => {
    console.log('HEADER USE')
  }, [])
}

export default Header
