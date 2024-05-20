import express from 'express';

export function setupServer() {

    const app = express();
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}
  //  const app = express();

 //   const PORT = 3000;

//   app.listen(PORT, () => {
//        console.log(`Server is running on port ${PORT}`);
 //   })



