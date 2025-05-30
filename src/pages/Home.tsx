import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Pagination from "@mui/material/Pagination";
import NavBar from "../components/NavBar";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";

// Definir a interface fora do componente para evitar redeclaração
interface PokemonData {
  name: string;
  types: { slot: number; type: { name: string } }[];
  sprites: {
    front_default: string;
    other: {
      showdown: {
        front_default: string;
      };
    };
  };
}

//componentes da pagina from MUI
export default function Home() {
  //criando o state com todos os pokemons e para paginacao, function para mudar pagina
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [maxPage, setMaxPage] = useState<number>();
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(40);
  const [busca, setBusca] = useState<string>("");
  console.log(busca)

  //useEffect para fazer o http get quando for instanciado o componente
  useEffect(() => {
    getPokemonsPage();
  }, [currentPage, busca]);

  //funcao q pega pokemons para cada pagina
  const getPokemonsPage = () => {
    //pegando a quantidade total de pokemons e calculando o maximo de paginas
    axios.get("https://pokeapi.co/api/v2/pokemon/?limit=1302").then((res) => {
      const numeroMaximoPokemons = res.data.count;
      setMaxPage(Math.ceil(numeroMaximoPokemons / pokemonsPerPage));
      let endpoints: string[] = [];
      const lastPokemon = currentPage * pokemonsPerPage;
      const initialPokemon = lastPokemon - pokemonsPerPage + 1;

      //iterando pagina atual ou filtrando busca para coletar urls
      if (busca == "") {
        for (
          let i = initialPokemon;
          i <= lastPokemon && i <= numeroMaximoPokemons;
          i++
        ) {
          //corrigindo erro de id da pokeAPI e coletando infos
          if (i > 1025) {
            endpoints.push("https://pokeapi.co/api/v2/pokemon/" + (i + 8975));
          } else endpoints.push("https://pokeapi.co/api/v2/pokemon/" + i);
        }
      } else {
        endpoints = filterPokemons(res.data.results);
      }
      
      axios
        .all(endpoints.map((endpoint) => axios.get(endpoint)))
        .then((res) => {
          setPokemons(res.map((r) => r.data));
        });
    });
  };

  const filterPokemons = (pokemons: { name: string; url: string }[]) => {
    const pokemonsFiltradosUrls: string[] = [];
    for (let i = 0; i < pokemons.length; i++) {
      if (pokemons[i].name.startsWith(busca)) {
        pokemonsFiltradosUrls.push(pokemons[i].url);
      }
    }
    return pokemonsFiltradosUrls;
  }

  //troca pagina
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
    console.log("trocou");
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="xl" className="mt-10 mb-10">
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          className="mt-10 mb-10"
        >
          <SearchBar busca={busca} setBusca={setBusca}/>
        </Grid>
        <Grid
          container
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {pokemons.map((pokemon, key) => (
            <Grid key={key}>
              <PokemonCard
                name={pokemon.name}
                types={pokemon.types}
                img={pokemon.sprites.other.showdown.front_default}
                img2={pokemon.sprites.front_default}
                url={`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`}
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
