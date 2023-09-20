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

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */
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
  //! END @TODO1
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
