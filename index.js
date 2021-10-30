const createApplication = async ({ root }) => {
  const films = await getFilms();

  const selectFilm = root.querySelector("#selectFilm");
  const grid = root.querySelector("#grid");

  //populate film dropdown list
  renderFilmOptions(selectFilm, films);

  selectFilm.addEventListener("change", async ({ target }) => {
    grid.innerHTML = ""; // clear grid
    root.querySelector("#details").innerHTML = ""; // clear form
    planets = await getPlanets(films[target.selectedIndex]);
    renderGrid(grid, planets);
  });

  //handle initial film selection
  let planets = await getPlanets(films[0]);
  renderGrid(grid, planets);
};

const renderFilmOptions = (dropdown, films) => {
  films.forEach((film, i) => {
    const option = document.createElement("option");
    option.setAttribute("value", i);
    option.innerHTML = film.title;
    dropdown.appendChild(option);
  });
};

const renderForm = async ({
  name,
  residents,
  orbital_period,
  rotation_period,
}) => {
  const details = document.querySelector("#details");
  const topResidents = residents.slice(0, 3);
  details.innerHTML = `
    <h1>${name}</h1>
    <form>
    <input id="orbital" value="${orbital_period}" /><br>
    <input id="rotation" value="${rotation_period}" /><br>
    ${await renderResidents(topResidents)}<br>
    <img src="${await getPlanetImage(name)}" />
    </form>
  `;
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
      let selectedPlanet = planets[e.target.id];
      // populate form
      renderForm(selectedPlanet);
      // sync form with object
    });
  });
};

const renderResidents = async (residents) => {
  let residentInputs = "";
  for (let resident of residents) {
    residentInputs += `<input value="${await getResident(resident)}"><br>`;
  }
  return residentInputs;
};

const getFilms = async () => {
  const resFilms = await axios.get("https://swapi.dev/api/films/");
  return resFilms.data.results;
};

const getPlanetImage = async (name) => {
  const imageSearch = `https://serpapi.com/search.json?engine=google&q=${name}&api_key=14bcaedc71f667f79d03f61cb646f5cbd800ed41def4e72ac5e9c6ad1e4889ff`;
  const resImage = await axios.get(imageSearch);
  console.log(resImage);
};

const getPlanets = async ({ planets }) => {
  const planetObjects = [];
  for (let planet of planets) {
    const resPlanet = await axios.get(planet);
    planetObjects.push(resPlanet.data);
  }
  return planetObjects;
};

const getResident = async (resident) => {
  const resResident = await axios.get(resident);
  return resResident.data.name;
};

createApplication({
  root: document.querySelector("#app"),
});
