import pokedexLogo from "./logo.png";

//navbar feita com tailwind e svg logo
export default function NavBar() {
    return (
        <div className="flex items-center justify-center pt-5">
      <img src={pokedexLogo} className=""></img>
      </div>
    )
}