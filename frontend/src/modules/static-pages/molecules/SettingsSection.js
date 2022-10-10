import {
  Box,
  Button,
  Heading,
  Paragraph,
  Spacer,
  Stack,
} from 'src/shared/design-system';

import { Form } from 'src/shared/hook-form';

export function SettingsSection({ formProps, title, description, children }) {
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
        <Form {...formProps}>
          <Stack bg="white">
            <Box p='4'>
              {children}
            </Box>
            <Box textAlign="right" backgroundColor='rgb(247, 249, 252)' p='4'>
              <Button type="submit" colorScheme='green'>Save</Button>
            </Box>
          </Stack>
        </Form>
      </Box>
    </Stack >
  );
}
