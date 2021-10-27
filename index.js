const createApplication = async ({ root }) => {
  const films = await getFilms();

  const selectFilm = root.querySelector("#selectFilm");
  const grid = root.querySelector("#grid");

  //populate film dropdown list
  films.forEach((film, i) => {
    const option = document.createElement("option");
    option.setAttribute("value", i);
    option.innerHTML = renderFilmOption(film.title);
    selectFilm.appendChild(option);
  });

  selectFilm.addEventListener("change", (e) => {
    console.log(e);
  });

  //get planets for film 0
  const planets = await getPlanets(films[0]);
  console.log(planets);

  //place planets in grid - move this to a function
  grid.innerHTML = "<table></table>";
  planets.forEach((planet, i) => {
    const row = document.createElement("tr");
    row.innerHTML = renderGrid(planet.name, i);
    grid.appendChild(row);
  });
};

const renderGrid = (planetName, i) => {
  return `
    <td><a href="${i}">${planetName}</a></td>
  `;
};

const renderFilmOption = (title) => {
  return `
    ${title}
  `;
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

// buildApp = async (root) => {
//   const resFilms = await axios.get("https://swapi.dev/api/films/");
//   const films = resFilms.data.results;

//   const filmOptions = [];
//   films.forEach((film, i) => {
//     filmOptions.push(`<option value="${i}">${film.title}</option>`);
//   });

//   const filmString = filmOptions.join("");

//   root.innerHTML = `
//     <select id="filmSelect">
//       ${filmString}
//     </select>
//   `;

//   document
//     .querySelector("#filmSelect")
//     .addEventListener("change", async (e) => {
//       const choice = e.target.options.selectedIndex;
//       console.log(films[choice]);
//       //const resPlanets = await axios.get(``);
//     });
// };

createApplication({
  root: document.querySelector("#app"),
});
