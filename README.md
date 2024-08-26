# Instruções para Iniciar a Aplicação

Para iniciar a aplicação, siga os passos abaixo:

1. **Construir e Iniciar os Contêineres Docker**

   Execute o comando a seguir para construir e iniciar a aplicação:

   ```bash
   docker-compose up --build9
   ``````

2. **Acessar a Aplicação**
   Após iniciar os contêineres, abra o seu navegador e acesse:

   http://localhost:3000/

3. **Configuração Inicial (Primeira Execução)**

   Caso esta seja a primeira vez que você está acessando a aplicação, você será redirecionado para a tela de configuração do Rails. Nesta tela, será necessário clicar no botão "Run pending migrations" para aplicar as migrações do banco de dados.

   Após concluir a execução das migrações, a aplicação estará pronta para uso.