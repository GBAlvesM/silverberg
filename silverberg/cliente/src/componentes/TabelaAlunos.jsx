import styles from './TabelaAlunos.module.css';
import axios from 'axios';

export default function TabelaAlunos({listaAlunos, aoDeletar}) {
    if (listaAlunos.length === 0) {
        return <p>Nenhum aluno cadastrado</p>
    }

    function deletarAluno (id) {
        axios.delete(`http://localhost:8080/alunos/${id}`)
        .then(() => {
            alert('Aluno removido com sucesso!')
            if (aoDeletar) {
                aoDeletar()
            }
        })
        .catch(() => {
            alert('Erro ao excluir o aluno.')
        })
    }

    return (
        <div className={styles.container}>
            <h2>Alunos Matriculados</h2>
            <table className={styles.tabela}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Data de Nascimento</th>
                        <th>Plano</th>
                        <th>Situação do Cadastro</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listaAlunos.map((aluno) => (
                        <tr key={aluno.id}>
                            <td>{aluno.nome}</td>
                            <td>{aluno.email}</td>
                            <td>{aluno.telefone}</td>
                            <td>{aluno.dataNascimento}</td>
                            <td>{aluno.plano}</td>
                            <td><span className={aluno.situacaoCadastro ? styles.ativo : styles.inativo}>
                                </span>{aluno.situacaoCadastro ? 'Ativo' : 'Inativo'}
                            </td>
                            <td><button className={styles.botaoExcluir} onClick={() => deletarAluno(aluno.id, aluno.nome)}>X</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};