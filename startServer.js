// Start http server
import { app } from './server.js';

const PORT = process.env.SERVER_PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});