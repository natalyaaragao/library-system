# library-system

Projeto desenvolvido em kotlin e react com módulos:
- Sistematização de processos de uma biblioteca;
- Organização de leituras pessoais. 

Funcionalidades projetadas:
- Cadastro, consulta e edição de dados;
- Gerenciamento de empréstimos de materiais;
- Organização de leituras pessoais;
- Listas de leituras;

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

Para testes, execute:
 ```bash
  ./gradlew test
 ```
