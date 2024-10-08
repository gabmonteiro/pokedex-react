import { useState } from "react";
import '../../index.css';

//cards dos pokemons feito com tailwind
export default function PokemonCard({
  name,
  types,
  img,
  img2
}: {
  name: string;
  types: [];
  img: string;
  img2: string;
}) {

  const [typesPokemon] = useState<any[]>(types);

  const testaImg = (img: any) => {
    if(img==null) {
      return img2;
    } else {
      return img
    }
  }

  return (
    <div className="px-4 py-2 bg-white shadow-2xl rounded-md flex flex-col justify-between items-center h-52 lg:h-36 lg:w-80 w-48 lg:flex-row">
      <div>
        <p className="text-black-700 text-xl font-roboto text-center lg:text-start">{name}</p>

        <div className="flex text-white justify-center lg:justify-start">

          {typesPokemon.map((type, key) => (
            <p className={"px-1 py-0.5 rounded-lg "+type.type.name} key={key}>{type.type.name}</p>           
          ))}

        </div>
      </div>
          
      <div>
        <img src={testaImg(img)}></img>
      </div>
    </div>
    
  );
}
