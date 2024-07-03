# library-system

Projeto desenvolvido em kotlin e react com módulos:
- Sistematização de processos de uma biblioteca;
- Organização de leituras pessoais. 

Funcionalidades projetadas:
- Cadastro, consulta e edição de dados;
- Gerenciamento de empréstimos de materiais;
- Organização de leituras pessoais;
- Listas de leituras;

# Estrutura do Projeto
- Back-End: Desenvolvido utilizando Ktor, responsável por gerenciar a lógica e a comunicação com o banco de dados;
- Front-End: Desenvolvido com React e Vite, responsável pela interface do usuário e a interação com o back-end. Utiliza endpoints para se comunicar com o back-end;
- Banco de dados: Desenvolvido com H2;

# Status do Projeto
- Back-End: Funcional e implementado conforme os requisitos do projeto.
- Front-End: Funcional, porém com algumas partes ainda em desenvolvimento.
    - Módulo de Empréstimo: Ainda não finalizado.
    - Tela de Meus Empréstimos: Atualmente estática e sem funcionalidade dinâmica.
    - Edição e Exclusão dos dados: Ainda não finalizado. 

# Execução

Execute:

  ```bash
  ./gradlew shadowJar
  ```
Em build > libs:

  ```bash
  java -jar com.example.library-system-api-all.jar
  ```

Para a interface visual, vá até src > main > resources > library-system-web e execute:

  ```bash
  npm install
  ```
  ```bash
  npm run dev
  ```

Observação: Ao acessar a aplicação, comece pelo endpoint `/login`

Para testes, execute:
 ```bash
  ./gradlew test
 ```
