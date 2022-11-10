function dijkstra(graph) {
  let orderedClientsIndex = [0];

  for (let c = 0; c < graph.length - 1; c++) {
    //percorre os vertices
    let shortDistance = 999999999999999;
    let shortDistanceIndex;

    for (let c1 = 1; c1 < graph.length; c1++) {
      //percorre os vertices ligados aos vertices em questao

      if (
        graph[orderedClientsIndex[orderedClientsIndex.length - 1]][c1] != 0 &&
        graph[orderedClientsIndex[orderedClientsIndex.length - 1]][c1] <
          shortDistance &&
        orderedClientsIndex.indexOf(c1) == -1
      ) {
        shortDistance =
          graph[orderedClientsIndex[orderedClientsIndex.length - 1]][c1];
        shortDistanceIndex = c1;
      }
    } //verifica a aresta com menor peso, e se o seu vertice já não foi incluído

    orderedClientsIndex.push(shortDistanceIndex);
  }

  return orderedClientsIndex;
}

export default dijkstra;
