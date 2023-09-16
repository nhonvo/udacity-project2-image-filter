import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';
import { Request, Response } from 'express';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Implement a RESTful endpoint
  app.get("/filteredimage/", async (req: Request, res: Response) => {
    let { image_url }: any = req.query;
    if (!image_url) {
      return res.status(422).send(`Image URL is required!`);
    } else {
      filterImageFromURL(image_url)
        .then((result) => {
          res.sendFile(result);
          res.on(`finish`, () => deleteLocalFiles([result]));
        })
        .catch((err) => res.status(500).send(err))
    }
  });

  // Root Endpoint
  // Log message
  app.get("/", async (req, res) => {
    res.send("Try GET /filteredimage?image_url={{}}");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`Server running http://localhost:${port}`);
    console.log(`Press CTRL+C to stop the server`);
  });
})();
