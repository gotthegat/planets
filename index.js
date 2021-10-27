buildFilmSelector = async (root) => {
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

const filmSelector = document.querySelector("#filmPlace");
buildFilmSelector(filmSelector);
