import { NextApiRequest, NextApiResponse } from "next";

let places: any[] = [];

export default function mapApi(req: NextApiRequest, res: NextApiResponse) {
  // handle GET /api/map
  if (req.method === "GET") {
    res.status(200).json({
      message:
        places.length > 0
          ? `${places.length} place(s) found`
          : "Places still empty",
      total: places.length,
      data: places,
    });
  }

  // handle POST /api/map
  if (req.method === "POST") {
    places = [...places, req.body];

    res.status(201).json({
      message: "A new place added",
      data: req.body,
    });
  }

  // handle DELETE /api/map?formatted_address={string}
  if (req.method === "DELETE") {
    if (!req.query.formatted_address) {
      res.status(422).send("formatted_address is needed in query");
    }

    const index = places.findIndex(
      ({ formatted_address }) =>
        formatted_address === req.query.formatted_address,
    );

    if (index > -1) {
      places = places.slice(0, index).concat(places.slice(index + 1));
      res.status(200).send(`${req.query.formatted_address} has been deleted`);
    } else {
      res.status(404).send(`${req.query.formatted_address} not found`);
    }
  }

  res.status(405).end();
}
