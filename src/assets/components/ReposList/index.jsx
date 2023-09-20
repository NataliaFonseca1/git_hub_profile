import { useEffect } from "react";
import { useState } from "react";
import styles from './ReposList.module.css'

const ReposList =({ nomeUsuario }) => {

  const [repos, setRepos] = useState([]);
  const [estaCarregando, setEstaCarregando] = useState(true)
  const [erro, setErro]=useState(null);

  useEffect(() =>{
    setEstaCarregando(true)
    setErro(null);

    fetch (`https://api.github.com/users/${nomeUsuario}/repos`)
    .then ((res) =>{
      if (!res.ok){
        throw new Error (`Erro ao buscar repositórios: ${res.status}`);
      }
  
      return res.json();
    })
   
    .then(resJson=>{
      console.log(resJson)
      setTimeout(()=>{
        setEstaCarregando(false);
        setRepos(resJson)
      },3000);
     
    })
    .catch((error)=>{
      alert(`Erro na requisição ${error.message}, tente novamente`)
      setEstaCarregando(false);
      setError (error.message);
    });
  },[nomeUsuario]);

  return(
    <div className="container">
    {estaCarregando ?(
      <h1>Carregando..</h1>
    ): erro ? (
      <div>
      <p>Ocorreu um erro</p>
      <p>{erro}</p>
      </div>
    )  : (
    <ul className={styles.list}>
      {repos.map(({id, name, language, html_url}) =>(

        <li className={styles.listItem} key={id}>
          <div className={styles.itemName}>
          <b>Nome:</b> {name}
          </div>
         <div className={styles.itemLanguage}>
         <b>Linguagem:</b> {language}
         </div>
          <a className={styles.itemLink} target="_blank" href={html_url}> Visitar no GitHub</a>
        </li>
      ))}
    </ul>
    )}
  
   </div>
  )
      }   
  export default ReposList;


