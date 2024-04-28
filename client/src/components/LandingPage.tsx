import { Height, SearchOutlined } from '@mui/icons-material'
import { InputAdornment, Stack, TextField } from '@mui/material'
import React from 'react'

const LandingPage = () => {
  return (
   <Stack sx={{height:'100%'}}>
    <Stack>Courier Management System</Stack>
   <Stack sx={{height:'90%',alignItems: 'center' , justifyContent: 'center'}}><TextField sx={{width: '70%'}} placeholder='Track Here(Phone Number/Ref ID)'    InputProps={{
            startAdornment: <InputAdornment position="start"><SearchOutlined/></InputAdornment>,
          }}/></Stack> 
   </Stack>

  )
}

export default LandingPage
