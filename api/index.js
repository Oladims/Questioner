import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', routes);
app.use(express.static('UI'));
app.use(bodyParser.json());
app.use('/UI', express.static(path.resolve(__dirname, '../../UI/')));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

app.all('/*', (req, res) => res.status(404).send({ message: 'Request is not valid' }));

const port = process.env.PORT || 8000;

app.listen(port);

export default app;
