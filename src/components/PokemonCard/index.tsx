import { useState } from "react";
import '../../index.css';
import axios from "axios";

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { slot: number; type: { name: string; url: string } }[];
  abilities: { ability: { name: string; url: string }; is_hidden: boolean; slot: number }[];
  stats: { base_stat: number; stat: { name: string } }[];
  moves: { move: { name: string; url: string } }[];
  species: { name: string; url: string };
  sprites: {
    front_default: string;
    other?: { showdown?: { front_default?: string } }
  };
}

//cards dos pokemons feito com tailwind
export default function PokemonCard({
  name,
  types,
  img,
  img2,
  url
}: {
  name: string;
  types: { slot: number; type: { name: string } }[];
  img: string;
  img2: string;
  url: string;
}) {

  const [typesPokemon] = useState<{ slot: number; type: { name: string } }[]>(types);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(false);

  const testaImg = (img: string | null) => {
    if(img==null) {
      return img2;
    } else {
      return img
    }
  }

  const handleCardClick = async () => {
    setOpen(true);
    setLoading(true);
    try {
      const res = await axios.get(url);
      setDetails(res.data as PokemonDetails);
    } catch {
      setDetails(null);
    }
    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
    setDetails(null);
  };

  return (
    <>
      <div className="px-4 py-2 bg-white shadow-2xl rounded-2xl flex flex-col justify-between items-center h-52 lg:h-36 lg:w-80 w-40 lg:flex-row cursor-pointer" onClick={handleCardClick}>
        <div>
          <p className="text-black-700 text-lg font-roboto text-center lg:text-start lg:text-xl">{name}</p>

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
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-0 w-full max-w-2xl relative overflow-hidden">
            <button className="absolute top-2 right-4 text-2xl" onClick={handleClose}>&times;</button>
            <div className="flex flex-row w-full h-full">
              {/* Informações */}
              <div className="flex-1 p-6 flex flex-col justify-center" style={{ background: `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url('/bg-image.jpg')`, backgroundSize: 'cover' }}>
                {loading && <p>Carregando...</p>}
                {details && (
                  <>
                    <h2 className="text-2xl font-bold mb-2 capitalize">{details.name}</h2>
                    <div className="flex gap-2 mb-2">
                      {details.types.map((type, key) => (
                        <span className={"px-2 py-1 rounded-lg text-white "+type.type.name} key={key}>{type.type.name}</span>
                      ))}
                    </div>
                    <div className="text-left w-full mt-2">
                      <p><b>ID:</b> {details.id}</p>
                      <p><b>Altura:</b> {details.height}</p>
                      <p><b>Peso:</b> {details.weight}</p>
                      <p><b>Habilidades:</b> {details.abilities.map((a) => a.ability.name).join(', ')}</p>
                      <p><b>Status:</b> {details.stats.map((s) => `${s.stat.name}: ${s.base_stat}`).join(', ')}</p>
                      <p><b>Movimentos:</b> {details.moves.slice(0,5).map((m) => m.move.name).join(', ')}{details.moves.length > 5 ? '...' : ''}</p>
                      <p><b>Espécie:</b> {details.species?.name}</p>
                    </div>
                  </>
                )}
              </div>
              {/* Imagem */}
              <div className="flex items-center justify-center p-6 bg-white" style={{ minWidth: '220px' }}>
                {details && (
                  <img src={testaImg(details.sprites?.other?.showdown?.front_default || details.sprites?.front_default || img)} className="w-40 h-40 object-contain" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
