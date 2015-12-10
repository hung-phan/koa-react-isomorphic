import 'babel/polyfill';
import 'app/client/components/todos/todos-body/todos-body.css';
import app from './server-init';

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
