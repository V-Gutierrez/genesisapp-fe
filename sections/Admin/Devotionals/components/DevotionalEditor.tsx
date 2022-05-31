import 'react-quill/dist/quill.snow.css';

import {
  Box,
  Button,
  Flex,
  FormLabel,
  HStack,
  Input,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Formik, FormikHelpers } from 'formik';

import { DEVOTIONAL_CREATION_INITIAL_VALUES } from 'helpers/formInitialValues';
import { DEVOTIONAL_CREATION_SCHEMA } from 'helpers/validationSchemas';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const RQ_TOOLBAR_OPTIONS = [
  [{ header: [1, 2, false] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{ color: [] }, { background: [] }],
  [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  ['link', 'image'],
  ['clean'],
];

const RQ_FORMAT_OPTIONS = [
  'header',
  'align',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'background',
];

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const DevotionalEditor: React.FC = () => {
  const toast = useToast();
  const [toolbar, setToolbar] = useState<any>(false);

  const onSubmit = async (
    values: DevotionalFormValues,
    FormikHelpers: FormikHelpers<DevotionalFormValues>,
  ) => {
    try {
      toast({
        title: 'Devocional criado com sucesso',
        status: 'success',
      });
    } catch (e) {
      toast({
        title: 'Houve um erro ao criar o devocional',
        status: 'error',
      });
    }
  };

  return (
    <Formik
      initialValues={DEVOTIONAL_CREATION_INITIAL_VALUES}
      validationSchema={DEVOTIONAL_CREATION_SCHEMA}
      onSubmit={onSubmit}
    >
      {({
 errors, touched, handleSubmit, handleChange, isSubmitting, setFieldValue, values,
}) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={6} p={{ base: 2 }} mb={{ base: 10 }}>
            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Título do Devocional</FormLabel>
              <Input type="title" id="title" onChange={handleChange} />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.title && touched.title && errors.title}
              </Text>
            </Box>

            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Data de Lançamento</FormLabel>
              <Input type="date" id="scheduledTo" onChange={handleChange} />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.scheduledTo && touched.scheduledTo && errors.scheduledTo}
              </Text>
            </Box>

            <Box onClick={() => setToolbar(RQ_TOOLBAR_OPTIONS)}>
              <Stack>
                <HStack>
                  <FormLabel fontSize={{ base: '16px' }}>Texto do Devocional</FormLabel>
                </HStack>
                <Box
                  h={{ base: '450px' }}
                  overflowY="scroll"
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '5px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'transparent',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'rgba(0, 0, 0, 0.4)',
                      borderRadius: '10px',
                    },
                    '#devotionalBodyEditor .ql-toolbar.ql-snow': {
                      position: 'sticky',
                      top: 0,
                      background: 'white',
                      zIndex: '10',
                    },
                  }}
                >
                  <ReactQuill
                    id="devotionalBodyEditor"
                    theme="snow"
                    onChange={(value: string) => {
                      setFieldValue('body', value);
                    }}
                    formats={RQ_FORMAT_OPTIONS}
                    modules={{
                      toolbar,
                    }}
                  />
                  <Text fontSize={{ base: '12px' }} color="red">
                    {errors.body && touched.body && errors.body}
                  </Text>
                </Box>
              </Stack>
            </Box>
          </Stack>

          <Flex w="100%" justifyContent="center" mt={{ base: 6 }}>
            <Button
              colorScheme="blackAlpha"
              type="submit"
              bg="blackAlpha.900"
              minW="200px"
              variant="solid"
            >
              {isSubmitting ? <Spinner /> : 'Criar'}
            </Button>
          </Flex>
        </form>
      )}
    </Formik>
  );
};

export default DevotionalEditor;
