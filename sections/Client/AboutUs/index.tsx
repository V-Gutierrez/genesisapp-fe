import PageWithHeadingImage from 'components/PageWithHeadingImage'
import { Text } from '@chakra-ui/react'
import CrowdImage from 'public/assets/images/genesischurchcrowd.webp'

const AboutUs: React.FC = () => (
  <PageWithHeadingImage
    pageTitle="Gênesis Church - Quem Somos"
    headingImage={CrowdImage.src}
  >
    <Text>
      <Text textAlign="center" fontFamily="Caveat" my={10} fontSize="3xl">Por que nele vivemos, e nos movemos, e existimos. - Atos 17:28</Text>

      <Text fontWeight="bold" my={4}> QUEM SOMOS</Text>

      A Gênesis Church nasceu na cidade de Buenos Aires - Argentina e há 13 anos atua de forma ativa na expansão do evangelho. Em 2009, Deus fez brotar no coração de um jovem brasileiro, que veio estudar na capital argentina, uma obra singular, a qual começou com reuniões em seu apartamento e com o passar dos anos foi expandindo, sendo, hoje, aproximadamente 550 jovens, na sua grande maioria, brasileiros universitários, reunidos todos os sábados com uma só intenção que é adorar ao Senhor Jesus. Atualmente, entendemos que não existem fronteiras para levarmos o amor de Cristo, decidimos mudar o nome da nossa igreja para Gênesis Church.
      Somos uma Comunidade de fé cristã, fundamentada na palavra de Deus e que faz parte do corpo de Cristo.

      <Text fontWeight="bold" my={4}> MISSÃO</Text>
      Nossa missão é propagar o reino de Deus nessa geração, alcançando as vidas por meio da palavra de Deus, honrando a Cristo e cumprindo a vontade dEle em tudo.

      <Text fontWeight="bold" my={4}>VISÃO</Text>
      Temos como visão viver em completa dependência e obediência a Deus, crescendo, permanentemente, no conhecimento e na prática da sua vontade.

      <Text fontWeight="bold" my={4}>VALORES</Text>
      O propósito como igreja é formar e solidificar o caráter de Cristo na vida dos jovens que estão conosco para que, amanhã, não importa em que parte do mundo estejam, os princípios cristãos venhas
    </Text>
  </PageWithHeadingImage>
)

export default AboutUs
