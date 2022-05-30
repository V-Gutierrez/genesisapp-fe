import { Grid, GridItem } from '@chakra-ui/react';

import DashboardOptions from 'sections/Admin/components/DashboardOptions';
import Stats from 'sections/Admin/components/Stats';

export default function AdminDashboard() {
  return (
    <Grid
      h="80vh"
      templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(5, 1fr)', lg: 'repeat(6, 1fr)' }}
      templateRows={{
        base: 'repeat(9, 1fr)',
        sm: 'repeat(6, 1fr)',
        md: 'repeat(8, 1fr)',
        lg: 'repeat(6, 1fr)',
      }}
      gap={{ base: '50px' }}
      d={{
        base: 'grid',
        sm: 'grid',
        md: 'grid',
        lg: 'grid',
        xl: 'grid',
      }}
    >
      <GridItem
        py="5px"
        colSpan={{ base: 3, sm: 5, lg: 3 }}
        rowSpan={{
          base: 3,
          sm: 2,
          md: 3,
          lg: 5,
        }}
        borderRadius="20px"
      >
        <Stats />
      </GridItem>
      <GridItem
        colSpan={{ base: 3, sm: 5, lg: 3 }}
        rowSpan={{
          base: 5,
          sm: 3,
          md: 4,
          lg: 5,
        }}
        borderRadius="20px"
        py="5px"
      >
        <DashboardOptions />
      </GridItem>
    </Grid>
  );
}
