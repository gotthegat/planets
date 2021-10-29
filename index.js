const createApplication = async ({ root }) => {
  const films = await getFilms();

  const selectFilm = root.querySelector("#selectFilm");
  const grid = root.querySelector("#grid");

  //populate film dropdown list
  renderFilmOptions(selectFilm, films);

  selectFilm.addEventListener("change", async (e) => {
    // clear grid
    grid.innerHTML = "";
    console.log(films[e.target.selectedIndex]);
    planets = await getPlanets(films[e.target.selectedIndex]);
    console.log(planets);
    renderGrid(grid, planets);
  });

  //handle initial film selection
  let planets = await getPlanets(films[0]);
  renderGrid(grid, planets);
};

const renderGrid = (grid, planets) => {
  grid.innerHTML = "<table></table>";
  planets.forEach((planet, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td><a class="planet" id="${i}" href="#">${planet.name}</a></td>`;
    grid.appendChild(row);
  });
  // add event listeners
  document.querySelectorAll(".planet").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      // get details about planet into an object
      let selectedPlanet = planets[e.target.id];
      console.log(
        selectedPlanet.climate,
        selectedPlanet.name,
        selectedPlanet.residents,
        selectedPlanet.terrain
      );
    });
  });
};

const renderFilmOptions = (dropdown, films) => {
  films.forEach((film, i) => {
    const option = document.createElement("option");
    option.setAttribute("value", i);
    option.innerHTML = film.title;
    dropdown.appendChild(option);
  });
};

const getFilms = async () => {
  const resFilms = await axios.get("https://swapi.dev/api/films/");
  return resFilms.data.results;
};

const getPlanets = async ({ planets }) => {
  const planetObjects = [];
  for (let planet of planets) {
    const resPlanet = await axios.get(planet);
    planetObjects.push(resPlanet.data);
  }
  return planetObjects;
};

createApplication({
  root: document.querySelector("#app"),
});
