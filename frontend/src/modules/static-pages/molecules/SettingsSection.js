import {
  Box,
  Button,
  Heading,
  Paragraph,
  Spacer,
  Stack,
} from 'src/shared/design-system';

import { Form } from 'src/shared/hook-form';
import { FormProvider } from "react-hook-form";

export function SettingsSection({ formProps, title, description, children }) {
  const handleSuccess = (data) => {
    console.log('✅ submit success', data);
  };

  const handleError = (errors) => {
    console.log('⛔️ submit error', errors);
  };

  return (
    <Stack direction={['column', 'column', 'column', 'row']}>
      <Box w={['100%', '100%', '100%', '33%']}>
        <Heading as='h4'>{title}</Heading>
        {description && <Paragraph>{description}</Paragraph>}
      </Box>
      <Spacer />
      <Box
        w={['100%', '100%', '100%', '67%']}
        boxShadow='md'
        rounded='md'
        borderRadius='md'
      >
        <Form
          onSubmit={formProps.handleSubmit(
            handleSuccess,
            handleError,
          )}
        >
          <FormProvider {...formProps}>
            <Stack bg="white">
              <Box p='4'>
                {children}
              </Box>
              <Box textAlign="right" backgroundColor='rgb(247, 249, 252)' p='4'>
                <Button type="submit" colorScheme='green'>Save</Button>
              </Box>
            </Stack>
          </FormProvider>
        </Form>
      </Box>
    </Stack >
  );
}
