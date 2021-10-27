const createApplication = async ({ root }) => {
  // const resFilms = await axios.get("https://swapi.dev/api/films/");
  // const films = resFilms.data.results;
  const films = await getFilms();

  const filmOptions = [];
  films.forEach((film, i) => {
    filmOptions.push(`<option value="${i}">${film.title}</option>`);
  });

  const filmString = filmOptions.join("");

  root.innerHTML = `
    <select id="selectFilm">
      ${filmString}
    </select>
  `;

  //get planets for film 0
  const planets = await getPlanets(films[0]);
};

const getFilms = async () => {
  const resFilms = await axios.get("https://swapi.dev/api/films/");
  return resFilms.data.results;
};

const getPlanets = async ({ planets }) => {
  console.log(planets);
  for (let planet of planets) {
    const resPlanet = await axios.get(planet);
    console.log(resPlanet.data);
  }
  // return an array of planet objects
};

buildApp = async (root) => {
  const resFilms = await axios.get("https://swapi.dev/api/films/");
  const films = resFilms.data.results;

  const filmOptions = [];
  films.forEach((film, i) => {
    filmOptions.push(`<option value="${i}">${film.title}</option>`);
  });

  const filmString = filmOptions.join("");

  root.innerHTML = `
    <select id="filmSelect">
      ${filmString}
    </select>
  `;

  document
    .querySelector("#filmSelect")
    .addEventListener("change", async (e) => {
      const choice = e.target.options.selectedIndex;
      console.log(films[choice]);
      //const resPlanets = await axios.get(``);
    });
};

createApplication({
  root: document.querySelector("#app"),
});
