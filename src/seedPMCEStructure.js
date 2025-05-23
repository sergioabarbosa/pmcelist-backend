const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Sector = require('./models/sectorModel');
const connectDB = require('./config/db');

dotenv.config();

console.log('Starting PMCE structure import...');
console.log('Connecting to database...');

connectDB();

const pmceStructure = [
  // DIREÇÃO SUPERIOR
  {
    name: 'Comandante-Geral',
    battalion: 'Direção Superior',
    company: 'N/A',
    commander: 'Coronel Silva',
    phone: '(85) 3101-1234',
    ais: 'AIS-01',
  },
  // GERÊNCIA SUPERIOR
  {
    name: 'Subcomandante-Geral',
    battalion: 'Gerência Superior',
    company: 'N/A',
    commander: 'Coronel Oliveira',
    phone: '(85) 3101-2345',
    ais: 'AIS-02',
  },
  {
    name: 'Diretoria de Planejamento e Gestão Interna',
    battalion: 'Gerência Superior',
    company: 'N/A',
    commander: 'Coronel Rodrigues',
    phone: '(85) 3101-3456',
    ais: 'AIS-03',
  },
  {
    name: 'Diretoria de Planejamento e Gestão Operacional',
    battalion: 'Gerência Superior',
    company: 'N/A',
    commander: 'Coronel Ferreira',
    phone: '(85) 3101-4567',
    ais: 'AIS-04',
  },
  // ÓRGÃOS DE ASSESSORAMENTO
  {
    name: 'Assessoria do Gabinete do Comando-Geral',
    battalion: 'Órgãos de Assessoramento',
    company: 'N/A',
    commander: 'Tenente-Coronel Santos',
    phone: '(85) 3101-5678',
    ais: 'AIS-05',
  },
  {
    name: 'Assessoria Jurídica',
    battalion: 'Órgãos de Assessoramento',
    company: 'N/A',
    commander: 'Tenente-Coronel Lima',
    phone: '(85) 3101-6789',
    ais: 'AIS-06',
  },
  {
    name: 'Assessoria de Comunicação',
    battalion: 'Órgãos de Assessoramento',
    company: 'N/A',
    commander: 'Major Costa',
    phone: '(85) 3101-7890',
    ais: 'AIS-07',
  },
  {
    name: 'Assessoria de Inteligência Policial Militar',
    battalion: 'Órgãos de Assessoramento',
    company: 'N/A',
    commander: 'Tenente-Coronel Almeida',
    phone: '(85) 3101-8901',
    ais: 'AIS-08',
  },
  {
    name: 'Assessoria de Controle Interno',
    battalion: 'Órgãos de Assessoramento',
    company: 'N/A',
    commander: 'Major Pereira',
    phone: '(85) 3101-9012',
    ais: 'AIS-09',
  },
  {
    name: 'Ouvidoria',
    battalion: 'Órgãos de Assessoramento',
    company: 'N/A',
    commander: 'Major Souza',
    phone: '(85) 3101-0123',
    ais: 'AIS-10',
  },
  // ÓRGÃOS DE EXECUÇÃO PROGRAMÁTICA - Coordenadoria de Operações
  {
    name: 'Coordenadoria de Operações',
    battalion: 'Órgãos de Execução Programática',
    company: 'N/A',
    commander: 'Coronel Martins',
    phone: '(85) 3102-1234',
    ais: 'AIS-11',
  },
  {
    name: 'Célula de Planejamento',
    battalion: 'Coordenadoria de Operações',
    company: 'N/A',
    commander: 'Tenente-Coronel Gomes',
    phone: '(85) 3102-2345',
    ais: 'AIS-12',
  },
  // 1º CRPM - Capital Oeste
  {
    name: '1º Comando Regional de Polícia Militar',
    battalion: '1º CRPM - Capital Oeste',
    company: 'N/A',
    commander: 'Coronel Ribeiro',
    phone: '(85) 3103-1234',
    ais: 'AIS-13',
  },
  {
    name: '5º Batalhão de Polícia Militar',
    battalion: '1º CRPM - Capital Oeste',
    company: 'N/A',
    commander: 'Tenente-Coronel Carvalho',
    phone: '(85) 3103-2345',
    ais: 'AIS-14',
  },
  {
    name: '1ª Companhia do 5º BPM',
    battalion: '5º BPM',
    company: '1ª Companhia',
    commander: 'Capitão Mendes',
    phone: '(85) 3103-3456',
    ais: 'AIS-15',
  },
  {
    name: '2ª Companhia do 5º BPM',
    battalion: '5º BPM',
    company: '2ª Companhia',
    commander: 'Capitão Barros',
    phone: '(85) 3103-4567',
    ais: 'AIS-16',
  },
  {
    name: '3ª Companhia do 5º BPM',
    battalion: '5º BPM',
    company: '3ª Companhia',
    commander: 'Capitão Freitas',
    phone: '(85) 3103-5678',
    ais: 'AIS-17',
  },
  // 5º CRPM - Capital Leste
  {
    name: '5º Comando Regional de Polícia Militar',
    battalion: '5º CRPM - Capital Leste',
    company: 'N/A',
    commander: 'Coronel Nascimento',
    phone: '(85) 3104-1234',
    ais: 'AIS-18',
  },
  {
    name: '6º Batalhão de Polícia Militar',
    battalion: '5º CRPM - Capital Leste',
    company: 'N/A',
    commander: 'Tenente-Coronel Pinto',
    phone: '(85) 3104-2345',
    ais: 'AIS-19',
  },
  // CPE - Comando de Policiamento Especializado
  {
    name: 'Comando de Policiamento Especializado',
    battalion: 'CPE',
    company: 'N/A',
    commander: 'Coronel Moreira',
    phone: '(85) 3105-1234',
    ais: 'AIS-20',
  },
  {
    name: 'Batalhão de Polícia do Meio Ambiente',
    battalion: 'CPE',
    company: 'N/A',
    commander: 'Tenente-Coronel Campos',
    phone: '(85) 3105-2345',
    ais: 'AIS-21',
  },
  {
    name: 'BPCHOQUE',
    battalion: 'Batalhão de Choque',
    company: 'Companhia de Operações Especiais',
    commander: 'Tenente-Coronel Rodrigues',
    phone: '(85) 3101-4567',
    ais: 'AIS-22',
  },
  {
    name: 'BPRAIO',
    battalion: 'Batalhão RAIO',
    company: 'Companhia de Motociclistas',
    commander: 'Major Ferreira',
    phone: '(85) 3101-5678',
    ais: 'AIS-23',
  },
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