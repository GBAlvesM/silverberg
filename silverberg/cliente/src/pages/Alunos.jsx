    import { useState, useEffect } from "react";
    import axios from "axios";
    import FormularioAluno from "../componentes/FormularioAluno";
    import TabelaAlunos from "../componentes/TabelaAlunos";
    import styles from "./Alunos.module.css";

    export default function Alunos() {
        const [alunos, setAlunos] = useState([])

        function buscarAlunos() {
            axios.get('http://localhost:8080/alunos')
            .then((resposta) => {
                setAlunos(resposta.data)
            })
            .catch((erro) => {
                console.error('Erro ao buscar alunos: ', erro)
            })
        }

        useEffect(() => {
            buscarAlunos();
        }, [])

        return (
            <div className={styles.container}>
                <header className={styles.cabecalho}>
                    <h1>Sistema de Gestão - Silverberg</h1>
                </header>

                <main className={styles.conteudo}>
                    <FormularioAluno aoCadastrar={buscarAlunos} />
                    <TabelaAlunos listaAlunos={alunos} />
                </main>
            </div>
        )
    }
