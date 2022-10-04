import { openDb } from "../configDB.js";

export async function createTable() {
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Client (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, reference TEXT, contact TEXT, address TEXT, city TEXT, lat TEXT, lon TEXT, extraInfos TEXT)');
    });
};

export async function selectClients(req, res) {
    const city = req.query.city;
    if (city) {
        openDb().then(db => {
            db.all('SELECT * FROM Client WHERE city=?', city)
                .then(clients => res.json(clients));
        });
    } else {
        openDb().then(db => {
            db.all('SELECT * FROM Client')
                .then(clients => res.json(clients));
        });
    }
};

export async function selectClient(req, res) {
    let id = req.params.id;
    openDb().then(db => {
        db.get('SELECT * FROM Client WHERE id=?', [id])
            .then(client => res.json(client));
    });
};

export async function insertClient(req, res) {
    let client = req.body;
    openDb().then(db => {
        db.run('INSERT INTO Client (name, reference, contact, address, city, lat, lon, extraInfos) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [client.name, client.reference, client.contact, client.address, client.city, client.lat, client.lon, client.extraInfos]);
    });
    res.json({
        "statusCode": 200
    });
};

export async function updateClient(req, res) {
    let client = req.body;
    openDb().then(db => {
        db.run('UPDATE Client SET name=?, reference=?, contact=?, address=?, city=?, lat=?, lon=?, extraInfos=? WHERE id=?', [client.name, client.reference, client.contact, client.address, client.city, client.lat, client.lon, client.extraInfos, client.id]);
    });
    res.json({
        "statusCode": 200
    });
};

export async function deleteClient(req, res) {
    let id = req.params.id;
    openDb().then(db => {
        db.get('DELETE FROM Client WHERE id=?', [id])
            .then(res => res);
    });
    res.json({
        "statusCode": 200
    });
};