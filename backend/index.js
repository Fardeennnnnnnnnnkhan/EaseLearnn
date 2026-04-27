// import express from 'express';
// import dotenv from 'dotenv';
// import { connectDb } from './database/db.js';
// import userRoute from './routes/user.js';
// import courseRoute from './routes/course.js';
// import adminRoute from './routes/admin.js'
// import cors from 'cors'
// import path from 'path'

// dotenv.config();
// const app = express();
// app.use(express.json())
// app.use(cors())

// const _dirname = path.resolve();


// // app.get('/' , (req, res) => {

// //   res.send('Fardeen Khan');
// // });

// app.use('/uploads' , express.static("uploads"))

// app.use('/api', userRoute);
// app.use('/course', courseRoute); 
// app.use('/admin', adminRoute);

// app.use(express.static(path.join(_dirname , "frontend/eLearning/dist")));
// app.get('*' ,(req ,res)=>{
//   res.sendFile(path.resolve(_dirname , "frontend/eLearning" , "dist" , "index.html"))
// })

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`App listening on http://localhost:${port}`);
//   connectDb(); 
// });
import 'dotenv/config';
import express from 'express';
import { connectDb } from './database/db.js';
import userRoute from './routes/user.js';
import courseRoute from './routes/course.js';
import adminRoute from './routes/admin.js';
import paymentRoute from './routes/payment.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { webhook } from './controller/paymentController.js';

const app = express();

// Stripe Webhook MUST be placed BEFORE express.json()
app.post('/api/payment/webhook', express.raw({ type: 'application/json' }), webhook);

app.use(express.json());
app.use(cors());

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static uploads
app.use('/uploads', express.static("uploads"));

// API Routes
app.use('/api', userRoute);
app.use('/course', courseRoute); 
app.use('/admin', adminRoute);
app.use('/api/payment', paymentRoute);

// Fix the frontend path
const frontendPath = path.join(__dirname, "../frontend/dist");
console.log("Serving frontend from:", frontendPath);
app.use(express.static(frontendPath));

app.get('*', (req, res) => { 
  res.sendFile(path.join(frontendPath, "index.html"));
});

connectDb(); 

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
