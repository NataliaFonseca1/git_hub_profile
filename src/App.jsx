import { useState } from "react"
import Perfil from './assets/components/Perfil'
import ReposList from "./assets/components/ReposList";

function App (){
  
  const [nomeUsuario, setNomeUsuario]=useState(' ')
  return(
<>
<h1>Insira o nome do Usuário que deseja pesquisar: </h1>
<input type="text" onBlur={(e) => setNomeUsuario(e.target.value)}></input>

{nomeUsuario.length > 4 &&(
<>
  <Perfil nomeUsuario={nomeUsuario}/>
  <ReposList nomeUsuario={nomeUsuario}/>
</>
)}

</>


  )

}


export default App
