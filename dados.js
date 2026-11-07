/*
  FINANCE — dados.js
  Conteúdo educativo do site guardado em arrays de objetos:
  categorias, artigos, trilhas de aprendizado, glossário e dicas,
  além das funções de apoio que buscam itens e montam o card de artigo.
  Textos escritos pela equipe com base nas fontes citadas em cada artigo.
  Autores: Victor Gabriel Santos Pinheiro e Tales Siqueira Peixoto
*/

const CATEGORIAS = [
  { id: "orcamento", nome: "Orçamento", cor: "#1fd1a5", descricao: "Organize o que entra e o que sai." },
  { id: "dividas", nome: "Dívidas e crédito", cor: "#f04438", descricao: "Use o crédito sem cair em armadilhas." },
  { id: "investimentos", nome: "Investimentos", cor: "#2e90fa", descricao: "Faça o dinheiro trabalhar por você." },
  { id: "consumo", nome: "Consumo consciente", cor: "#f79009", descricao: "Gaste com intenção, não por impulso." },
  { id: "planejamento", nome: "Planejamento", cor: "#7a5af8", descricao: "Reserva, metas e futuro." },
  { id: "seguranca", nome: "Golpes e segurança", cor: "#0b0b0c", descricao: "Proteja seu dinheiro e seus dados." }
];

