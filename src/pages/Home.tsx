import { Container } from "@mui/material";
import Grid from "@mui/material/Grid2";
import NavBar from "../components/NavBar";
import PokemonCard from "../components/PokemonCard";
import axios from "axios";
import { useEffect, useState } from "react";

//componentes da pagina from MUI
export default function Home() {
  //criando o state com todos os pokemons
  const [pokemons, setPokemons] = useState<any[]>([]);

  //useEffect para fazer o http get quando for instanciado o componente
  useEffect(() => {
    getPokemons();
  }, []);

  //funcao utilizada no useEffect
  const getPokemons = () => {
    let endpoints = [];
    for (var i = 1; i <= 1000; i++) {
      endpoints.push("https://pokeapi.co/api/v2/pokemon/" + i);
    }
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => {
      setPokemons(res);
    });
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="xl" className="mt-10">
        <Grid container spacing={2} justifyContent={"center"} alignItems={"center"}>
          {pokemons.map((pokemon, key) => (
            <Grid key={key}>
              <PokemonCard name={pokemon.data.name} types={pokemon.data.types} img={pokemon.data.sprites.other.showdown.front_default} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
