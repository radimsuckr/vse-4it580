import { useState } from 'react';
import { useTodoList } from 'src/modules/todo/hooks';
import { Button, Heading, Input } from 'src/shared/design-system';
import { Box, Spacer, Flex, VStack, Checkbox, IconButton, Tabs, Tab, TabList } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const STATES = ['all', 'completed', 'not-completed'];

export function Practical02Page() {
  const { items, addItem, setItemCompleted, deleteItem, filter, setFilter } = useTodoList();
  const [newItemName, setNewItemName] = useState('');

  return (
    <Box>
      <Heading>Practical 02</Heading>
      <form
        onSubmit={(event) => {
          // Prevent reloading the page on submit (default browser behaviour)
          event.preventDefault();

          // Add the item to the to-do list state
          addItem(newItemName);

          // Clear the input field
          setNewItemName('');
        }}
      >
        <Input
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
          type="text"
          placeholder="What needs to be done?"
        />
        <Button type="submit">Add</Button>
      </form>

      <Tabs
        index={STATES.indexOf(filter)}
        onChange={(index) => setFilter(STATES[index])}
        variant="soft-rounded"
        colorScheme="blue"
      >
        <TabList>
          <Tab>All</Tab>
          <Tab>Completed</Tab>
          <Tab>Not completed</Tab>
        </TabList>
      </Tabs>
      <VStack border="1px" borderColor="gray.500" borderRadius="base">
        {items
          .filter((item) => filter === 'all'
            || (filter === 'completed' && item.isCompleted)
            || (filter === 'not-completed' && !item.isCompleted)
          )
          .map((item) => (
            <Flex
              key={item.id}
              w="100%"
              px="2"
              py="1"
              borderRadius="base"
              role="group"
              _hover={{ bg: '#eee', color: 'black', }}
            >
              <Checkbox
                onChange={() => setItemCompleted(item.id, !item.isCompleted)}
                isChecked={item.isCompleted}
              >
                <Box color={item.isCompleted ? 'grey' : 'black'}>
                  {item.isCompleted ? <del>{item.name}</del> : item.name}
                </Box>
              </Checkbox>
              <Spacer />
              <IconButton
                colorScheme="red"
                aria-label="Delete item"
                icon={<DeleteIcon />}
                onClick={() => deleteItem(item.id)}
                visibility="hidden"
                _groupHover={{ visibility: 'visible', }}
              />
            </Flex>
          ))}
      </VStack>
    </Box>
  );
}