const ARTIGOS = [
  {
    id: 1,
    titulo: "Como montar seu primeiro orçamento pessoal",
    categoria: "orcamento",
    data: "2026-10-06",
    imagem: "img/fotos/orcamento.jpg",
    resumo: "Um passo a passo simples para descobrir para onde vai o seu dinheiro e retomar o controle do mês.",
    conteudo: [
      "<p>Orçamento é uma fotografia do seu dinheiro: quanto entra, quanto sai e o que sobra. Sem essa fotografia, qualquer decisão financeira vira palpite. A boa notícia é que montar um orçamento não exige planilhas complicadas, apenas constância.</p>",
      "<h2>1. Descubra sua renda líquida</h2>",
      "<p>Considere apenas o valor que de fato cai na sua conta, depois de descontos como INSS e Imposto de Renda. Se a renda varia, use a média dos últimos três meses ou, de forma mais conservadora, o menor valor recebido no período.</p>",
      "<h2>2. Liste todas as despesas</h2>",
      "<p>Separe as despesas em <strong>fixas</strong> (aluguel, condomínio, mensalidades), <strong>variáveis</strong> (mercado, transporte, lazer) e <strong>eventuais</strong> (IPVA, material escolar, presentes). As eventuais costumam ser esquecidas e são as que mais desequilibram o mês.</p>",
      "<h2>3. Compare e ajuste</h2>",
      "<p>Se as despesas superam a renda, o primeiro passo é cortar o que não é essencial e renegociar contas fixas. Se sobra dinheiro, defina um destino para ele antes que desapareça: reserva de emergência, quitação de dívidas ou uma meta.</p>",
      "<h2>4. Acompanhe todo mês</h2>",
      "<p>O orçamento é um instrumento vivo. Reserve alguns minutos por semana para registrar gastos e, no fim do mês, compare o planejado com o realizado. A página <a href=\"movimentacoes.html\">Minhas movimentações</a> do FINANCE foi feita para isso.</p>"
    ],
    fontes: [
      { nome: "Banco Central do Brasil — Caderno de Educação Financeira: Gestão de Finanças Pessoais", url: "https://www.bcb.gov.br/cidadaniafinanceira" },
      { nome: "Portal do Consumidor — Orçamento doméstico", url: "https://www.consumidor.gov.br" }
    ]
  },
  {
    id: 2,
    titulo: "Regra 50/30/20: um ponto de partida para dividir a renda",
    categoria: "orcamento",
    data: "2026-10-20",
    imagem: "img/fotos/reais.jpg",
    resumo: "Necessidades, desejos e futuro: entenda a divisão mais conhecida do orçamento e como adaptá-la à sua realidade.",
    conteudo: [
      "<p>A regra 50/30/20 sugere dividir a renda líquida em três grandes blocos. Ela não é uma lei, e sim um ponto de partida para quem nunca organizou o próprio orçamento.</p>",
      "<ul><li><strong>50% para necessidades:</strong> moradia, alimentação básica, transporte, saúde e contas essenciais.</li><li><strong>30% para desejos:</strong> lazer, restaurantes, assinaturas, compras não essenciais.</li><li><strong>20% para o futuro:</strong> reserva de emergência, investimentos e pagamento extra de dívidas.</li></ul>",
      "<h2>Quando adaptar</h2>",
      "<p>Em muitas famílias, apenas a moradia já consome boa parte da renda. Nesse caso, faz sentido ajustar os percentuais, por exemplo 60/20/20 ou 60/30/10, desde que exista algum valor destinado ao futuro, mesmo que pequeno. O hábito importa mais do que o percentual exato.</p>",
      "<h2>Como aplicar</h2>",
      "<p>Use o <a href=\"simuladores.html\">simulador de orçamento</a> do FINANCE para calcular os três valores a partir da sua renda. Depois, compare com os gastos reais registrados em Minhas movimentações e veja qual bloco está acima do recomendado.</p>"
    ],
    fontes: [
      { nome: "Banco Central do Brasil — Cidadania Financeira", url: "https://www.bcb.gov.br/cidadaniafinanceira" }
    ]
  },
  {
    id: 3,
    titulo: "Cartão de crédito: como usar a seu favor",
    categoria: "dividas",
    data: "2026-09-29",
    imagem: "img/fotos/dividas.jpg",
    resumo: "O cartão pode ser um aliado na organização ou o começo de uma bola de neve. Veja as regras básicas para usá-lo bem.",
    conteudo: [
      "<p>O cartão de crédito concentra gastos em uma única fatura e pode oferecer prazo sem juros entre a compra e o pagamento. O problema começa quando a fatura não é paga integralmente.</p>",
      "<h2>O perigo do rotativo</h2>",
      "<p>Pagar apenas o valor mínimo faz o saldo restante entrar no <strong>crédito rotativo</strong>, uma das modalidades de juros mais caras do mercado. Desde janeiro de 2024, por causa da Lei 14.690/2023, os juros e encargos do rotativo e do parcelamento da fatura não podem ultrapassar 100% do valor original da dívida. Mesmo com esse teto, a dívida ainda pode dobrar.</p>",
      "<h2>Boas práticas</h2>",
      "<ul><li>Pague sempre o valor total da fatura.</li><li>Trate o limite como um teto técnico, não como parte da sua renda.</li><li>Registre cada compra no momento em que ela acontece, inclusive as parceladas.</li><li>Evite ter muitos cartões: fica mais difícil acompanhar.</li></ul>",
      "<p>Se a fatura já está fora de controle, procure o banco para negociar um parcelamento com juros menores do que os do rotativo antes que o atraso aumente.</p>"
    ],
    fontes: [
      { nome: "Lei nº 14.690/2023 — Planalto", url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14690.htm" },
      { nome: "Banco Central do Brasil — Cartão de crédito", url: "https://www.bcb.gov.br/cidadaniafinanceira" }
    ]
  },
  {
    id: 4,
    titulo: "Como sair das dívidas: um plano em cinco passos",
    categoria: "dividas",
    data: "2026-10-13",
    imagem: "img/fotos/preocupacao.jpg",
    resumo: "Dívida tem solução. Organize a lista, priorize as mais caras e negocie com estratégia.",
    conteudo: [
      "<p>Estar endividado gera ansiedade e paralisa decisões. Um plano claro transforma o problema em uma sequência de ações possíveis.</p>",
      "<h2>1. Liste todas as dívidas</h2>",
      "<p>Anote credor, valor total, valor da parcela, taxa de juros e número de parcelas restantes. Ver tudo em um só lugar é o primeiro alívio.</p>",
      "<h2>2. Priorize as mais caras</h2>",
      "<p>Rotativo do cartão e cheque especial costumam ter os juros mais altos e devem ser atacados primeiro. Dívidas ligadas a serviços essenciais, como água e energia, também merecem prioridade.</p>",
      "<h2>3. Negocie</h2>",
      "<p>Procure os credores e peça condições melhores. Plataformas oficiais, como o Consumidor.gov.br, e mutirões de renegociação podem ajudar. Nunca aceite uma parcela que não caiba no orçamento: um novo atraso piora a situação.</p>",
      "<h2>4. Troque dívida cara por barata</h2>",
      "<p>Em alguns casos, um empréstimo com juros menores pode quitar uma dívida mais cara. Compare o Custo Efetivo Total (CET) antes de decidir.</p>",
      "<h2>5. Evite novas dívidas</h2>",
      "<p>Enquanto o plano estiver em andamento, use apenas dinheiro que você já tem e acompanhe tudo em <a href=\"movimentacoes.html\">Minhas movimentações</a>.</p>"
    ],
    fontes: [
      { nome: "Consumidor.gov.br", url: "https://www.consumidor.gov.br" },
      { nome: "Banco Central do Brasil — Cidadania Financeira", url: "https://www.bcb.gov.br/cidadaniafinanceira" }
    ]
  },
  {
    id: 5,
    titulo: "Juros compostos: por que o tempo é seu maior aliado",
    categoria: "investimentos",
    data: "2026-10-27",
    imagem: "img/fotos/investimentos.jpg",
    resumo: "Entenda a lógica dos juros sobre juros e por que começar cedo faz tanta diferença.",
    conteudo: [
      "<p>Nos juros compostos, o rendimento de cada período é somado ao valor investido e passa a render também. É o famoso efeito de \"juros sobre juros\".</p>",
      "<h2>A fórmula</h2>",
      "<p>O montante final de um valor aplicado é dado por <strong>M = C × (1 + i)<sup>n</sup></strong>, em que C é o capital inicial, i é a taxa por período e n é o número de períodos. Quando existem aportes mensais, o cálculo é feito mês a mês, somando cada novo depósito.</p>",
      "<h2>O tempo pesa mais que o valor</h2>",
      "<p>Quanto maior o prazo, maior a parte do saldo formada por juros e não pelo seu próprio dinheiro. Por isso, começar cedo com pouco costuma ser mais eficiente do que começar tarde com muito.</p>",
      "<h2>O outro lado</h2>",
      "<p>A mesma lógica vale para as dívidas: no rotativo do cartão ou no cheque especial, os juros compostos jogam contra você. Experimente o <a href=\"simuladores.html\">simulador de juros compostos</a> para ver o efeito na prática.</p>"
    ],
    fontes: [
      { nome: "Banco Central do Brasil — Calculadora do Cidadão", url: "https://www.bcb.gov.br/meubc/calculadoradocidadao" }
    ]
  },
  {
    id: 6,
    titulo: "Renda fixa para iniciantes: os primeiros conceitos",
    categoria: "investimentos",
    data: "2026-11-03",
    imagem: "img/fotos/cem-reais.jpg",
    resumo: "Poupança, Tesouro Selic, CDB e LCI/LCA: o que são e o que observar antes de investir.",
    conteudo: [
      "<p>Na renda fixa, as regras de remuneração são conhecidas no momento da aplicação. Isso não significa ausência total de risco, mas costuma tornar esses produtos a porta de entrada de quem está começando.</p>",
      "<h2>Três critérios para comparar</h2>",
      "<ul><li><strong>Risco:</strong> quem emite o título e qual a chance de não pagar.</li><li><strong>Liquidez:</strong> em quanto tempo você consegue resgatar o dinheiro.</li><li><strong>Rentabilidade líquida:</strong> quanto sobra depois de taxas e impostos.</li></ul>",
      "<h2>Garantias</h2>",
      "<p>Poupança, CDB, LCI e LCA contam com a proteção do Fundo Garantidor de Créditos (FGC), que cobre até R$ 250 mil por CPF por instituição, com limite global de R$ 1 milhão a cada quatro anos. Os títulos do Tesouro Direto são garantidos pelo Tesouro Nacional.</p>",
      "<p>Confira a tabela comparativa na página <a href=\"aprenda.html\">Aprenda</a>. Lembre-se: o FINANCE tem caráter educativo e não recomenda produtos específicos.</p>"
    ],
    fontes: [
      { nome: "Fundo Garantidor de Créditos (FGC)", url: "https://www.fgc.org.br" },
      { nome: "Tesouro Direto", url: "https://www.tesourodireto.com.br" },
      { nome: "CVM — Portal do Investidor", url: "https://www.gov.br/investidor" }
    ]
  },
  {
    id: 7,
    titulo: "Compras por impulso: como identificar e evitar",
    categoria: "consumo",
    data: "2026-09-22",
    imagem: "img/fotos/consumo.jpg",
    resumo: "Promoções relâmpago e parcelas pequenas são armadilhas comuns. Algumas regras simples ajudam a decidir melhor.",
    conteudo: [
      "<p>Compra por impulso é aquela feita sem planejamento, motivada por emoção, urgência ou oportunidade aparente. Uma única compra raramente é o problema; a repetição é.</p>",
      "<h2>Sinais de alerta</h2>",
      "<ul><li>Você não estava procurando o produto até vê-lo.</li><li>A oferta tem contagem regressiva ou \"últimas unidades\".</li><li>A decisão parece fácil porque a parcela é pequena.</li></ul>",
      "<h2>Estratégias que funcionam</h2>",
      "<p><strong>Regra das 48 horas:</strong> para compras não essenciais, espere dois dias antes de decidir. <strong>Lista de compras:</strong> no mercado e nas lojas, leve uma lista e respeite-a. <strong>Custo em horas de trabalho:</strong> divida o preço pelo valor que você ganha por hora e pergunte se vale esse tempo.</p>",
      "<p>Lembre-se de que o Código de Defesa do Consumidor garante o direito de arrependimento em até 7 dias para compras feitas fora do estabelecimento comercial, como pela internet.</p>"
    ],
    fontes: [
      { nome: "Código de Defesa do Consumidor (Lei nº 8.078/1990), art. 49", url: "https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm" }
    ]
  },
  {
    id: 8,
    titulo: "Gastos invisíveis: o que pequenas despesas fazem com o seu mês",
    categoria: "consumo",
    data: "2026-10-30",
    imagem: "img/fotos/planejamento.jpg",
    resumo: "Assinaturas esquecidas, tarifas e cafés diários somam mais do que parece. Aprenda a encontrá-los.",
    conteudo: [
      "<p>Gastos invisíveis são despesas pequenas e frequentes que passam despercebidas: aplicativos de entrega, assinaturas pouco usadas, tarifas bancárias, lanches e corridas por aplicativo.</p>",
      "<h2>O teste dos 30 dias</h2>",
      "<p>Durante um mês, registre absolutamente todos os gastos, inclusive os de poucos reais. No fim do período, agrupe por categoria. Muitas pessoas se surpreendem com o total de itens que pareciam irrelevantes.</p>",
      "<h2>Revise as assinaturas</h2>",
      "<p>Liste os serviços cobrados automaticamente no cartão ou na conta. Para cada um, pergunte: usei no último mês? Vale o preço? Cancelar duas ou três assinaturas já pode liberar espaço no orçamento.</p>",
      "<p>Não se trata de cortar todo prazer, e sim de gastar com intenção. Use a busca e o filtro de categoria em <a href=\"movimentacoes.html\">Minhas movimentações</a> para encontrar esses padrões.</p>"
    ],
    fontes: [
      { nome: "Banco Central do Brasil — Cidadania Financeira", url: "https://www.bcb.gov.br/cidadaniafinanceira" }
    ]
  },
  {
    id: 9,
    titulo: "Reserva de emergência: quanto guardar e onde deixar",
    categoria: "planejamento",
    data: "2026-10-09",
    imagem: "img/fotos/poupanca.jpg",
    resumo: "O colchão financeiro que protege você de imprevistos. Veja como calcular o valor ideal.",
    conteudo: [
      "<p>A reserva de emergência é um valor guardado exclusivamente para imprevistos: perda de renda, problemas de saúde, consertos urgentes. Ela evita que um imprevisto vire dívida cara.</p>",
      "<h2>Quanto guardar</h2>",
      "<p>Uma referência comum é acumular de <strong>3 a 6 meses</strong> do custo de vida essencial para quem tem renda estável, e de <strong>6 a 12 meses</strong> para quem é autônomo ou tem renda variável. O cálculo usa as despesas essenciais, não a renda total.</p>",
      "<h2>Onde deixar</h2>",
      "<p>A reserva precisa de <strong>segurança</strong> e <strong>liquidez</strong>: o dinheiro deve estar disponível rapidamente e sem risco de perda. Rentabilidade é secundária. Por isso, aplicações de renda variável não são adequadas para esse fim.</p>",
      "<p>Calcule a sua no <a href=\"simuladores.html\">simulador de reserva de emergência</a> e transforme o resultado em uma meta com um clique.</p>"
    ],
    fontes: [
      { nome: "Banco Central do Brasil — Cidadania Financeira", url: "https://www.bcb.gov.br/cidadaniafinanceira" },
      { nome: "CVM — Portal do Investidor", url: "https://www.gov.br/investidor" }
    ]
  },
  {
    id: 10,
    titulo: "Metas financeiras que saem do papel",
    categoria: "planejamento",
    data: "2026-11-05",
    imagem: "img/fotos/metas.jpg",
    resumo: "Sonhos viram planos quando têm valor, prazo e acompanhamento. Use o método SMART.",
    conteudo: [
      "<p>\"Quero juntar dinheiro\" é um desejo. \"Quero juntar R$ 6.000 para uma viagem em dezembro do ano que vem\" é uma meta. A diferença está nos detalhes.</p>",
      "<h2>O método SMART</h2>",
      "<ul><li><strong>S</strong>pecífica: o que exatamente você quer?</li><li><strong>M</strong>ensurável: quanto custa?</li><li><strong>A</strong>tingível: cabe no seu orçamento?</li><li><strong>R</strong>elevante: por que isso importa para você?</li><li><strong>T</strong>emporal: até quando?</li></ul>",
      "<h2>Divida para conquistar</h2>",
      "<p>Com valor e prazo definidos, basta dividir o que falta pelo número de meses. Se o valor mensal não couber, ajuste o prazo ou o objetivo, mas mantenha a meta viva.</p>",
      "<p>Na página <a href=\"metas.html\">Metas financeiras</a>, o FINANCE calcula automaticamente quanto você precisa guardar por mês e mostra seu progresso.</p>"
    ],
    fontes: [
      { nome: "Banco Central do Brasil — Cidadania Financeira", url: "https://www.bcb.gov.br/cidadaniafinanceira" }
    ]
  },
  {
    id: 11,
    titulo: "Golpes com Pix: como reconhecer e se proteger",
    categoria: "seguranca",
    data: "2026-10-16",
    imagem: "img/fotos/seguranca.jpg",
    resumo: "Falsas centrais, perfis clonados e links falsos. Saiba como agir antes e depois de um golpe.",
    conteudo: [
      "<p>O Pix tornou as transferências instantâneas, e os golpistas tentam se aproveitar dessa rapidez. Quase todos os golpes dependem de pressa e de engano, não de falhas técnicas.</p>",
      "<h2>Golpes mais comuns</h2>",
      "<ul><li><strong>Falsa central de atendimento:</strong> alguém liga dizendo ser do banco e pede senha ou transferência \"de segurança\".</li><li><strong>Perfil clonado:</strong> um contato conhecido pede dinheiro com urgência por mensagem.</li><li><strong>Links falsos:</strong> mensagens com cobranças, prêmios ou pendências que levam a páginas falsas.</li></ul>",
      "<h2>Regras de ouro</h2>",
      "<p>Bancos não pedem senha, código de verificação ou transferência para \"proteger\" sua conta. Desconfie de urgência. Confirme pedidos de dinheiro por outro canal, como uma ligação de voz.</p>",
      "<h2>Se cair em um golpe</h2>",
      "<p>Avise seu banco imediatamente e solicite a abertura do Mecanismo Especial de Devolução (MED), registre um boletim de ocorrência e guarde comprovantes e conversas.</p>"
    ],
    fontes: [
      { nome: "Banco Central do Brasil — Pix", url: "https://www.bcb.gov.br/estabilidadefinanceira/pix" }
    ]
  },
  {
    id: 12,
    titulo: "Proteja seus dados financeiros no dia a dia",
    categoria: "seguranca",
    data: "2026-11-01",
    imagem: "img/fotos/cartoes.jpg",
    resumo: "Senhas, aplicativos e redes Wi-Fi: hábitos simples que reduzem muito o risco de fraude.",
    conteudo: [
      "<p>Seus dados bancários valem dinheiro para criminosos. Alguns hábitos simples diminuem bastante a exposição.</p>",
      "<h2>Senhas e acesso</h2>",
      "<ul><li>Use senhas diferentes para banco, e-mail e redes sociais.</li><li>Ative a verificação em duas etapas sempre que possível.</li><li>Nunca compartilhe códigos recebidos por SMS ou aplicativo.</li></ul>",
      "<h2>Aparelhos e redes</h2>",
      "<p>Mantenha o sistema e os aplicativos atualizados e baixe aplicativos apenas das lojas oficiais. Evite acessar o banco em redes Wi-Fi públicas.</p>",
      "<h2>Acompanhe sua vida financeira</h2>",
      "<p>Confira extratos e faturas com frequência. O sistema Registrato, do Banco Central, permite consultar gratuitamente empréstimos, contas e chaves Pix registrados no seu CPF.</p>"
    ],
    fontes: [
      { nome: "Banco Central do Brasil — Registrato", url: "https://www.bcb.gov.br/meubc/registrato" }
    ]
  }
];

const TRILHAS = [
  {
    id: "basico",
    nivel: "Básico",
    titulo: "Primeiros passos",
    descricao: "Entenda seu dinheiro e organize o mês.",
    modulos: [
      { id: "b1", titulo: "O que é orçamento", artigo: 1 },
      { id: "b2", titulo: "Dividindo a renda: 50/30/20", artigo: 2 },
      { id: "b3", titulo: "Gastos invisíveis", artigo: 8 },
      { id: "b4", titulo: "Compras por impulso", artigo: 7 }
    ]
  },
  {
    id: "intermediario",
    nivel: "Intermediário",
    titulo: "Crédito e proteção",
    descricao: "Use o crédito com consciência e proteja-se.",
    modulos: [
      { id: "i1", titulo: "Cartão de crédito", artigo: 3 },
      { id: "i2", titulo: "Saindo das dívidas", artigo: 4 },
      { id: "i3", titulo: "Golpes com Pix", artigo: 11 },
      { id: "i4", titulo: "Proteção de dados", artigo: 12 }
    ]
  },
  {
    id: "avancado",
    nivel: "Avançado",
    titulo: "Futuro e investimentos",
    descricao: "Planeje o futuro e faça o dinheiro render.",
    modulos: [
      { id: "a1", titulo: "Reserva de emergência", artigo: 9 },
      { id: "a2", titulo: "Metas SMART", artigo: 10 },
      { id: "a3", titulo: "Juros compostos", artigo: 5 },
      { id: "a4", titulo: "Renda fixa", artigo: 6 }
    ]
  }
];

const GLOSSARIO = [
  { id: "amortizacao", termo: "Amortização", definicao: "Pagamento de parte do valor principal de uma dívida, reduzindo o saldo devedor." },
  { id: "aporte", termo: "Aporte", definicao: "Valor depositado em um investimento, de uma vez ou periodicamente." },
  { id: "cdb", termo: "CDB", definicao: "Certificado de Depósito Bancário: título emitido por bancos para captar dinheiro, com remuneração definida na aplicação." },
  { id: "cdi", termo: "CDI", definicao: "Taxa praticada em empréstimos entre bancos, muito usada como referência para a rentabilidade da renda fixa." },
  { id: "cet", termo: "CET", definicao: "Custo Efetivo Total: soma de juros, tarifas, tributos e seguros de um empréstimo, expressa em percentual." },
  { id: "cheque-especial", termo: "Cheque especial", definicao: "Limite de crédito automático ligado à conta corrente, com juros elevados. Deve ser usado só em emergências." },
  { id: "fgc", termo: "FGC", definicao: "Fundo Garantidor de Créditos: protege o investidor em caso de quebra da instituição em produtos como poupança, CDB, LCI e LCA, dentro de limites." },
  { id: "inflacao", termo: "Inflação", definicao: "Aumento generalizado dos preços ao longo do tempo, que reduz o poder de compra do dinheiro." },
  { id: "ipca", termo: "IPCA", definicao: "Índice oficial de inflação do Brasil, calculado pelo IBGE." },
  { id: "juros-compostos", termo: "Juros compostos", definicao: "Juros calculados sobre o valor inicial somado aos juros já acumulados: os famosos juros sobre juros." },
  { id: "juros-simples", termo: "Juros simples", definicao: "Juros calculados sempre sobre o valor inicial, sem incorporar os juros anteriores." },
  { id: "liquidez", termo: "Liquidez", definicao: "Facilidade e rapidez para transformar um investimento em dinheiro disponível." },
  { id: "orcamento", termo: "Orçamento", definicao: "Planejamento que relaciona receitas e despesas de um período." },
  { id: "renda-fixa", termo: "Renda fixa", definicao: "Investimentos com regras de remuneração conhecidas no momento da aplicação." },
  { id: "renda-variavel", termo: "Renda variável", definicao: "Investimentos cujo retorno não é conhecido antecipadamente, como ações." },
  { id: "reserva", termo: "Reserva de emergência", definicao: "Dinheiro guardado com segurança e liquidez para cobrir imprevistos." },
  { id: "rotativo", termo: "Crédito rotativo", definicao: "Financiamento automático do saldo da fatura do cartão que não foi pago integralmente." },
  { id: "selic", termo: "Selic", definicao: "Taxa básica de juros da economia, definida pelo Comitê de Política Monetária (Copom) do Banco Central." }
];

const DICAS = [
  "Registre seus gastos no mesmo dia em que eles acontecem. Deixar para depois é o caminho mais curto para esquecer.",
  "Antes de uma compra não essencial, espere 48 horas. Se a vontade continuar, a decisão provavelmente é consciente.",
  "Separe a reserva de emergência do dinheiro do dia a dia. O que fica à vista tende a ser gasto.",
  "Pague a fatura do cartão integralmente. O crédito rotativo está entre os juros mais altos do mercado.",
  "Revise suas assinaturas a cada três meses e cancele as que você não usou.",
  "Bancos não pedem senha nem códigos por telefone. Na dúvida, desligue e ligue você para o número oficial.",
  "Defina metas com valor e prazo. Sonho sem data costuma ficar para depois.",
  "Compare o Custo Efetivo Total (CET), e não só a taxa de juros, antes de contratar um empréstimo.",
  "Comece a investir com pouco: o hábito e o tempo pesam mais do que o valor inicial.",
  "Leve uma lista ao mercado e evite ir com fome. Parece simples, e funciona.",
  "Guarde primeiro, gaste depois: separe o valor da meta assim que receber.",
  "Converse sobre dinheiro em casa. Decisões financeiras em família funcionam melhor quando todos participam."
];

function buscarCategoria(idCategoria) {
  return CATEGORIAS.find(function (categoria) {
    return categoria.id === idCategoria;
  });
}

function buscarArtigo(idArtigo) {
  return ARTIGOS.find(function (artigo) {
    return artigo.id === idArtigo;
  });
}

function tempoLeitura(artigo) {
  const texto = artigo.conteudo.join(" ").replace(/<[^>]+>/g, " ");
  const palavras = texto.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(palavras / 200));
}

function criarCardArtigo(artigo) {
  const categoria = buscarCategoria(artigo.categoria);
  const codigo = "artigo-" + artigo.id;
  const ativo = ehFavorito(codigo);
  return `
    <article class="card card-artigo card-interativo">
      <a href="artigo.html?id=${artigo.id}" class="card-artigo-imagem" tabindex="-1" aria-hidden="true">
        <img src="${artigo.imagem}" alt="" loading="lazy">
      </a>
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
          <span class="etiqueta"><span class="ponto-cor" style="background:${categoria.cor}"></span>${categoria.nome}</span>
          <button type="button" class="btn btn-favorito${ativo ? " ativo" : ""}" data-favorito="${codigo}" aria-pressed="${ativo}" aria-label="Favoritar: ${artigo.titulo}">
            <svg class="icone" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/></svg>
          </button>
        </div>
        <h3 class="card-title"><a href="artigo.html?id=${artigo.id}">${artigo.titulo}</a></h3>
        <p class="card-text">${artigo.resumo}</p>
        <p class="card-artigo-meta">${tempoLeitura(artigo)} min de leitura · ${formatarData(artigo.data)}</p>
      </div>
    </article>`;
}
