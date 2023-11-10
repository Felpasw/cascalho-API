# Projeto de Treinamento Cascalho - Softwaresul 💻
Bem-vindo ao Cascalho, a sua plataforma interna de networking e colaboração! 🌐✨

# Visão Geral 🎈

O projeto é uma API que fornece dados para seu frontend o qual está documentado <a href="https://github.com/Felpasw/cascalho-front"> aqui </a >. Com login e controle por meio de cookies no navegador, o usuário com permissões no sistema logado como administrador consegue adicionar, deletar e editar várias entidades sendo elas: grupos, usuários, categorias, publicações, pastas, documentos e comentários. O usuário também consegue versionar seus prórpios arquivos.
 
# Recursos Principais ⚙
## Publicações
Crie Publicações: Compartilhe notícias, ideias e atualizações com a comunidade.
Comentários: Interaja com colegas através de comentários, promovendo a colaboração.
## Categorias
Organização Personalizada: Adicione categorias às suas publicações para uma organização eficiente.
Exploração Simplificada: Navegue facilmente por tópicos específicos de interesse.
## Gerenciamento de Arquivos
Documentos Pessoais: Faça o upload, edite e gerencie seus próprios documentos.
Versionamento: Salve as versões anteriores de seus arquivos.
## Hierarquias de Acesso
Controle de Privacidade: Estabeleça níveis de acesso para garantir a segurança das informações.
Gerenciamento de Usuários: Administre as hierarquias de acesso para uma experiência personalizada.

# Como Executar o Projeto 📥

### Clone este repositório para a sua máquina local.
```bash
git clone https://github.com/felpaswo/cascalho-API.git
```
### Navegue até o diretório do projeto.
```bash
git clone https://github.com/felpaswo/cascalho-API.git
```

### Conecte seu próprio banco.
Crie um arquivo `.env` dentro do diretório e adicione as variáveis `DBNAME`, `DBUSER`, `DBPASSWORD`, `DBHOST` e `CORS` conforme o seu banco e ambiente.

### Instale as dependências.
```bash
npm i 
```
### Inicie a aplicação.
```bash
npm run dev 
```
A aplicação estará disponível em `http://localhost:4000`.
