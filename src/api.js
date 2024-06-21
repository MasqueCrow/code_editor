import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

// send POST request to piston API to execute source code
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

// Function to execute source code using the piston API
// language: the programming language to execute
// sourceCode: the actual source code to run
export const executeCode = async (language, sourceCode) => {
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language], // Language version from constants file
    files: [
      {
        content: sourceCode, // Source code to be executed
      },
    ],
  });
  return response.data; // Return the data from the response
};
