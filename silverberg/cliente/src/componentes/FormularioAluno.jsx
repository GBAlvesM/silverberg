import { useState } from 'react'; 
import styles from './FormularioAluno.module.css';

export function FormularioAluno() {
    const [formulario, setFormulario] = useState({
        nome: '',
        email: '',
        telefone: '',
        dataNascimento: '',
        plano: '',
    })
};

function atualizarCampo(evento) {
    const nomeCampo = evento.target.name;
    const valorDigitado = evento.target.value;

    setFormulario({
        ...formulario,
        [nomeCampo]: valorDigitado,
    });
    
    return (
        <div className={styles.container}>
            <h2>Cadastro de Aluno</h2>
        </div>
    )
}