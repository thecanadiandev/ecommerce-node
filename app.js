const express = require('express');
const app = express();


const start = async () => {
  const PORT = process.env.PORT || 5000;
 try {
  app.listen(PORT, () => {
   console.log('Server is running on port ' + PORT);
  });
 } catch (error) {
  console.log(error);
 }
};

start();