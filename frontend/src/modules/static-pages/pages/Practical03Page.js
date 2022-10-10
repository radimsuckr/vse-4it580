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
import { useController, useForm, FormProvider } from "react-hook-form";
import { SettingsSection } from '../molecules';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const contactFormSchema = yup.object().shape({
  firstName: yup.string().min(2).max(20).required(),
  lastName: yup.string().min(2).max(20).required(),
  username: yup.string().min(2).max(20).required(),
  email: yup
    .string()
    .email()
    .test(
      'CZ domain',
      'E-mail must end with .cz',
      (value) => value.endsWith('.cz'),
    )
    .required(),
  about: yup.string().max(1000).required(),
  agreeToc: yup.boolean().isTrue().required(),
});

function InputField({ name, ...props }) {
  const { field, fieldState } = useController({
    name,
  });

  return <Input {...props} {...field} isInvalid={!!fieldState.error} />;
}

function TextareaField({ name, ...props }) {
  const controller = useController({
    name,
  });

  return <Textarea {...props} {...controller.field} />;
}

function SelectField({ name, values, ...props }) {
  const controller = useController({
    name,
  });

  return (
    <Select name={name} {...props} {...controller.field}>
      {values.map((v) => (<option key={v} value={v}>{v}</option>))}
    </Select>
  );
}

function SwitchField({ name, message, ...props }) {
  const controller = useController({
    name,
  });

  return <Switch {...props} {...controller.field}>{message}</Switch>;
}

export function Practical03Page() {
  const form1Props = useForm({
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
      username: 'jdoe',
      email: 'john@doe.com',
      about: 'Lorem ipsum',
      agreeToc: true,
    },
    mode: 'onBlur',
    resolver: yupResolver(contactFormSchema),
  });

  const form2Props = useForm({
    defaultValues: {
      notificationsLevel: 'mentions',
    },
  });

  return (
    <>
      <BodyBackground bg="gray.100" />
      <Heading pb="4">Practical 03</Heading>

      <Stack>
        <SettingsSection
          title="Profile"
          description="This is your profile information."
          formProps={form1Props}
        >
          <Stack mb='4' direction='row'>
            <Box w='50%'>
              <FormControl>
                <FormLabel>First name</FormLabel>
                <InputField name='firstName' type='text' />
              </FormControl>
            </Box>
            <Box w='50%'>
              <FormControl>
                <FormLabel>Last name</FormLabel>
                <InputField name='lastName' type='text' />
              </FormControl>
            </Box>
          </Stack>
          <Box mb='4' w='55%'>
            <FormControl>
              <FormLabel>User name</FormLabel>
              <InputField name='username' type='text' />
            </FormControl>
          </Box>
          <Box mb='4' w='55%'>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <InputField name='email' type='email' />
            </FormControl>
          </Box>
          <Box mb='4' w='100%'>
            <FormControl>
              <FormLabel>Profile bio</FormLabel>
              <TextareaField name='about' />
            </FormControl>
          </Box>
          <Box mb='4' w='100%'>
            <FormControl>
              <FormLabel>Profile visibility</FormLabel>
              <SelectField name='visibility' values={['Public', 'Only friends', 'Private']} />
            </FormControl>
          </Box>
          <Box w='100%'>
            <SwitchField name='agreeToc' message=' Agree to Terms and Conditions' />
          </Box>
        </SettingsSection>
        <StackDivider p='4' />
        <SettingsSection
          title="Notifications"
          description="Setup how much notification you will receive"
          formProps={form2Props}
        >
          <RadioGroup>
            <Heading as="h5">Notify me</Heading>
            <Paragraph>When you should be notified:</Paragraph>
            <Stack pl='4'>
              <Radio name='notificationsLevel' value="all">Every time someone quacks</Radio>
              <Radio name='notificationsLevel' value="mentions">Only mentions (@username)</Radio>
              <Radio name='notificationsLevel' value="never">Never</Radio>
            </Stack>
          </RadioGroup>
        </SettingsSection>
      </Stack>
    </>
  );
}
