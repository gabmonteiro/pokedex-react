import { styled, TextField } from "@mui/material";

const SearchBarStyled = styled(TextField)({
    '& label.Mui-focused': {
      color: '#808080',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#404040',
      },
      '&:hover fieldset': {
        borderColor: '#808080',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#808080',
      },
    },
  });
  
export default function SearchBar({busca, setBusca}: {busca: string; setBusca: React.Dispatch<React.SetStateAction<string>>; }) {
    return (
        <SearchBarStyled label="Pesquisar" variant="outlined" value={busca} onChange={(ev) => {setBusca(ev.target.value)}} />
    )
}