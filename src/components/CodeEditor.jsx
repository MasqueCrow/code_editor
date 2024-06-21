import { useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

// CodeEditor component that includes the editor and output display
const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript"); //set default language

  // Function called when the Editor component is mounted
  // It sets the editorRef and focuses on the editor
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // It updates the language state and 
  //sets the editor's value to the corresponding code snippet
  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Box>
      {/* HStack for horizontal stacking of components with spacing */}
      <HStack spacing={4}>
      {/* Box containing the LanguageSelector and Editor components */}
        <Box w="50%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>
        {/* Output component displays execution result of code written in Editor */}
        <Output editorRef={editorRef} language={language} />
      </HStack>
    </Box>
  );
};
export default CodeEditor;
