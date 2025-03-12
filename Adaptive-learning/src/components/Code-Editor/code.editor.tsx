import React, { useState, useEffect } from "react";
import axios from "axios";
import MonacoEditor from "react-monaco-editor";
import { Button, Select, MenuItem, CircularProgress, Box, Switch, TextareaAutosize } from "@mui/material";
import { Navbar } from "../Hero-Section/Hero-section";

const JUDGE0_API_HOST = "judge0-ce.p.rapidapi.com";
const JUDGE0_API_KEY = "15d7f189d5msh61535eade645e4ap1ab045jsn515b76f566d6";

const languageOptions = [
  { id: 54, name: "C++", ext: "cpp" },
  { id: 50, name: "C", ext: "c" },
  { id: 62, name: "Java", ext: "java" },
  { id: 71, name: "Python", ext: "py" },
  { id: 63, name: "JavaScript", ext: "js" },
];

export default function CodeEditor() {
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState(62);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
    setCode("// Write your " + languageOptions.find((l) => l.id === language)?.name + " code here...");
  }, [language]);

  const submitCode = async () => {
    setLoading(true);
    setOutput("");

    try {
      const submissionResponse = await axios.post(
        `https://${JUDGE0_API_HOST}/submissions?base64_encoded=true&wait=false&fields=*`,
        {
          language_id: language,
          source_code: btoa(code),
          stdin: btoa(input),
        },
        {
          headers: {
            "X-RapidAPI-Host": JUDGE0_API_HOST,
            "X-RapidAPI-Key": JUDGE0_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );

      const token = submissionResponse.data.token;
      setTimeout(() => fetchOutput(token), 2000);
    } catch (error) {
      console.error("Error submitting code:", error);
      setLoading(false);
    }
  };

  const fetchOutput = async (token) => {
    try {
      const response = await axios.get(
        `https://${JUDGE0_API_HOST}/submissions/${token}?base64_encoded=true&fields=*`,
        {
          headers: {
            "X-RapidAPI-Host": JUDGE0_API_HOST,
            "X-RapidAPI-Key": JUDGE0_API_KEY,
          },
        }
      );

      if (response.data.status.id === 1 || response.data.status.id === 2) {
        setTimeout(() => fetchOutput(token), 2000);
      } else {
        console.log(response.data.stdout)
        setOutput(atob(response.data.stdout || "No Output"));
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching output:", error);
      setLoading(false);
    }
  };

  return (
     <>
     <Navbar/>
  <Box sx={{ display: "flex", height: "100vh", bgcolor: darkMode ? "#1e1e1e" : "#ffffff", color: darkMode ? "white" : "black"  , mt: 10}}>
      {/* Code Editor Section */}
      <Box sx={{ width: "50%", p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Select value={language} onChange={(e) => setLanguage(e.target.value)} sx={{ color: darkMode ? "white" : "black" }}>
            {languageOptions.map((lang) => (
              <MenuItem key={lang.id} value={lang.id}>{lang.name}</MenuItem>
            ))}
          </Select>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </Box>
        <MonacoEditor
          width="100%"
          height="400"
          language={languageOptions.find((l) => l.id === language)?.ext || "javascript"}
          theme={darkMode ? "vs-dark" : "light"}
          value={code}
          onChange={(newCode) => setCode(newCode)}
        />
        <TextareaAutosize
          minRows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Input (if needed)"
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        />
        <Button variant="contained" color="primary" onClick={submitCode} disabled={loading} sx={{ mt: 2 }}>
          {loading ? <CircularProgress size={24} /> : "Run Code"}
        </Button>
      </Box>
      
      {/* Output Section */}
      <Box sx={{ width: "50%", p: 2, bgcolor: darkMode ? "#252526" : "#f4f4f4", borderLeft: "2px solid gray" }}>
        <h3>Output</h3>
        <Box sx={{ p: 2, bgcolor: "#000", color: "#0f0", borderRadius: "5px", minHeight: "200px", fontFamily: "monospace" }}>
          <pre>{output || "Run the code to see output..."}</pre>
        </Box>
      </Box>
    </Box>
     </>
  );
}
