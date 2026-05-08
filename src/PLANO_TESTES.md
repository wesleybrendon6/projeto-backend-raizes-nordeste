# Plano de Testes — API Raízes do Nordeste

## Objetivo

Validar funcionalidades da API Back-end do projeto Raízes do Nordeste, garantindo segurança, robustez, regras de negócio e comportamento esperado dos endpoints.

---

# Cenários de Teste

| ID | Funcionalidade | Entrada | Resultado Esperado |
|----|----------------|----------|--------------------|
| T01 | Cadastro de usuário | Dados válidos | Usuário criado com sucesso |
| T02 | Login usuário | Credenciais válidas | Retorno de token JWT |
| T03 | Login inválido | Senha incorreta | Erro 401 |
| T04 | Criar pedido | Dados válidos | Pedido criado |
| T05 | Criar pedido sem token | Sem JWT | Erro TOKEN_INVALIDO |
| T06 | Estoque insuficiente | quantity > estoque | Erro 409 |
| T07 | Canal inválido | canalPedido inválido | Erro 422 |
| T08 | Listar pedidos | Token válido | Lista de pedidos |
| T09 | Atualizar status | Status válido | Pedido atualizado |
| T10 | Pagamento mock | orderId válido | PAGAMENTO_APROVADO |

---

# Evidências

Os testes foram realizados utilizando:

- Postman
- Swagger/OpenAPI
- Banco SQLite

---

# Critérios Validados

## Segurança

- JWT Authentication
- Rotas protegidas
- Middleware de autenticação

---

## Regras de Negócio

- Controle de estoque
- Multicanalidade
- Fluxo de status
- Simulação de pagamento

---

## Persistência

- Salvamento em banco SQLite
- Atualização de pedidos
- Consulta de pedidos

---

# Resultado Final

Todos os cenários executados apresentaram comportamento esperado conforme os requisitos definidos para o projeto.