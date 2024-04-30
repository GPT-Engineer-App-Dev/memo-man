import { useState } from 'react';
import { Box, Button, Flex, Input, Text, useToast, VStack } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Note = ({ note, onDelete, onEdit }) => (
  <Flex p={4} boxShadow="md" borderRadius="lg" alignItems="center" justifyContent="space-between">
    <Text>{note.text}</Text>
    <Box>
      <Button size="sm" onClick={() => onEdit(note)} mr={2}>
        <FaEdit />
      </Button>
      <Button size="sm" onClick={() => onDelete(note.id)} colorScheme="red">
        <FaTrash />
      </Button>
    </Box>
  </Flex>
);

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const handleAddNote = () => {
    if (input.trim() === '') {
      toast({
        title: 'Error',
        description: "Note can't be empty",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newNote = { id: Date.now(), text: input };
    setNotes([...notes, newNote]);
    setInput('');
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleEditNote = (editedNote) => {
    const updatedNotes = notes.map(note => {
      if (note.id === editedNote.id) {
        return { ...note, text: editedNote.text };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <VStack spacing={4} p={4}>
      <Input
        placeholder="Add a new note..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        size="lg"
      />
      <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddNote}>
        Add Note
      </Button>
      <VStack spacing={4} w="full">
        {notes.map(note => (
          <Note key={note.id} note={note} onDelete={handleDeleteNote} onEdit={handleEditNote} />
        ))}
      </VStack>
    </VStack>
  );
};

export default Index;