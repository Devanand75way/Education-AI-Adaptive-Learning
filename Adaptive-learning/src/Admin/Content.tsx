import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { Drawer, List, ListItem, ListItemText, TextField, Button, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";

export default function AdminPanel() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(null); // Track selected topic for editing

  // Fetch all topics
  const Alltopics = async () => {
    try {
      const result = await axios.get("http://localhost:5001/api/topic/");
      setTopics(result.data.data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  useEffect(() => {
    Alltopics();
  }, []);

  // Handle topic click (Load topic data into editor)
  const handleTopicClick = (topic) => {
    setTitle(topic.title);
    setContent(topic.content);
    setSelectedTopicId(topic._id); // Store topic ID for update operation
  };

  // Save or Update Topic
  const handleSubmit = async (id: number) => {
    try {
      if (selectedTopicId) {
        // If topic is selected, update it  /:id/update-content
        const result = await axios.put(`http://localhost:5001/api/topic/${id}/update-content`, {
          title,
          content,
        });
        console.log(result);
        alert("Topic Updated Successfully!");
      } else {
        // If no topic is selected, create new
        const result = await axios.post("http://localhost:5001/api/topic/create-topic", {
          title,
          content,
        });
        console.log(result);
        alert("Topic Added Successfully!");
      }
      
      setTitle("");
      setContent("");
      setSelectedTopicId(null);
      Alltopics(); // Refresh topics list
    } catch (error) {
      console.error("Error saving topic:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
        <List>
          {topics.map((topic, index) => (
            <ListItem button key={index} onClick={() => handleTopicClick(topic)}>
              <ListItemText primary={topic.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <Box sx={{ flexGrow: 1, p: 4, ml: 30 }}>
          <Typography variant="h4" gutterBottom>
            {selectedTopicId ? "Edit Java Learning Topic" : "Add Java Learning Topic"}
          </Typography>
          <TextField
            fullWidth
            label="Topic Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Editor
            apiKey="moefdh45khf52palu6kbdlh90yrhdftvu2y6w5pgbjba3b1z"
            value={content}
            init={{
              height: 300,
              width: 600,
              menubar: true,
              plugins: "lists link image code",
              toolbar:
                "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | code",
            }}
            onEditorChange={(newContent) => setContent(newContent)}
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleSubmit(selectedTopicId)}>
            {selectedTopicId ? "Update Topic" : "Save Topic"}
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}
