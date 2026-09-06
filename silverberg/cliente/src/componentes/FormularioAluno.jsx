import { useState } from 'react'; 
import styles from './FormularioAluno.module.css';
import axios from 'axios';

export default function FormularioAluno( {aoCadastrar}) {
    const [formulario, setFormulario] = useState({
        nome: '',
        email: '',
        telefone: '',
        dataNascimento: '',
        plano: '',
    })
    
    function atualizarCampo(evento) {
        const nomeCampo = evento.target.name;
        const valorDigitado = evento.target.value;
        
        setFormulario({...formulario, [nomeCampo]: valorDigitado,});
    }

    function cadastrarAluno() {
        axios.post('http://localhost:8080/alunos', formulario)
        .then((resposta) => {
            alert('Aluno cadastrado com sucesso');
            if (aoCadastrar) {
                aoCadastrar();
            }
            setFormulario({
                nome: '',
                email: '',
                telefone: '',
                dataNascimento: '',
                plano: '',
            })
        })
        .catch((erro) => {
            if (erro.response && erro.response.status === 400) {
                alert('Preencha todos os campos obrigatórios');
            } else if (erro.response && erro.response.status === 409) {
                alert('Aluno já cadastrado');
            } else {
                alert('Erro ao cadastrar aluno');
            }
        })
    }
        
        return (
            <div className={styles.container}>
            <h2>Cadastro de Aluno</h2>
            <div className={styles.campo}>
                <label>Nome:</label>
                <input type="text" name="nome" value={formulario.nome} onChange={atualizarCampo} />
            </div>
            <div className={styles.campo}>
                <label>Email:</label>
                <input type="email" name="email" value={formulario.email} onChange={atualizarCampo} />
            </div>
            <div className={styles.campo}>
                <label>Telefone:</label>
                <input type="tel" name="telefone" value={formulario.telefone} onChange={atualizarCampo} />
            </div>  
            <div className={styles.campo}>
                <label>Data de Nascimento:</label>
                <input type="date" name="dataNascimento" value={formulario.dataNascimento} onChange={atualizarCampo} />
            </div>
            <div className={styles.campo}>
                <label>Plano:</label>
                <select name="plano" value={formulario.plano} onChange={atualizarCampo}>
                    <option value="">Selecione um plano</option>
                    <option value="Mensal">Mensal</option>
                    <option value="Trimestral">Trimestral</option>
                    <option value="Anual">Anual</option>
                </select>
            </div>
            <button onClick={cadastrarAluno}>Cadastrar</button>
        </div>
    )
};