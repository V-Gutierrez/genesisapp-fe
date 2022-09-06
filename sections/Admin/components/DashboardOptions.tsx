import { HiOutlineBookOpen, HiUserGroup } from 'react-icons/hi'
import { Stack, Text } from '@chakra-ui/react'

import { BsNewspaper } from 'react-icons/bs'
import OptionCard from 'components/OptionCard'
import { IoTrailSignOutline } from 'react-icons/io5'

const AdminOptions: Array<AdminOptions> = [
  { title: 'Usuários', icon: HiUserGroup, goTo: '/admin/usuarios' },
  { title: 'Devocionais', icon: HiOutlineBookOpen, goTo: '/admin/devocionais' },
  { title: 'Notícias', icon: BsNewspaper, goTo: '/admin/noticias' },
  { title: 'Eventos', icon: IoTrailSignOutline, goTo: '/admin/eventos' },
]

function DashboardOptions() {
  return (
    <>
      <Text fontSize="18px" my="8px" fontWeight="600">
        Itens de administração
      </Text>
      <Stack
        overflowY="scroll"
        maxH="100%"
        scrollSnapType="y proximity"
        sx={{
          '&::-webkit-scrollbar': {
            width: '5px',
            borderRadius: '15px',
            backgroundColor: 'gray.60',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray.800',
            height: '20px',
            borderRadius: '100px',
          },
          '&::-webkit-track': {
            h: '90%',
          },
        }}
      >
        {AdminOptions.map((item) => (
          <OptionCard key={item.title} {...item} />
        ))}
      </Stack>
    </>
  )
}

export default DashboardOptions
