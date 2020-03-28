import React,{useState, useEffect} from 'react';
import logoImg from '../../assets/logo.svg';
import  {Link, useHistory} from 'react-router-dom';
import {FiPower,FiTrash2} from 'react-icons/fi';
import './style.css'
import api from '../../services/api'
export default function Profile(){
    const [incidents,setIncidents] = useState([]); 
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();
    //use effect se tivesse algo dentro de [] atualizaria sempre q mudasse o valor. Se estiver vazio,
    //atualiza uma unica vez quando carrega

    //e necessario enviar os headers junto dos requests da api em delete pois foram setados como validacao de ong pelo id
    
    //no botao existe uma funcao vazia () => para fazer a chamada apenas no click e executar apenas 1 delete
    //caso nao fosse a função vazia, receberia o retorno da função delete e deletaria tudo
    useEffect(() => {
        api.get('profile',{
            headers:{
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);


    async function handleDeleteElement(id){
        try{
            await api.delete(`incidents/${id}`,{
                headers: {
                    Authorization: ongId,
            }
           
            });
            setIncidents(incidents.filter(incident =>incident.id != id)); //atualiza a pagina async
        }
        
        catch{
            alert("Erro ao deletar")
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');

    }

//dentro de um map é importante ter uma Key com um valor unico pra que o mapeamento nao se repita,
//foi usado o ID do incident para diferenciar
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to='/incidents/new'>Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color = "#e02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul> 
                {incidents.map(incident =>(
                    <li key={incident.id}>  
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR</strong>
                        <p>{Intl.NumberFormat('pt-BR',{style:'currency', currency:'BRL'}).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteElement(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>                    
                ))}
            </ul>
        </div>
    )
}