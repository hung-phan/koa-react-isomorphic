import 'babel-polyfill';
import app from './server-index';

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
