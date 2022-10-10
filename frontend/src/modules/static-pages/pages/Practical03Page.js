import {
  BodyBackground,
  Box,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Paragraph,
  Radio,
  RadioGroup,
  Select,
  Spacer,
  Stack,
  StackDivider,
  Switch,
  Textarea,
} from 'src/shared/design-system';

import { FormField } from 'src/shared/hook-form';

import { SettingsSection } from '../molecules';

export function Practical03Page() {
  return (
    <>
      <BodyBackground bg="gray.100" />
      <Heading pb="4">Practical 03</Heading>

      <Stack>
        <SettingsSection
          title="Profile"
          description="This is your profile information."
          formProps={{
            defaultValues: {
              firstName: 'John',
              lastName: 'Doe',
              username: 'jdoe',
              email: 'john@doe.com',
              about: 'Lorem ipsum',
              agreeToc: true,
            },
            onSubmit: (data) => {
              alert(JSON.stringify(data, null, 2));
            },
          }}
        >
          <Stack mb='4' direction='row'>
            <Box w='50%'>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <Input type='text' />
              </FormControl>
            </Box>
            <Box w='50%'>
              <FormControl>
                <FormLabel>Last name</FormLabel>
                <Input type='text' />
              </FormControl>
            </Box>
          </Stack>
          <Box mb='4' w='55%'>
            <FormControl>
              <FormLabel>User name</FormLabel>
              <Input type='text' />
            </FormControl>
          </Box>
          <Box mb='4' w='55%'>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input type='email' />
            </FormControl>
          </Box>
          <Box mb='4' w='100%'>
            <FormControl>
              <FormLabel>Profile bio</FormLabel>
              <Textarea />
            </FormControl>
          </Box>
          <Box mb='4' w='100%'>
            <FormControl>
              <FormLabel>Profile visibility</FormLabel>
              <Select>
                <option value="public">Public</option>
                <option value="friends">Only friends</option>
                <option value="private">Private</option>
              </Select>
            </FormControl>
          </Box>
          <Box w='100%'>
            <Switch> Agree to Terms and Conditions</Switch>
          </Box>
        </SettingsSection>
        <StackDivider p='4' />
        <SettingsSection
          title="Notifications"
          description="Setup how much notification you will receive"
          formProps={{
            defaultValues: {
              notificationsLevel: 'mentions',
            },
            onSubmit: (data) => {
              alert(JSON.stringify(data, null, 2));
            },
          }}
        >
          <RadioGroup>
            <Heading as="h5">Notify me</Heading>
            <Paragraph>When you should be notified:</Paragraph>
            <Stack pl='4'>
              <Radio value="all">Every time someone quacks</Radio>
              <Radio value="mentions">Only mentions (@username)</Radio>
              <Radio value="never">Never</Radio>
            </Stack>
          </RadioGroup>
        </SettingsSection>
      </Stack>
    </>
  );
}
