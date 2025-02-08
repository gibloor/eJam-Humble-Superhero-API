import express from 'express';
import cors from 'cors';

import superheroes from './modules/superheroes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/superheroes', superheroes);

app.listen(3001, () => {
  console.log('server has started on port 3001  ');
});