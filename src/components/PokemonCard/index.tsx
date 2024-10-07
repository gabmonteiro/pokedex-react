import { useState } from "react";
import '../../index.css';

export default function PokemonCard({
  name,
  types,
  img
}: {
  name: string;
  types: [];
  img: string;
}) {

  const [typesPokemon] = useState<any[]>(types);

  return (
    <div className="px-4 py-2 bg-white shadow-2xl rounded-md flex justify-between items-center h-36">
      <div>
        <p className="text-black-700 text-xl font-roboto">{name}</p>

        <div className="flex text-white">

          {typesPokemon.map((type, key) => (
            <p className={"px-1 py-0.5 rounded-lg "+type.type.name} key={key}>{type.type.name}</p>           
          ))}

        </div>
      </div>
          
      <div>
        <img src={img}></img>
      </div>
    </div>
    
  );
}
