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
    msg: `Cliente ${client.name} criado com sucesso!`,
  });
}

export async function createRoute(req, res) {
  let clients = req.body;
  let generatedGraph = await graph(clients);

  if (generatedGraph.statusCode === 502) {
    res.json(generatedGraph);
    return;
  }

  let orderedClientsIndex = dijkstra(generatedGraph);
  let orderedClients = [];

  for (let c = 0; c < orderedClientsIndex.length; c++) {
    orderedClients.push(clients[orderedClientsIndex[c]]);
  }

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
    msg: `Dados do cliente ${client.name} atualizados com sucesso!`,
  });
}

export async function deleteClient(req, res) {
  let id = req.params.id;
  openDb().then((db) => {
    db.get("DELETE FROM Client WHERE id=?", [id]);
  });
  res.json({
    statusCode: 200,
    msg: `Cliente de id = ${id} exluído(a) com sucesso!`,
  });
}
