import { Text, Box, Flex } from '@chakra-ui/react'
import NextImage from 'components/NextImage'
import SimpleEmptyState from 'components/SimpleEmptyState'
import { useQuery } from 'react-query'
import { GET_GALLERIES } from 'services/queries'


const Galleries: React.FC = () => {
  const { data } = useQuery('galleries', GET_GALLERIES, {
    staleTime: Infinity,
    cacheTime: Infinity,
  })

  const galleries = /* data?.data || */[
    {
      assetId: '1',
      createdAt: '2021-08-01T00:00:00.000Z',
      coverImage: 'https://picsum.photos/200/300',
      coverThumbnail: 'https://picsum.photos/200/300',
      googlePhotosAlbumUrl: 'https://picsum.photos/200/300',
      id: '1',
      title: 'Galeria 1',
    },
    {
      assetId: '1',
      createdAt: '2021-08-01T00:00:00.000Z',
      coverImage: 'https://picsum.photos/200/300',
      coverThumbnail: 'https://picsum.photos/200/300',
      googlePhotosAlbumUrl: 'https://picsum.photos/200/300',
      id: '1',
      title: 'Galeria 1',
    },
    {
      assetId: '1',
      createdAt: '2021-08-01T00:00:00.000Z',
      coverImage: 'https://picsum.photos/200/300',
      coverThumbnail: 'https://picsum.photos/200/300',
      googlePhotosAlbumUrl: 'https://picsum.photos/200/300',
      id: '1',
      title: 'Galeria 1',
    },
    {
      assetId: '1',
      createdAt: '2021-08-01T00:00:00.000Z',
      coverImage: 'https://picsum.photos/200/300',
      coverThumbnail: 'https://picsum.photos/200/300',
      googlePhotosAlbumUrl: 'https://picsum.photos/200/300',
      id: '1',
      title: 'Galeria 1',
    },
    {
      assetId: '1',
      createdAt: '2021-08-01T00:00:00.000Z',
      coverImage: 'https://picsum.photos/200/300',
      coverThumbnail: 'https://picsum.photos/200/300',
      googlePhotosAlbumUrl: 'https://picsum.photos/200/300',
      id: '1',
      title: 'Galeria 1',
    },
    {
      assetId: '1',
      createdAt: '2021-08-01T00:00:00.000Z',
      coverImage: 'https://picsum.photos/200/300',
      coverThumbnail: 'https://picsum.photos/200/300',
      googlePhotosAlbumUrl: 'https://picsum.photos/200/300',
      id: '1',
      title: 'Galeria 1',
    },
    {
      assetId: '1',
      createdAt: '2021-08-01T00:00:00.000Z',
      coverImage: 'https://picsum.photos/200/300',
      coverThumbnail: 'https://picsum.photos/200/300',
      googlePhotosAlbumUrl: 'https://picsum.photos/200/300',
      id: '1',
      title: 'Galeria 1',
    },
    {
      assetId: '1',
      createdAt: '2021-08-01T00:00:00.000Z',
      coverImage: 'https://picsum.photos/200/300',
      coverThumbnail: 'https://picsum.photos/200/300',
      googlePhotosAlbumUrl: 'https://picsum.photos/200/300',
      id: '1',
      title: 'Galeria 1',
    },
  ]

  /* if (!data) return null
  if (!data.data.length) {
    return <SimpleEmptyState title="Não há galerias  disponíveis no momento" />
  } */

  return (
    <>
      {galleries.map((gallery) => {
        return JSON.stringify(gallery)
      })}
    </>
  )
}

export default Galleries
