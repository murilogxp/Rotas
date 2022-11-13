import axios from "axios";

const GOOGLE_MAPS_API_KEY = "AIzaSyCZLR2bqK7uTI8EsLBP8kSoxH34QYyBMx4";
const axs = axios;
let routeUrl = {
  method: "get",
  url: "",
  headers: {},
};

async function graph(clients) {
  const returnData = [];
  const clientsLocales = [];

  clients.forEach((client) => {
    clientsLocales.push({
      id: client.id,
      lat: client.lat,
      lng: client.lng,
    });
  });

  for (let c = 0; c < clients.length; c++) {
    let aux = [];

    for (let c1 = 0; c1 < clients.length; c1++) {
      routeUrl.url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${clientsLocales[c].lat},${clientsLocales[c].lng}&destinations=${clientsLocales[c1].lat},${clientsLocales[c1].lng}&units=metric&key=${GOOGLE_MAPS_API_KEY}`;

      try {
        await axs(routeUrl).then((response) => {
          aux.push(response.data.rows[0].elements[0].distance.value);

          // console.log(
          //   `${c} ${c1} (${clientsLocales[c].id}) + (${clientsLocales[c1].id}) -> ${response.data.rows[0].elements[0].distance.text}`
          // );
        });
      } catch (error) {
        return {
          statusCode: 502,
          msg: "Não foi possível criar uma rota com os pontos selecionados. Por favor, verifique-os, e tente novamente",
        };
      }
    }

    returnData.push(aux);
  }

  return returnData;
}

export default graph;
