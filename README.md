# 🏋️ Silverberg Academia - Sistema de Gestão de Alunos

Aplicação web desenvolvida para cadastro, listagem e remoção de alunos da Silverberg Academia. O foco do projeto foi construir uma página integrada a uma API REST, utilizando SQL nativo no back-end e componentização no front-end.

---

## 🛠️ Tecnologias Utilizadas

### Front-end
- **React (com Vite)**
- **JavaScript**
- **CSS Modularizado**
- **Axios** (para requisições HTTP)

### Back-end
- **Java (Spring Boot)**
- **Spring JDBC (`JdbcTemplate`)** — manipulação direta com SQL nativo
- **Banco H2**

---

## ⚙️ Funcionalidades

- [x] **Listagem de Alunos (GET):** busca os alunos cadastrados no banco e exibe na tabela ao carregar a página.
- [x] **Cadastro de Alunos (POST):** formulário controlado com validações manuais antes do envio.
- [x] **Exclusão de Alunos (DELETE):** remoção direta no banco via ID.
- [x] **Atualização em Tempo Real:** a tabela atualiza instantaneamente após cadastrar ou excluir, sem recarregar a página.
- [x] **Validações no Front-end:**
  - Nome sem números.
  - E-mail com `@` e `.`.
  - Telefone apenas com dígitos e no mínimo 11 caracteres.
  - Obrigatoriedade de seleção de um plano.

---

## 🚀 Como Executar

### 1. Back-end (Spring Boot)
1. Abra o projeto na sua IDE (IntelliJ, Eclipse ou VS Code).
2. Certifique-se de que o banco de dados está configurado no `application.properties`.
3. Execute a classe principal da aplicação. A API subirá por padrão em `http://localhost:8080`.

### 2. Front-end (React)
1. Abra o terminal na pasta do front-end.
2. Instale as dependências:
   ```bash
   npm install
