import { port } from "./config";
import app from "./app";

app.listen(port, () => {
  // TODO: add logging
  console.log(`server is listening on port ${port}`);
});
