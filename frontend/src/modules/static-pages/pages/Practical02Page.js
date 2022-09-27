import { useState } from 'react';
import { useTodoList } from 'src/modules/todo/hooks';
import { Button, Heading, Input } from 'src/shared/design-system';
import { Box, VStack, Checkbox, IconButton, Tabs, Tab, TabList } from '@chakra-ui/react';
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
      <VStack>
        {items
          .filter((item) => filter === 'all'
            || (filter === 'completed' && item.isCompleted)
            || (filter === 'not-completed' && !item.isCompleted)
          )
          .map((item) => (
            <Box key={item.id}>
              <Checkbox
                onChange={() => setItemCompleted(item.id, !item.isCompleted)}
                isChecked={item.isCompleted}
              >
                {item.name}
                <IconButton
                  colorScheme="red"
                  aria-label="Delete item"
                  icon={<DeleteIcon />}
                  onClick={() => deleteItem(item.id)}
                />
              </Checkbox>
            </Box>
          ))}
      </VStack>
    </Box>
  );
}
