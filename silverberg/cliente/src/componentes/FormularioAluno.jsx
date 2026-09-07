import { useState } from 'react';
import styles from './FormularioAluno.module.css';
import axios from 'axios';

export default function FormularioAluno({ aoCadastrar }) {
    const [formulario, setFormulario] = useState({
        nome: '',
        email: '',
        telefone: '',
        dataNascimento: '',
        plano: '',
    })

    const [erros, setErros] = useState({})

    function atualizarCampo(evento) {
        const nomeCampo = evento.target.name;
        const valorDigitado = evento.target.value;

        setFormulario({ ...formulario, [nomeCampo]: valorDigitado, });
    }

    function cadastrarAluno() {
        const novosErros = {}
        let valido = true

        if (!formulario.nome.trim()) {
            novosErros.nome = "O nome é obrigatório."
            valido = false
        } else {
            const numeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
            let temNumero = false;

            for (let letra of formulario.nome) {
                if (numeros.includes(letra)) {
                    temNumero = true
                    break
                }
            }

            if (temNumero) {
                novosErros.nome = "O nome não pode ter números."
                valido = false
            }

            if (!formulario.email.trim()) {
                novosErros.email = "O e-mail é obrigatório."
                valido = false
            } else if (!formulario.email.includes("@") || !formulario.email.includes(".")) {
                novosErros.email = "O e-mail deve conter '@' e ao menos um ."
                valido = false
            }

            if (!formulario.telefone.trim()) {
                novosErros.telefone = "O telefone é obrigatório."
                valido = false
            } else if (isNaN(formulario.telefone)) {
                novosErros.telefone = "O telefone só pode conter números."
                valido = false
            } else if (formulario.telefone.length < 11) {
                novosErros.telefone = "O telefone deve ter no mínimo 11 dígitos com DDD."
                valido = false
            }

            if (!formulario.plano || formulario.plano === "") {
                novosErros.plano = "Selecione um plano válido."
                valido = false
            }

            setErros(novosErros);

            if (!valido) {
                return;
            }
        }

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
                <input type="text" name="nome" value={formulario.nome} onChange={atualizarCampo} className={erros.nome ? styles.inputErro : ""} placeholder='Ex: Gabriel Miguel'/>
                {erros.nome && <span className={styles.mensagemErro}>{erros.nome}</span>}
            </div>
            <div className={styles.campo}>
                <label>Email:</label>
                <input type="email" name="email" value={formulario.email} onChange={atualizarCampo} className={erros.email ? styles.inputErro : ""} placeholder='Ex: gabriel@email.com'/>
                {erros.email && <span className={styles.mensagemErro}>{erros.email}</span>}
            </div>
            <div className={styles.campo}>
                <label>Telefone:</label>
                <input type="tel" name="telefone" value={formulario.telefone} onChange={atualizarCampo} className={erros.telefone ? styles.inputErro : ""} placeholder='Ex: 11999999999'/>
                {erros.telefone && <span className={styles.mensagemErro}>{erros.telefone}</span>}
            </div>
            <div className={styles.campo}>
                <label>Data de Nascimento:</label>
                <input type="date" name="dataNascimento" value={formulario.dataNascimento} onChange={atualizarCampo} className={erros.dataNascimento ? styles.inputErro : ""}/>
                {erros.dataNascimento && (<span className={styles.mensagemErro}>{erros.dataNascimento}</span>)}
            </div>
            <div className={styles.campo}>
                <label>Plano:</label>
                <select name="plano" value={formulario.plano} onChange={atualizarCampo} className={erros.plano ? styles.inputErro : ""}>
                    <option value="">Selecione um plano</option>
                    <option value="Mensal">Mensal</option>
                    <option value="Trimestral">Trimestral</option>
                    <option value="Anual">Anual</option>
                </select>
                {erros.plano && <span className={styles.mensagemErro}>{erros.plano}</span>}
            </div>
            <button onClick={cadastrarAluno}>Cadastrar</button>
        </div>
    )
};