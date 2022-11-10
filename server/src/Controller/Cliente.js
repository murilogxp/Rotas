import { openDb } from "../configDB.js";
import dijkstra from "./Dijkstra.js";
import graph from "./Graph.js";

export async function createTable() {
  openDb().then((db) => {
    db.exec(
      "CREATE TABLE IF NOT EXISTS Client (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, reference TEXT, contact TEXT, address TEXT, city TEXT, lat TEXT, lng TEXT, extraInfos TEXT)"
    );
  });
}

export async function selectClients(req, res) {
  const city = req.query.city;
  if (city) {
    openDb().then((db) => {
      db.all("SELECT * FROM Client WHERE city=? ORDER BY name", city).then(
        (clients) => res.json(clients)
      );
    });
  } else {
    openDb().then((db) => {
      db.all("SELECT * FROM Client ORDER BY name").then((clients) =>
        res.json(clients)
      );
    });
  }
}

export async function selectClient(req, res) {
  let id = req.params.id;
  openDb().then((db) => {
    db.get("SELECT * FROM Client WHERE id=?", [id]).then((client) =>
      res.json(client)
    );
  });
}

export async function insertClient(req, res) {
  let client = req.body;
  openDb().then((db) => {
    db.run(
      "INSERT INTO Client (name, reference, contact, address, city, lat, lng, extraInfos) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        client.name,
        client.reference,
        client.contact,
        client.address,
        client.city,
        client.lat,
        client.lng,
        client.extraInfos,
      ]
    );
  });
  res.json({
    statusCode: 200,
  });
}

export async function createRoute(req, res) {
  let clients = req.body;
  let generatedGraph = await graph(clients);
  // let generatedGraph = [
  //   [0, 11963, 2808, 2529, 2252],
  //   [11328, 0, 10237, 13258, 10476],
  //   [3393, 11139, 0, 8101, 1537],
  //   [2244, 14450, 6524, 0, 6033],
  //   [2069, 11321, 1551, 8283, 0],
  // ];
  let orderedClientsIndex = dijkstra(generatedGraph);
  let orderedClients = [];

  for (let c = 0; c < orderedClientsIndex.length; c++) {
    orderedClients.push(clients[orderedClientsIndex[c]]);
  }

  //console.log(orderedClientsIndex);
  //console.log(orderedClients);

  res.json(orderedClients);
}

export async function updateClient(req, res) {
  let client = req.body;
  openDb().then((db) => {
    db.run(
      "UPDATE Client SET name=?, reference=?, contact=?, address=?, city=?, lat=?, lng=?, extraInfos=? WHERE id=?",
      [
        client.name,
        client.reference,
        client.contact,
        client.address,
        client.city,
        client.lat,
        client.lng,
        client.extraInfos,
        client.id,
      ]
    );
  });
  res.json({
    statusCode: 200,
  });
}

export async function deleteClient(req, res) {
  let id = req.params.id;
  openDb().then((db) => {
    db.get("DELETE FROM Client WHERE id=?", [id]).then((res) => res);
  });
  res.json({
    statusCode: 200,
  });
}
