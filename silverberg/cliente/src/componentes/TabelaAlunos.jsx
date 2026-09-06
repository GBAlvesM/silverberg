import styles from './TabelaAlunos.module.css';

export default function TabelaAlunos({listaAlunos}) {
    if (listaAlunos.length === 0) {
        return <p>Nenhum aluno cadastrado</p>
    }

    return (
        <div className={styles.container}>
            <h2>Alunos Matriculados</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Data de Nascimento</th>
                        <th>Plano</th>
                        <th>Situação do Cadastro</th>
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
                                </span>{aluno.situacaoCadastro ? 'Ativo' : 'Inativo'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};