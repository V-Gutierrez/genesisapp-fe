import { Text, Box, Flex } from '@chakra-ui/react'
import NextImage from 'components/NextImage'
import SimpleEmptyState from 'components/SimpleEmptyState'
import { useQuery } from 'react-query'
import { GET_GALLERIES } from 'services/queries'
import GalleryCard from '../../../components/GalleryCard'


const Galleries: React.FC = () => {
  const { data } = useQuery('galleries', GET_GALLERIES, {
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  if (data) {
    const galleries = data?.data

    return (
      <>
        {galleries.map((gallery) => {
          return <GalleryCard key={gallery.id} {...gallery} />
        })}
      </>
    )
  } else {
    return <SimpleEmptyState title="Não há galerias disponíveis no momento" />
  }
}

export default Galleries
