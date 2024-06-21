import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";

// editorRef: reference to the code editor component
// language: programming language selected for the code 
const Output = ({ editorRef, language }) => { 
  const toast = useToast(); // Toast is used for showing notifications
  const [output, setOutput] = useState(null); // State to store the output of the executed code
  const [isLoading, setIsLoading] = useState(false); //State to check whether api request is still processing
  const [isError, setIsError] = useState(false); // State to indicate if there was an error during code execution

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue(); // Retrieve source code from the editor reference
    if (!sourceCode) return;
    try {
      setIsLoading(true); // Indicate that code execution has started
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));  // Split the output by newline and update state
      result.stderr ? setIsError(true) : setIsError(false); // Set error state when there errors in executed code
    } catch (error) {
      // Log any errors to console and show a toast notification
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);  // Indicate that code execution has finished
    }
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>) //output result with newline
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};
export default Output;
