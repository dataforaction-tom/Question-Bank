    import React, { useState } from "react";
    import { FileUploader } from "react-drag-drop-files";
    import supabase from '../api/SupabaseClient';
    

    const fileTypes = ["MP4", "MVI", "AVI", "JPG"];

    

    function App() {
      const handleChange = async (file) => {
        const { data, error } = await supabase.storage
          .from("answers_data_uploads")
          .upload(`./${file.name}`, file);
        if (data) {
          console.log(data);
        } else {
          console.log(error);
        }
      };
      

      return (             
                  
        <FileUploader
          handleChange={(file) => handleChange(file)}
          name="video"
          types={fileTypes}
        />
      );
    }
    

    export default App;