import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import NavBar from "../components/NavBar";
import PokemonCard from "../components/PokemonCard";

//componentes da pagina from MUI
export default function Home() {
  //criando o state com todos os pokemons e para paginacao, function para mudar pagina
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [maxPage, setMaxPage] = useState<number>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(40);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    console.log("trocou");
  };

  //useEffect para fazer o http get quando for instanciado o componente
  useEffect(() => {
    getNumberPokemons();
    getPokemonsPage();
  }, [currentPage]);

  //funcoes utilizadas no useEffect
  const getNumberPokemons = () => {};

  //funcao q pega pokemons para cada pagina
  const getPokemonsPage = () => {
    //pegando a quantidade total de pokemons e calculando o maximo de paginas
    axios.get("https://pokeapi.co/api/v2/pokemon/").then((res) => {
      let numeroMaximoPokemons = res.data.count;
      setMaxPage(Math.ceil(res.data.count / pokemonsPerPage));
      let endpoints = [];
      let lastPokemon = currentPage * pokemonsPerPage;
      let initialPokemon = lastPokemon - pokemonsPerPage + 1;

      for (
        let i = initialPokemon;
        i <= lastPokemon && i <= numeroMaximoPokemons;
        i++
      ) {
        //corrigindo erro de id da pokeAPI
        if (i > 1025) {
          endpoints.push("https://pokeapi.co/api/v2/pokemon/" + (i + 8975));
        } else endpoints.push("https://pokeapi.co/api/v2/pokemon/" + i);
      }
      axios
        .all(endpoints.map((endpoint) => axios.get(endpoint)))
        .then((res) => {
          setPokemons(res);
        });
    });
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="xl" className="mt-10 mb-10">
        <Grid
          container
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {pokemons.map((pokemon, key) => (
            <Grid key={key}>
              <PokemonCard
                name={pokemon.data.name}
                types={pokemon.data.types}
                img={pokemon.data.sprites.other.showdown.front_default}
                img2={pokemon.data.sprites.front_default}
              />
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          className="mt-10 mb-10"
        >
          <Pagination
            count={maxPage}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          />
        </Grid>
      </Container>
    </div>
  );
}
