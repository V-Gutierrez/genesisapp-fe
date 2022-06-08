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
import { RQ_FORMAT_OPTIONS, RQ_TOOLBAR_OPTIONS } from 'helpers/reactQuill';
import { useMutation, useQuery } from 'react-query';

import { CREATE_EXTERNAL_EVENT } from 'services/mutations';
import { EXTERNAL_EVENT_CREATION_INITIAL_VALUES } from 'helpers/formInitialValues';
import { EXTERNAL_EVENT_CREATION_SCHEMA } from 'helpers/validationSchemas';
import { GET_EXTERNAL_EVENTS } from 'services/queries';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const EventEditor: React.FC<EditorProps> = ({ onClose }) => {
  const toast = useToast();
  const [toolbar, setToolbar] = useState<any>(false);
  const { mutateAsync: createExternalEvents } = useMutation(CREATE_EXTERNAL_EVENT);
  const { refetch } = useQuery('events', GET_EXTERNAL_EVENTS);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldSetter: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
  ) => {
    const { files } = e.target;
    const { 0: file } = files as FileList;

    fieldSetter('coverImage', file);
  };

  const onSubmit = async (
    values: ExternalEventFormValues,
    FormikHelpersObject: FormikHelpers<ExternalEventFormValues>,
  ) => {
    FormikHelpersObject.setSubmitting(true);
    try {
      await createExternalEvents(values);

      toast({
        title: 'Evento criado com sucesso',
        status: 'success',
      });

      await refetch();
      onClose();
    } catch (e) {
      toast({
        title: 'Houve um erro ao criar o evento',
        status: 'error',
      });
    }
    FormikHelpersObject.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={EXTERNAL_EVENT_CREATION_INITIAL_VALUES}
      validationSchema={EXTERNAL_EVENT_CREATION_SCHEMA}
      onSubmit={onSubmit}
    >
      {({
 errors, touched, handleSubmit, handleChange, isSubmitting, setFieldValue,
}) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={6} p={{ base: 2 }} mb={{ base: 10 }}>
            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Título do Evento</FormLabel>
              <Input type="text" id="title" onChange={handleChange} />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.title && touched.title && errors.title}
              </Text>
            </Box>

            <Box onClick={() => setToolbar(RQ_TOOLBAR_OPTIONS)}>
              <Stack>
                <HStack>
                  <FormLabel fontSize={{ base: '16px' }}>Descrição do evento</FormLabel>
                </HStack>
                <Box
                  h={{ base: '250px' }}
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
                      setFieldValue('description', value);
                    }}
                    formats={RQ_FORMAT_OPTIONS}
                    modules={{
                      toolbar,
                    }}
                  />
                  <Text fontSize={{ base: '12px' }} color="red">
                    {errors.description && touched.description && errors.description}
                  </Text>
                </Box>
              </Stack>
            </Box>

            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Data e Hora do Evento</FormLabel>
              <Input type="datetime-local" id="scheduledTo" onChange={handleChange} />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.scheduledTo && touched.scheduledTo && errors.scheduledTo}
              </Text>
            </Box>

            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Vagas</FormLabel>
              <Input type="number" id="maxSubscriptions" onChange={handleChange} />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.maxSubscriptions && touched.maxSubscriptions && errors.maxSubscriptions}
              </Text>
            </Box>

            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Endereço</FormLabel>
              <Input type="text" id="addressInfo" onChange={handleChange} />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.addressInfo && touched.addressInfo && errors.addressInfo}
              </Text>
            </Box>

            <Box>
              <FormLabel fontSize={{ base: '16px' }}>Imagem do Evento</FormLabel>
              <Input
                type="file"
                id="coverImage"
                accept="image/png, image/jpeg"
                textAlign="center"
                d="flex"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleFileChange(e, setFieldValue);
                }}
              />
              <Text fontSize={{ base: '12px' }} color="red">
                {errors.coverImage && touched.coverImage && errors.coverImage}
              </Text>
            </Box>
          </Stack>

          <Flex w="100%" justifyContent="center" mt={{ base: 2 }}>
            <Button
              colorScheme="blackAlpha"
              type="submit"
              bg="blackAlpha.900"
              minW="200px"
              variant="solid"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : 'Criar'}
            </Button>
          </Flex>
        </form>
      )}
    </Formik>
  );
};

export default EventEditor;
