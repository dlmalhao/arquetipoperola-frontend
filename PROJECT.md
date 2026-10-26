# ArquétipoPérola — Documentação do Projeto

Este ficheiro é a fonte de verdade sobre as decisões de estrutura, modelo de dados e navegação do site.

## Stack

- **Frontend:** React 19 + Vite
- **Routing:** react-router-dom (v7) — já instalado, ainda não usado para páginas separadas (o site atual é uma landing page de secção única, com âncoras internas tipo `#models`)
- **UI:** MUI + CoreUI
- **Animações:** AOS (scroll)
- **Deploy:** gh-pages
- **Backend (a integrar):** Strapi

## Contexto do projeto

- Catálogo de arquitetura/imobiliário, para uso B2B — sem grandes proporções, não é preciso otimizar para grande volume de dados.
- Cliente: Rui Jorge Silva Anjo, empresa ArquétipoPérola (Braga).
- Dados atualmente estáticos no frontend; vão passar a ser geridos via Strapi.

## Navegação / rotas

Estrutura principal reduzida a três secções, cada uma como página própria (sai o modelo de landing page de secção única, entra roteamento real):

| Rota | Página | Notas |
|---|---|---|
| `/` | Home | Sem lista de tipologias |
| `/sobre` | Sobre | Inclui bio do fundador (ver PDF do cliente) |
| `/projetos` | Projetos | Lista todos os projetos, sem filtro aplicado por defeito |
| `/projetos?tipologia=t1` | Projetos filtrado | Filtro por tipologia via query param |
| `/projetos?tipologia=t1&tipo=moradia` | Projetos filtrado | Filtro combinado |
| `/contactos` | Contactos | Formulário / dados de contacto |
| `/projetos/:slug` | Detalhe do projeto | Já existe no site atual |

## Filtros em "Projetos"

- Dois `<select>` independentes: **Tipologia** e **Tipo de Projeto**.
- Seleção única em cada um (não multi-select) — decisão tomada por ser um catálogo B2B pequeno, onde o utilizador normalmente sabe o que procura.
- Cada select deve ter opção "Todas/Todos" para limpar o filtro.
- Lógica: filtra por tipologia (se selecionada) E por tipo (se selecionado) — os dois filtros são completamente independentes entre si. Como ambas as relações são N:N, um projeto aparece no filtro se tiver pelo menos uma tipologia/tipo que corresponda ao valor selecionado.
- Precisa de estado vazio tratado (combinação sem resultados).
- O número de tipologias, tipos de projeto e outros filtros que venham a existir não é fixo — o cliente quer o máximo de poder de customização, ou seja, tudo isto deve poder ser gerido/expandido no Strapi sem alterações ao código do frontend.

## Modelo de dados (Strapi)

### Tipologia
- `id`
- `nome` (ex: T1, T2, T3, T4 — definido livremente pelo administrador)
- `descrição` (opcional)
- `projetos` → relação **N:N** com Projeto

### Tipo de Projeto
- `id`
- `nome` (ex: Moradia, Apartamento, Duplex — definido livremente pelo administrador)
- `descrição` (opcional)
- `projetos` → relação **N:N** com Projeto (confirmado: um projeto pode ter mais do que um tipo)

### Projeto
**Identificação**
- `id`, `nome`, `slug`, `descrição`

**Localização**
- `localização` (cidade/zona), `morada`, `coordenadas` (lat/long)

**Características**
- `área bruta` (m²), `área útil` (m²), `nº de quartos`, `nº de casas de banho`, `certificação energética`

**Estado**
- `estado` (construção / concluído / planeamento), `ano de conclusão`, `disponibilidade`, `publicado` (sim/não)

**Media**
- `imagens[]`, `plantas`, `vídeo / tour virtual`

**Relações**
- `tipologias` → Tipologia[] (N:N — confirmado com o cliente: um projeto residencial pode ter várias casas de tipologias diferentes)
- `tipos` → Tipo de Projeto[] (N:N — confirmado: um projeto pode ter mais do que um tipo)

> `descrição` é obrigatória para todos os projetos (confirmado com o cliente).

> Nota: ficaram de fora do modelo os campos do grupo "Outros" (arquiteto responsável, destaque, preço) — por pedido explícito, não foram incluídos nesta fase.

### Parceiro
- `id`
- `nome`
- `logótipo`
- Usado na página Sobre, junto com a bio do fundador.

## Conteúdo de referência (do PDF do cliente)

O cliente enviou um portefólio em PDF com o formato habitual que usa para apresentar a empresa. Pontos relevantes:

- **Projetos Realizados** — têm descrição detalhada (contexto, área, características). Exemplos: Liberdade Street Fashion (Braga), Trofa Saúde Hospital (Braga Sul), Moov Hotel Porto Centro, Hotel TRYP Lisboa Aeroporto, Santa Luzia ArtHotel (Guimarães), lojas Continente/Minipreço/Pingo Doce, Burger King, Norauto.
- **Projetos em Execução** — só têm nome do cliente/marca e cidade, sem descrição detalhada. Confirmar com o cliente se isto é propositado (campo `descrição` pode não ser obrigatório).
- **Secção "Parceiros"** — logótipos de empresas parceiras (Omatapalo, A. Pimenta Construções, Grupo Isidoro, Quantico, Hoti Hoteis, Astiazaran Arquitectos, Finangeste). Confirmado: entra na página **Sobre**. Precisa de nova entidade `Parceiro` (nome, logótipo).
- **Bio do fundador** (Rui Jorge Silva Anjo) — confirmado: entra na página **Sobre**, junto com os Parceiros.

## Diretrizes de design e código
 
- **Design visual:** manter próximo do que já está implementado — não é suposto o resultado final fugir muito à aparência atual do site. Alterações pontuais são aceitáveis quando servem a nova estrutura (ex: layout de páginas novas que não existiam, como Projetos com filtros), mas não uma redesign geral.
- **Código existente:** há liberdade para refatorar/melhorar o código já implementado sempre que fizer sentido (performance, organização, manutenibilidade), mesmo fora do que for estritamente necessário para as novas funcionalidades.

## Pontos em aberto

Nenhum, por agora — todas as questões anteriores foram confirmadas com o cliente (ver secções acima). O princípio geral acordado: tipologias, tipos de projeto e outros filtros futuros não têm número fixo — devem poder ser geridos livremente no Strapi, dando ao cliente o máximo de poder de customização sem depender de alterações ao código.
