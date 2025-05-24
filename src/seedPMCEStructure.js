const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Sector = require('./models/sectorModel');
const connectDB = require('./config/db');

dotenv.config();

console.log('Starting PMCE structure import...');
console.log('Connecting to database...');

connectDB();

const pmceStructure = [
  // COMANDO GERAL
  {
    name: 'Comando-Geral da PMCE',
    battalion: 'Comando Superior',
    company: 'N/A',
    commander: 'Coronel Klênio Savyo Nascimento de Sousa',
    phone: '(85) 3101-2500',
    ais: 'N/A',
    subitems: [
      { name: 'Gabinete do Comando-Geral', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-2500' },
      { name: 'Assessoria de Comunicação', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-2503' }
    ]
  },
  {
    name: 'Subcomando-Geral da PMCE',
    battalion: 'Comando Superior',
    company: 'N/A',
    commander: 'Coronel José Durval Beserra Filho',
    phone: '(85) 3101-2510',
    ais: 'N/A',
    subitems: [
      { name: 'Gabinete do Subcomando', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-2511' }
    ]
  },
  
  // ÓRGÃOS DE DIREÇÃO ESTRATÉGICA
  {
    name: 'Estado-Maior Geral',
    battalion: 'Órgãos de Direção Estratégica',
    company: 'N/A',
    commander: 'Coronel Márcio de Oliveira Macêdo',
    phone: '(85) 3101-2520',
    ais: 'N/A',
    subitems: [
      { name: '1ª Seção - Pessoal e Legislação', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-2521' },
      { name: '2ª Seção - Inteligência', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-2522' },
      { name: '3ª Seção - Operações e Ensino', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-2523' },
      { name: '4ª Seção - Logística', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-2524' },
      { name: '5ª Seção - Comunicação Social', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-2525' },
      { name: '6ª Seção - Orçamento e Finanças', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-2526' }
    ]
  },
  {
    name: 'Corregedoria Geral dos Órgãos de Segurança',
    battalion: 'Órgãos de Direção Estratégica',
    company: 'N/A',
    commander: 'Coronel Rodrigo Brandão Prado',
    phone: '(85) 3101-6100',
    ais: 'N/A',
    subitems: [
      { name: 'Coordenadoria de Disciplina Militar', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-6101' },
      { name: 'Coordenadoria de Inspeção Administrativa', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-6102' }
    ]
  },
  
  // ÓRGÃOS DE APOIO
  {
    name: 'Diretoria de Gestão de Pessoal',
    battalion: 'Órgãos de Apoio',
    company: 'N/A',
    commander: 'Coronel Francisco Erivano Gomes de Sousa',
    phone: '(85) 3101-2530',
    ais: 'N/A',
    subitems: [
      { name: 'Célula de Administração de Pessoal', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-2531' },
      { name: 'Célula de Pagamento', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-2532' }
    ]
  },
  {
    name: 'Diretoria de Ensino e Instrução',
    battalion: 'Órgãos de Apoio',
    company: 'N/A',
    commander: 'Coronel Antônio Clairton Pessoa de Lima',
    phone: '(85) 3101-4800',
    ais: 'N/A',
    subitems: [
      { name: 'Academia Estadual de Segurança Pública (AESP)', address: 'Av. Presidente Costa e Silva, 1251 - Mondubim, Fortaleza-CE', phone: '(85) 3101-7300' },
      { name: 'Célula de Formação Continuada', address: 'Av. Presidente Costa e Silva, 1251 - Mondubim, Fortaleza-CE', phone: '(85) 3101-7301' }
    ]
  },
  {
    name: 'Diretoria de Saúde e Assistência Social',
    battalion: 'Órgãos de Apoio',
    company: 'N/A',
    commander: 'Coronel Médico José Sarto Nogueira Moreira',
    phone: '(85) 3101-2540',
    ais: 'N/A',
    subitems: [
      { name: 'Hospital da Polícia Militar', address: 'Av. Jovita Feitosa, 1666 - Parquelândia, Fortaleza-CE', phone: '(85) 3101-5325' },
      { name: 'Centro de Assistência Social', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-2542' }
    ]
  },
  {
    name: 'Diretoria de Logística e Patrimônio',
    battalion: 'Órgãos de Apoio',
    company: 'N/A',
    commander: 'Coronel Hélio Nogueira Bernardino',
    phone: '(85) 3101-2550',
    ais: 'N/A',
    subitems: [
      { name: 'Célula de Material Bélico', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-2551' },
      { name: 'Célula de Transportes', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-2552' }
    ]
  },
  {
    name: 'Diretoria de Finanças',
    battalion: 'Órgãos de Apoio',
    company: 'N/A',
    commander: 'Coronel Marcos Aurélio Santos da Silva',
    phone: '(85) 3101-2560',
    ais: 'N/A',
    subitems: [
      { name: 'Célula de Execução Orçamentária', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-2561' },
      { name: 'Célula de Prestação de Contas', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-2562' }
    ]
  },
  {
    name: 'Diretoria de Tecnologia da Informação e Comunicação',
    battalion: 'Órgãos de Apoio',
    company: 'N/A',
    commander: 'Coronel Francisco Ronaldo Fernandes Cavalcante',
    phone: '(85) 3101-2570',
    ais: 'N/A',
    subitems: [
      { name: 'Célula de Desenvolvimento de Sistemas', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-2571' },
      { name: 'Célula de Telecomunicações', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-2572' }
    ]
  },
  
  // ÓRGÃOS DE EXECUÇÃO OPERACIONAL
  {
    name: 'Comando de Policiamento da Capital (CPC)',
    battalion: 'Órgãos de Execução Operacional',
    company: 'N/A',
    commander: 'Coronel Antônio Aginaldo de Oliveira',
    phone: '(85) 3101-2600',
    ais: 'N/A',
    subitems: [
      { name: 'Coordenadoria de Planejamento Operacional', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-2601' }
    ]
  },
  {
    name: '1º Batalhão de Polícia Militar',
    battalion: 'CPC',
    company: 'N/A',
    commander: 'Tenente-Coronel Cláudio Roberto de Araújo Lima',
    phone: '(85) 3101-2730',
    ais: 'AIS 01 - Centro',
    subitems: [
      { name: '1ª Companhia do 1º BPM', address: 'Av. do Imperador, 255 - Centro, Fortaleza-CE', phone: '(85) 3101-2731' },
      { name: '2ª Companhia do 1º BPM', address: 'Av. do Imperador, 255 - Centro, Fortaleza-CE', phone: '(85) 3101-2732' }
    ]
  },
  {
    name: '2º Batalhão de Polícia Militar',
    battalion: 'CPC',
    company: 'N/A',
    commander: 'Tenente-Coronel Ivson Correia Timbó',
    phone: '(85) 3101-2740',
    ais: 'AIS 02 - Aldeota',
    subitems: [
      { name: '1ª Companhia do 2º BPM', address: 'Av. Desembargador Moreira, 2875 - Dionísio Torres, Fortaleza-CE', phone: '(85) 3101-2741' },
      { name: '2ª Companhia do 2º BPM', address: 'Av. Desembargador Moreira, 2875 - Dionísio Torres, Fortaleza-CE', phone: '(85) 3101-2742' }
    ]
  },
  {
    name: '5º Batalhão de Polícia Militar',
    battalion: 'CPC',
    company: 'N/A',
    commander: 'Tenente-Coronel Régis Alves Pinheiro',
    phone: '(85) 3101-2750',
    ais: 'AIS 05 - Conjunto Ceará',
    subitems: [
      { name: '1ª Companhia do 5º BPM', address: 'Av. H, s/n - Conjunto Ceará, Fortaleza-CE', phone: '(85) 3101-2751' },
      { name: '2ª Companhia do 5º BPM', address: 'Av. H, s/n - Conjunto Ceará, Fortaleza-CE', phone: '(85) 3101-2752' }
    ]
  },
  {
    name: '6º Batalhão de Polícia Militar',
    battalion: 'CPC',
    company: 'N/A',
    commander: 'Tenente-Coronel Assis Souza da Silva',
    phone: '(85) 3101-2760',
    ais: 'AIS 06 - Messejana',
    subitems: [
      { name: '1ª Companhia do 6º BPM', address: 'Av. Jornalista Tomaz Coelho, 209 - Messejana, Fortaleza-CE', phone: '(85) 3101-2761' },
      { name: '2ª Companhia do 6º BPM', address: 'Av. Jornalista Tomaz Coelho, 209 - Messejana, Fortaleza-CE', phone: '(85) 3101-2762' }
    ]
  },
  {
    name: '8º Batalhão de Polícia Militar',
    battalion: 'CPC',
    company: 'N/A',
    commander: 'Tenente-Coronel Marcos Aurélio Castelo Branco',
    phone: '(85) 3101-2770',
    ais: 'AIS 08 - Antônio Bezerra',
    subitems: [
      { name: '1ª Companhia do 8º BPM', address: 'Rua Júlio Braga, s/n - Antônio Bezerra, Fortaleza-CE', phone: '(85) 3101-2771' },
      { name: '2ª Companhia do 8º BPM', address: 'Rua Júlio Braga, s/n - Antônio Bezerra, Fortaleza-CE', phone: '(85) 3101-2772' }
    ]
  },
  {
    name: '16º Batalhão de Polícia Militar',
    battalion: 'CPC',
    company: 'N/A',
    commander: 'Tenente-Coronel Marcos Aurélio Pontes Feijão',
    phone: '(85) 3101-2780',
    ais: 'AIS 09 - Vicente Pinzón',
    subitems: [
      { name: '1ª Companhia do 16º BPM', address: 'Av. Vicente de Castro, s/n - Vicente Pinzón, Fortaleza-CE', phone: '(85) 3101-2781' },
      { name: '2ª Companhia do 16º BPM', address: 'Av. Vicente de Castro, s/n - Vicente Pinzón, Fortaleza-CE', phone: '(85) 3101-2782' }
    ]
  },
  {
    name: '19º Batalhão de Polícia Militar',
    battalion: 'CPC',
    company: 'N/A',
    commander: 'Tenente-Coronel Júlio César Nogueira Mendonça',
    phone: '(85) 3101-2790',
    ais: 'AIS 10 - Conjunto Esperança',
    subitems: [
      { name: '1ª Companhia do 19º BPM', address: 'Av. Contorno Norte, s/n - Conjunto Esperança, Fortaleza-CE', phone: '(85) 3101-2791' },
      { name: '2ª Companhia do 19º BPM', address: 'Av. Contorno Norte, s/n - Conjunto Esperança, Fortaleza-CE', phone: '(85) 3101-2792' }
    ]
  },
  {
    name: '20º Batalhão de Polícia Militar',
    battalion: 'CPC',
    company: 'N/A',
    commander: 'Tenente-Coronel Francisco Márcio Oliveira Leite',
    phone: '(85) 3101-2800',
    ais: 'AIS 07 - Jangurussu',
    subitems: [
      { name: '1ª Companhia do 20º BPM', address: 'Av. Castelo de Castro, s/n - Jangurussu, Fortaleza-CE', phone: '(85) 3101-2801' },
      { name: '2ª Companhia do 20º BPM', address: 'Av. Castelo de Castro, s/n - Jangurussu, Fortaleza-CE', phone: '(85) 3101-2802' }
    ]
  },
  {
    name: '21º Batalhão de Polícia Militar',
    battalion: 'CPC',
    company: 'N/A',
    commander: 'Tenente-Coronel Adriano Mendes Carneiro',
    phone: '(85) 3101-2810',
    ais: 'AIS 03 - Papicu',
    subitems: [
      { name: '1ª Companhia do 21º BPM', address: 'Rua Pereira de Miranda, 1416 - Papicu, Fortaleza-CE', phone: '(85) 3101-2811' },
      { name: '2ª Companhia do 21º BPM', address: 'Rua Pereira de Miranda, 1416 - Papicu, Fortaleza-CE', phone: '(85) 3101-2812' }
    ]
  },
  {
    name: '22º Batalhão de Polícia Militar',
    battalion: 'CPC',
    company: 'N/A',
    commander: 'Tenente-Coronel Iderval Moreno Madeira',
    phone: '(85) 3101-2820',
    ais: 'AIS 04 - Bom Jardim',
    subitems: [
      { name: '1ª Companhia do 22º BPM', address: 'Rua Oscar Araripe, 1020 - Bom Jardim, Fortaleza-CE', phone: '(85) 3101-2821' },
      { name: '2ª Companhia do 22º BPM', address: 'Rua Oscar Araripe, 1020 - Bom Jardim, Fortaleza-CE', phone: '(85) 3101-2822' }
    ]
  },
  
  // COMANDO DE POLICIAMENTO DE RONDAS DE AÇÕES INTENSIVAS E OSTENSIVAS (CPRAIO)
  {
    name: 'Comando de Policiamento de Rondas de Ações Intensivas e Ostensivas (CPRAIO)',
    battalion: 'Órgãos de Execução Operacional',
    company: 'N/A',
    commander: 'Coronel José Haroldo dos Santos Filho',
    phone: '(85) 3101-3490',
    ais: 'N/A',
    subitems: [
      { name: '1ª Companhia do RAIO', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-3491' },
      { name: '2ª Companhia do RAIO', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-3492' },
      { name: '3ª Companhia do RAIO', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-3493' }
    ]
  },
  
  // COMANDO DE POLICIAMENTO DE CHOQUE (CPChoque)
  {
    name: 'Comando de Policiamento de Choque (CPChoque)',
    battalion: 'Órgãos de Execução Operacional',
    company: 'N/A',
    commander: 'Coronel Antônio Abelardo Rodrigues Lima',
    phone: '(85) 3101-3400',
    ais: 'N/A',
    subitems: [
      { name: 'Batalhão de Choque', address: 'Av. Aguanambi, 1850 - Fátima, Fortaleza-CE', phone: '(85) 3101-3401' },
      { name: 'Batalhão de Operações Policiais Especiais (BOPE)', address: 'Av. Aguanambi, 1850 - Fátima, Fortaleza-CE', phone: '(85) 3101-3402' },
      { name: 'Batalhão de Polícia de Trânsito Urbano e Rodoviário Estadual (BPRE)', address: 'Av. Aguanambi, 1850 - Fátima, Fortaleza-CE', phone: '(85) 3101-3403' }
    ]
  },
  
  // COMANDO DE POLICIAMENTO DO INTERIOR (CPI)
  {
    name: 'Comando de Policiamento do Interior (CPI)',
    battalion: 'Órgãos de Execução Operacional',
    company: 'N/A',
    commander: 'Coronel Flávio Alves Sabino',
    phone: '(85) 3101-3500',
    ais: 'N/A',
    subitems: [
      { name: 'Coordenadoria de Planejamento Operacional do Interior', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-3501' }
    ]
  },
  {
    name: '3º Batalhão de Polícia Militar',
    battalion: 'CPI',
    company: 'N/A',
    commander: 'Tenente-Coronel Francisco Márcio Silva de Mesquita',
    phone: '(88) 3671-4700',
    ais: 'Juazeiro do Norte',
    subitems: [
      { name: '1ª Companhia do 3º BPM', address: 'Rua Padre Cícero, s/n - São Miguel, Juazeiro do Norte-CE', phone: '(88) 3671-4701' },
      { name: '2ª Companhia do 3º BPM', address: 'Rua Padre Cícero, s/n - São Miguel, Juazeiro do Norte-CE', phone: '(88) 3671-4702' }
    ]
  },
  {
    name: '4º Batalhão de Polícia Militar',
    battalion: 'CPI',
    company: 'N/A',
    commander: 'Tenente-Coronel Francilênio Moura Cavalcante',
    phone: '(88) 3611-8300',
    ais: 'Canindé',
    subitems: [
      { name: '1ª Companhia do 4º BPM', address: 'Rua Joaquim Magalhães, 960 - Centro, Canindé-CE', phone: '(88) 3611-8301' },
      { name: '2ª Companhia do 4º BPM', address: 'Rua Joaquim Magalhães, 960 - Centro, Canindé-CE', phone: '(88) 3611-8302' }
    ]
  },
  {
    name: '7º Batalhão de Polícia Militar',
    battalion: 'CPI',
    company: 'N/A',
    commander: 'Tenente-Coronel Antônio Cristiano Pinto Nogueira',
    phone: '(88) 3421-4700',
    ais: 'Sobral',
    subitems: [
      { name: '1ª Companhia do 7º BPM', address: 'Av. John Sanford, 1505 - Junco, Sobral-CE', phone: '(88) 3421-4701' },
      { name: '2ª Companhia do 7º BPM', address: 'Av. John Sanford, 1505 - Junco, Sobral-CE', phone: '(88) 3421-4702' }
    ]
  },
  
  // UNIDADES ESPECIALIZADAS
  {
    name: 'Batalhão de Polícia de Meio Ambiente (BPMA)',
    battalion: 'Unidades Especializadas',
    company: 'N/A',
    commander: 'Tenente-Coronel Wagner Góes Vidal',
    phone: '(85) 3101-2220',
    ais: 'N/A',
    subitems: [
      { name: '1ª Companhia do BPMA', address: 'Av. Washington Soares, 6280 - Messejana, Fortaleza-CE', phone: '(85) 3101-2221' },
      { name: '2ª Companhia do BPMA', address: 'Av. Washington Soares, 6280 - Messejana, Fortaleza-CE', phone: '(85) 3101-2222' }
    ]
  },
  {
    name: 'Regimento de Polícia Montada (RPMont)',
    battalion: 'Unidades Especializadas',
    company: 'N/A',
    commander: 'Tenente-Coronel Francisco Eliton Alves Barbosa',
    phone: '(85) 3101-4600',
    ais: 'N/A',
    subitems: [
      { name: '1º Esquadrão do RPMont', address: 'Av. Godofredo Maciel, 2900 - Maraponga, Fortaleza-CE', phone: '(85) 3101-4601' },
      { name: '2º Esquadrão do RPMont', address: 'Av. Godofredo Maciel, 2900 - Maraponga, Fortaleza-CE', phone: '(85) 3101-4602' }
    ]
  },
  {
    name: 'Batalhão de Segurança Patrimonial (BSP)',
    battalion: 'Unidades Especializadas',
    company: 'N/A',
    commander: 'Tenente-Coronel Marcos Aurélio Correia Lima',
    phone: '(85) 3101-6200',
    ais: 'N/A',
    subitems: [
      { name: '1ª Companhia do BSP', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-6201' },
      { name: '2ª Companhia do BSP', address: 'Av. Aguanambi, 2280 - Fátima, Fortaleza-CE', phone: '(85) 3101-6202' }
    ]
  },
  {
    name: 'Batalhão de Policiamento Turístico (BPTur)',
    battalion: 'Unidades Especializadas',
    company: 'N/A',
    commander: 'Tenente-Coronel Júlio César Lima de Menezes',
    phone: '(85) 3101-2200',
    ais: 'N/A',
    subitems: [
      { name: '1ª Companhia do BPTur', address: 'Av. Beira Mar, 4000 - Meireles, Fortaleza-CE', phone: '(85) 3101-2201' },
      { name: '2ª Companhia do BPTur', address: 'Av. Beira Mar, 4000 - Meireles, Fortaleza-CE', phone: '(85) 3101-2202' }
    ]
  }
];

const importPMCEStructure = async () => {
  try {
    console.log('Starting to clear existing sectors...');
    // Clear existing sectors
    await Sector.deleteMany({});
    console.log('Existing sectors deleted successfully');

    console.log('Starting to insert PMCE structure...');
    // Insert PMCE structure
    const result = await Sector.insertMany(pmceStructure);
    console.log(`PMCE structure imported successfully: ${result.length} sectors added`);
    
    console.log('Import completed, exiting...');
    process.exit(0);
  } catch (error) {
    console.error(`Error during import: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
};

// Adicionar tratamento de erros para conexão com o MongoDB
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err.message}`);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected successfully, starting import...');
  importPMCEStructure();
});