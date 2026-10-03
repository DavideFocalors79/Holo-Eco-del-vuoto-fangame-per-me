/* ============ CHARACTERS ============ */
const ELEMENT_DATA = {
  physical: {label:'Physical', strongAgainst:'dendro'},
  hydro: {label:'Hydro', strongAgainst:'physical'},
  ether: {label:'Ether', strongAgainst:'hydro'},
  imaginary: {label:'Imaginary', strongAgainst:'ether'},
  quantum: {label:'Quantum', strongAgainst:'imaginary'},
  electro: {label:'Electro', strongAgainst:'quantum'},
  dendro: {label:'Dendro', strongAgainst:'electro'},
};
const ELEMENT_RELATION = {
  electro:'quantum',
  quantum:'imaginary',
  imaginary:'ether',
  ether:'hydro',
  hydro:'physical',
  physical:'dendro',
  dendro:'electro',
};

const CHAR_DB = {
  kaelaKolvalskia: { name:'Kaela kolvalskia', title:'Baluardo di Ferro', role:'Tank', color:'#4fd8e0', glyph:'K', rarity:4, element:'physical', animStyle:'heavy',
    base:{hp:1450, atk:92, def:150, speed:100, energyMax:120},
    basic:{name:'Colpo di Scudo', desc:'Danno fisico a un bersaglio.', mult:1.0, target:'enemy', effect:null, energyGain:20},
    skill:{name:'Presa Ferrea', desc:'Danno e si scherma per 2 turni.', mult:1.2, target:'enemy', effect:'shield_self', shieldPct:0.18, energyGain:30},
    ult:{name:'Muro Indistruttibile', desc:'Scherma tutta la squadra per 2 turni.', mult:0, target:'allies_all', effect:'shield_all', shieldPct:0.22} },
  ceciliaImmergreen: { name:'Cecilia Immergreen', title:"Luce dell'Aurora", role:'Supporto Curativo', color:'#6ee7a0', glyph:'C', rarity:4, element:'dendro', animStyle:'radiant-soft',
    base:{hp:980, atk:76, def:75, speed:100, energyMax:110},
    basic:{name:'Raggio Guida', desc:'Danno leggero a un nemico.', mult:0.75, target:'enemy', effect:null, energyGain:20},
    skill:{name:'Benedizione', desc:'Cura un alleato.', mult:1.4, target:'ally', effect:'heal', energyGain:30},
    ult:{name:"Grazia dell'Alba", desc:'Cura tutta la squadra.', mult:1.9, target:'allies_all', effect:'heal_all'} },
  monaHoshinova: { name:'Mona Hoshinova', title:'Frattura Stellare', role:'DPS Arcano', color:'#a78bfa', glyph:'M', rarity:4, element:'quantum', animStyle:'arcane',
    base:{hp:1000, atk:132, def:68, speed:100, energyMax:130},
    basic:{name:'Scheggia Arcana', desc:'Danno magico a un bersaglio.', mult:0.95, target:'enemy', effect:null, energyGain:20},
    skill:{name:'Implosione', desc:'Danno magico elevato.', mult:1.7, target:'enemy', effect:null, energyGain:30},
    ult:{name:'Collasso Stellare', desc:'Danno devastante a un bersaglio.', mult:2.8, target:'enemy', effect:null} },
  mumeiNanashi: { name:'Mumei Nanashi', title:'Lama Silente', role:'DPS Rapido', color:'#ef5a7d', glyph:'M', rarity:4, element:'dendro', animStyle:'swift', skillFreeUses:2,
    base:{hp:1050, atk:106, def:64, speed:100, energyMax:115},
    basic:{name:'Doppio Taglio', desc:'Colpi rapidi su un bersaglio (i colpi aumentano usando la Skill).', mult:0.55, hits:2, target:'enemy', effect:null, energyGain:20},
    skill:{name:'Danza di Lame', desc:'Aumenta di 1 il numero di colpi dell\'Attacco Base, fino a un massimo di 10. Non conclude il turno: puoi usarla più volte finché hai Punti Abilità, poi chiudi con l\'Attacco Base. Le prime 2 volte a battaglia non costa Punti Abilità.', mult:0, target:'self', effect:'boost_basic_hits', energyGain:5},
    ult:{name:'Tempesta di Fendenti', desc:'5 colpi su un bersaglio.', mult:0.5, hits:5, target:'enemy', effect:null} },
  vestiaZeta: { name:'Vestia Zeta', title:'Lama Spezzata', role:'DPS Fisico', color:'#c23b52', glyph:'V', rarity:4, element:'physical', animStyle:'bleed', dotName:'Sanguinamento',
    base:{hp:1080, atk:116, def:70, speed:100, energyMax:120},
    basic:{name:'Sparo', desc:'Danno e applica Sanguinamento.', mult:0.85, target:'enemy', effect:'burn', burnStacks:1, energyGain:20},
    skill:{name:'Fendente', desc:'Danno maggiore, Sanguinamento x2.', mult:1.35, target:'enemy', effect:'burn', burnStacks:2, energyGain:30},
    ult:{name:'Attacco Aereo', desc:'Danno ad area, Sanguinamento su tutti.', mult:1.6, target:'enemies_all', effect:'burn_all', burnStacks:2} },
  IRyS: { name:'IRyS', title:'Voce del Comando', role:'Supporto Buff', color:'#7dd3fc', glyph:'I', rarity:4, element:'ether', animStyle:'surge',
    base:{hp:1000, atk:86, def:80, speed:100, energyMax:125},
    basic:{name:'Colpo Tattico', desc:'Danno leggero a un bersaglio.', mult:0.7, target:'enemy', effect:null, energyGain:20},
    skill:{name:'Coordinazione', desc:'Un alleato attacca una volta in più e ottiene +20% ATK.', mult:0, target:'ally', effect:'extra_attack_buff', buffPct:0.20, energyGain:30},
    ult:{name:'Grido di Guerra', desc:'Grande +ATK e energia alla squadra.', mult:0, target:'allies_all', effect:'buff_atk_energy', buffPct:0.4, energyGainAll:25} },
  ouroKronii: { name:'Ouro Kronii', title:'Architetta del Tempo', role:'Supporto Punti Abilità', color:'#ffd700', glyph:'O', rarity:5, element:'imaginary', animStyle:'celestial', passiveSpCapBonus:2,
    base:{hp:1150, atk:118, def:78, speed:100, energyMax:140},
    basic:{name:'Impulso Armonico', desc:'Danno a un bersaglio. Genera 2 Punti Abilità invece di 1.', mult:0.8, target:'enemy', effect:null, energyGain:20, spGain:2},
    skill:{name:'Dono del Tempo', desc:'Non infligge danno: dona 3 Punti Abilità alla squadra.', mult:0, target:'team', effect:'grant_sp', spGrant:3, energyGain:25},
    ult:{name:'Convergenza Assoluta', desc:'Dona 3 Punti Abilità e +25% ATK alla squadra per 2 turni.', mult:0, target:'team', effect:'grant_sp_and_buff', spGrant:3, buffPct:0.25} },
  hakosBaels: { name:'Hakos Baels', title:'Arbitra del Caos', role:'DPS Trasformazione', color:'#ef5a7d', glyph:'H', rarity:5, element:'ether', animStyle:'swift',
    base:{hp:1220, atk:142, def:86, speed:100, energyMax:150},
    basic:{name:'Dado Impazzito', desc:'Infligge danno normale a un nemico.', mult:1.0, target:'enemy', effect:null, energyGain:20},
    skill:{name:'Caos Concentrato', desc:'Infligge danno maggiore a un nemico.', mult:1.35, target:'enemy', effect:null, energyGain:30},
    ult:{name:'Rovina del Caos', desc:'Assorbe i parametri degli alleati e li richiama dopo cinque azioni di Hakos.', mult:0, target:'self', effect:'hakos_ultimate'} },
  laplusDarkness: { name:'Laplus Darkness', title:'Signora della Disordine', role:'Debuffer Quantum', color:'#b69cff', glyph:'L', rarity:5, element:'quantum', animStyle:'arcane',
    base:{hp:1080, atk:136, def:78, speed:100, energyMax:140},
    basic:{name:'Raggio Disordinato', desc:'Infligge danno a un nemico e ne riduce la DIF del 15% per 2 round.', mult:1.0, target:'enemy', effect:'laplus_def_down', energyGain:20},
    skill:{name:'Marchio del Caos', desc:'Infligge danno, riduce la DIF del 15% e pianta per 2 round la debolezza contro l’elemento forte del primo eroe in squadra.', mult:1.35, target:'enemy', effect:'laplus_plant_weakness', energyGain:30},
    ult:{name:'Dominio della Disordine', desc:'Danneggia tutti i nemici, riduce la DIF del 30% per 2 round e rinnova il debuff.', mult:1.6, target:'enemies_all', effect:'laplus_ultimate'} },
  ninomaeInaNis: {name:"Ninomae Ina'Nis",title:'Sacerdotessa del Vuoto',role:'DPS Follow-up',color:'#42c9b8',glyph:'I',rarity:4,element:'hydro',animStyle:'radiant-soft',passiveInaFollowUps:3,
    base:{hp:1120,atk:128,def:82,speed:100,energyMax:135},
    basic:{name:'Inchiostro Abissale',desc:'Infligge danno a un singolo nemico.',mult:0.9,target:'enemy',effect:null,energyGain:20},
    skill:{name:'Marchio Tentacolare',desc:'Infligge danno e marca un nemico. Gli attacchi successivi contro il bersaglio marcato attivano un follow-up di Ina, fino a 3 volte.',mult:1.3,target:'enemy',effect:'ina_mark',energyGain:30},
    ult:{name:'Oltre il Mare',desc:'Infligge danno a tutti i nemici, esegue un follow-up casuale e recupera le 3 cariche di follow-up.',mult:1.55,target:'enemies_all',effect:'ina_ultimate'} },
  suiseiHoshimachi: {name:'Susei Hoshimachi',title:'Cometa Cremisi',role:'DPS PV Massimi',color:'#4c91ff',glyph:'S',rarity:5,element:'imaginary',animStyle:'surge',passiveHpLossFollowUps:4,revivesPerBattle:2,
    base:{hp:1420,atk:88,def:84,speed:100,energyMax:145},
    basic:{name:'Luce della Cometa',desc:'Attacco singolo basato sui PV massimi.',mult:0.14,target:'enemy',effect:null,hpBased:true,energyGain:20},
    skill:{name:'Stella Cadente',desc:'Sacrifica metà dei PV correnti, riduce del 40% i danni subiti per 3 round e potenzia il Basic.',mult:0,target:'self',effect:'suisei_guard',energyGain:0},
    ult:{name:'Finale Stellare',desc:'Colpo singolo basato sui PV massimi. Porta i PV di Susei esattamente al 50% dopo il colpo.',mult:0.48,target:'enemy',effect:'suisei_set_half_hp',hpBased:true,energyGain:0} },
};

const ENEMY_NAMES = ['Larva del Vuoto','Sentinella Corrotta','Sciame Spinato','Costrutto Infranto','Ombra Vagante'];
const BOSS_NAMES = ['Custode di Cristallo','Araldo del Vuoto','Colosso Corroso','Regina Ombra','Abisso Primordiale'];
const MAX_ENEMIES_IN_BATTLE = 5;
const BOSS_MECHANICS = {
  'Custode di Cristallo':{phase1:'shield',phase2:'area'},
  'Araldo del Vuoto':{phase1:'summon',phase2:'summon'},
  'Colosso Corroso':{phase1:'heal',phase2:'area'},
  'Regina Ombra':{phase1:'shield',phase2:'heal'},
  'Abisso Primordiale':{phase1:'shield_heal',phase2:'summon_burst'},
};
const BOSS_MECHANIC_LABELS = {shield:'Scudo',summon:'Evoca rinforzi',heal:'Cura',area:'Attacco ad area',shield_heal:'Scudo e cura',summon_burst:'Evoca due sentinelle; AoE massiva se sopravvivono 2 turni'};
const ENEMY_ELEMENT_SETS = {
  'Larva del Vuoto':['quantum','hydro','dendro'],
  'Sentinella Corrotta':['physical','electro','imaginary'],
  'Sciame Spinato':['ether','quantum','electro'],
  'Costrutto Infranto':['hydro','imaginary','physical'],
  'Ombra Vagante':['dendro','ether','quantum'],
  'Custode di Cristallo':['physical','quantum','hydro'],
  'Araldo del Vuoto':['electro','ether','imaginary'],
  'Colosso Corroso':['dendro','physical','ether'],
  'Regina Ombra':['quantum','hydro','electro'],
  'Abisso Primordiale':['hydro','electro','physical'],
};

/* ============ ARTIFACT / STAT SYSTEM ============ */
// Each stat key is either a flat bonus, a percentage bonus to a base stat, or a bonus to energy gain.
const STAT_KEYS = {
  atk:        {label:'ATK',      kind:'flat',   flatKey:'atk'},
  hp:         {label:'PV',       kind:'flat',   flatKey:'hp'},
  def:        {label:'DEF',      kind:'flat',   flatKey:'def'},
  speed:      {label:'VEL',      kind:'flat',   flatKey:'speed'},
  atk_pct:    {label:'ATK%',     kind:'pct',    target:'atk'},
  hp_pct:     {label:'PV%',      kind:'pct',    target:'hp'},
  def_pct:    {label:'DEF%',     kind:'pct',    target:'def'},
  energy_pct: {label:'Energia%', kind:'energy'},
};
const RARITY_ORDER = ['comune','rara','epica'];
const RARITY_COLOR = {comune:'#8791b3', rara:'#4fd8e0', epica:'#f5b342', leggendaria:'#ffd700'};
const RARITY_LABEL = {comune:'Comune', rara:'Rara', epica:'Epica', leggendaria:'5 stelle'};

const MAIN_VALUES = {
  flat:   {comune:{atk:20,hp:200,def:24}, rara:{atk:36,hp:360,def:42}, epica:{atk:60,hp:600,def:70}},
  pct:    {comune:0.08, rara:0.14, epica:0.20},
  energy: {comune:0.06, rara:0.10, epica:0.14},
};
const SUB_VALUES = {
  flat:   {comune:{atk:6,hp:60,def:8}, rara:{atk:11,hp:110,def:14}, epica:{atk:18,hp:180,def:22}},
  pct:    {comune:0.03, rara:0.05, epica:0.08},
  energy: {comune:0.03, rara:0.05, epica:0.07},
};

// Manufatti (artifact sets). Equipping 2 pieces of the same set grants a generic bonus,
// 4 pieces grant a stronger, more specific bonus — mirrors Honkai: Star Rail relic sets.
const ARTIFACT_SETS = {
  baluardo: { name:'Baluardo di Ferro', icon:'🛡',
    pieces:['Piastra del Baluardo','Guanto del Baluardo','Elmo del Baluardo','Stivali del Baluardo','Fibbia del Baluardo'],
    bonus2:{label:'+12% DEF', apply:(acc)=>{ acc.pctBonus.def+=0.12; }},
    bonus4:{label:'+20% PV Massimi', apply:(acc)=>{ acc.pctBonus.hp+=0.20; }} },
  fiamma: { name:'Lama Cruenta', icon:'🩸',
    pieces:['Nucleo Cruento','Anello Vermiglio','Manto Insanguinato','Sigillo Cruento','Ciondolo Vermiglio'],
    bonus2:{label:'+12% ATK', apply:(acc)=>{ acc.pctBonus.atk+=0.12; }},
    bonus4:{label:'+20% danno da Sanguinamento', apply:(acc)=>{ acc.burnMult+=0.20; }} },
  glaciale: { name:'Eco Glaciale', icon:'❄',
    pieces:['Cristallo Glaciale','Prisma Glaciale','Velo Glaciale','Perla Glaciale','Diadema Glaciale'],
    bonus2:{label:'+12% ATK', apply:(acc)=>{ acc.pctBonus.atk+=0.12; }},
    bonus4:{label:'+15% cure effettuate', apply:(acc)=>{ acc.healMult+=0.15; }} },
  tempesta: { name:'Tempesta Rapida', icon:'⚡',
    pieces:['Nucleo della Tempesta','Ali della Tempesta','Fascia della Tempesta','Lente della Tempesta','Spira della Tempesta'],
    bonus2:{label:'+15 energia iniziale', apply:(acc)=>{ acc.startEnergyBonus+=15; }},
    bonus4:{label:'+20% energia guadagnata', apply:(acc)=>{ acc.energyGainMult+=0.20; }} },
  custode: { name:'Custode Runico', icon:'✦',
    pieces:['Nucleo Runico','Placca Runica','Sigillo Runico','Anello Runico','Corona Runica'],
    bonus2:{label:'+12% PV Massimi', apply:(acc)=>{ acc.pctBonus.hp+=0.12; }},
    bonus4:{label:'+25% forza degli scudi', apply:(acc)=>{ acc.shieldMult+=0.25; }} },
};

function shuffleArr(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

function valueForRarity(kind, meta, rarity, tier, stageLevel){
  if(kind==='flat'){
    if(meta.flatKey==='speed') return 1+Math.floor(Math.random()*4);
    const table = tier==='main' ? MAIN_VALUES.flat[rarity] : SUB_VALUES.flat[rarity];
    const base = table[meta.flatKey];
    const growth = 1 + Math.min(1.5, stageLevel*0.03);
    return Math.round(base*growth);
  }
  if(kind==='pct') return tier==='main' ? MAIN_VALUES.pct[rarity] : SUB_VALUES.pct[rarity];
  return tier==='main' ? MAIN_VALUES.energy[rarity] : SUB_VALUES.energy[rarity]; // 'energy'
}

function generateArtifact(stageLevel){
  const rarityRoll = Math.random() + stageLevel*0.012;
  const rarity = rarityRoll>0.93 ? 'epica' : rarityRoll>0.65 ? 'rara' : 'comune';
  const setId = pick(Object.keys(ARTIFACT_SETS));
  const allKeys = Object.keys(STAT_KEYS);
  const mainKey = pick(allKeys);
  const mainMeta = STAT_KEYS[mainKey];
  const mainValue = valueForRarity(mainMeta.kind, mainMeta, rarity, 'main', stageLevel);
  const subKeys = shuffleArr(allKeys.filter(k=>k!==mainKey)).slice(0,3);
  const subStats = subKeys.map(k=>{
    const meta = STAT_KEYS[k];
    return {key:k, value:valueForRarity(meta.kind, meta, rarity, 'sub', stageLevel)};
  });
  const name = pick(ARTIFACT_SETS[setId].pieces);
  return {uid:'it'+(state.itemUidCounter++), name, setId, rarity, level:0, mainStat:{key:mainKey,value:mainValue}, subStats};
}

/* ============ WEAPON SYSTEM ============ */
// Each hero has one weapon slot (separate from the 5 artifact slots). Simpler than artifacts:
// 1 flat ATK main stat + 1 secondary stat rolled from the same STAT_KEYS pool.
const WEAPON_NAMES = ['Lama del Crepuscolo','Bastone Runico','Arco Siderale','Falce Infranta','Martello Sismico','Pugnale Ombra','Tomo Ancestrale','Baluardo Vivente','Frusta di Vento','Rostro d\'Acciaio'];
const WEAPON_FIXED_STATS = {
  'Lama del Crepuscolo':{rarity:'comune',atk:48,subStat:{key:'hp',value:180}},
  'Bastone Runico':{rarity:'comune',atk:42,subStat:{key:'energy_pct',value:0.04}},
  'Arco Siderale':{rarity:'rara',atk:82,subStat:{key:'atk_pct',value:0.05}},
  'Falce Infranta':{rarity:'rara',atk:88,subStat:{key:'def_pct',value:0.06}},
  'Martello Sismico':{rarity:'rara',atk:76,subStat:{key:'hp_pct',value:0.07}},
  'Pugnale Ombra':{rarity:'rara',atk:94,subStat:{key:'speed',value:2}},
  'Tomo Ancestrale':{rarity:'epica',atk:132,subStat:{key:'energy_pct',value:0.09}},
  'Baluardo Vivente':{rarity:'epica',atk:126,subStat:{key:'def_pct',value:0.12}},
  'Frusta di Vento':{rarity:'epica',atk:145,subStat:{key:'speed',value:4}},
  'Rostro d\'Acciaio':{rarity:'epica',atk:154,subStat:{key:'atk_pct',value:0.09}},
};
const WEAPON_DEFINITIONS = {
  'Lama del Crepuscolo': {effect:{stat:'damageMult', base:0.06, perAscension:0.02, describe:value=>`Danni inflitti +${Math.round(value*100)}%.`}},
  'Bastone Runico': {effect:{stat:'healMult', base:0.10, perAscension:0.02, describe:value=>`Cure effettuate +${Math.round(value*100)}%.`}},
  'Arco Siderale': {effect:{stat:'weaknessBonus', base:0.10, perAscension:0.02, describe:value=>`Danno contro debolezze +${Math.round(value*100)}%.`}},
  'Falce Infranta': {effect:{stat:'burnMult', base:0.20, perAscension:0.03, describe:value=>`Danni da Sanguinamento +${Math.round(value*100)}%.`}},
  'Martello Sismico': {effect:{stat:'shieldMult', base:0.15, perAscension:0.03, describe:value=>`Scudi generati +${Math.round(value*100)}%.`}},
  'Pugnale Ombra': {effect:{stat:'sameElementBonus', base:0.10, perAscension:0.02, describe:value=>`Riduce la penalità contro lo stesso elemento: danno x${(0.5+value).toFixed(2)}.`}},
  'Tomo Ancestrale': {effect:{stat:'energyGainMult', base:0.15, perAscension:0.025, describe:value=>`Energia ottenuta +${Math.round(value*100)}%.`}},
  'Baluardo Vivente': {effect:{stat:'defPct', base:0.10, perAscension:0.02, describe:value=>`DIF +${Math.round(value*100)}%.`}},
  'Frusta di Vento': {effect:{stat:'speed', base:5, perAscension:1, describe:value=>`VEL +${value}.`}},
  'Rostro d\'Acciaio': {effect:{stat:'atkPct', base:0.10, perAscension:0.02, describe:value=>`ATK +${Math.round(value*100)}%.`}},
  'Aegis dell\'Ultima Alba': {ownerId:'kaelaKolvalskia', effect:{stat:'shieldMult', base:0.25, perAscension:0.04, describe:value=>`Scudi generati +${Math.round(value*100)}%.`}},
  'Grazia dell\'Aurora': {ownerId:'ceciliaImmergreen', effect:{stat:'healMult', base:0.25, perAscension:0.04, describe:value=>`Cure effettuate +${Math.round(value*100)}%.`}},
  'Orizzonte degli Eventi': {ownerId:'monaHoshinova', effect:{stat:'weaknessBonus', base:0.20, perAscension:0.03, describe:value=>`Danno contro debolezze +${Math.round(value*100)}%.`}},
  'Mille Tagli Silenziosi': {ownerId:'mumeiNanashi', effect:{stat:'basicDamageMult', base:0.12, perAscension:0.025, describe:value=>`Danno degli Attacchi Base +${Math.round(value*100)}%.`}},
  'Giuramento Cremisi': {ownerId:'vestiaZeta', effect:{stat:'burnMult', base:0.35, perAscension:0.05, describe:value=>`Danni da Sanguinamento +${Math.round(value*100)}%.`}},
  'Voce della Speranza': {ownerId:'IRyS', effect:{stat:'buffPctBonus', base:0.10, perAscension:0.02, describe:value=>`Efficacia dei buff ATK +${Math.round(value*100)}%.`}},
  'Eternita Meccanica': {ownerId:'ouroKronii', effect:{stat:'spGrantBonus', base:1, perAscension:1, ascensionStep:3, describe:value=>`Le Skill che donano PA ne forniscono ${value} in piu.`}},
  'Caos Inevitabile': {ownerId:'hakosBaels', effect:{stat:'damageMult', base:0.15, perAscension:0.03, describe:value=>`Danni inflitti +${Math.round(value*100)}%.`}},
  'Sigillo del Disordine': {ownerId:'laplusDarkness', effect:{stat:'defDownBonus', base:0.05, perAscension:0.02, describe:value=>`Ogni attacco riduce la DIF nemica di ${Math.round(value*100)}% per 2 round.`}},
  'Scia della Cometa': {ownerId:'suiseiHoshimachi', effect:{stat:'hpDamageMult',base:0.15,perAscension:0.03,describe:value=>`Danni delle abilita basate sui PV massimi +${Math.round(value*100)}%.`}},
  'Reliquiario delle Profondita': {ownerId:'ninomaeInaNis', effect:{stat:'damageMult', base:0.12, perAscension:0.025, describe:value=>`Danni inflitti +${Math.round(value*100)}%.`}},
};
const SIGNATURE_WEAPONS = [
  {name:'Aegis dell\'Ultima Alba', ownerId:'kaelaKolvalskia', atk:165, subStat:{key:'def_pct',value:0.16}},
  {name:'Grazia dell\'Aurora', ownerId:'ceciliaImmergreen', atk:140, subStat:{key:'energy_pct',value:0.14}},
  {name:'Orizzonte degli Eventi', ownerId:'monaHoshinova', atk:190, subStat:{key:'atk_pct',value:0.14}},
  {name:'Mille Tagli Silenziosi', ownerId:'mumeiNanashi', atk:175, subStat:{key:'speed',value:8}},
  {name:'Giuramento Cremisi', ownerId:'vestiaZeta', atk:185, subStat:{key:'atk_pct',value:0.12}},
  {name:'Voce della Speranza', ownerId:'IRyS', atk:145, subStat:{key:'energy_pct',value:0.16}},
  {name:'Eternita Meccanica', ownerId:'ouroKronii', atk:170, subStat:{key:'speed',value:7}},
  {name:'Caos Inevitabile', ownerId:'hakosBaels', atk:188, subStat:{key:'atk_pct',value:0.14}},
  {name:'Sigillo del Disordine', ownerId:'laplusDarkness', atk:182, subStat:{key:'energy_pct',value:0.14}},
  {name:'Scia della Cometa',ownerId:'suiseiHoshimachi',atk:180,subStat:{key:'hp_pct',value:0.14}},
  {name:'Reliquiario delle Profondita', ownerId:'ninomaeInaNis', atk:176, subStat:{key:'atk_pct',value:0.12}},
];

function normalizeWeapon(weapon){
  if(!weapon) return weapon;
  weapon.level = clamp(Number(weapon.level)||0,0,20);
  weapon.ascension = clamp(Number(weapon.ascension)||0,0,5);
  const signature=SIGNATURE_WEAPONS.find(item=>item.name===weapon.name);
  const fixed=signature||WEAPON_FIXED_STATS[weapon.name];
  if(fixed){
    weapon.rarity=signature?'leggendaria':fixed.rarity;
    weapon.baseAtk=fixed.atk;
    weapon.mainStat={key:'atk',value:fixed.atk+weapon.level*Math.max(1,Math.round(fixed.atk*0.04))};
    weapon.subStat={...fixed.subStat};
    weapon.ownerId=signature?.ownerId||null;
  } else {
    weapon.baseAtk = Number(weapon.baseAtk)||Number(weapon.mainStat?.value)||0;
  }
  weapon.effectId = weapon.effectId || weapon.name;
  return weapon;
}

function getWeaponDefinition(weapon){
  return WEAPON_DEFINITIONS[weapon?.name] || null;
}

function getWeaponEffect(weapon){
  const definition = getWeaponDefinition(weapon);
  return definition?.effect||null;
}

function getWeaponEffectValue(weapon){
  const effect = getWeaponEffect(weapon);
  if(!effect) return 0;
  const ascension = weapon.ascension||0;
  const ranks = effect.ascensionStep ? Math.floor(ascension/effect.ascensionStep) : ascension;
  return effect.base + effect.perAscension*ranks;
}

function getWeaponEffectDescription(weapon){
  const definition=getWeaponDefinition(weapon);
  if(!definition) return 'Nessun effetto speciale.';
  const effect=definition.effect;
  return effect.describe(getWeaponEffectValue(weapon));
}

function createWeapon(name){
  const signature=SIGNATURE_WEAPONS.find(weapon=>weapon.name===name);
  const stats=signature||WEAPON_FIXED_STATS[name];
  const rarity=signature?'leggendaria':stats.rarity;
  const atk=stats.atk;
  return {uid:'wp'+(state.weaponUidCounter++),name,rarity,level:0,ascension:0,baseAtk:atk,effectId:name,ownerId:signature?.ownerId||null,mainStat:{key:'atk',value:atk},subStat:{...stats.subStat}};
}
function generateWeapon(){
  return createWeapon(pick(WEAPON_NAMES));
}
function renderWeaponCard(w, opts){
  opts = opts||{};
  normalizeWeapon(w);
  const level = w.level||0;
  const ascension = w.ascension||0;
  const card = el(`<div class="hud-panel artifact-card" style="border-color:${RARITY_COLOR[w.rarity]}">
    <div class="ac-head">
      <span class="ac-icon">⚔</span>
      <div>
        <div class="ac-name">${w.name} <span class="ac-level">Lv.${level}/20 · Asc. ${ascension}/5</span></div>
        <div class="ac-setname" style="color:${RARITY_COLOR[w.rarity]}">${RARITY_LABEL[w.rarity]||'Arma'} · Arma${w.unavailable?' · Inottenibile per ora':''}</div>
      </div>
    </div>
    <div class="ac-main">${statKeyLabel(w.mainStat.key)} <b>${formatStatValue(w.mainStat)}</b></div>
    <div class="ac-subs"><span>· ${statKeyLabel(w.subStat.key)} ${formatStatValue(w.subStat)}</span></div>
    <div class="ac-setbonus">${getWeaponEffectDescription(w,opts.charId)}</div>
  </div>`);
  const actions = opts.actions || (opts.actionLabel ? [{label:opts.actionLabel, onClick:opts.onAction}] : []);
  if(actions.length>0){
    const actRow = el(`<div style="display:flex;flex-direction:column;gap:6px;margin-top:8px;"></div>`);
    actions.forEach(action=>{
      const btn = el(`<button class="small" ${action.disabled?'disabled':''} style="width:100%;">${action.label}</button>`);
      btn.onclick=(ev)=>{ ev.stopPropagation(); if(!action.disabled) action.onClick(); };
      actRow.appendChild(btn);
    });
    card.appendChild(actRow);
  }
  return card;
}

function formatStatValue(stat){
  const meta = STAT_KEYS[stat.key];
  if(meta.kind==='flat') return '+'+stat.value;
  return '+'+Math.round(stat.value*100)+'%';
}
function statKeyLabel(key){ return STAT_KEYS[key].label; }

function formatArtifactShort(it){
  const setDef = ARTIFACT_SETS[it.setId];
  return `${setDef.icon} ${it.name} · ${statKeyLabel(it.mainStat.key)} ${formatStatValue(it.mainStat)}`;
}
function formatArtifactTooltip(it){
  const setDef = ARTIFACT_SETS[it.setId];
  const subLines = it.subStats.map(s=>`${statKeyLabel(s.key)} ${formatStatValue(s)}`).join(', ');
  return `${it.name} [${RARITY_LABEL[it.rarity]}] — Set: ${setDef.name}\n`
       + `Principale: ${statKeyLabel(it.mainStat.key)} ${formatStatValue(it.mainStat)}\n`
       + `Secondarie: ${subLines}\n`
       + `2 pezzi: ${setDef.bonus2.label}\n4 pezzi: ${setDef.bonus4.label}`;
}
function renderArtifactCard(it, opts){
  opts = opts||{};
  const setDef = ARTIFACT_SETS[it.setId];
  const level = it.level||0;
  const card = el(`<div class="hud-panel artifact-card" style="border-color:${RARITY_COLOR[it.rarity]}">
    <div class="ac-head">
      <span class="ac-icon">${setDef.icon}</span>
      <div>
        <div class="ac-name">${it.name} <span class="ac-level">Lv.${level}/20</span></div>
        <div class="ac-setname" style="color:${RARITY_COLOR[it.rarity]}">${RARITY_LABEL[it.rarity]} · ${setDef.name}</div>
      </div>
    </div>
    <div class="ac-main">${statKeyLabel(it.mainStat.key)} <b>${formatStatValue(it.mainStat)}</b></div>
    <div class="ac-subs">${it.subStats.map(s=>`<span>· ${statKeyLabel(s.key)} ${formatStatValue(s)}</span>`).join('')}</div>
    <div class="ac-setbonus">2 pz: ${setDef.bonus2.label}<br>4 pz: ${setDef.bonus4.label}</div>
  </div>`);
  const actions = opts.actions || (opts.actionLabel ? [{label:opts.actionLabel, onClick:opts.onAction}] : []);
  if(actions.length>0){
    const actRow = el(`<div style="display:flex;flex-direction:column;gap:6px;margin-top:8px;"></div>`);
    actions.forEach(a=>{
      const btn = el(`<button class="small" ${a.disabled?'disabled':''} style="width:100%;">${a.label}</button>`);
      btn.onclick=(ev)=>{ ev.stopPropagation(); if(!a.disabled) a.onClick(); };
      actRow.appendChild(btn);
    });
    card.appendChild(actRow);
  }
  return card;
}

function applyStatToAcc(acc, key, value){
  const meta = STAT_KEYS[key];
  if(meta.kind==='flat') acc.flatBonus[meta.flatKey] += value;
  else if(meta.kind==='pct') acc.pctBonus[meta.target] += value;
  else acc.energyGainMult += value; // 'energy'
}

function getActiveSetBonuses(charId){
  const eq = state.roster[charId].equipment;
  const counts = {};
  eq.forEach(it=>{ if(it) counts[it.setId]=(counts[it.setId]||0)+1; });
  const out = [];
  Object.keys(counts).forEach(setId=>{
    const cnt = counts[setId];
    const def = ARTIFACT_SETS[setId];
    if(cnt>=2) out.push({icon:def.icon, name:def.name, tier:2, label:def.bonus2.label});
    if(cnt>=4) out.push({icon:def.icon, name:def.name, tier:4, label:def.bonus4.label});
  });
  return out;
}

function getEffectiveStats(charId){
  const base = CHAR_DB[charId].base;
  const eq = state.roster[charId].equipment;
  const acc = {
    flatBonus:{atk:0,hp:0,def:0,speed:0}, pctBonus:{atk:0,hp:0,def:0},
    energyGainMult:1, healMult:1, burnMult:1, shieldMult:1, startEnergyBonus:0,
  };
  const setCounts = {};
  eq.forEach(it=>{
    if(!it) return;
    applyStatToAcc(acc, it.mainStat.key, it.mainStat.value);
    it.subStats.forEach(s=>applyStatToAcc(acc, s.key, s.value));
    setCounts[it.setId] = (setCounts[it.setId]||0)+1;
  });
  const weapon = state.roster[charId].weapon;
  if(weapon){
    normalizeWeapon(weapon);
    applyStatToAcc(acc, weapon.mainStat.key, weapon.mainStat.value);
    applyStatToAcc(acc, weapon.subStat.key, weapon.subStat.value);
    const effect = getWeaponEffect(weapon,charId);
    if(effect){
      const value = getWeaponEffectValue(weapon,charId);
      if(effect.stat==='atkPct') acc.pctBonus.atk+=value;
      else if(effect.stat==='defPct') acc.pctBonus.def+=value;
      else if(effect.stat==='speed') acc.flatBonus.speed+=value;
      else if(['healMult','burnMult','shieldMult','energyGainMult'].includes(effect.stat)) acc[effect.stat]+=value;
      else acc[effect.stat]=value;
    }
  }
  Object.keys(setCounts).forEach(setId=>{
    const cnt = setCounts[setId];
    const def = ARTIFACT_SETS[setId];
    if(cnt>=2) def.bonus2.apply(acc);
    if(cnt>=4) def.bonus4.apply(acc);
  });
  const hp  = Math.round((base.hp  + acc.flatBonus.hp ) * (1+acc.pctBonus.hp ));
  const atk = Math.round((base.atk + acc.flatBonus.atk) * (1+acc.pctBonus.atk));
  const def = Math.round((base.def + acc.flatBonus.def) * (1+acc.pctBonus.def));
  return {
    hp, atk, def, speed:base.speed+acc.flatBonus.speed, energyMax:base.energyMax,
    energyGainMult:acc.energyGainMult, healMult:acc.healMult,
    burnMult:acc.burnMult, shieldMult:acc.shieldMult, startEnergyBonus:acc.startEnergyBonus,
    damageMult:1+(acc.damageMult||0), weaknessBonus:acc.weaknessBonus||0,
    sameElementBonus:acc.sameElementBonus||0, basicDamageMult:1+(acc.basicDamageMult||0),
    buffPctBonus:acc.buffPctBonus||0, spGrantBonus:acc.spGrantBonus||0,
    formDamageMult:1+(acc.formDamageMult||0), defDownBonus:acc.defDownBonus||0,
    hpDamageMult:1+(acc.hpDamageMult||0),
  };
}

/* ============ GLOBAL STATE ============ */
let state = {
  screen:'home', // home | town | battle | victory | defeat
  gold:0,
  stage:1,
  maxStageReached:1,
  roster:{}, // id -> {equipment:[5], weapon, unlocked}
  inventory:[], // artifact objects
  weaponInventory:[], // weapon objects
  party:['kaelaKolvalskia'], // starts with a single unlocked hero
  battle:null,
  itemUidCounter:1,
  weaponUidCounter:1,
  pityCounter:0, // pulls since the last character obtained (4★ pity)
  pity5Counter:0, // pulls since the last 5★ obtained
  weaponBannerPulls:0,
  bannerType:'personaggi',
  lastPullBanner:'personaggi',
  lastPullResults:[],
  townTab:'squadra', // squadra | personaggi | abilita | inventario | indice | torre | banner | missioni
  abilityTabChar: 'kaelaKolvalskia',
  indexCategory:'tutto',
  autoBattle:false,
  claimedQuests:{}, // questId -> true (one-off milestones)
  questTiers:{}, // trackId -> how many times claimed (drives scaling target/reward)
  questExhausted:{}, // trackId -> true once a capped track has hit its max tier
  totalPullsDone:0,
  totalArtifactsSold:0,
};

function initRoster(){
  Object.keys(CHAR_DB).forEach(id=>{
    state.roster[id] = { equipment:[null,null,null,null,null], weapon:null, unlocked:(id==='kaelaKolvalskia') };
  });
}
initRoster();

/* ============ SAVE / LOAD ============ */
const SAVE_KEY = 'ecoDelVuoto_save';
function getSaveData(){
  return {
    version:1,
    gold: state.gold,
    stage: state.stage,
    maxStageReached: state.maxStageReached,
    roster: state.roster,
    inventory: state.inventory,
    weaponInventory: state.weaponInventory,
    party: state.party,
    itemUidCounter: state.itemUidCounter,
    weaponUidCounter: state.weaponUidCounter,
    pityCounter: state.pityCounter,
    pity5Counter: state.pity5Counter,
    weaponBannerPulls: state.weaponBannerPulls,
    claimedQuests: state.claimedQuests,
    questTiers: state.questTiers,
    questExhausted: state.questExhausted,
    totalPullsDone: state.totalPullsDone,
    totalArtifactsSold: state.totalArtifactsSold,
  };
}
function saveGame(){
  try{ localStorage.setItem(SAVE_KEY, JSON.stringify(getSaveData())); }
  catch(e){ console.error('Salvataggio fallito', e); }
}
function hasSave(){
  try{ return !!localStorage.getItem(SAVE_KEY); } catch(e){ return false; }
}
function ensureRosterIntegrity(){
  Object.keys(CHAR_DB).forEach(id=>{
    if(!state.roster[id]){
      // Character added to the game after this save was created — give it a fresh, locked entry.
      state.roster[id] = { equipment:[null,null,null,null,null], weapon:null, unlocked:(id==='kaelaKolvalskia') };
    } else {
      if(!Array.isArray(state.roster[id].equipment) || state.roster[id].equipment.length!==5){
        state.roster[id].equipment = [null,null,null,null,null];
      }
      if(state.roster[id].weapon===undefined) state.roster[id].weapon = null;
      if(state.roster[id].unlocked===undefined) state.roster[id].unlocked = (id==='kaelaKolvalskia');
    }
  });
  state.roster.kaelaKolvalskia.unlocked = true; // Kaela kolvalskia can never be locked out
  // Drop any party members that no longer resolve to a valid, unlocked character.
  state.party = state.party.filter(id=>CHAR_DB[id] && state.roster[id] && state.roster[id].unlocked);
  if(state.party.length===0) state.party=['kaelaKolvalskia'];
}

function loadGame(){
  try{
    const raw = localStorage.getItem(SAVE_KEY);
    if(!raw) return false;
    const data = JSON.parse(raw);
    const idMigration = {kael:'kaelaKolvalskia', lyra:'ceciliaImmergreen', nova:'monaHoshinova', sable:'mumeiNanashi', riven:'vestiaZeta', vex:'IRyS', aurelia:'ouroKronii'};
    if(data.roster){
      Object.keys(idMigration).forEach(oldId=>{
        if(data.roster[oldId] && !data.roster[idMigration[oldId]]) data.roster[idMigration[oldId]] = data.roster[oldId];
        delete data.roster[oldId];
      });
    }
    if(Array.isArray(data.party)) data.party = data.party.map(id=>idMigration[id] || id);
    if(idMigration[data.abilityTabChar]) data.abilityTabChar = idMigration[data.abilityTabChar];
    state.gold = data.gold||0;
    state.stage = data.stage||1;
    state.maxStageReached = data.maxStageReached||1;
    state.roster = data.roster || state.roster;
    state.inventory = data.inventory || [];
    state.weaponInventory = data.weaponInventory || [];
    state.party = (data.party && data.party.length>0) ? data.party : ['kaelaKolvalskia'];
    state.itemUidCounter = data.itemUidCounter || 1;
    state.weaponUidCounter = data.weaponUidCounter || 1;
    state.pityCounter = data.pityCounter || 0;
    state.pity5Counter = data.pity5Counter || 0;
    state.weaponBannerPulls = data.weaponBannerPulls || 0;
    state.claimedQuests = data.claimedQuests || {};
    state.questTiers = data.questTiers || {};
    state.questExhausted = data.questExhausted || {};
    state.totalPullsDone = data.totalPullsDone || 0;
    state.totalArtifactsSold = data.totalArtifactsSold || 0;
    ensureRosterIntegrity();
    state.weaponInventory.forEach(normalizeWeapon);
    Object.values(state.roster).forEach(entry=>normalizeWeapon(entry.weapon));
    return true;
  } catch(e){ console.error('Caricamento fallito', e); return false; }
}
function resetSave(){
  try{ localStorage.removeItem(SAVE_KEY); } catch(e){}
  state.gold=0; state.stage=1; state.maxStageReached=1; state.inventory=[]; state.itemUidCounter=1;
  state.weaponInventory=[]; state.weaponUidCounter=1; state.pityCounter=0; state.pity5Counter=0; state.lastPullResults=[];
  state.weaponBannerPulls=0; state.bannerType='personaggi'; state.lastPullBanner='personaggi';
  state.claimedQuests={}; state.questTiers={}; state.questExhausted={}; state.totalPullsDone=0; state.totalArtifactsSold=0;
  initRoster();
  state.party=['kaelaKolvalskia'];
  state.battle=null;
  state.autoBattle=false;
}

/* ============ HELPERS ============ */
function clamp(v,min,max){return Math.max(min,Math.min(max,v));}
function rnd(a,b){return Math.random()*(b-a)+a;}
function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}
function getElementMultiplier(attackerElement, targetElements, weaknessBonus=0, sameElementBonus=0, vulnerableToElement=null){
  const attack = (attackerElement || '').toLowerCase();
  const targets = Array.isArray(targetElements) ? targetElements.map(e => String(e).toLowerCase()) : [String(targetElements || '').toLowerCase()];
  if(!attack || targets.length===0 || targets.every(t => !t)) return 1;
  if(vulnerableToElement && attack===vulnerableToElement) return 2*(1+weaknessBonus);
  if(targets.includes(attack)) return Math.min(1,0.5+sameElementBonus);
  if(ELEMENT_RELATION[attack] && targets.includes(ELEMENT_RELATION[attack])) return 2*(1+weaknessBonus);
  return 1;
}
function getEnemyElementAffinity(enemy,enemyElement,attackerElement){
  if(!attackerElement) return '';
  const enemyElements=enemy.elements||[enemy.element];
  if(enemy.vulnerableRounds>0&&enemy.vulnerableToElement===attackerElement){
    return enemyElement===attackerElement?'element-strong':'element-not-strong';
  }
  if(enemyElements.includes(attackerElement)) return 'element-not-strong';
  return ELEMENT_RELATION[attackerElement]===enemyElement?'element-strong':'element-not-strong';
}
function hexToRgba(hex, alpha){
  const h = (hex||'#888888').replace('#','');
  const r = parseInt(h.substring(0,2),16), g = parseInt(h.substring(2,4),16), b = parseInt(h.substring(4,6),16);
  return `rgba(${r},${g},${b},${alpha})`;
}
const BATTLE_PACE = 1.7; // global multiplier: higher = slower battle flow
function sleepMs(ms){ return new Promise(resolve=>setTimeout(resolve, ms*BATTLE_PACE)); }

/* ============ TOWER (INFINITE) ============ */
function isBossStage(n){return n%5===0;}
function generateEnemies(stageNum){
  const n = stageNum;
  const boss = isBossStage(n);
  const count = boss ? 1 : Math.min(MAX_ENEMIES_IN_BATTLE, 1+Math.floor((n-1)/2));
  const enemies=[];
  for(let i=0;i<count;i++){
    // Enemies hit hard and scale quadratically so the tower keeps getting tougher forever.
    const hp  = boss ? Math.round(1100 + n*190 + n*n*2.6) : Math.round(260 + n*58 + n*n*1.5);
    const atk = boss ? Math.round(150  + n*24  + n*n*0.22) : Math.round(95  + n*17  + n*n*0.14);
    const def = boss ? Math.round(35   + n*6   + n*n*0.05) : Math.round(10  + n*2.6  + n*n*0.02);
    const name = boss ? BOSS_NAMES[(Math.floor(n/5)-1) % BOSS_NAMES.length] : ENEMY_NAMES[i % ENEMY_NAMES.length];
    const elements = ENEMY_ELEMENT_SETS[name].slice();
    const speed = 90+Math.floor(Math.random()*31);
    enemies.push({id:'e'+i,name,hp,maxHp:hp,atk,def,speed,element:elements[0],elements,vulnerableToElement:null,vulnerableRounds:0,defDownPct:0,defDownRounds:0,inaMarked:false,shield:0,burnStacks:0,burnRounds:0,burnSourceMult:1,isBoss:boss,phase:boss?1:0,bossTurns:0,addsWaveStarted:false,addsWaveResolved:false,addsTurnsRemaining:0});
  }
  return enemies;
}

/* ============ BATTLE SETUP ============ */
function buildTurnOrder(allies, enemies){
  return [
    ...allies.map(actor=>({side:'ally', id:actor.charId, speed:actor.speed})),
    ...enemies.map(actor=>({side:'enemy', id:actor.id, speed:actor.speed})),
  ].sort((first,second)=>second.speed-first.speed);
}

function getTurnActor(b, entry=b.turnOrder[b.turnIndex]){
  if(!entry) return null;
  return entry.side==='ally'
    ? b.allies.find(actor=>actor.charId===entry.id)
    : b.enemies.find(actor=>actor.id===entry.id);
}

function startBattle(){
  const allies = state.party.map(id=>{
    const eff = getEffectiveStats(id);
    return {
      charId:id, name:CHAR_DB[id].name, color:CHAR_DB[id].color, glyph:CHAR_DB[id].glyph, element:CHAR_DB[id].element,
      hp:eff.hp, maxHp:eff.hp, atk:eff.atk, def:eff.def, speed:eff.speed,
      energy:clamp(eff.startEnergyBonus,0,eff.energyMax), energyMax:eff.energyMax,
      energyGainMult:eff.energyGainMult, healMult:eff.healMult, burnMult:eff.burnMult, shieldMult:eff.shieldMult,
      damageMult:eff.damageMult, weaknessBonus:eff.weaknessBonus, sameElementBonus:eff.sameElementBonus,
      basicDamageMult:eff.basicDamageMult, buffPctBonus:eff.buffPctBonus, spGrantBonus:eff.spGrantBonus,
      formDamageMult:eff.formDamageMult, defDownBonus:eff.defDownBonus, hpDamageMult:eff.hpDamageMult,
      shield:0, shieldRounds:0, atkBuffMult:1, buffRounds:0,
      basicHits: CHAR_DB[id].basic.hits||1,
      skillFreeUses: CHAR_DB[id].skillFreeUses||0,
      inaFollowUpsRemaining: CHAR_DB[id].passiveInaFollowUps||0,
      suiseiHpLossEvents:0,suiseiFollowUpReady:false,suiseiGuardRounds:0,suiseiGuardFresh:false,
      suiseiRevivesRemaining:CHAR_DB[id].revivesPerBattle||0,
    };
  });
  const enemies = generateEnemies(state.stage);
  const turnOrder = buildTurnOrder(allies,enemies);
  const spMaxBonus = state.party.reduce((sum,id)=>sum+(CHAR_DB[id].passiveSpCapBonus||0),0);
  const spMax = 5+spMaxBonus;
  state.battle = {
    allies, enemies, turnOrder,
    sp:Math.min(3,spMax), spMax,
    round:1,
    turnIndex:0,
    phase:turnOrder[0].side==='ally'?'ally_turn':'enemy_turn',
    pendingAbility:null,
    busy:false,
    screenFx:null,
    log:[],
    loot:[],
    inaFollowUpActive:false,
    suiseiFollowUpActive:false,
    summonCounter:0,
  };
  state.autoBattle=false;
  const firstActor = getTurnActor(state.battle);
  logMsg(`Piano ${state.stage} — Round 1. ${firstActor.name} agisce per primo (${firstActor.speed} VEL).`);
  ensureInaMark(state.battle);
  state.screen='battle';
  render();
  if(state.battle.phase==='enemy_turn') setTimeout(runEnemyTurn,450*BATTLE_PACE);
}

function logMsg(msg){
  state.battle.log.unshift(msg);
  if(state.battle.log.length>40) state.battle.log.pop();
}

function currentAlly(){
  const b = state.battle;
  const entry = b.turnOrder[b.turnIndex];
  return entry && entry.side==='ally' ? getTurnActor(b,entry) : null;
}

async function advanceTurn(){
  const b = state.battle;
  if(!b) return;
  const completedActor=getTurnActor(b);
  if(completedActor?.hakosForm){
    if(completedActor.hakosFormFresh) completedActor.hakosFormFresh=false;
    else {
      completedActor.hakosFormTurns--;
      if(completedActor.hakosFormTurns<=0) restoreHakosUltimate(b);
    }
  }
  b.pendingAbility=null;
  b.turnIndex++;
  while(true){
    while(b.turnIndex<b.turnOrder.length){
      const actor = getTurnActor(b);
      if(actor && actor.hp>0) break;
      b.turnIndex++;
    }
    if(b.turnIndex<b.turnOrder.length) break;

    const roundContinues = await finishRound();
    if(!roundContinues || checkBattleEnd()){
      render();
      return;
    }
    b.round++;
    b.turnOrder = buildTurnOrder(b.allies,b.enemies);
    b.turnIndex=0;
    logMsg(`— Round ${b.round} —`);
  }

  b.phase = b.turnOrder[b.turnIndex].side==='ally' ? 'ally_turn' : 'enemy_turn';
  render();
  if(b.phase==='enemy_turn') await runEnemyTurn();
  else if(state.autoBattle) setTimeout(autoPlayTurn,550*BATTLE_PACE);
}

function checkBattleEnd(){
  const b = state.battle;
  const bossDefeated=b.enemies.some(enemy=>enemy.isBoss && enemy.hp<=0);
  if(bossDefeated || b.enemies.every(e=>e.hp<=0)){
    b.phase='resolved';
    onVictory();
    return true;
  }
  b.allies.filter(ally=>ally.charId==='suiseiHoshimachi').forEach(reviveSuiseiIfNeeded);
  if(b.allies.every(a=>a.hp<=0) && b.hakosFormState){
    restoreHakosUltimate(b,'knockout');
    if(b.allies.some(ally=>ally.hp>0)) return false;
  }
  if(b.allies.every(a=>a.hp<=0)){
    b.phase='resolved';
    onDefeat();
    return true;
  }
  return false;
}

/* ============ ABILITY EXECUTION ============ */
function getEffectiveEnemyDefense(enemy){
  return Math.max(0,enemy.def*(1-(enemy.defDownPct||0)));
}

function applyLaplusAttackEffects(actor,enemy,extraDefDown=0,plantWeakness=false){
  const reduction=(actor.charId==='laplusDarkness'?0.15:0)+(actor.defDownBonus||0)+extraDefDown;
  if(reduction>0){
    enemy.defDownPct=Math.min(0.75,(enemy.defDownPct||0)+reduction);
    enemy.defDownRounds=2;
    logMsg(`${enemy.name} subisce -${Math.round(reduction*100)}% DIF (${Math.round(enemy.defDownPct*100)}% totale).`);
  }
  if(plantWeakness){
    const leader=CHAR_DB[state.party[0]];
    if(leader){
      enemy.vulnerableToElement=leader.element;
      enemy.vulnerableRounds=2;
      logMsg(`${enemy.name} diventa vulnerabile a ${ELEMENT_DATA[leader.element].label} per 2 round.`);
    }
  }
}

function getInaActor(b){
  return b.allies.find(ally=>ally.charId==='ninomaeInaNis'&&ally.hp>0)||null;
}

function setInaMark(b,target,log=true){
  if(!target||target.hp<=0) return;
  b.enemies.forEach(enemy=>{enemy.inaMarked=false;});
  target.inaMarked=true;
  if(log) logMsg(`${target.name} viene marchiato da Ina.`);
}

function ensureInaMark(b){
  if(!getInaActor(b)) return;
  const living=b.enemies.filter(enemy=>enemy.hp>0);
  const marked=living.find(enemy=>enemy.inaMarked);
  if(marked) return;
  b.enemies.forEach(enemy=>{enemy.inaMarked=false;});
  const target=living.reduce((lowest,enemy)=>!lowest||enemy.hp<lowest.hp?enemy:lowest,null);
  if(target) setInaMark(b,target);
}

async function performInaFollowUp(b,target,consumeCharge=true){
  const ina=getInaActor(b);
  if(!ina||!target||target.hp<=0||b.inaFollowUpActive) return false;
  if(consumeCharge && ina.inaFollowUpsRemaining<=0) return false;
  if(consumeCharge) ina.inaFollowUpsRemaining--;
  b.inaFollowUpActive=true;
  const vulnerability=target.vulnerableRounds>0?target.vulnerableToElement:null;
  const attack=Math.round(ina.atk*(ina.atkBuffMult||1));
  const dmg=calcDamage(attack,0.65,getEffectiveEnemyDefense(target),ina.element,target.elements||target.element,ina,'basic',vulnerability);
  const applied=dealDamageToEnemy(target,dmg);
  ina._fxAttack='basic';
  ina.energy=clamp(ina.energy+Math.round(10*(ina.energyGainMult||1)),0,ina.energyMax);
  logMsg(`${ina.name} esegue un follow-up su ${target.name}: ${applied} danni${consumeCharge?` (${ina.inaFollowUpsRemaining} cariche rimaste)`:''}.`);
  render();
  await sleepMs(260);
  b.inaFollowUpActive=false;
  if(target.inaMarked&&target.hp<=0){
    target.inaMarked=false;
    ensureInaMark(b);
  }
  return true;
}

async function triggerInaFollowUpAfterHit(b,target,attacker){
  if(attacker?.charId==='ninomaeInaNis'||!target.inaMarked||b.inaFollowUpActive) return;
  if(target.hp<=0){
    target.inaMarked=false;
    ensureInaMark(b);
    target=b.enemies.find(enemy=>enemy.inaMarked&&enemy.hp>0);
  }
  if(target) await performInaFollowUp(b,target,true);
}

function calcDamage(atk, mult, def, attackerElement, targetElement, attackerStats=null, abilityKey='', vulnerableToElement=null){
  let raw = atk*mult - def*0.5;
  raw = Math.max(raw, atk*mult*0.2);
  const variance = rnd(0.9,1.1);
  const elementMult = getElementMultiplier(attackerElement, targetElement, attackerStats?.weaknessBonus||0, attackerStats?.sameElementBonus||0, vulnerableToElement);
  const weaponMult = (attackerStats?.damageMult||1)*(abilityKey==='basic'?(attackerStats?.basicDamageMult||1):1)*(attackerStats?.formDamageMult||1);
  return Math.max(1, Math.round(raw*variance*elementMult*weaponMult));
}

function dealDamageToEnemy(enemy, dmg){
  let applied = dmg;
  if(enemy.shield>0){
    if(enemy.shield>=applied){enemy.shield-=applied; applied=0;}
    else {applied-=enemy.shield; enemy.shield=0;}
  }
  enemy.hp = clamp(enemy.hp-applied,0,enemy.maxHp);
  updateBossPhase(enemy);
  const absorbedE = dmg-applied;
  enemy._fx = applied>0 ? {variant:'damage', label:'-'+applied} : {variant:'shield', label:'🛡-'+absorbedE};
  return applied;
}

function updateBossPhase(enemy){
  if(!enemy.isBoss || enemy.phase>=2 || enemy.hp<=0 || enemy.hp>enemy.maxHp*0.5) return false;
  enemy.phase=2;
  enemy.atk=Math.round(enemy.atk*1.2);
  logMsg(`${enemy.name} entra nella Fase 2! ATK aumentato.`);
  return true;
}

function recordSuiseiHpLoss(actor){
  actor.suiseiHpLossEvents=(actor.suiseiHpLossEvents||0)+1;
  if(actor.suiseiHpLossEvents>=4){
    actor.suiseiHpLossEvents=0;
    actor.suiseiFollowUpReady=true;
  }
}

function loseSuiseiHp(actor,amount){
  const lost=Math.min(actor.hp,Math.max(0,Math.round(amount)));
  actor.hp=clamp(actor.hp-lost,0,actor.maxHp);
  if(lost>0) recordSuiseiHpLoss(actor);
  if(!reviveSuiseiIfNeeded(actor)) actor._fx={variant:'damage',label:'-'+lost};
  return lost;
}

function reviveSuiseiIfNeeded(actor){
  if(actor?.charId!=='suiseiHoshimachi'||actor.hp>0||actor.suiseiRevivesRemaining<=0) return false;
  actor.suiseiRevivesRemaining--;
  actor.hp=Math.round(actor.maxHp*0.6);
  actor._fx={variant:'heal',label:'Rinascita 60%'};
  logMsg(`${actor.name} rinasce con il 60% dei PV (${actor.suiseiRevivesRemaining} rinascite rimaste).`);
  return true;
}

async function triggerSuiseiFollowUp(b,actor){
  if(!actor?.suiseiFollowUpReady||b.suiseiFollowUpActive) return false;
  const targets=b.enemies.filter(enemy=>enemy.hp>0);
  if(targets.length===0) return false;
  actor.suiseiFollowUpReady=false;
  b.suiseiFollowUpActive=true;
  actor._fxAttack='ult';
  for(const enemy of targets){
    const vulnerability=enemy.vulnerableRounds>0?enemy.vulnerableToElement:null;
    const damage=calcDamage(actor.maxHp*(actor.hpDamageMult||1),0.14,getEffectiveEnemyDefense(enemy),actor.element,enemy.elements||enemy.element,actor,'ult',vulnerability);
    const applied=dealDamageToEnemy(enemy,damage);
    logMsg(`${actor.name} attiva il Follow-up stellare su ${enemy.name}: ${applied} danni.`);
  }
  const healing=Math.round(actor.maxHp*0.15);
  actor.hp=clamp(actor.hp+healing,0,actor.maxHp);
  actor._fx={variant:'heal',label:'+'+healing};
  logMsg(`${actor.name} recupera ${healing} PV dal Follow-up.`);
  render();
  await sleepMs(420);
  b.suiseiFollowUpActive=false;
  return true;
}

function dealDamageToAlly(ally, dmg, giveEnergy){
  if(ally.suiseiGuardRounds>0) dmg=Math.round(dmg*0.6);
  let applied = dmg;
  let absorbed = 0;
  if(ally.shield>0){
    if(ally.shield>=applied){ absorbed=applied; ally.shield-=applied; applied=0; }
    else { absorbed=ally.shield; applied-=ally.shield; ally.shield=0; }
  }
  ally.hp = clamp(ally.hp-applied,0,ally.maxHp);
  const revived=applied>0&&ally.charId==='suiseiHoshimachi'&&(()=>{
    recordSuiseiHpLoss(ally);
    return reviveSuiseiIfNeeded(ally);
  })();
  if(giveEnergy && !ally.hakosForm) ally.energy = clamp(ally.energy+Math.round(10*(ally.energyGainMult||1)),0,ally.energyMax);
  if(!revived) ally._fx = applied>0 ? {variant:'damage', label:'-'+applied} : {variant:'shield', label:'🛡-'+absorbed};
  return {applied, absorbed};
}

const HAKOS_FORM_ABILITIES={
  basic:{name:'Dado del Caos',desc:'Attacco Base potenziato.',mult:1.35,target:'enemy',effect:null,energyGain:0},
  skill:{name:'Crollo Dimensionale',desc:'Danneggia il bersaglio e i nemici adiacenti.',mult:1.8,target:'enemy_adjacent',effect:null,energyGain:0},
  ult:{name:'Ultimate sigillata',desc:'Non disponibile durante la Rovina del Caos.',mult:0,target:'self',effect:'disabled',energyGain:0},
};

const SUISEI_GUARD_ABILITIES={
  basic:{name:'Cometa Riflessa',desc:'Attacco singolo potenziato basato sui PV massimi; consuma il 3% dei PV massimi.',mult:0.3,target:'enemy',effect:'suisei_guard_basic_cost',hpBased:true,energyGain:20},
  skill:{name:'Tecnica sigillata',desc:'Non disponibile durante la postura stellare.',mult:0,target:'self',effect:'disabled',energyGain:0},
};
function getAbilityForActor(actor,abKey){
  if(actor?.charId==='hakosBaels' && actor.hakosForm) return HAKOS_FORM_ABILITIES[abKey];
  if(actor?.charId==='suiseiHoshimachi'&&actor.suiseiGuardRounds>0&&SUISEI_GUARD_ABILITIES[abKey]) return SUISEI_GUARD_ABILITIES[abKey];
  return CHAR_DB[actor.charId][abKey];
}

function activateHakosUltimate(actor,b){
  if(actor.hakosForm) return;
  const absorbed=b.allies.filter(ally=>ally!==actor && ally.hp>0);
  const absorbedShield=absorbed.reduce((sum,ally)=>sum+ally.shield,0);
  actor.hakosBaseSnapshot={
    atk:actor.atk,def:actor.def,speed:actor.speed,maxHp:actor.maxHp,hp:actor.hp,
  };
  actor.hakosFormStartHp=actor.hp+absorbed.reduce((sum,ally)=>sum+ally.hp,0);
  actor.maxHp+=absorbed.reduce((sum,ally)=>sum+ally.maxHp,0);
  actor.hp=Math.min(actor.maxHp,actor.hp+absorbed.reduce((sum,ally)=>sum+ally.hp,0));
  actor.atk=Math.round(actor.atk*(actor.atkBuffMult||1)+absorbed.reduce((sum,ally)=>sum+ally.atk*(ally.atkBuffMult||1),0));
  actor.def+=absorbed.reduce((sum,ally)=>sum+ally.def,0);
  actor.speed+=absorbed.reduce((sum,ally)=>sum+ally.speed,0);
  actor.shield+=absorbedShield;
  absorbed.forEach(ally=>{ ally.shield=0; ally.shieldRounds=0; });
  actor.atkBuffMult=1;
  actor.buffRounds=0;
  actor.energy=0;
  actor.hakosForm=true;
  actor.hakosFormTurns=5;
  actor.hakosFormFresh=true;
  b.hakosFormState={allies:b.allies.slice(),turnEntries:b.turnOrder.filter(entry=>entry.side==='ally' && entry.id!==actor.charId)};
  b.allies=[actor];
  b.turnOrder=b.turnOrder.filter(entry=>entry.side!=='ally' || entry.id===actor.charId);
  b.turnIndex=Math.max(0,b.turnOrder.findIndex(entry=>entry.side==='ally' && entry.id===actor.charId));
  logMsg(`${actor.name} attiva la Rovina del Caos: assorbe le statistiche degli alleati. La forma durerà 5 turni di Hakos.`);
}

function restoreHakosUltimate(b,reason='expired'){
  const stateSnapshot=b.hakosFormState;
  const actor=b.allies.find(ally=>ally.charId==='hakosBaels');
  if(!stateSnapshot || !actor?.hakosBaseSnapshot) return false;
  const hpLost=Math.max(0,actor.hakosFormStartHp-actor.hp);
  const prefix=b.turnOrder.slice(0,b.turnIndex+1);
  const future=[...b.turnOrder.slice(b.turnIndex+1),...stateSnapshot.turnEntries]
    .sort((first,second)=>second.speed-first.speed);
  Object.assign(actor,actor.hakosBaseSnapshot);
  actor.hp=clamp(actor.hp-hpLost,0,actor.maxHp);
  actor.energy=0;
  actor.atkBuffMult=1;
  actor.buffRounds=0;
  actor.hakosForm=false;
  actor.hakosFormTurns=0;
  actor.hakosFormFresh=false;
  delete actor.hakosBaseSnapshot;
  delete actor.hakosFormStartHp;
  b.allies=stateSnapshot.allies;
  b.turnOrder=[...prefix,...future];
  b.turnIndex=Math.max(0,prefix.length-1);
  b.hakosFormState=null;
  logMsg(reason==='knockout'
    ? `${actor.name} perde la forma: gli alleati tornano in campo.`
    : `${actor.name} termina la Rovina del Caos: gli alleati tornano in campo.`);
  return true;
}

async function executeAbility(actor, abKey, targetId){
  const b = state.battle;
  const ability = getAbilityForActor(actor,abKey);
  if(!ability || ability.effect==='disabled') return;
  const effAtk = ability.hpBased
    ? actor.maxHp*(actor.hpDamageMult||1)
    : Math.round(actor.atk*(actor.atkBuffMult||1));
  const buffPct = (ability.buffPct||0)+(actor.buffPctBonus||0);
  if(abKey==='ult'){
    // cut-in: show the banner alone first, then start the attack animation
    b.screenFx = {color:actor.color||'#f5b342', name:actor.name, ability:ability.name, style:CHAR_DB[actor.charId]?.animStyle||'heavy'};
    render();
    await sleepMs(900);
  } else if(abKey==='skill'){
    b.skillCall = {name:actor.name, ability:ability.name, color:actor.color||'#f5b342'};
    render();
    await sleepMs(380);
  }
  actor._fxAttack = abKey; // basic | skill | ult — consumed by the next render for a per-character animation

  const enemyTargets = () => b.enemies.filter(e=>e.hp>0);
  const allyTargets = () => b.allies.filter(a=>a.hp>0);

  if(ability.target==='enemy' || ability.target==='enemy_adjacent'){
    const t = b.enemies.find(e=>e.id===targetId);
    if(!t || t.hp<=0) return;
    const livingEnemies=enemyTargets();
    const targetIndex=livingEnemies.findIndex(enemy=>enemy.id===t.id);
    const hitTargets=ability.target==='enemy_adjacent'
      ? livingEnemies.filter((enemy,index)=>Math.abs(index-targetIndex)<=1)
      : [t];
    if(actor.charId==='ninomaeInaNis'&&ability.effect==='ina_mark') setInaMark(b,t);
    const hits = (abKey==='basic' && actor.basicHits) ? actor.basicHits : (ability.hits||1);
    for(const target of hitTargets){
      for(let i=0;i<hits;i++){
        if(target.hp<=0) break;
        const targetVulnerability=target.vulnerableRounds>0?target.vulnerableToElement:null;
        const dmg = calcDamage(effAtk, ability.mult, getEffectiveEnemyDefense(target), actor.element, target.elements || target.element, actor, abKey, targetVulnerability);
        const applied = dealDamageToEnemy(target, dmg);
        logMsg(`${actor.name} usa ${ability.name}: ${applied} danni a ${target.name}.`);
        if(hits>1){ render(); await sleepMs(230); }
        if(actor.charId!=='ninomaeInaNis'&&target.inaMarked&&(getInaActor(b)?.inaFollowUpsRemaining||0)>0){
          render();
          await sleepMs(220);
        }
        await triggerInaFollowUpAfterHit(b,target,actor);
      }
      if(actor.charId==='laplusDarkness'||actor.defDownBonus>0){
        applyLaplusAttackEffects(actor,target,0,actor.charId==='laplusDarkness'&&ability.effect==='laplus_plant_weakness');
      }
    }
    if(ability.effect==='suisei_guard_basic_cost'){
      const lost=loseSuiseiHp(actor,actor.maxHp*0.03);
      logMsg(`${actor.name} sacrifica ${lost} PV per il Basic potenziato.`);
    }
    if(ability.effect==='suisei_set_half_hp'){
      const halfHp=Math.round(actor.maxHp*0.5);
      if(actor.hp>halfHp){
        const lost=loseSuiseiHp(actor,actor.hp-halfHp);
        logMsg(`${actor.name} sacrifica ${lost} PV e scende al 50%.`);
      } else if(actor.hp<halfHp){
        const healed=halfHp-actor.hp;
        actor.hp=halfHp;
        actor._fx={variant:'heal',label:'+'+healed};
        logMsg(`${actor.name} recupera ${healed} PV e raggiunge il 50%.`);
      }
    }
    if(abKey==='basic' && CHAR_DB[actor.charId].skill.effect==='boost_basic_hits'){
      actor.basicHits = CHAR_DB[actor.charId].basic.hits||1; // Danza di Lame si resetta dopo l'Attacco Base
    }
    if(ability.effect==='shield_self'){
      const amt = Math.round(actor.maxHp*ability.shieldPct*(actor.shieldMult||1));
      actor.shield += amt;
      actor.shieldRounds = 2;
      actor._fx = {variant:'shield', label:'🛡+'+amt};
      logMsg(`${actor.name} ottiene uno scudo.`);
    }
    if(ability.effect==='burn'){
      const dotName = CHAR_DB[actor.charId].dotName || 'Bruciatura';
      t.burnStacks = (t.burnStacks||0) + ability.burnStacks;
      t.burnRounds = 2;
      t.burnSourceMult = actor.burnMult||1;
      t.dotName = dotName;
      logMsg(`${t.name} riceve ${t.burnStacks} cariche di ${dotName}.`);
    }
  }
  else if(ability.target==='ally'){
    const target = b.allies.find(a=>a.charId===targetId);
    if(!target || target.hp<=0) return;
    if(ability.effect==='heal'){
      const healAmt = Math.round(effAtk*ability.mult*(actor.healMult||1));
      target.hp = clamp(target.hp+healAmt,0,target.maxHp);
      target._fx = {variant:'heal', label:'+'+healAmt};
      logMsg(`${actor.name} cura ${target.name} per ${healAmt} PV.`);
    }
    if(ability.effect==='extra_attack_buff'){
      target.atkBuffMult = 1+buffPct;
      target.buffRounds = Math.max(target.buffRounds, 2);
      target._fx = {variant:'buff', label:'+'+Math.round(buffPct*100)+'% ATK'};
      logMsg(`${actor.name} coordina ${target.name}: +${Math.round(buffPct*100)}% ATK.`);
      const foes = enemyTargets();
      if(foes.length>0){
        const foe = foes.reduce((a,c)=>c.hp<a.hp?c:a);
        const bonusAtk = Math.round(target.atk*(target.atkBuffMult||1));
        const foeVulnerability=foe.vulnerableRounds>0?foe.vulnerableToElement:null;
        const dmg = calcDamage(bonusAtk,1.0,getEffectiveEnemyDefense(foe),target.element,foe.elements||foe.element,target,'basic',foeVulnerability);
        const applied = dealDamageToEnemy(foe, dmg);
        logMsg(`${target.name} attacca una volta in più: ${applied} danni a ${foe.name}.`);
        if(target.charId!=='ninomaeInaNis'&&foe.inaMarked&&(getInaActor(b)?.inaFollowUpsRemaining||0)>0){
          render();
          await sleepMs(220);
        }
        await triggerInaFollowUpAfterHit(b,foe,target);
        b.sp = clamp(b.sp+1,0,b.spMax);
        target.energy = clamp(target.energy+Math.round(20*(target.energyGainMult||1)),0,target.energyMax);
      }
    }
  }
  else if(ability.target==='self'){
    if(ability.effect==='hakos_ultimate'){
      activateHakosUltimate(actor,b);
    } else if(ability.effect==='suisei_guard'){
      const lost=loseSuiseiHp(actor,actor.hp*0.5);
      actor.suiseiGuardRounds=3;
      actor.suiseiGuardFresh=true;
      logMsg(`${actor.name} sacrifica ${lost} PV e attiva la postura stellare: danni subiti -40% per 3 round.`);
    } else if(ability.effect==='boost_basic_hits'){
      actor.basicHits = Math.min(10, (actor.basicHits||2)+1);
      actor._fx = {variant:'buff', label:'x'+actor.basicHits+' colpi'};
      logMsg(`${actor.name} affina la lama: l'Attacco Base ora colpisce ${actor.basicHits} volte.`);
    }
  }
  else if(ability.target==='enemies_all'){
    for(const t of enemyTargets()){
      const targetVulnerability=t.vulnerableRounds>0?t.vulnerableToElement:null;
      const dmg = calcDamage(effAtk,ability.mult,getEffectiveEnemyDefense(t),actor.element,t.elements||t.element,actor,abKey,targetVulnerability);
      const applied = dealDamageToEnemy(t, dmg);
      logMsg(`${actor.name} colpisce ${t.name} per ${applied}.`);
      if(actor.charId!=='ninomaeInaNis'&&t.inaMarked&&(getInaActor(b)?.inaFollowUpsRemaining||0)>0){
        render();
        await sleepMs(220);
      }
      await triggerInaFollowUpAfterHit(b,t,actor);
      if(actor.charId==='laplusDarkness'||actor.defDownBonus>0){
        const extraDefDown=actor.charId==='laplusDarkness'&&ability.effect==='laplus_ultimate'?0.15:0;
        applyLaplusAttackEffects(actor,t,extraDefDown,false);
      }
      if(ability.effect==='burn_all'){
        const dotName = CHAR_DB[actor.charId].dotName || 'Bruciatura';
        t.burnStacks=(t.burnStacks||0)+ability.burnStacks;
        t.burnRounds=2;
        t.burnSourceMult = actor.burnMult||1;
        t.dotName = dotName;
      }
      render(); await sleepMs(260);
    }
    if(actor.charId==='ninomaeInaNis'&&ability.effect==='ina_ultimate'){
      actor.inaFollowUpsRemaining=3;
      const living=enemyTargets();
      if(living.length>0) await performInaFollowUp(b,pick(living),false);
      actor.inaFollowUpsRemaining=3;
      logMsg(`${actor.name} recupera le 3 cariche di follow-up.`);
      ensureInaMark(b);
    }
  }
  else if(ability.target==='team'){
    if(ability.effect==='grant_sp'){
      const spGrant = ability.spGrant+(actor.spGrantBonus||0);
      b.sp = clamp(b.sp+spGrant,0,b.spMax);
      actor._fx = {variant:'spgrant', label:'+'+spGrant+' PA'};
      logMsg(`${actor.name} dona ${spGrant} Punti Abilità alla squadra.`);
    }
    if(ability.effect==='grant_sp_and_buff'){
      const spGrant = ability.spGrant+(actor.spGrantBonus||0);
      b.sp = clamp(b.sp+spGrant,0,b.spMax);
      allyTargets().forEach(a=>{ a.atkBuffMult = 1+buffPct; a.buffRounds = Math.max(a.buffRounds,2); });
      actor._fx = {variant:'spgrant', label:'+'+spGrant+' PA'};
      logMsg(`${actor.name} dona ${spGrant} Punti Abilità e aumenta l'ATK della squadra del ${Math.round(buffPct*100)}%.`);
    }
  }
  else if(ability.target==='allies_all'){
    if(ability.effect==='shield_all'){
      allyTargets().forEach(a=>{ const amt=Math.round(a.maxHp*ability.shieldPct*(actor.shieldMult||1)); a.shield+=amt; a.shieldRounds=2; a._fx={variant:'shield',label:'🛡+'+amt}; });
      logMsg(`${actor.name} scherma tutta la squadra.`);
    }
    if(ability.effect==='heal_all'){
      allyTargets().forEach(a=>{ const amt=Math.round(effAtk*ability.mult*(actor.healMult||1)); a.hp=clamp(a.hp+amt,0,a.maxHp); a._fx={variant:'heal',label:'+'+amt}; });
      logMsg(`${actor.name} cura l'intera squadra.`);
    }
    if(ability.effect==='buff_atk'){
      allyTargets().forEach(a=>{ a.atkBuffMult = 1+buffPct; a.buffRounds=2; a._fx={variant:'buff', label:'+'+Math.round(buffPct*100)+'% ATK'}; });
      logMsg(`${actor.name} aumenta l'ATK della squadra.`);
    }
    if(ability.effect==='buff_atk_energy'){
      allyTargets().forEach(a=>{ a.atkBuffMult = 1+buffPct; a.buffRounds=3; a.energy=clamp(a.energy+Math.round(ability.energyGainAll*(a.energyGainMult||1)),0,a.energyMax); a._fx={variant:'buff', label:'+'+Math.round(buffPct*100)+'% ATK'}; });
      logMsg(`${actor.name} scatena un grido di guerra!`);
    }
  }

  if(abKey==='basic'){
    const spGain = (ability.spGain!==undefined) ? ability.spGain : 1;
    b.sp = clamp(b.sp+spGain,0,b.spMax);
    if(actor.hakosForm) actor.energy=0;
    else actor.energy = clamp(actor.energy+Math.round((ability.energyGain||0)*(actor.energyGainMult||1)),0,actor.energyMax);
  } else if(abKey==='skill'){
    if(actor.skillFreeUses>0){ actor.skillFreeUses--; }
    else { b.sp = clamp(b.sp-1,0,b.spMax); }
    if(actor.hakosForm) actor.energy=0;
    else actor.energy = clamp(actor.energy+Math.round((ability.energyGain||0)*(actor.energyGainMult||1)),0,actor.energyMax);
  } else if(abKey==='ult'){
    actor.energy = 0;
  }
  if(actor.charId==='suiseiHoshimachi') await triggerSuiseiFollowUp(b,actor);
  // let pending animations play out before the turn advances (a render would cut them)
  if([...b.allies,...b.enemies].some(x=>x._fx||x._fxAttack)) render();
  await sleepMs(abKey==='ult'?900:abKey==='skill'?650:480);
}

async function playerChooseAbility(abKey){
  const b = state.battle;
  if(b.phase!=='ally_turn') return;
  const actor = currentAlly();
  const ability = getAbilityForActor(actor,abKey);
  if(!ability || ability.effect==='disabled') return;
  if(b.busy) return;
  if(actor.charId==='suiseiHoshimachi'&&abKey==='skill'&&actor.hp<=1) return;
  if(abKey==='skill' && b.sp<1 && actor.skillFreeUses<=0) return;
  if(abKey==='ult' && actor.energy<actor.energyMax) return;

  if(ability.target==='enemy' || ability.target==='enemy_adjacent' || ability.target==='ally'){
    b.pendingAbility = {key:abKey};
    render();
    return;
  }
  b.busy = true; render();
  await executeAbility(actor, abKey, null);
  if(checkBattleEnd()) { b.busy=false; render(); return; }
  const keepsTurn = (abKey==='skill' && ability.effect==='boost_basic_hits');
  if(!keepsTurn) await advanceTurn();
  if(state.battle) state.battle.busy = false;
  render();
}

async function playerChooseTarget(targetId){
  const b = state.battle;
  if(!b.pendingAbility || b.busy || b.phase!=='ally_turn') return;
  const actor = currentAlly();
  const abKey = b.pendingAbility.key;
  b.pendingAbility=null;
  b.busy = true; render();
  await executeAbility(actor, abKey, targetId);
  if(checkBattleEnd()) { b.busy=false; render(); return; }
  await advanceTurn();
  if(state.battle) state.battle.busy = false;
  render();
}

async function finishRound(){
  const b = state.battle;
  for(const e of b.enemies.filter(e=>e.hp>0 && e.burnStacks>0)){
    const dot = Math.round(e.maxHp*0.045*e.burnStacks*(e.burnSourceMult||1));
    e.hp = clamp(e.hp-dot,0,e.maxHp);
    updateBossPhase(e);
    e._fx = {variant:'damage', label:'-'+dot};
    logMsg(`${e.name} subisce ${dot} danni da ${e.dotName||'Bruciatura'}.`);
    e.burnRounds--;
    if(e.burnRounds<=0){ e.burnStacks=0; }
    if(checkBattleEnd()) return false;
    render();
    await sleepMs(280);
  }
  if(checkBattleEnd()) return false;

  b.enemies.forEach(enemy=>{
    if(enemy.defDownRounds>0){
      enemy.defDownRounds--;
      if(enemy.defDownRounds===0) enemy.defDownPct=0;
    }
    if(enemy.vulnerableRounds>0){
      enemy.vulnerableRounds--;
      if(enemy.vulnerableRounds===0) enemy.vulnerableToElement=null;
    }
  });

  b.allies.forEach(a=>{
    if(a.shieldRounds>0){ a.shieldRounds--; if(a.shieldRounds<=0) a.shield=0; }
    if(a.buffRounds>0){ a.buffRounds--; if(a.buffRounds<=0) a.atkBuffMult=1; }
    if(a.suiseiGuardRounds>0){
      if(a.suiseiGuardFresh) a.suiseiGuardFresh=false;
      else {
        a.suiseiGuardRounds--;
        if(a.suiseiGuardRounds===0) logMsg(`${a.name} termina la postura stellare.`);
      }
    }
  });
  return true;
}

function summonBossEnemies(boss,b,countOverride=null,addOwnerId=null){
  const aliveCount=b.enemies.filter(enemy=>enemy.hp>0).length;
  const slots=Math.max(0,MAX_ENEMIES_IN_BATTLE-aliveCount);
  const requestedCount=countOverride===null?(boss.phase===2?2:1):countOverride;
  const summonCount=Math.min(requestedCount,slots);
  if(summonCount===0){
    logMsg(`${boss.name} tenta di evocare rinforzi, ma il campo è pieno.`);
    return [];
  }

  const summoned=[];
  for(let i=0;i<summonCount;i++){
    const name=pick(ENEMY_NAMES);
    const elements=ENEMY_ELEMENT_SETS[name].slice();
    const hp=Math.max(1,Math.round(boss.maxHp*(boss.phase===2?0.16:0.12)));
    const enemy={
      id:'s'+(b.summonCounter++), name, hp, maxHp:hp,
      atk:Math.round(boss.atk*(boss.phase===2?0.55:0.45)),
      def:Math.round(boss.def*0.6), speed:90+Math.floor(Math.random()*31),
      element:elements[0], elements, vulnerableToElement:null, vulnerableRounds:0,
      defDownPct:0, defDownRounds:0, shield:0, burnStacks:0, burnRounds:0,
      burnSourceMult:1, isBoss:false, phase:0, bossTurns:0,
      bossAddOwnerId:addOwnerId,bossAddResolved:false,
    };
    b.enemies.push(enemy);
    summoned.push(enemy);
    logMsg(`${boss.name} evoca ${name}.`);
  }

  const future=b.turnOrder.slice(b.turnIndex+1);
  future.push(...summoned.map(enemy=>({side:'enemy',id:enemy.id,speed:enemy.speed})));
  future.sort((first,second)=>second.speed-first.speed);
  b.turnOrder.splice(b.turnIndex+1,b.turnOrder.length-b.turnIndex-1,...future);
  return summoned;
}

async function runBossMechanic(boss,b){
  const mechanics=BOSS_MECHANICS[boss.name];
  if(!mechanics) return;
  const mechanic=boss.phase===2?mechanics.phase2:mechanics.phase1;
  const shouldUseSpecial=boss.phase===2 || boss.bossTurns%2===0;
  boss.bossTurns++;
  if(!shouldUseSpecial) return;

  if(mechanic==='shield_heal'){
    const shield=Math.round(boss.maxHp*0.14);
    boss.shield+=shield;
    boss._fx={variant:'shield',label:'🛡+'+shield};
    const healing=Math.min(boss.maxHp-boss.hp,Math.round(boss.maxHp*0.12));
    boss.hp+=healing;
    logMsg(`${boss.name} si protegge con ${shield} scudo e recupera ${healing} PV.`);
  } else if(mechanic==='summon_burst'){
    if(!boss.addsWaveStarted){
      const summoned=summonBossEnemies(boss,b,2,boss.id);
      if(summoned.length>0){
        boss.addsWaveStarted=true;
        boss.addsTurnsRemaining=2;
        logMsg(`${boss.name} richiama due sentinelle: sconfiggile entro 2 turni o scatenerà un'AoE massiva!`);
      }
    } else if(!boss.addsWaveResolved){
      const adds=b.enemies.filter(enemy=>enemy.bossAddOwnerId===boss.id&&!enemy.bossAddResolved&&enemy.hp>0);
      if(adds.length===0){
        boss.addsWaveResolved=true;
        logMsg(`I rinforzi di ${boss.name} sono stati sconfitti: l'attacco ad area è annullato.`);
      } else {
        boss.addsTurnsRemaining--;
        if(boss.addsTurnsRemaining<=0){
          boss.addsWaveResolved=true;
          adds.forEach(enemy=>{enemy.bossAddResolved=true;});
          logMsg(`${boss.name} scatena l'ESONDAZIONE ABISSALE!`);
          for(const ally of b.allies.filter(target=>target.hp>0)){
            const damage=calcDamage(Math.round(boss.atk*1.8),1,ally.def,boss.element,ally.element);
            const result=dealDamageToAlly(ally,damage,true);
            logMsg(`${ally.name} subisce ${result.applied} danni dall'esplosione massiva.`);
          }
        } else {
          logMsg(`${boss.name} carica l'esplosione: ${boss.addsTurnsRemaining} turno rimasto per fermarla!`);
        }
      }
    }
  } else if(mechanic==='shield'){
    const amount=Math.round(boss.maxHp*(boss.phase===2?0.2:0.14));
    boss.shield+=amount;
    boss._fx={variant:'shield',label:'🛡+'+amount};
    logMsg(`${boss.name} si avvolge in uno scudo da ${amount}.`);
  } else if(mechanic==='heal'){
    const amount=Math.min(boss.maxHp-boss.hp,Math.round(boss.maxHp*(boss.phase===2?0.16:0.12)));
    if(amount>0){
      boss.hp+=amount;
      boss._fx={variant:'heal',label:'+'+amount};
      logMsg(`${boss.name} recupera ${amount} PV.`);
    } else {
      const shield=Math.round(boss.maxHp*0.1);
      boss.shield+=shield;
      boss._fx={variant:'shield',label:'🛡+'+shield};
      logMsg(`${boss.name} è già al massimo dei PV e si protegge con uno scudo da ${shield}.`);
    }
  } else if(mechanic==='summon'){
    summonBossEnemies(boss,b);
  } else if(mechanic==='area'){
    const livingAllies=b.allies.filter(ally=>ally.hp>0);
    logMsg(`${boss.name} scatena un attacco ad area!`);
    for(const ally of livingAllies){
      const dmg=calcDamage(Math.round(boss.atk*(boss.phase===2?0.8:0.65)),1,ally.def,boss.element,ally.element);
      const result=dealDamageToAlly(ally,dmg,true);
      logMsg(`${ally.name} subisce ${result.applied} danni dall'onda d'urto.`);
      if(ally.charId==='suiseiHoshimachi') await triggerSuiseiFollowUp(b,ally);
    }
  }
  render();
  await sleepMs(500);
}

async function runEnemyTurn(){
  const b = state.battle;
  if(!b || b.phase!=='enemy_turn') return;
  const enemy = getTurnActor(b);
  if(!enemy || enemy.hp<=0){
    await advanceTurn();
    return;
  }
  const livingAllies = b.allies.filter(ally=>ally.hp>0);
  if(livingAllies.length===0){
    checkBattleEnd();
    render();
    return;
  }

  b.busy=true;
  render();
  await sleepMs(360);
  if(enemy.isBoss){
    await runBossMechanic(enemy,b);
    if(checkBattleEnd()){
      b.busy=false;
      render();
      return;
    }
  }

  const attackCount=enemy.isBoss?2:1;
  for(let attackIndex=0;attackIndex<attackCount;attackIndex++){
    const targets=b.allies.filter(ally=>ally.hp>0);
    if(targets.length===0) break;
    const target=pick(targets);
    enemy._fxAttack='basic';
    const dmg=calcDamage(enemy.atk,1.0,target.def,enemy.element,target.element);
    const result=dealDamageToAlly(target,dmg,true);
    const attackLabel=enemy.isBoss?` (${attackIndex+1}/2)`:'';
    if(result.applied===0 && result.absorbed>0){
      logMsg(`${enemy.name}${attackLabel} attacca ${target.name}, ma lo scudo assorbe tutto il colpo (🛡 -${result.absorbed}).`);
    } else if(result.absorbed>0){
      logMsg(`${enemy.name}${attackLabel} attacca ${target.name}: lo scudo assorbe ${result.absorbed}, ${result.applied} danni passano.`);
    } else {
      logMsg(`${enemy.name}${attackLabel} attacca ${target.name} per ${result.applied} danni.`);
    }
    render();
    await sleepMs(420);
    if(target.charId==='suiseiHoshimachi') await triggerSuiseiFollowUp(b,target);
    if(checkBattleEnd()){
      b.busy=false;
      render();
      return;
    }
  }

  b.busy=false;
  await advanceTurn();
}

/* ============ AUTO BATTLE ============ */
async function autoPlayTurn(){
  if(!state.autoBattle) return;
  const b = state.battle;
  if(!b || b.phase!=='ally_turn' || b.busy) return;
  const actor = currentAlly();
  const cdb={basic:getAbilityForActor(actor,'basic'),skill:getAbilityForActor(actor,'skill'),ult:getAbilityForActor(actor,'ult')};

  let abKey = 'basic';
  if(actor.energy>=actor.energyMax) abKey='ult';
  else if(b.sp>=1 || actor.skillFreeUses>0){
    const maxedHits = cdb.skill.effect==='boost_basic_hits' && actor.basicHits>=10;
    abKey = maxedHits||cdb.skill.effect==='disabled' ? 'basic' : 'skill';
  }
  const ability = cdb[abKey];

  let targetId = null;
  if(ability.target==='enemy' || ability.target==='enemy_adjacent'){
    const targets = b.enemies.filter(e=>e.hp>0);
    if(targets.length===0) return;
    targetId = targets.reduce((a,c)=>c.hp<a.hp?c:a).id;
  } else if(ability.target==='ally'){
    const targets = b.allies.filter(a=>a.hp>0);
    targetId = targets.reduce((a,c)=>(c.hp/c.maxHp)<(a.hp/a.maxHp)?c:a).charId;
  }

  await executeAbility(actor, abKey, targetId);
  if(checkBattleEnd()){ render(); return; }
  const keepsTurn = (abKey==='skill' && ability.effect==='boost_basic_hits');
  if(!keepsTurn) await advanceTurn();
  render();
  if(state.battle && state.battle.phase==='ally_turn' && state.autoBattle && keepsTurn){
    setTimeout(autoPlayTurn, 550);
  }
}

function toggleAutoBattle(){
  state.autoBattle = !state.autoBattle;
  if(state.battle) state.battle.pendingAbility=null;
  render();
  if(state.autoBattle) setTimeout(autoPlayTurn, 300);
}

function getStageGoldReward(stageNum){
  const base = Math.round(40 + stageNum*8 + stageNum*stageNum*0.15);
  return isBossStage(stageNum) ? Math.round(base*1.8) : base;
}

function onVictory(){
  const b = state.battle;
  const lootCount = isBossStage(state.stage) ? 3 : (1+Math.floor(Math.random()*2));
  const loot=[];
  for(let i=0;i<lootCount;i++) loot.push(generateArtifact(state.stage));
  b.loot = loot;
  state.inventory.push(...loot);
  const goldReward = getStageGoldReward(state.stage);
  b.goldReward = goldReward;
  state.gold += goldReward;
  state.maxStageReached = Math.max(state.maxStageReached, state.stage+1);
  state.autoBattle=false;
  state.screen='victory';
}

function onDefeat(){
  state.autoBattle=false;
  state.screen='defeat';
}

function goToTown(advance){
  if(advance) state.stage = state.stage+1;
  state.battle=null;
  state.screen='town';
  render();
}
function retryStage(){
  state.battle=null;
  state.screen='town';
  render();
}

/* ============ EQUIPMENT MGMT ============ */
let equipPickerFor=null;
let viewArtifactFor=null;
function openEquipPicker(charId, slotIdx){
  equipPickerFor = {charId, slotIdx};
  render();
}
function closeEquipPicker(){ equipPickerFor=null; render(); }
function openViewArtifact(charId, slotIdx){ viewArtifactFor={charId,slotIdx}; render(); }
function closeViewArtifact(){ viewArtifactFor=null; render(); }
function equipItem(uid){
  const {charId, slotIdx} = equipPickerFor;
  const idx = state.inventory.findIndex(i=>i.uid===uid);
  if(idx<0) return;
  const item = state.inventory[idx];
  const current = state.roster[charId].equipment[slotIdx];
  state.roster[charId].equipment[slotIdx] = item;
  state.inventory.splice(idx,1);
  if(current) state.inventory.push(current);
  equipPickerFor=null;
  render();
}
function unequipItem(charId, slotIdx){
  const current = state.roster[charId].equipment[slotIdx];
  if(!current) return;
  state.roster[charId].equipment[slotIdx]=null;
  state.inventory.push(current);
  render();
}

const ARTIFACT_MAX_LEVEL = 20;
const ARTIFACT_SUBSTAT_MILESTONE = 5; // every 5 levels, a random substat gets upgraded again
function getArtifactLevelUpCost(level){ return 30 + level*22; }
function getArtifactSellValue(it){
  const base = {comune:40, rara:90, epica:180}[it.rarity]||40;
  return base + (it.level||0)*12;
}
function findArtifactByUid(uid){
  let found = state.inventory.find(i=>i.uid===uid);
  if(found) return found;
  for(const charId in state.roster){
    const eq = state.roster[charId].equipment;
    for(let i=0;i<eq.length;i++){
      if(eq[i] && eq[i].uid===uid) return eq[i];
    }
  }
  return null;
}
function upgradeArtifactMainStat(artifact){
  const meta=STAT_KEYS[artifact.mainStat.key];
  if(meta.flatKey==='speed'){
    artifact.mainStat.value=Math.min(12,artifact.mainStat.value+1);
  } else if(meta.kind==='flat'){
    const baseValue=MAIN_VALUES.flat[artifact.rarity][meta.flatKey];
    artifact.mainStat.value+=Math.max(1,Math.round(baseValue*0.05));
  } else if(meta.kind==='pct'){
    artifact.mainStat.value+=0.01;
  } else {
    artifact.mainStat.value+=0.005;
  }
}
function levelUpArtifact(uid){
  const it = findArtifactByUid(uid);
  if(!it) return;
  const level = it.level||0;
  if(level>=ARTIFACT_MAX_LEVEL) return;
  const cost = getArtifactLevelUpCost(level);
  if(state.gold<cost) return;
  state.gold -= cost;
  it.level = level+1;
  upgradeArtifactMainStat(it);
  if(it.level % ARTIFACT_SUBSTAT_MILESTONE === 0){
    const idx = Math.floor(Math.random()*it.subStats.length); // a substat can be picked again on later milestones
    const sub = it.subStats[idx];
    const meta = STAT_KEYS[sub.key];
    if(meta.flatKey==='speed') sub.value = Math.min(12, sub.value+2);
    else {
      const bonus = valueForRarity(meta.kind, meta, it.rarity, 'sub', state.maxStageReached);
      sub.value += bonus;
    }
  }
  render();
}
function sellArtifact(uid){
  const idx = state.inventory.findIndex(i=>i.uid===uid);
  if(idx<0) return; // only unequipped artifacts can be sold
  const it = state.inventory[idx];
  state.gold += getArtifactSellValue(it);
  state.inventory.splice(idx,1);
  state.totalArtifactsSold++;
  render();
}

let weaponPickerFor=null;
let viewWeaponFor=null;
function openWeaponPicker(charId){ weaponPickerFor=charId; render(); }
function closeWeaponPicker(){ weaponPickerFor=null; render(); }
function openViewWeapon(charId){ viewWeaponFor=charId; render(); }
function closeViewWeapon(){ viewWeaponFor=null; render(); }
function equipWeapon(uid){
  const charId = weaponPickerFor;
  const idx = state.weaponInventory.findIndex(w=>w.uid===uid);
  if(idx<0) return;
  const weapon = state.weaponInventory[idx];
  const current = state.roster[charId].weapon;
  state.roster[charId].weapon = weapon;
  state.weaponInventory.splice(idx,1);
  if(current) state.weaponInventory.push(current);
  weaponPickerFor=null;
  render();
}
function unequipWeapon(charId){
  const current = state.roster[charId].weapon;
  if(!current) return;
  state.roster[charId].weapon=null;
  state.weaponInventory.push(current);
  render();
}
const WEAPON_MAX_LEVEL = 20;
const WEAPON_MAX_ASCENSION = 5;
function findWeapon(uid){
  const inventoryWeapon = state.weaponInventory.find(weapon=>weapon.uid===uid);
  if(inventoryWeapon) return {weapon:inventoryWeapon, ownerId:null};
  for(const [charId,entry] of Object.entries(state.roster)){
    if(entry.weapon?.uid===uid) return {weapon:entry.weapon, ownerId:charId};
  }
  return null;
}
function getWeaponUpgradeCost(level){ return 60+level*35; }
function getWeaponSellValue(weapon){
  const base = {comune:30, rara:70, epica:140, leggendaria:500}[weapon.rarity]||30;
  return base+(weapon.level||0)*12+(weapon.ascension||0)*20;
}
function findWeaponDuplicate(weapon){
  return state.weaponInventory.find(other=>other.uid!==weapon.uid && other.name===weapon.name && other.rarity===weapon.rarity);
}
function upgradeWeapon(uid){
  const found = findWeapon(uid);
  if(!found) return;
  const weapon = normalizeWeapon(found.weapon);
  if(weapon.level>=WEAPON_MAX_LEVEL) return;
  const cost = getWeaponUpgradeCost(weapon.level);
  if(state.gold<cost) return;
  state.gold-=cost;
  weapon.level++;
  weapon.mainStat.value += Math.max(1,Math.round(weapon.baseAtk*0.04));
  render();
}
function ascendWeapon(uid){
  const found = findWeapon(uid);
  if(!found) return;
  const weapon = normalizeWeapon(found.weapon);
  if(weapon.ascension>=WEAPON_MAX_ASCENSION) return;
  const duplicateIndex = state.weaponInventory.findIndex(other=>other.uid!==uid && other.name===weapon.name && other.rarity===weapon.rarity);
  if(duplicateIndex<0) return;
  state.weaponInventory.splice(duplicateIndex,1);
  weapon.ascension++;
  render();
}
function sellWeapon(uid){
  const found = findWeapon(uid);
  if(!found) return;
  const value = getWeaponSellValue(found.weapon);
  if(found.ownerId){
    state.roster[found.ownerId].weapon=null;
    if(viewWeaponFor===found.ownerId) viewWeaponFor=null;
  } else {
    const index = state.weaponInventory.findIndex(weapon=>weapon.uid===uid);
    if(index<0) return;
    state.weaponInventory.splice(index,1);
  }
  state.gold+=value;
  render();
}
function getWeaponManagementActions(weapon,opts={}){
  normalizeWeapon(weapon);
  const level=weapon.level||0;
  const ascension=weapon.ascension||0;
  const cost=getWeaponUpgradeCost(level);
  const hasDuplicate=!!findWeaponDuplicate(weapon);
  const actions=[];
  if(opts.onUnequip) actions.push({label:'Rimuovi arma',onClick:opts.onUnequip});
  actions.push({label:level>=WEAPON_MAX_LEVEL?'Livello massimo':`⬆ Potenzia (${cost} 💠)`,onClick:()=>upgradeWeapon(weapon.uid),disabled:level>=WEAPON_MAX_LEVEL||state.gold<cost});
  actions.push({label:ascension>=WEAPON_MAX_ASCENSION?'Ascensione massima':hasDuplicate?`✦ Ascendi ${ascension+1}/${WEAPON_MAX_ASCENSION} (doppione)`:'✦ Ascendi (serve un doppione)',onClick:()=>ascendWeapon(weapon.uid),disabled:ascension>=WEAPON_MAX_ASCENSION||!hasDuplicate});
  actions.push({label:`💰 Vendi (+${getWeaponSellValue(weapon)} 💠)`,onClick:()=>sellWeapon(weapon.uid)});
  return actions;
}
function togglePartyMember(charId){
  if(!state.roster[charId] || !state.roster[charId].unlocked) return;
  const idx = state.party.indexOf(charId);
  if(idx>=0){
    if(state.party.length<=1) return;
    state.party.splice(idx,1);
  } else {
    if(state.party.length>=4) return;
    state.party.push(charId);
  }
  render();
}
function movePartyMember(charId,targetIndex){
  const sourceIndex=state.party.indexOf(charId);
  if(sourceIndex<0||targetIndex<0||targetIndex>=state.party.length||sourceIndex===targetIndex) return;
  const [moved]=state.party.splice(sourceIndex,1);
  state.party.splice(targetIndex,0,moved);
  render();
}
function setTownTab(tab){ state.townTab=tab; render(); }
function setAbilityTabChar(id){ state.abilityTabChar=id; render(); }

/* ============ GACHA BANNER ============ */
const PULL_COST = 300;
const PITY_LIMIT_4 = 10;   // any-character pity (4★ tier)
const PITY_LIMIT_5 = 50;   // 5★ specific pity
const CHAR_PULL_CHANCE_4 = 0.05;
const CHAR_PULL_CHANCE_5 = 0.02;
const WEAPON_BANNER_PITY = 30;

function drawWeaponBannerWeapon(){
  const roll=Math.random();
  const rarity=roll<0.02?'leggendaria':roll<0.12?'epica':roll<0.47?'rara':'comune';
  const weaponNames=rarity==='leggendaria'
    ? SIGNATURE_WEAPONS.map(weapon=>weapon.name)
    : WEAPON_NAMES.filter(name=>WEAPON_FIXED_STATS[name].rarity===rarity);
  return createWeapon(pick(weaponNames));
}

function grantCharacterOfRarity(rarity, byPity){
  const lockedIds = Object.keys(CHAR_DB).filter(id=>!state.roster[id].unlocked && CHAR_DB[id].rarity===rarity);
  if(lockedIds.length>0){
    const newId = pick(lockedIds);
    state.roster[newId].unlocked = true;
    return {type:'character', charId:newId, rarity, pity:byPity};
  }
  const bonus = rarity===5 ? 1500 : 400;
  state.gold += bonus;
  return {type:'character_dupe', rarity, bonus, pity:byPity};
}

function doSinglePull(){
  if(state.gold<PULL_COST) return null;
  state.gold -= PULL_COST;
  state.totalPullsDone++;
  state.pityCounter++;
  state.pity5Counter++;

  const forced5 = state.pity5Counter>=PITY_LIMIT_5;
  const got5 = forced5 || Math.random()<CHAR_PULL_CHANCE_5;
  let result;
  if(got5){
    state.pity5Counter = 0;
    state.pityCounter = 0;
    result = grantCharacterOfRarity(5, forced5);
  } else {
    const forced4 = state.pityCounter>=PITY_LIMIT_4;
    const got4 = forced4 || Math.random()<CHAR_PULL_CHANCE_4;
    if(got4){
      state.pityCounter = 0;
      result = grantCharacterOfRarity(4, forced4);
    } else {
      const weapon = generateWeapon();
      state.weaponInventory.push(weapon);
      result = {type:'weapon', weapon};
    }
  }
  return result;
}
async function doPulls(n){
  const results=[];
  for(let i=0;i<n;i++){
    const r = doSinglePull();
    if(!r) break;
    results.push(r);
  }
  state.lastPullResults = results;
  state.lastPullBanner='personaggi';
  if(results.length>0){
    await playPullAnimation(results);
  }
  render();
}

function doSingleWeaponPull(){
  if(state.gold<PULL_COST) return null;
  state.gold-=PULL_COST;
  state.totalPullsDone++;
  state.weaponBannerPulls++;

  let result;
  if(state.weaponBannerPulls>=WEAPON_BANNER_PITY){
    const weapon=drawWeaponBannerWeaponForced5();
    state.weaponBannerPulls=0;
    state.weaponInventory.push(weapon);
    return {type:'weapon',weapon,pity:true};
  }

  const roll=Math.random();
  if(roll<CHAR_PULL_CHANCE_5){
    result=grantCharacterOfRarity(5,false);
  } else if(roll<CHAR_PULL_CHANCE_5+CHAR_PULL_CHANCE_4){
    result=grantCharacterOfRarity(4,false);
  } else {
    const weapon=drawWeaponBannerWeapon();
    state.weaponInventory.push(weapon);
    if(weapon.rarity==='leggendaria') state.weaponBannerPulls=0;
    result={type:'weapon',weapon};
  }
  return result;
}

function drawWeaponBannerWeaponForced5(){
  return createWeapon(pick(SIGNATURE_WEAPONS).name);
}

async function doWeaponPulls(count){
  const results=[];
  for(let index=0;index<count;index++){
    const result=doSingleWeaponPull();
    if(!result) break;
    results.push(result);
  }
  state.lastPullResults=results;
  state.lastPullBanner='armi';
  if(results.length>0) await playPullAnimation(results);
  render();
}

function setBannerType(type){
  state.bannerType=type;
  render();
}

function playPullAnimation(results){
  return new Promise(resolve=>{
    const rarityRank = r => r.type==='weapon' ? ({comune:0,rara:1,epica:2,leggendaria:4}[r.weapon.rarity]||0) : (r.rarity===5?4:3);
    const topRank = Math.max(...results.map(rarityRank));
    const themeColor = topRank>=4 ? '#ffd700' : topRank===3 ? '#9aa4c4' : topRank===2 ? '#f5b342' : topRank===1 ? '#4fd8e0' : '#8791b3';

    const overlay = document.createElement('div');
    overlay.className = 'pull-overlay';
    overlay.innerHTML = `<div class="pull-stage">
      <div class="pull-ring" style="--ring-color:${themeColor}"></div>
      <div class="pull-core" style="background:${themeColor};color:${themeColor}"></div>
    </div>`;
    document.body.appendChild(overlay);

    setTimeout(()=>{
      overlay.classList.add('burst');
      setTimeout(()=>{
        const stage = overlay.querySelector('.pull-stage');
        if(stage) stage.remove();

        const revealWrap = document.createElement('div');
        revealWrap.className = 'pull-reveal';
        results.forEach((r,i)=>{
          let cardEl;
          if(r.type==='character') cardEl = renderCharUnlockCard(r.charId);
          else if(r.type==='character_dupe') cardEl = el(`<div class="hud-panel artifact-card" style="text-align:center;border-color:${r.rarity===5?'#ffd700':'#8791b3'}"><div class="ac-name">${'★'.repeat(r.rarity)} già tutti sbloccati</div><div class="ac-setname">+${r.bonus} Frammenti di compenso</div></div>`);
          else cardEl = renderWeaponCard(r.weapon);
          cardEl.classList.add('pull-card-reveal');
          cardEl.style.animationDelay = (i*220)+'ms';
          revealWrap.appendChild(cardEl);
        });
        overlay.appendChild(revealWrap);

        const closeBtn = document.createElement('button');
        closeBtn.className = 'primary';
        closeBtn.style.marginTop = '18px';
        closeBtn.textContent = 'Continua';
        closeBtn.onclick = ()=>{ overlay.remove(); resolve(); };
        overlay.appendChild(closeBtn);
      }, 650);
    }, 1500);
  });
}

/* ============ MISSIONS ============ */
function countUnlockedHeroes(){ return Object.values(state.roster).filter(r=>r.unlocked).length; }
function hasUnlocked5Star(){ return Object.keys(CHAR_DB).some(id=>CHAR_DB[id].rarity===5 && state.roster[id].unlocked); }
function anyHeroHasEquippedArtifact(){ return Object.values(state.roster).some(r=>r.equipment.some(e=>e)); }
function anyHeroHasWeapon(){ return Object.values(state.roster).some(r=>r.weapon); }

const ONE_OFF_QUESTS = [
  {id:'unlock5star',  desc:'Sblocca un eroe a 5 stelle',       reward:1000, check:hasUnlocked5Star},
  {id:'equip1',       desc:'Equipaggia il tuo primo manufatto', reward:100,  check:anyHeroHasEquippedArtifact},
  {id:'equipWeapon',  desc:'Equipaggia la tua prima arma',      reward:150,  check:anyHeroHasWeapon},
];

function getHighestArtifactLevel(){
  let max = 0;
  state.inventory.forEach(it=>{ if((it.level||0)>max) max = it.level||0; });
  for(const charId in state.roster){
    state.roster[charId].equipment.forEach(it=>{ if(it && (it.level||0)>max) max = it.level; });
  }
  return max;
}

// Infinite quest tracks: each time claimed, the target and reward both increase for next time.
const QUEST_TRACKS = [
  {id:'tower',  label:t=>`Raggiungi il Piano ${t} della Torre`, baseTarget:5, step:5,  baseReward:200, rewardStep:120, getValue:()=>Math.max(0,state.maxStageReached-1)},
  {id:'heroes', label:t=>`Sblocca ${t} eroi`,                   baseTarget:2, step:1,  baseReward:250, rewardStep:250, getValue:countUnlockedHeroes, maxTarget:Object.keys(CHAR_DB).length},
  {id:'pulls',  label:t=>`Effettua ${t} evocazioni totali`,     baseTarget:5, step:15, baseReward:150, rewardStep:100, getValue:()=>state.totalPullsDone},
  {id:'sells',  label:t=>`Vendi ${t} manufatti`,                baseTarget:3, step:5,  baseReward:100, rewardStep:80,  getValue:()=>state.totalArtifactsSold},
  {id:'artifactLevel', label:t=>`Porta un manufatto al livello ${t}`, baseTarget:5, step:5, baseReward:150, rewardStep:150, getValue:getHighestArtifactLevel, maxTarget:20},
];

function getTrackTarget(track){
  const tier = state.questTiers[track.id]||0;
  let target = track.baseTarget + tier*track.step;
  if(track.maxTarget!==undefined) target = Math.min(target, track.maxTarget);
  return target;
}
function getTrackReward(track){
  const tier = state.questTiers[track.id]||0;
  return track.baseReward + tier*track.rewardStep;
}
function isTrackExhausted(track){ return !!state.questExhausted[track.id]; }
function claimTrack(trackId){
  const track = QUEST_TRACKS.find(t=>t.id===trackId);
  if(!track || isTrackExhausted(track)) return;
  const target = getTrackTarget(track);
  if(track.getValue()<target) return;
  state.gold += getTrackReward(track);
  const tier = state.questTiers[track.id]||0;
  if(track.maxTarget!==undefined && target>=track.maxTarget){
    state.questExhausted[track.id] = true; // fully maxed out, no further tiers
  } else {
    state.questTiers[track.id] = tier+1;
  }
  render();
}

function claimQuest(id){
  const q = ONE_OFF_QUESTS.find(x=>x.id===id);
  if(!q || state.claimedQuests[id] || !q.check()) return;
  state.claimedQuests[id] = true;
  state.gold += q.reward;
  render();
}

/* ============ RENDER ============ */
function el(html){ const d=document.createElement('div'); d.innerHTML=html.trim(); return d.firstElementChild; }

function render(){
  const app = document.getElementById('app');
  app.innerHTML='';
  app.appendChild(renderTopbar());
  if(state.screen==='home') app.appendChild(renderHome());
  else if(state.screen==='town') app.appendChild(renderTown());
  else if(state.screen==='battle') app.appendChild(renderBattle());
  else if(state.screen==='victory') app.appendChild(renderVictory());
  else if(state.screen==='defeat') app.appendChild(renderDefeat());
  if(state.screen!=='home') saveGame();
}

function renderTopbar(){
  const bar = el(`<div class="hud-panel topbar">
    <div class="title">
      <div class="glyph">◈</div>
      <div>
        <h1>Eco del Vuoto</h1>
        <div class="sub">Piano ${state.stage} · Torre Infinita</div>
      </div>
    </div>
    <div class="stats">
      <div class="stat"><div class="val">${state.gold}</div><div class="lbl">Frammenti</div></div>
      <div class="stat"><div class="val">${state.party.length}/4</div><div class="lbl">Squadra</div></div>
    </div>
  </div>`);
  if(state.screen!=='home'){
    const resetBtn = el(`<button class="ghost small" style="font-size:10px;opacity:0.55;align-self:center;">⟲ Reset</button>`);
    resetBtn.onclick=()=>{
      if(window.confirm('Cancellare tutti i progressi e ricominciare da capo?')){
        resetSave(); state.screen='home'; render();
      }
    };
    bar.querySelector('.stats').appendChild(resetBtn);
  }
  return bar;
}

function renderHome(){
  const wrap = document.createElement('div');
  wrap.appendChild(el(`<div class="hud-panel home-hero">
    <div class="eyebrow">Demo di base — combattimento a turni</div>
    <h1>ECO DEL VUOTO</h1>
    <p>Inizi con un solo eroe su una torre infinita. Attacco base, Skill a punti condivisi, Ultimate a energia: sconfiggi i nemici, raccogli manufatti, sali sempre più in alto — e sblocca altri eroi lungo la strada.</p>
  </div>`));
  const existing = hasSave();
  const btnRow = el(`<div style="text-align:center;display:flex;flex-direction:column;align-items:center;gap:10px;"></div>`);
  if(existing){
    const continueBtn = el(`<button class="primary" style="padding:14px 30px;font-size:16px;">Continua la run ▶</button>`);
    continueBtn.onclick=()=>{ loadGame(); state.screen='town'; render(); };
    const newBtn = el(`<button class="ghost small">Inizia una nuova run (cancella il salvataggio)</button>`);
    newBtn.onclick=()=>{
      if(window.confirm('Sei sicuro? Il salvataggio attuale andrà perso.')){
        resetSave(); state.screen='town'; render();
      }
    };
    btnRow.appendChild(continueBtn);
    btnRow.appendChild(newBtn);
  } else {
    const startBtn = el(`<button class="primary" style="padding:14px 30px;font-size:16px;">Inizia la run ▶</button>`);
    startBtn.onclick=()=>{ resetSave(); state.screen='town'; render(); };
    btnRow.appendChild(startBtn);
  }
  wrap.appendChild(btnRow);
  return wrap;
}

function renderHeroCard(charId){
  const c = CHAR_DB[charId];
  const unlocked = state.roster[charId].unlocked;
  if(!unlocked){
    return el(`<div class="hud-panel hero-card locked-card">
      <div class="hero-head">
        <div class="hero-portrait" style="background:#333;filter:grayscale(1);opacity:0.5;">${c.glyph}</div>
        <div>
          <div class="hero-name" style="opacity:0.55;">${c.name}</div>
          <div class="hero-title" style="opacity:0.45;">${c.title}</div>
          <div class="hero-role" style="opacity:0.45;">${c.role}</div>
          <div class="element-tag">${ELEMENT_DATA[c.element]?.label||c.element}</div>
          <div class="hero-stars" style="opacity:0.45;color:${c.rarity===5?'#ffd700':'#9aa4c4'}">${'★'.repeat(c.rarity)}</div>
        </div>
      </div>
      <div class="locked-tag">🔒 Bloccato</div>
    </div>`);
  }
  const eff = getEffectiveStats(charId);
  const selected = state.party.includes(charId);
  const card = el(`<div class="hud-panel hero-card ${selected?'selected':''}">
    <div class="hero-head">
      <div class="hero-portrait" style="background:${c.color}">${c.glyph}</div>
      <div>
        <div class="hero-name">${c.name}</div>
        <div class="hero-title">${c.title}</div>
        <div class="hero-role">${c.role}</div>
        <div class="element-tag">${ELEMENT_DATA[c.element]?.label||c.element}</div>
        <div class="hero-stars" style="color:${c.rarity===5?'#ffd700':'#9aa4c4'}">${'★'.repeat(c.rarity)}</div>
      </div>
    </div>
    <div class="stat-row"><span>PV</span><b>${eff.hp}</b></div>
    <div class="stat-row"><span>ATK</span><b>${eff.atk}</b></div>
    <div class="stat-row"><span>DEF</span><b>${eff.def}</b></div>
    <div class="stat-row"><span>VEL</span><b>${eff.speed}</b></div>
    <div id="wslot-${charId}"></div>
    <div class="equip-row" id="eqrow-${charId}"></div>
    <div class="set-bonus-list" id="setbonus-${charId}"></div>
    <div style="margin-top:10px;"><button class="small ${selected?'danger':''}" id="toggle-${charId}">${selected?'Rimuovi dalla squadra':'Aggiungi alla squadra'}</button></div>
  </div>`);
  const weapon = state.roster[charId].weapon;
  const wslot = card.querySelector(`#wslot-${charId}`);
  const wEl = el(weapon
    ? `<div class="weapon-slot filled" style="border-color:${RARITY_COLOR[weapon.rarity]}"><span class="wicon">⚔</span><span class="wtext"><b>${weapon.name}</b> · ${RARITY_LABEL[weapon.rarity]}</span></div>`
    : `<div class="weapon-slot"><span class="wicon">⚔</span><span class="wtext">Nessuna arma equipaggiata</span></div>`);
  wEl.onclick=(ev)=>{ ev.stopPropagation(); if(weapon) openViewWeapon(charId); else openWeaponPicker(charId); };
  wslot.appendChild(wEl);
  const eqrow = card.querySelector(`#eqrow-${charId}`);
  state.roster[charId].equipment.forEach((it,i)=>{
    const slot = el(`<div class="equip-slot ${it?'filled':''}" style="${it?'border-color:'+RARITY_COLOR[it.rarity]+';color:'+RARITY_COLOR[it.rarity]:''}">${it?ARTIFACT_SETS[it.setId].icon:'+'}</div>`);
    slot.onclick=(ev)=>{ ev.stopPropagation(); if(it) openViewArtifact(charId,i); else openEquipPicker(charId,i); };
    eqrow.appendChild(slot);
  });
  const setBonusEl = card.querySelector(`#setbonus-${charId}`);
  getActiveSetBonuses(charId).forEach(b=>{
    setBonusEl.appendChild(el(`<div class="set-bonus-badge">${b.icon} ${b.name} (${b.tier}pz): ${b.label}</div>`));
  });
  card.querySelector(`#toggle-${charId}`).onclick=(ev)=>{ ev.stopPropagation(); togglePartyMember(charId); };
  return card;
}

function renderTownTabs(){
  const tabs = [
    ['squadra','Squadra'],
    ['personaggi','Cambia Personaggi'],
    ['abilita','Abilità'],
    ['inventario','Inventario'],
    ['indice','Indice'],
    ['tutorial','Tutorial'],
    ['torre','Torre'],
    ['banner','Banner'],
    ['missioni','Missioni'],
  ];
  const bar = el(`<div class="tab-bar"></div>`);
  tabs.forEach(([key,label])=>{
    const btn = el(`<button class="tab-btn ${state.townTab===key?'active':''}">${label}</button>`);
    btn.onclick=()=>setTownTab(key);
    bar.appendChild(btn);
  });
  return bar;
}

function renderSquadraTab(){
  const wrap = document.createElement('div');
  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Squadra attiva</span><h2>I tuoi 4 eroi</h2></div>`));
  wrap.appendChild(el(`<div class="hint" style="margin-bottom:14px;">Trascina un eroe su un altro slot per cambiare l'ordine. Puoi anche selezionare una carta e usare ↑/↓. L'ordine definisce i turni a parità di velocità.</div>`));
  const grid = el(`<div class="roster-grid"></div>`);
  state.party.forEach((id,index)=>{
    const card=renderHeroCard(id);
    card.classList.add('party-sortable');
    card.draggable=true;
    card.tabIndex=0;
    card.setAttribute('aria-label',`${CHAR_DB[id].name}, slot ${index+1} di ${state.party.length}. Usa freccia su o giù per riordinare.`);
    card.addEventListener('dragstart',event=>{
      event.dataTransfer.setData('text/plain',id);
      event.dataTransfer.effectAllowed='move';
      card.classList.add('party-dragging');
    });
    card.addEventListener('dragend',()=>card.classList.remove('party-dragging'));
    card.addEventListener('dragover',event=>{
      event.preventDefault();
      event.dataTransfer.dropEffect='move';
      card.classList.add('party-drag-over');
    });
    card.addEventListener('dragleave',()=>card.classList.remove('party-drag-over'));
    card.addEventListener('drop',event=>{
      event.preventDefault();
      card.classList.remove('party-drag-over');
      movePartyMember(event.dataTransfer.getData('text/plain'),state.party.indexOf(id));
    });
    card.addEventListener('keydown',event=>{
      if(event.target!==card) return;
      if(event.key==='ArrowUp'||event.key==='ArrowDown'){
        event.preventDefault();
        movePartyMember(id,index+(event.key==='ArrowUp'?-1:1));
      }
    });
    grid.appendChild(card);
  });
  wrap.appendChild(grid);
  const startRow = el(`<div style="text-align:center;margin-top:10px;">
    <button class="primary" id="deployBtn" style="padding:12px 26px;font-size:15px;">Avvia Piano ${state.stage} ▶</button>
  </div>`);
  startRow.querySelector('#deployBtn').onclick=()=>startBattle();
  wrap.appendChild(startRow);
  return wrap;
}

function renderPersonaggiTab(){
  const wrap = document.createElement('div');
  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Roster completo</span><h2>Cambia Personaggi</h2></div>`));
  wrap.appendChild(el(`<div class="hint" style="margin-bottom:14px;">Scegli quali eroi sbloccati portare in squadra (fino a 4). I personaggi bloccati verranno sbloccati in futuro.</div>`));

  const selectedIds = state.party;
  const benchIds = Object.keys(CHAR_DB).filter(id=>!state.party.includes(id));

  wrap.appendChild(el(`<div class="roster-section-title">In squadra (${selectedIds.length}/4)</div>`));
  const gridSel = el(`<div class="roster-grid"></div>`);
  selectedIds.forEach(id=> gridSel.appendChild(renderHeroCard(id)));
  wrap.appendChild(gridSel);

  wrap.appendChild(el(`<div class="roster-section-title">In panchina (${benchIds.length})</div>`));
  if(benchIds.length===0){
    wrap.appendChild(el(`<div class="empty-slot-msg">Tutti gli eroi disponibili sono già in squadra.</div>`));
  } else {
    const gridBench = el(`<div class="roster-grid"></div>`);
    benchIds.forEach(id=> gridBench.appendChild(renderHeroCard(id)));
    wrap.appendChild(gridBench);
  }
  return wrap;
}

function renderAbilityCard(ability, tagKey, tagLabel, extraNumbers){
  return el(`<div class="hud-panel ability-card">
    <span class="tag ${tagKey}">${tagLabel}</span>
    <div class="aname">${ability.name}</div>
    <div class="adesc">${ability.desc}</div>
    <div class="anumbers">${extraNumbers}</div>
  </div>`);
}

function renderAbilitaTab(){
  const wrap = document.createElement('div');
  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Manuale abilità</span><h2>Come combatte ogni eroe</h2></div>`));
  const subbar = el(`<div class="subtab-bar"></div>`);
  Object.keys(CHAR_DB).forEach(id=>{
    const c = CHAR_DB[id];
    const btn = el(`<button class="subtab-btn ${state.abilityTabChar===id?'active':''}" style="${state.abilityTabChar===id?'border-color:'+c.color+';color:'+c.color:''}">${c.name}</button>`);
    btn.onclick=()=>setAbilityTabChar(id);
    subbar.appendChild(btn);
  });
  wrap.appendChild(subbar);

  const id = state.abilityTabChar;
  const c = CHAR_DB[id];
  const unlocked = state.roster[id].unlocked;
  const head = el(`<div class="hud-panel" style="padding:16px;margin-bottom:14px;display:flex;align-items:center;gap:14px;">
    <div class="hero-portrait" style="background:${c.color};width:52px;height:52px;font-size:20px;">${c.glyph}</div>
    <div>
      <div class="hero-name" style="font-size:19px;">${c.name}</div>
      <div class="hero-title">${c.title}</div>
      <div class="hero-role">${c.role}</div>
      <div class="element-tag" style="margin-top:4px;">Elemento: ${ELEMENT_DATA[c.element].label}</div>
      <div class="hero-stars" style="color:${c.rarity===5?'#ffd700':'#9aa4c4'}">${'★'.repeat(c.rarity)}${unlocked?'':' · 🔒 Bloccato'}</div>
      ${c.passiveSpCapBonus?`<div class="hint" style="text-align:left;margin-top:4px;">Passiva: mentre è in squadra, il cap dei Punti Abilità sale da 5 a ${5+c.passiveSpCapBonus}.</div>`:''}
      ${c.passiveInaFollowUps?`<div class="hint" style="text-align:left;margin-top:4px;">Passiva: marchia il nemico con meno PV. I colpi al marchiato attivano fino a ${c.passiveInaFollowUps} follow-up; la Ultimate ricarica le cariche.</div>`:''}
      ${c.passiveHpLossFollowUps?`<div class="hint" style="text-align:left;margin-top:4px;">Passiva: ogni ${c.passiveHpLossFollowUps} perdite di PV attiva un follow-up ad area e cura il 15% dei PV massimi.</div>`:''}
      ${c.revivesPerBattle?`<div class="hint" style="text-align:left;margin-top:4px;">Passiva: può rinascere ${c.revivesPerBattle} volte per battaglia con il 60% dei PV massimi.</div>`:''}
    </div>
  </div>`);
  wrap.appendChild(head);

  const cards = el(`<div class="ability-cards"></div>`);
  cards.appendChild(renderAbilityCard(c.basic, 'basic', 'Attacco Base',
    `<span><b>Moltiplicatore:</b> ${Math.round(c.basic.mult*100)}% ${c.basic.hpBased?'PV massimi':'ATK'}${c.basic.hits?` x${c.basic.hits} colpi`:''}</span>
     <span><b>Genera:</b> ${c.basic.spGain!==undefined?c.basic.spGain:1} Punto/i Abilità</span>
     <span><b>Energia:</b> +${c.basic.energyGain}</span>`));
  cards.appendChild(renderAbilityCard(c.skill, 'skill', 'Skill · 1 Punto Abilità',
    `<span><b>Moltiplicatore:</b> ${c.skill.mult>0?Math.round(c.skill.mult*100)+'% ATK':'—'}${c.skill.hits?` x${c.skill.hits} colpi`:''}</span>
     ${c.skill.effect?`<span><b>Effetto:</b> ${effectLabel(c.skill)}</span>`:''}
     <span><b>Energia:</b> +${c.skill.energyGain}</span>`));
  cards.appendChild(renderAbilityCard(c.ult, 'ult', 'Ultimate · Energia Piena',
    `<span><b>Moltiplicatore:</b> ${c.ult.mult>0?Math.round(c.ult.mult*100)+'% '+(c.ult.hpBased?'PV massimi':'ATK'):'—'}${c.ult.hits?` x${c.ult.hits} colpi`:''}</span>
     ${c.ult.effect?`<span><b>Effetto:</b> ${effectLabel(c.ult)}</span>`:''}
     <span><b>Energia massima:</b> ${c.base.energyMax}</span>`));
  if(id==='ninomaeInaNis'){
    cards.appendChild(renderAbilityCard(
      {name:'Tentacolo Inchiostrato',desc:'Un follow-up separato quando un alleato diverso da Ina colpisce il nemico marchiato.'},
      'skill','Follow-up · Reazione',
      `<span><b>Moltiplicatore:</b> 65% ATK</span><span><b>Cariche:</b> 3 per battaglia</span><span><b>Energia:</b> +10 per follow-up</span><span><b>Ricarica:</b> Ultimate</span><span>Il follow-up casuale della Ultimate non consuma cariche.</span>`
    ));
  }
  if(id==='suiseiHoshimachi'){
    cards.appendChild(renderAbilityCard(
      {name:'Follow-up della Cometa',desc:'Ogni quarta perdita di PV attiva un colpo ad area e cura Susei.'},
      'ult','Passiva · Follow-up',
      `<span><b>Moltiplicatore:</b> 14% PV massimi su tutti i nemici</span><span><b>Cura:</b> 15% PV massimi</span><span><b>Attivazione:</b> ogni 4 eventi di perdita PV</span>`
    ));
    cards.appendChild(renderAbilityCard(SUISEI_GUARD_ABILITIES.basic,'basic','Basic · Postura stellare',
      `<span><b>Moltiplicatore:</b> 30% PV massimi</span><span><b>Costo:</b> 3% PV massimi</span><span><b>Energia:</b> +${SUISEI_GUARD_ABILITIES.basic.energyGain}</span>`));
    cards.appendChild(renderAbilityCard(SUISEI_GUARD_ABILITIES.skill,'skill','Skill · Bloccata',
      `<span>Disabilitata per 3 round mentre è attiva la postura.</span>`));
  }
  wrap.appendChild(cards);
  if(id==='hakosBaels'){
    wrap.appendChild(el(`<div class="screen-title" style="margin-top:20px;"><span class="eyebrow">Rovina del Caos</span><h2>Abilità trasformate</h2></div>`));
    wrap.appendChild(el(`<div class="hint" style="margin:-8px 0 14px;">Disponibili durante la Ultimate. Hakos resta sola per cinque sue azioni; nessuna abilità genera energia.</div>`));
    const formCards=el(`<div class="ability-cards"></div>`);
    const formBasic=HAKOS_FORM_ABILITIES.basic;
    const formSkill=HAKOS_FORM_ABILITIES.skill;
    formCards.appendChild(renderAbilityCard(formBasic,'basic','Attacco Base · Trasformata',
      `<span><b>Moltiplicatore:</b> ${Math.round(formBasic.mult*100)}% ATK</span><span><b>Bersaglio:</b> Un nemico</span><span><b>Energia:</b> Non genera energia</span>`));
    formCards.appendChild(renderAbilityCard(formSkill,'skill','Skill · Trasformata',
      `<span><b>Moltiplicatore:</b> ${Math.round(formSkill.mult*100)}% ATK</span><span><b>Bersaglio:</b> Bersaglio selezionato e nemici adiacenti</span><span><b>Energia:</b> Non genera energia</span>`));
    wrap.appendChild(formCards);
  }
  return wrap;
}

function effectLabel(ability){
  switch(ability.effect){
    case 'shield_self': return `Scudo su se stesso pari al ${Math.round(ability.shieldPct*100)}% dei PV massimi, per 2 turni.`;
    case 'shield_all': return `Scudo su tutta la squadra pari al ${Math.round(ability.shieldPct*100)}% dei PV massimi, per 2 turni.`;
    case 'heal': return `Cura un alleato.`;
    case 'heal_all': return `Cura l'intera squadra.`;
    case 'burn': return `Applica ${ability.burnStacks} carica/e di Sanguinamento (danno nel tempo).`;
    case 'burn_all': return `Applica ${ability.burnStacks} carica/e di Sanguinamento a tutti i nemici colpiti.`;
    case 'buff_atk': return `+${Math.round(ability.buffPct*100)}% ATK a tutta la squadra per 2 turni.`;
    case 'buff_atk_energy': return `+${Math.round(ability.buffPct*100)}% ATK per 3 turni e +${ability.energyGainAll} energia a tutta la squadra.`;
    case 'boost_basic_hits': return `Aumenta di 1 il numero di colpi dell'Attacco Base (fino a un massimo di 10). Non conclude il turno: si può riusare finché ci sono Punti Abilità, poi va chiusa con l'Attacco Base. Le prime 2 Skill della battaglia non costano Punti Abilità.`;
    case 'extra_attack_buff': return `L'alleato scelto attacca subito una volta in più e ottiene +${Math.round(ability.buffPct*100)}% ATK per 2 turni.`;
    case 'grant_sp': return `Dona istantaneamente ${ability.spGrant} Punti Abilità alla squadra (nessun danno).`;
    case 'grant_sp_and_buff': return `Dona istantaneamente ${ability.spGrant} Punti Abilità e +${Math.round(ability.buffPct*100)}% ATK a tutta la squadra per 2 turni.`;
    case 'hakos_ultimate': return `Assorbe PV, ATK, DIF, VEL, scudi e buff ATK degli alleati. Hakos resta sola per cinque suoi turni; poi li richiama. Durante la forma non guadagna energia.`;
    case 'suisei_guard': return `Sacrifica il 50% dei PV correnti e riduce del 40% i danni subiti per 3 round. Durante la postura la Skill è bloccata e il Basic viene potenziato.`;
    case 'suisei_set_half_hp': return `Dopo il colpo porta i PV di Susei esattamente al 50%: cura se è sotto, sacrifica PV se è sopra.`;
    case 'laplus_def_down': return `Riduce la DIF del nemico del 15% per 2 round. Il debuff si accumula fino al 75%.`;
    case 'laplus_plant_weakness': return `Riduce la DIF del 15% e rende il bersaglio vulnerabile all'elemento del primo eroe in squadra per 2 round.`;
    case 'laplus_ultimate': return `Colpisce tutti i nemici, riduce la DIF del 30% per 2 round e rinnova il debuff.`;
    case 'ina_mark': return `Marca un nemico: quando viene colpito, Ina esegue un follow-up. Disponibili 3 cariche, recuperate con la Ultimate.`;
    case 'ina_ultimate': return `Colpisce tutti i nemici, esegue un follow-up su un bersaglio casuale e recupera tutte le cariche.`;
    default: return '';
  }
}

let inventoryFilters={type:'tutto',query:'',stat:'tutte',set:'tutti'};

function applyInventoryFilters(root){
  const query=inventoryFilters.query.trim().toLocaleLowerCase();
  root.querySelectorAll('.inventory-item').forEach(card=>{
    const typeMatches=inventoryFilters.type==='tutto'||card.dataset.inventoryType===inventoryFilters.type;
    const queryMatches=!query||card.dataset.inventorySearch.includes(query);
    const statMatches=inventoryFilters.stat==='tutte'||card.dataset.inventoryStats.split(',').includes(inventoryFilters.stat);
    const setMatches=inventoryFilters.set==='tutti'||(card.dataset.inventoryType==='manufatto'&&card.dataset.inventorySet===inventoryFilters.set);
    card.hidden=!(typeMatches&&queryMatches&&statMatches&&setMatches);
  });
  root.querySelectorAll('.inventory-section').forEach(section=>{
    const typeMatches=inventoryFilters.type==='tutto'||section.dataset.inventorySection===inventoryFilters.type;
    section.hidden=!typeMatches;
    if(!typeMatches) return;
    const hasVisibleItems=section.querySelector('.inventory-item:not([hidden])');
    const noResults=section.querySelector('.inventory-no-results');
    if(noResults) noResults.hidden=!!hasVisibleItems;
  });
  root.querySelectorAll('.inventory-section-heading').forEach(heading=>{
    heading.hidden=inventoryFilters.type!=='tutto'&&heading.dataset.inventoryHeading!==inventoryFilters.type;
  });
}

function renderInventarioTab(){
  const wrap = document.createElement('div');
  const totalItems=state.inventory.length+state.weaponInventory.length;
  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Equipaggiamento</span><h2>Zaino (${totalItems})</h2></div>`));

  const toolbar=el(`<div class="hud-panel inventory-toolbar">
    <div class="inventory-type-filter" role="group" aria-label="Tipo di equipaggiamento"></div>
    <input class="inventory-search" type="search" placeholder="Cerca nome, set o effetto" aria-label="Cerca nome, set o effetto">
    <select class="inventory-stat-filter" aria-label="Filtra per statistica"></select>
    <select class="inventory-set-filter" aria-label="Filtra per set"></select>
  </div>`);
  const typeFilter=toolbar.querySelector('.inventory-type-filter');
  [['tutto','Tutto'],['manufatto','Manufatti'],['arma','Armi']].forEach(([key,label])=>{
    const button=el(`<button class="subtab-btn ${inventoryFilters.type===key?'active':''}" type="button">${label}</button>`);
    button.onclick=()=>{
      inventoryFilters.type=key;
      typeFilter.querySelectorAll('button').forEach(item=>item.classList.toggle('active',item===button));
      applyInventoryFilters(wrap);
    };
    typeFilter.appendChild(button);
  });
  const searchInput=toolbar.querySelector('.inventory-search');
  searchInput.value=inventoryFilters.query;
  searchInput.oninput=()=>{
    inventoryFilters.query=searchInput.value;
    applyInventoryFilters(wrap);
  };
  const statFilter=toolbar.querySelector('.inventory-stat-filter');
  statFilter.appendChild(el(`<option value="tutte">Tutte le statistiche</option>`));
  Object.entries(STAT_KEYS).forEach(([key,meta])=>statFilter.appendChild(el(`<option value="${key}">${meta.label}</option>`)));
  statFilter.value=inventoryFilters.stat;
  statFilter.onchange=()=>{inventoryFilters.stat=statFilter.value;applyInventoryFilters(wrap);};
  const setFilter=toolbar.querySelector('.inventory-set-filter');
  setFilter.appendChild(el(`<option value="tutti">Tutti i set</option>`));
  Object.entries(ARTIFACT_SETS).forEach(([key,set])=>setFilter.appendChild(el(`<option value="${key}">${set.name}</option>`)));
  setFilter.value=inventoryFilters.set;
  setFilter.onchange=()=>{inventoryFilters.set=setFilter.value;applyInventoryFilters(wrap);};
  wrap.appendChild(toolbar);

  wrap.appendChild(el(`<div class="screen-title inventory-section-heading" data-inventory-heading="manufatto"><span class="eyebrow">Manufatti</span><h2>${state.inventory.length}</h2></div>`));
  const invPanel=el(`<div class="hud-panel section inventory-section" data-inventory-section="manufatto" style="padding:16px;"></div>`);
  if(state.inventory.length===0){
    invPanel.appendChild(el(`<div class="hint">Nessun manufatto. Completa un piano della torre per ottenerne.</div>`));
  } else {
    const list=el(`<div class="artifact-grid"></div>`);
    state.inventory.forEach(it=>{
      const cost=getArtifactLevelUpCost(it.level||0);
      const maxed=(it.level||0)>=ARTIFACT_MAX_LEVEL;
      const card=renderArtifactCard(it,{actions:[
        {label:maxed?'Livello massimo':`⬆ Potenzia (${cost} 💠)`,onClick:()=>levelUpArtifact(it.uid),disabled:maxed||state.gold<cost},
        {label:`💰 Vendi (+${getArtifactSellValue(it)} 💠)`,onClick:()=>sellArtifact(it.uid)},
      ]});
      const set=ARTIFACT_SETS[it.setId];
      const stats=[it.mainStat,...it.subStats].map(stat=>stat.key);
      card.classList.add('inventory-item');
      card.dataset.inventoryType='manufatto';
      card.dataset.inventorySet=it.setId;
      card.dataset.inventoryStats=stats.join(',');
      card.dataset.inventorySearch=`${it.name} ${set.name} ${RARITY_LABEL[it.rarity]} ${stats.map(statKeyLabel).join(' ')} ${it.subStats.map(formatStatValue).join(' ')}`.toLocaleLowerCase();
      list.appendChild(card);
    });
    invPanel.appendChild(list);
    invPanel.appendChild(el(`<div class="hint inventory-no-results" hidden>Nessun manufatto corrisponde ai filtri.</div>`));
  }
  wrap.appendChild(invPanel);
  wrap.appendChild(el(`<div class="hint" style="margin:8px 0 20px;">I manufatti si possono potenziare fino al livello 20 e vendere per Frammenti. I set attivano bonus con 2 e 4 pezzi.</div>`));

  wrap.appendChild(el(`<div class="screen-title inventory-section-heading" data-inventory-heading="arma"><span class="eyebrow">Armi</span><h2>${state.weaponInventory.length}</h2></div>`));
  const wpnPanel=el(`<div class="hud-panel section inventory-section" data-inventory-section="arma" style="padding:16px;"></div>`);
  if(state.weaponInventory.length===0){
    wpnPanel.appendChild(el(`<div class="hint">Nessuna arma. Ottienile dal Banner.</div>`));
  } else {
    const list=el(`<div class="artifact-grid"></div>`);
    state.weaponInventory.forEach(weapon=>{
      const card=renderWeaponCard(weapon,{actions:getWeaponManagementActions(weapon)});
      const effect=getWeaponEffectDescription(weapon,weapon.ownerId||undefined);
      card.classList.add('inventory-item');
      card.dataset.inventoryType='arma';
      card.dataset.inventorySet='';
      card.dataset.inventoryStats=[weapon.mainStat.key,weapon.subStat.key].join(',');
      card.dataset.inventorySearch=`${weapon.name} ${RARITY_LABEL[weapon.rarity]} ${statKeyLabel(weapon.mainStat.key)} ${statKeyLabel(weapon.subStat.key)} ${formatStatValue(weapon.mainStat)} ${formatStatValue(weapon.subStat)} ${effect}`.toLocaleLowerCase();
      list.appendChild(card);
    });
    wpnPanel.appendChild(list);
    wpnPanel.appendChild(el(`<div class="hint inventory-no-results" hidden>Nessuna arma corrisponde ai filtri.</div>`));
  }
  wrap.appendChild(wpnPanel);
  applyInventoryFilters(wrap);
  return wrap;
}

function setIndexCategory(category){ state.indexCategory = category; render(); }

function renderIndiceTab(){
  const wrap = document.createElement('div');
  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Catalogo</span><h2>Indice completo</h2></div>`));
  const elementLabels = elements => elements.map(element => ELEMENT_DATA[element].label).join(' · ');

  const subbar = el(`<div class="subtab-bar" style="margin-bottom:16px;"></div>`);
  const categories = [
    ['tutto','Tutto'],
    ['eroi','Eroi'],
    ['manufatti','Manufatti'],
    ['armi','Armi'],
    ['nemici','Nemici'],
  ];
  categories.forEach(([key,label])=>{
    const btn = el(`<button class="subtab-btn ${state.indexCategory===key?'active':''}">${label}</button>`);
    btn.onclick=()=>setIndexCategory(key);
    subbar.appendChild(btn);
  });
  wrap.appendChild(subbar);

  const renderCards = (title, cards)=>{
    const panel = el(`<div class="hud-panel section" style="padding:16px;margin-bottom:16px;"></div>`);
    panel.appendChild(el(`<div class="screen-title" style="margin:0 0 10px;"><span class="eyebrow">${title}</span><h3 style="margin:0;">${title}</h3></div>`));
    const grid = el(`<div class="artifact-grid"></div>`);
    cards.forEach(card => grid.appendChild(card));
    panel.appendChild(grid);
    return panel;
  };

  const selected = state.indexCategory || 'tutto';
  if(selected === 'tutto' || selected === 'eroi'){
    const heroCards = Object.keys(CHAR_DB).map(id => {
      const c = CHAR_DB[id];
      return el(`<div class="hud-panel artifact-card" style="border-color:${c.color};">
        <div class="ac-head">
          <span class="ac-icon" style="background:${c.color};color:#111;">${c.glyph}</span>
          <div>
            <div class="ac-name">${c.name}</div>
            <div class="ac-setname" style="color:${c.color};">${c.role}</div>
          </div>
        </div>
        <div class="ac-main">${c.title}</div>
        <div class="ac-subs"><span>· Elemento: ${ELEMENT_DATA[c.element].label}</span><span>· ${'★'.repeat(c.rarity)} ${c.rarity===5?'SSR':'SR'}</span></div>
      </div>`);
    });
    if(selected === 'tutto') wrap.appendChild(renderCards('Eroi', heroCards));
    else wrap.appendChild(renderCards('Eroi', heroCards));
  }

  if(selected === 'tutto' || selected === 'manufatti'){
    const artifactCards = Object.keys(ARTIFACT_SETS).map(setId => {
      const setDef = ARTIFACT_SETS[setId];
      return el(`<div class="hud-panel artifact-card" style="border-color:${RARITY_COLOR.epica};">
        <div class="ac-head">
          <span class="ac-icon">${setDef.icon}</span>
          <div>
            <div class="ac-name">${setDef.name}</div>
            <div class="ac-setname" style="color:${RARITY_COLOR.epica};">Set ${setId}</div>
          </div>
        </div>
        <div class="ac-main">${setDef.bonus2.label}</div>
        <div class="ac-subs"><span>· ${setDef.bonus4.label}</span></div>
        <div class="ac-setbonus">Pezzi: ${setDef.pieces.join(', ')}</div>
      </div>`);
    });
    wrap.appendChild(renderCards('Manufatti', artifactCards));
  }

  if(selected === 'tutto' || selected === 'armi'){
    const weaponCards = WEAPON_NAMES.map(name=>{
      const weapon=WEAPON_FIXED_STATS[name];
      return el(`<div class="hud-panel artifact-card" style="border-color:${RARITY_COLOR[weapon.rarity]};">
        <div class="ac-head"><span class="ac-icon">⚔</span><div>
          <div class="ac-name">${name}</div>
          <div class="ac-setname" style="color:${RARITY_COLOR[weapon.rarity]};">${RARITY_LABEL[weapon.rarity]} · Arma</div>
        </div></div>
        <div class="ac-main">ATK <b>+${weapon.atk}</b></div>
        <div class="ac-subs"><span>· ${statKeyLabel(weapon.subStat.key)} ${formatStatValue(weapon.subStat)}</span></div>
        <div class="ac-setbonus">${WEAPON_DEFINITIONS[name].effect.describe(WEAPON_DEFINITIONS[name].effect.base)}</div>
      </div>`);
    });
    SIGNATURE_WEAPONS.forEach(signature=>{
      weaponCards.push(renderWeaponCard({
        uid:'catalog-'+signature.ownerId,
        name:signature.name,
        rarity:'leggendaria',
        level:0,
        ascension:0,
        unavailable:false,
        baseAtk:signature.atk,
        mainStat:{key:'atk',value:signature.atk},
        subStat:signature.subStat,
      },{charId:signature.ownerId}));
    });
    wrap.appendChild(renderCards('Armi', weaponCards));
  }

  if(selected === 'tutto' || selected === 'nemici'){
    const enemyCards = [...ENEMY_NAMES.map(name => el(`<div class="hud-panel artifact-card" style="border-color:#a1a1aa;">
      <div class="ac-head">
        <span class="ac-icon">◆</span>
        <div>
          <div class="ac-name">${name}</div>
          <div class="ac-setname" style="color:#a1a1aa;">Nemico comune</div>
        </div>
      </div>
      <div class="ac-main">Scarto: minion di torre</div>
      <div class="ac-subs"><span>· Elementi: ${elementLabels(ENEMY_ELEMENT_SETS[name])}</span></div>
    </div>`)), ...BOSS_NAMES.map(name => el(`<div class="hud-panel artifact-card" style="border-color:#eab308;">
      <div class="ac-head">
        <span class="ac-icon">☠</span>
        <div>
          <div class="ac-name">${name}</div>
          <div class="ac-setname" style="color:#eab308;">Boss</div>
        </div>
      </div>
      <div class="ac-main">Due attacchi per turno · Fase 2 al 50% PV</div>
      <div class="ac-subs"><span>· Elementi: ${elementLabels(ENEMY_ELEMENT_SETS[name])}</span><span>· Speciale: ${BOSS_MECHANIC_LABELS[BOSS_MECHANICS[name].phase1]} → ${BOSS_MECHANIC_LABELS[BOSS_MECHANICS[name].phase2]}</span></div>
    </div>`))];
    wrap.appendChild(renderCards('Nemici', enemyCards));
  }

  return wrap;
}

function renderTutorialTab(){
  const wrap = document.createElement('div');
  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Guida rapida</span><h2>Tutorial</h2></div>`));
  const sections = [
    ['Squadra e turni', `<p>Porta in battaglia fino a 4 eroi. Durante il turno della squadra scegli un'azione per l'eroe attivo; poi agiscono i nemici. Gli eroi sconfitti saltano il proprio turno.</p>`],
    ['Boss e fasi', `<p>I boss hanno molti più PV, compiono due attacchi consecutivi a ogni turno e passano alla Fase 2 quando scendono al 50% dei PV: il loro ATK aumenta e la mossa speciale diventa più frequente. Ogni boss ha una meccanica propria; gli evocati non superano mai 5 nemici vivi in campo.</p>`],
    ['Velocità e ordine', `<p>Ogni round mostra l'ordine completo delle azioni: chi ha più VEL agisce prima, eroi e nemici possono alternarsi. Gli eroi partono da 100 VEL; i nemici hanno da 90 a 120. Gli artefatti possono aggiungere VEL: le statistiche VEL partono da 1–4 e, potenziando una secondaria, possono arrivare fino a 12.</p>`],
    ['Attacco, Skill e Ultimate', `<ul><li><b>Attacco Base:</b> infligge danno, genera Punti Abilità e ricarica energia.</li><li><b>Skill:</b> di norma costa 1 Punto Abilità; alcune abilità hanno usi gratuiti o effetti speciali.</li><li><b>Ultimate:</b> si attiva quando l'energia è al massimo e consuma tutta l'energia accumulata.</li></ul><p>La squadra parte con 3 Punti Abilità, ne può conservare fino a 5; Ouro Kronii aumenta il limite se è in squadra.</p>`],
    ['Elementi e danni', `<p>Ogni eroe ha un elemento; ogni nemico ha sempre gli stessi 3 elementi, mostrati nell'Indice e in battaglia. Un attacco dello stesso elemento infligge metà danno. Un elemento forte contro uno dei tipi del nemico infligge il doppio; gli altri attacchi infliggono danno normale.</p><ul>${Object.keys(ELEMENT_DATA).map(element=>`<li><b>${ELEMENT_DATA[element].label}</b> è forte contro ${ELEMENT_DATA[ELEMENT_DATA[element].strongAgainst].label}.</li>`).join('')}</ul>`],
    ['Manufatti e set', `<p>Equipaggia fino a 5 manufatti per eroe. Le statistiche principali e secondarie aumentano i parametri; i bonus set si attivano con 2 e 4 pezzi dello stesso set. Puoi potenziare un manufatto fino al livello 20; ogni 5 livelli migliora una statistica secondaria casuale.</p>`],
    ['Armi', `<p>Ogni eroe ha uno slot arma. Ogni arma ha rarità, ATK, statistica secondaria ed effetto fissi. Potenziala fino al livello 20 spendendo Frammenti; ascendi fino al grado 5 consumando un doppione identico e vendila dall'Armeria. Il Banner armi contiene anche le sette firme 5 stelle dedicate agli eroi esistenti.</p>`],
    ['Torre e ricompense', `<p>Avanza nella Torre Infinita: ogni piano aumenta la difficoltà e ogni 5 piani affronti un boss. Le vittorie danno Frammenti e manufatti; usa i Frammenti per evocare dal Banner o potenziare l'equipaggiamento.</p>`],
    ['Banner e missioni', `<p>Un'evocazione costa 300 Frammenti. Il Banner personaggi garantisce un personaggio 4 stelle entro 10 evocazioni e uno 5 stelle entro 50. Nel Banner armi i personaggi hanno le stesse probabilità base ma nessuna garanzia: un'arma 5 stelle è invece garantita ogni 30 evocazioni. Le missioni offrono Frammenti aggiuntivi.</p>`],
  ];
  const grid = el(`<div class="tutorial-grid"></div>`);
  sections.forEach(([title, content])=>{
    grid.appendChild(el(`<section class="hud-panel tutorial-section"><h3>${title}</h3>${content}</section>`));
  });
  wrap.appendChild(grid);
  return wrap;
}

function renderCharUnlockCard(charId){
  const c = CHAR_DB[charId];
  return el(`<div class="hud-panel artifact-card" style="border-color:${c.color};text-align:center;">
    <div class="hero-portrait" style="background:${c.color};margin:0 auto 8px;width:40px;height:40px;">${c.glyph}</div>
    <div class="ac-name">${c.name}</div>
    <div class="hero-stars" style="justify-content:center;color:${c.rarity===5?'#ffd700':'#9aa4c4'}">${'★'.repeat(c.rarity)}</div>
    <div class="ac-setname" style="color:${c.color}">Nuovo Eroe Sbloccato!</div>
  </div>`);
}

function renderMissioniTab(){
  const wrap = document.createElement('div');
  const oneOffDone = ONE_OFF_QUESTS.filter(q=>state.claimedQuests[q.id]).length;
  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Obiettivi</span><h2>Missioni</h2></div>`));
  wrap.appendChild(el(`<div class="hint" style="margin-bottom:14px;">Le missioni a progressione si ripetono all'infinito: ogni volta che le riscatti, obiettivo e ricompensa aumentano per il giro successivo.</div>`));

  wrap.appendChild(el(`<div class="screen-title" style="margin-top:6px;"><span class="eyebrow">Progressione</span><h2>Missioni Ricorrenti</h2></div>`));
  const trackGrid = el(`<div class="artifact-grid"></div>`);
  QUEST_TRACKS.forEach(track=>{
    const exhausted = isTrackExhausted(track);
    const target = getTrackTarget(track);
    const value = track.getValue();
    const reward = getTrackReward(track);
    const tier = (state.questTiers[track.id]||0)+1;
    const completed = !exhausted && value>=target;
    const statusLabel = exhausted ? '✓ Completata al massimo' : completed ? 'Completata!' : `${Math.min(value,target)}/${target}`;
    const statusColor = exhausted ? 'var(--green)' : completed ? 'var(--amber)' : 'var(--text-dim)';
    const card = el(`<div class="hud-panel artifact-card" style="border-color:${exhausted?'var(--green)':completed?'var(--amber)':'var(--border)'}">
      <div class="ac-name">${track.label(target)} ${exhausted?'':`<span class="ac-level">Livello ${tier}</span>`}</div>
      <div class="ac-main">Ricompensa: <b>+${reward} 💠</b></div>
      <div class="ac-setname" style="color:${statusColor}">${statusLabel}</div>
    </div>`);
    if(completed){
      const btn = el(`<button class="small primary" style="margin-top:8px;width:100%;">Riscatta</button>`);
      btn.onclick=(ev)=>{ ev.stopPropagation(); claimTrack(track.id); };
      card.appendChild(btn);
    }
    trackGrid.appendChild(card);
  });
  wrap.appendChild(trackGrid);

  wrap.appendChild(el(`<div class="screen-title" style="margin-top:22px;"><span class="eyebrow">Una tantum</span><h2>Traguardi (${oneOffDone}/${ONE_OFF_QUESTS.length})</h2></div>`));
  const grid = el(`<div class="artifact-grid"></div>`);
  ONE_OFF_QUESTS.forEach(q=>{
    const claimed = !!state.claimedQuests[q.id];
    const completed = !claimed && q.check();
    const statusLabel = claimed ? '✓ Riscattata' : completed ? 'Completata!' : 'In corso';
    const statusColor = claimed ? 'var(--green)' : completed ? 'var(--amber)' : 'var(--text-dim)';
    const card = el(`<div class="hud-panel artifact-card" style="border-color:${claimed?'var(--green)':completed?'var(--amber)':'var(--border)'}">
      <div class="ac-name">${q.desc}</div>
      <div class="ac-main">Ricompensa: <b>+${q.reward} 💠</b></div>
      <div class="ac-setname" style="color:${statusColor}">${statusLabel}</div>
    </div>`);
    if(completed){
      const btn = el(`<button class="small primary" style="margin-top:8px;width:100%;">Riscatta</button>`);
      btn.onclick=(ev)=>{ ev.stopPropagation(); claimQuest(q.id); };
      card.appendChild(btn);
    }
    grid.appendChild(card);
  });
  wrap.appendChild(grid);
  return wrap;
}

function renderBannerTab(){
  const wrap = document.createElement('div');
  const weaponBanner=state.bannerType==='armi';
  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Evocazioni</span><h2>${weaponBanner?'Arsenale delle Stelle':'Richiamo degli Eroi'}</h2></div>`));
  const modeBar=el(`<div class="subtab-bar banner-mode"></div>`);
  [['personaggi','Banner personaggi'],['armi','Banner armi']].forEach(([type,label])=>{
    const button=el(`<button class="subtab-btn ${state.bannerType===type?'active':''}">${label}</button>`);
    button.onclick=()=>setBannerType(type);
    modeBar.appendChild(button);
  });
  wrap.appendChild(modeBar);
  const bannerDescription=weaponBanner
    ? `Ogni evocazione costa ${PULL_COST} Frammenti. Il pool include tutti i personaggi, le ${WEAPON_NAMES.length} armi standard e le ${SIGNATURE_WEAPONS.length} firme 5 stelle. Personaggi ★★★★★: 2%; ★★★★: 5%, senza garanzie. Un'arma 5 stelle è garantita ogni ${WEAPON_BANNER_PITY} evocazioni.`
    : `Ogni evocazione costa ${PULL_COST} Frammenti. Personaggi ★★★★★: 2% (garantito ogni ${PITY_LIMIT_5}); ★★★★: 5% (garantito ogni ${PITY_LIMIT_4} senza averne ottenuto uno). Il resto sono armi.`;
  wrap.appendChild(el(`<div class="hint" style="margin-bottom:14px;">${bannerDescription}</div>`));

  const info = el(`<div class="hud-panel section" style="padding:16px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:14px;align-items:center;">
    <div>
      <div class="hero-name" style="font-size:20px;">💠 ${state.gold} Frammenti</div>
      <div class="hint" style="margin:4px 0 0;text-align:left;">${weaponBanner?`Garanzia arma ★★★★★: ${state.weaponBannerPulls}/${WEAPON_BANNER_PITY}`:`Garanzia ★★★★: ${state.pityCounter}/${PITY_LIMIT_4} · Garanzia ★★★★★: ${state.pity5Counter}/${PITY_LIMIT_5}`}</div>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      <button class="primary" id="pull1" ${state.gold<PULL_COST?'disabled':''}>Evoca x1 (${PULL_COST})</button>
      <button class="primary" id="pull10" ${state.gold<PULL_COST*10?'disabled':''}>Evoca x10 (${PULL_COST*10})</button>
    </div>
  </div>`);
  info.querySelector('#pull1').onclick=()=>weaponBanner?doWeaponPulls(1):doPulls(1);
  info.querySelector('#pull10').onclick=()=>weaponBanner?doWeaponPulls(10):doPulls(10);
  wrap.appendChild(info);

  if(state.lastPullResults.length>0){
    const resultBanner=state.lastPullBanner==='armi'?'Banner armi':'Banner personaggi';
    wrap.appendChild(el(`<div class="screen-title" style="margin-top:22px;"><span class="eyebrow">${resultBanner}</span><h2>Ultime evocazioni</h2></div>`));
    const grid = el(`<div class="artifact-grid"></div>`);
    state.lastPullResults.forEach(r=>{
      if(r.type==='character') grid.appendChild(renderCharUnlockCard(r.charId));
      else if(r.type==='character_dupe') grid.appendChild(el(`<div class="hud-panel artifact-card" style="text-align:center;border-color:${r.rarity===5?'#ffd700':'#8791b3'}"><div class="ac-name">${'★'.repeat(r.rarity)} già tutti sbloccati</div><div class="ac-setname">+${r.bonus} Frammenti di compenso</div></div>`));
      else grid.appendChild(renderWeaponCard(r.weapon));
    });
    wrap.appendChild(grid);
  }
  return wrap;
}


function renderTorreTab(){
  const wrap = document.createElement('div');
  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Ascensione infinita</span><h2>Torre del Vuoto</h2></div>`));
  wrap.appendChild(el(`<div class="hint" style="margin-bottom:14px;">La torre non ha fine: ogni piano è più duro del precedente, ogni 5° piano c'è un boss. Scegli il piano da affrontare tra quelli già raggiunti.</div>`));

  const towerPanel = el(`<div class="hud-panel section" style="padding:16px;"></div>`);
  const scroller = el(`<div class="tower-scroller"></div>`);
  const windowStart = Math.max(1, state.maxStageReached-6);
  const windowEnd = state.maxStageReached;
  for(let n=windowStart;n<=windowEnd;n++){
    const boss = isBossStage(n);
    const cleared = n < state.maxStageReached;
    const isCurrent = n===state.stage;
    const card = el(`<div class="hud-panel stage-card ${boss?'boss':''} ${cleared?'cleared':''} ${isCurrent?'current':''}">
      <div class="num">${n}${cleared?' ✓':''}</div>
      <div class="lbl">${boss?'BOSS':'Piano'}</div>
    </div>`);
    card.style.cursor='pointer';
    card.onclick=()=>{ state.stage=n; render(); };
    scroller.appendChild(card);
  }
  towerPanel.appendChild(scroller);
  wrap.appendChild(towerPanel);

  const info = el(`<div class="hud-panel section" style="padding:16px;margin-top:14px;text-align:center;">
    <div class="hero-name" style="font-size:20px;">Piano selezionato: ${state.stage} ${isBossStage(state.stage)?'· BOSS':''}</div>
    <div class="hint">Massimo raggiunto: piano ${state.maxStageReached}</div>
    <button class="primary" id="deployBtn2" style="margin-top:12px;padding:12px 26px;font-size:15px;">Avvia Piano ${state.stage} ▶</button>
  </div>`);
  info.querySelector('#deployBtn2').onclick=()=>startBattle();
  wrap.appendChild(info);
  return wrap;
}

function renderTown(){
  const wrap = document.createElement('div');
  wrap.appendChild(renderTownTabs());
  if(state.townTab==='squadra') wrap.appendChild(renderSquadraTab());
  else if(state.townTab==='personaggi') wrap.appendChild(renderPersonaggiTab());
  else if(state.townTab==='abilita') wrap.appendChild(renderAbilitaTab());
  else if(state.townTab==='inventario') wrap.appendChild(renderInventarioTab());
  else if(state.townTab==='indice') wrap.appendChild(renderIndiceTab());
  else if(state.townTab==='tutorial') wrap.appendChild(renderTutorialTab());
  else if(state.townTab==='torre') wrap.appendChild(renderTorreTab());
  else if(state.townTab==='banner') wrap.appendChild(renderBannerTab());
  else if(state.townTab==='missioni') wrap.appendChild(renderMissioniTab());

  if(equipPickerFor) wrap.appendChild(renderEquipPickerModal());
  if(viewArtifactFor) wrap.appendChild(renderViewArtifactModal());
  if(weaponPickerFor) wrap.appendChild(renderWeaponPickerModal());
  if(viewWeaponFor) wrap.appendChild(renderViewWeaponModal());
  return wrap;
}

function createEquipmentPickerFilters(type,grid,noResults){
  const artifactPicker=type==='manufatto';
  const controls=el(`<div class="equipment-picker-filters">
    <input type="search" class="picker-search" placeholder="Cerca nome, effetto o statistica" aria-label="Cerca equipaggiamento">
    <select class="picker-rarity" aria-label="Filtra per rarità"></select>
    <select class="picker-stat" aria-label="Filtra per statistica"></select>
    ${artifactPicker?'<select class="picker-set" aria-label="Filtra per set"></select>':''}
    <span class="picker-count" aria-live="polite"></span>
  </div>`);
  const raritySelect=controls.querySelector('.picker-rarity');
  raritySelect.appendChild(el(`<option value="tutte">Tutte le rarità</option>`));
  [...RARITY_ORDER,'leggendaria'].forEach(rarity=>{
    const label=RARITY_LABEL[rarity];
    if(label) raritySelect.appendChild(el(`<option value="${rarity}">${label}</option>`));
  });
  const statSelect=controls.querySelector('.picker-stat');
  statSelect.appendChild(el(`<option value="tutte">Tutte le statistiche</option>`));
  Object.entries(STAT_KEYS).forEach(([key,meta])=>statSelect.appendChild(el(`<option value="${key}">${meta.label}</option>`)));
  const setSelect=controls.querySelector('.picker-set');
  if(setSelect){
    setSelect.appendChild(el(`<option value="tutti">Tutti i set</option>`));
    Object.entries(ARTIFACT_SETS).forEach(([key,set])=>setSelect.appendChild(el(`<option value="${key}">${set.name}</option>`)));
  }
  const search=controls.querySelector('.picker-search');
  const count=controls.querySelector('.picker-count');
  const applyFilters=()=>{
    const query=search.value.trim().toLocaleLowerCase();
    const rarity=raritySelect.value;
    const stat=statSelect.value;
    const set=setSelect?.value||'tutti';
    let visible=0;
    [...grid.children].forEach(card=>{
      const matches=(!query||card.dataset.pickerSearch.includes(query))
        && (rarity==='tutte'||card.dataset.pickerRarity===rarity)
        && (stat==='tutte'||card.dataset.pickerStats.split(',').includes(stat))
        && (set==='tutti'||card.dataset.pickerSet===set);
      card.hidden=!matches;
      if(matches) visible++;
    });
    noResults.hidden=visible>0;
    count.textContent=`${visible} / ${grid.children.length}`;
  };
  search.oninput=applyFilters;
  raritySelect.onchange=applyFilters;
  statSelect.onchange=applyFilters;
  if(setSelect) setSelect.onchange=applyFilters;
  applyFilters();
  return controls;
}

function renderWeaponPickerModal(){
  const charId = weaponPickerFor;
  const overlay = el(`<div class="modal-overlay"></div>`);
  const box = el(`<div class="hud-panel modal-box">
    <h3 style="margin-top:0;">Equipaggia arma — ${CHAR_DB[charId].name}</h3>
  </div>`);
  if(state.weaponInventory.length===0){
    box.appendChild(el(`<div class="hint">Nessuna arma in armeria.</div>`));
  } else {
    const list = el(`<div class="artifact-grid"></div>`);
    state.weaponInventory.forEach(w=>{
      const card=renderWeaponCard(w,{actionLabel:'Equipaggia',onAction:()=>equipWeapon(w.uid)});
      const effect=getWeaponEffectDescription(w,charId);
      card.dataset.pickerRarity=w.rarity;
      card.dataset.pickerStats=[w.mainStat.key,w.subStat.key].join(',');
      card.dataset.pickerSet='';
      card.dataset.pickerSearch=`${w.name} ${RARITY_LABEL[w.rarity]} ${statKeyLabel(w.mainStat.key)} ${statKeyLabel(w.subStat.key)} ${formatStatValue(w.mainStat)} ${formatStatValue(w.subStat)} ${effect}`.toLocaleLowerCase();
      list.appendChild(card);
    });
    const noResults=el(`<div class="hint picker-no-results" hidden>Nessuna arma corrisponde ai filtri.</div>`);
    box.appendChild(createEquipmentPickerFilters('arma',list,noResults));
    box.appendChild(list);
    box.appendChild(noResults);
  }
  const closeBtn = el(`<div style="text-align:right;margin-top:16px;"><button class="ghost small" id="closeWp">Chiudi</button></div>`);
  closeBtn.querySelector('#closeWp').onclick=closeWeaponPicker;
  box.appendChild(closeBtn);
  overlay.appendChild(box);
  overlay.onclick=(ev)=>{ if(ev.target===overlay) closeWeaponPicker(); };
  return overlay;
}

function renderViewWeaponModal(){
  const charId = viewWeaponFor;
  const weapon = state.roster[charId].weapon;
  const overlay = el(`<div class="modal-overlay"></div>`);
  const box = el(`<div class="hud-panel modal-box">
    <h3 style="margin-top:0;">${CHAR_DB[charId].name} — Arma</h3>
  </div>`);
  if(!weapon){
    box.appendChild(el(`<div class="hint">Nessuna arma equipaggiata.</div>`));
  } else {
    box.appendChild(renderWeaponCard(weapon, {
      charId,
      actions:getWeaponManagementActions(weapon,{onUnequip:()=>{ unequipWeapon(charId); closeViewWeapon(); }}),
    }));
  }
  const closeBtn = el(`<div style="text-align:right;margin-top:16px;"><button class="ghost small" id="closeWv">Chiudi</button></div>`);
  closeBtn.querySelector('#closeWv').onclick=closeViewWeapon;
  box.appendChild(closeBtn);
  overlay.appendChild(box);
  overlay.onclick=(ev)=>{ if(ev.target===overlay) closeViewWeapon(); };
  return overlay;
}

function renderViewArtifactModal(){
  const {charId, slotIdx} = viewArtifactFor;
  const it = state.roster[charId].equipment[slotIdx];
  const overlay = el(`<div class="modal-overlay"></div>`);
  const box = el(`<div class="hud-panel modal-box">
    <h3 style="margin-top:0;">${CHAR_DB[charId].name} — Slot ${slotIdx+1}</h3>
  </div>`);
  if(!it){
    box.appendChild(el(`<div class="hint">Slot vuoto.</div>`));
  } else {
    const cost = getArtifactLevelUpCost(it.level||0);
    const maxed = (it.level||0)>=ARTIFACT_MAX_LEVEL;
    box.appendChild(renderArtifactCard(it, {actions:[
      {label: maxed ? 'Livello massimo' : `⬆ Potenzia (${cost} 💠)`, onClick:()=>levelUpArtifact(it.uid), disabled: maxed || state.gold<cost},
      {label:'Rimuovi manufatto', onClick:()=>{ unequipItem(charId,slotIdx); closeViewArtifact(); }},
    ]}));
  }
  const closeBtn = el(`<div style="text-align:right;margin-top:16px;"><button class="ghost small" id="closeView">Chiudi</button></div>`);
  closeBtn.querySelector('#closeView').onclick=closeViewArtifact;
  box.appendChild(closeBtn);
  overlay.appendChild(box);
  overlay.onclick=(ev)=>{ if(ev.target===overlay) closeViewArtifact(); };
  return overlay;
}

function renderEquipPickerModal(){
  const {charId, slotIdx} = equipPickerFor;
  const overlay = el(`<div class="modal-overlay"></div>`);
  const box = el(`<div class="hud-panel modal-box">
    <h3 style="margin-top:0;">Equipaggia ${CHAR_DB[charId].name} — Slot ${slotIdx+1}</h3>
  </div>`);
  const eligible = state.inventory;
  if(eligible.length===0){
    box.appendChild(el(`<div class="hint">Inventario vuoto.</div>`));
  } else {
    const list = el(`<div class="artifact-grid"></div>`);
    eligible.forEach(it=>{
      const card=renderArtifactCard(it,{actionLabel:'Equipaggia',onAction:()=>equipItem(it.uid)});
      const set=ARTIFACT_SETS[it.setId];
      const stats=[it.mainStat,...it.subStats].map(stat=>stat.key);
      card.dataset.pickerRarity=it.rarity;
      card.dataset.pickerStats=stats.join(',');
      card.dataset.pickerSet=it.setId;
      card.dataset.pickerSearch=`${it.name} ${set.name} ${RARITY_LABEL[it.rarity]} ${stats.map(statKeyLabel).join(' ')} ${[it.mainStat,...it.subStats].map(formatStatValue).join(' ')}`.toLocaleLowerCase();
      list.appendChild(card);
    });
    const noResults=el(`<div class="hint picker-no-results" hidden>Nessun manufatto corrisponde ai filtri.</div>`);
    box.appendChild(createEquipmentPickerFilters('manufatto',list,noResults));
    box.appendChild(list);
    box.appendChild(noResults);
  }
  const closeBtn = el(`<div style="text-align:right;margin-top:16px;"><button class="ghost small" id="closeEq">Chiudi</button></div>`);
  closeBtn.querySelector('#closeEq').onclick=closeEquipPicker;
  box.appendChild(closeBtn);
  overlay.appendChild(box);
  overlay.onclick=(ev)=>{ if(ev.target===overlay) closeEquipPicker(); };
  return overlay;
}

const ANIM_STYLE_KEYFRAME = {
  heavy:'fx-heavy', arcane:'fx-arcane', swift:'fx-swift', bleed:'fx-bleed',
  'radiant-soft':'fx-radiant-soft', surge:'fx-surge', celestial:'fx-celestial', menace:'fx-menace',
};
const ANIM_TIER_TIMING = {
  basic:{dur:0.95, scale:1},
  skill:{dur:1.4,  scale:1.35},
  ult:  {dur:2.0,  scale:1.8},
};
const FX_LAYER_PARTS = {heavy:3, arcane:5, swift:3, bleed:5, 'radiant-soft':6, surge:3, celestial:6, menace:3};
const HIT_ANIM = {
  damage:  d=>`fx-shake ${d}s ease, fx-flash-damage ${d+0.15}s ease`,
  heal:    d=>`fx-flash-heal ${d+0.15}s ease`,
  shield:  d=>`fx-flash-shield ${d+0.15}s ease`,
  buff:    d=>`fx-flash-buff ${d+0.15}s ease`,
  spgrant: d=>`fx-flash-spgrant ${d+0.15}s ease`,
};

function consumeFx(entity, styleKey){
  const anims = [];
  let floatHtml = '';
  let scale = 1;
  if(entity._fxAttack){
    const timing = ANIM_TIER_TIMING[entity._fxAttack] || ANIM_TIER_TIMING.basic;
    const keyframeName = ANIM_STYLE_KEYFRAME[styleKey] || 'fx-lunge';
    anims.push(`${keyframeName} ${timing.dur}s cubic-bezier(.34,1.15,.64,1)`);
    scale = timing.scale;
    const parts = FX_LAYER_PARTS[styleKey] || 3;
    floatHtml += `<div class="fx-layer fx-layer-${styleKey} tier-${entity._fxAttack}">${'<i></i>'.repeat(parts)}</div>`;
    entity._fxAttack = null;
  }
  if(entity._fx){
    anims.push(HIT_ANIM[entity._fx.variant](1.0));
    floatHtml += `<div class="fx-impact ${entity._fx.variant}"><i></i><i></i><i></i></div><div class="fx-float ${entity._fx.variant}">${entity._fx.label}</div>`;
    entity._fx = null;
  }
  return {animation: anims.join(', '), scale, floatHtml};
}

function renderBattle(){
  const b = state.battle;
  const wrap = document.createElement('div');
  wrap.className='battle-wrap';
  const auto = state.autoBattle;
  const busy = !!b.busy;

  if(b.screenFx){
    const sf = b.screenFx;
    wrap.appendChild(el(`<div class="ult-flash-overlay" style="background:radial-gradient(circle, ${hexToRgba(sf.color,0.5)}, transparent 70%);"></div>`));
    wrap.appendChild(el(`<div class="ult-cutin style-${sf.style}" style="--cut-color:${sf.color};--cut-glow:${hexToRgba(sf.color,0.6)};"><div class="ult-cutin-band"><span class="ult-cutin-name">${sf.name}</span><span class="ult-cutin-ability">${sf.ability}</span></div></div>`));
    b.screenFx = null;
  }
  if(b.skillCall){
    const sc = b.skillCall;
    wrap.appendChild(el(`<div class="skill-callout" style="--cut-color:${sc.color};">${sc.ability}</div>`));
    b.skillCall = null;
  }

  const pendingAbility=b.pendingAbility && currentAlly()?getAbilityForActor(currentAlly(),b.pendingAbility.key):null;
  const targetingEnemy = !auto && !busy && pendingAbility && (pendingAbility.target==='enemy' || pendingAbility.target==='enemy_adjacent');
  const targetingAlly = !auto && !busy && pendingAbility && pendingAbility.target==='ally';
  const activeEntry = b.turnOrder[b.turnIndex]||null;
  const activeAlly=b.phase==='ally_turn'?currentAlly():null;
  const activeAllyElement=activeAlly?.element||null;

  const enemyRow = el(`<div class="hud-panel enemy-row"></div>`);
  b.enemies.filter(enemy=>enemy.hp>0).forEach(e=>{
    const isActive = activeEntry?.side==='enemy' && activeEntry.id===e.id;
    const fx = consumeFx(e, 'menace');
    const card = el(`<div class="hud-panel enemy-card ${isActive?'active-turn':''} ${targetingEnemy?'targetable':''}" style="--char-glow:${hexToRgba('#ef5a7d',0.85)};--fx-scale:${fx.scale};position:relative;${fx.animation?'animation:'+fx.animation+';':''}">
      <div class="portrait">${e.isBoss?'☠':'◆'}</div>
      <div class="name">${e.name}</div>
      ${e.inaMarked?'<div class="ina-mark-tag">✦ MARCHIATO · INA</div>':''}
      ${e.isBoss?`<div class="boss-tag">FASE ${e.phase||1}/2 · 2 ATTACCHI</div>`:''}
      ${e.bossAddOwnerId&&!e.bossAddResolved?'<div class="boss-add-tag">RINFORZO · SCONFIGGI PER FERMARE L’ESPLOSIONE</div>':''}
      <div class="element-tags">${(e.elements||[e.element]).map(element=>{
        const affinity=getEnemyElementAffinity(e,element,activeAllyElement);
        const affinityLabel=affinity==='element-strong'?'Forte contro questo nemico':'Non forte contro questo nemico';
        return `<span class="element-tag ${affinity}" title="${activeAllyElement?`${affinityLabel} · ${ELEMENT_DATA[activeAllyElement].label}`:`Elemento ${ELEMENT_DATA[element]?.label||element}`} ">${ELEMENT_DATA[element]?.label||element}</span>`;
      }).join('')}</div>
      ${(e.defDownRounds>0||e.vulnerableRounds>0)?`<div class="enemy-status-tags">${e.defDownRounds>0?`<span class="enemy-defdown">DIF -${Math.round(e.defDownPct*100)}%</span>`:''}${e.vulnerableRounds>0&&e.vulnerableToElement?`<span class="enemy-vulnerability">Vulnerabile a ${ELEMENT_DATA[e.vulnerableToElement].label}</span>`:''}</div>`:''}
      <div class="bar-track"><div class="bar-fill hp-fill" style="width:${(e.hp/e.maxHp*100)}%"></div></div>
      <div class="mini-lbl"><span>${e.hp}/${e.maxHp}</span></div>
      ${e.burnStacks>0?`<div class="burn-tag">${e.dotName==='Sanguinamento'?'🩸':'🔥'} x${e.burnStacks}</div>`:''}
      ${e.shield>0?`<div class="shield-tag">🛡 ${e.shield}</div>`:''}
      ${fx.floatHtml}
    </div>`);
    if(targetingEnemy) card.onclick=()=>playerChooseTarget(e.id);
    enemyRow.appendChild(card);
  });
  wrap.appendChild(enemyRow);

  const midRow = el(`<div class="battle-mid-row"></div>`);
  const logPanel = el(`<div class="hud-panel log-panel"></div>`);
  b.log.forEach(l=>logPanel.appendChild(el(`<div class="entry">${l}</div>`)));
  midRow.appendChild(logPanel);
  const spPanel = el(`<div class="hud-panel" style="padding:12px;display:flex;flex-direction:column;justify-content:center;gap:8px;">
    <div class="mini-lbl" style="font-size:10px;">PUNTI ABILITÀ</div>
    <div style="display:flex;gap:6px;" id="spPips"></div>
    <div class="mini-lbl" style="font-size:10px;margin-top:8px;">ROUND ${b.round}</div>
  </div>`);
  const pipsWrap = spPanel.querySelector('#spPips');
  for(let i=0;i<b.spMax;i++){
    pipsWrap.appendChild(el(`<div class="sp-pip ${i<b.sp?'filled':''}"></div>`));
  }
  midRow.appendChild(spPanel);
  const turnOrderPanel = el(`<div class="hud-panel turn-order-panel"><div class="mini-lbl turn-order-heading">ORDINE DEL ROUND</div><div class="turn-order-list"></div></div>`);
  const turnOrderList = turnOrderPanel.querySelector('.turn-order-list');
  b.turnOrder.forEach((entry,index)=>{
    const actor = getTurnActor(b,entry);
    const dead = !actor || actor.hp<=0;
    const item = el(`<div class="turn-order-item ${index===b.turnIndex?'current':''} ${index<b.turnIndex?'passed':''} ${dead?'dead':''} ${entry.side}">
      <span class="turn-order-index">${index+1}</span><span class="turn-order-name">${actor?actor.name:'?'}</span><span class="turn-order-speed">${entry.speed}</span>
    </div>`);
    turnOrderList.appendChild(item);
  });
  midRow.appendChild(turnOrderPanel);
  wrap.appendChild(midRow);

  const allyRow = el(`<div class="ally-row"></div>`);
  b.allies.forEach((a,i)=>{
    const dead = a.hp<=0;
    const isActive = activeEntry?.side==='ally' && activeEntry.id===a.charId && b.phase==='ally_turn' && !b.pendingAbility && !auto;
    const isTargetable = targetingAlly && !dead;
    const fx = consumeFx(a, CHAR_DB[a.charId].animStyle);
    const card = el(`<div class="hud-panel ally-card ${isActive?'active-turn':''} ${dead?'dead':''} ${isTargetable?'selectable-target':''}" style="--char-glow:${hexToRgba(a.color,0.85)};--fx-scale:${fx.scale};${isActive?'border-color:'+a.color+';box-shadow:0 0 0 1px '+a.color+' inset;':''}position:relative;${fx.animation?'animation:'+fx.animation+';':''}">
      <div class="ally-top">
        <div class="ally-portrait" style="background:${a.color}">${a.glyph}</div>
        <div><div class="ally-name">${a.name}</div><div class="element-tag">${ELEMENT_DATA[a.element]?.label||a.element}</div>${a.hakosForm?`<div class="hakos-form-tag">FORMA CAOTICA · ${a.hakosFormTurns}/5</div>`:''}${a.charId==='suiseiHoshimachi'&&a.suiseiGuardRounds>0?`<div class="suisei-posture-tag">POSTURA STELLARE · ${a.suiseiGuardRounds}/3</div>`:''}${a.charId==='suiseiHoshimachi'&&a.suiseiFollowUpReady?'<div class="suisei-posture-tag">FOLLOW-UP PRONTO</div>':''}</div>
      </div>
      <div class="mini-lbl"><span>PV</span><span>${a.hp}/${a.maxHp}</span></div>
      <div class="bar-track"><div class="bar-fill hp-fill" style="width:${(a.hp/a.maxHp*100)}%"></div></div>
      <div class="mini-lbl" style="margin-top:5px;"><span>Energia</span><span>${a.energy}/${a.energyMax}</span></div>
      <div class="bar-track"><div class="bar-fill energy-fill" style="width:${(a.energy/a.energyMax*100)}%"></div></div>
      ${a.shield>0?`<div class="shield-tag">🛡 Scudo ${a.shield}</div>`:''}
      ${a.buffRounds>0?`<div class="buff-tag">▲ ATK +${Math.round((a.atkBuffMult-1)*100)}%</div>`:''}
      ${a.charId==='ninomaeInaNis'?`<div class="ina-charge-tag">FOLLOW-UP ${a.inaFollowUpsRemaining}/3</div>`:''}
      ${a.charId==='suiseiHoshimachi'?`<div class="suisei-revive-tag">RINASCITE ${a.suiseiRevivesRemaining}/2</div>`:''}
      ${fx.floatHtml}
    </div>`);
    if(isTargetable) card.onclick=()=>playerChooseTarget(a.charId);
    allyRow.appendChild(card);
  });
  wrap.appendChild(allyRow);

  const actionBar = el(`<div class="hud-panel action-bar"></div>`);
  if(b.log.length>0) actionBar.appendChild(el(`<div class="battle-feedback" aria-live="polite">${b.log[0]}</div>`));
  if(auto){
    actionBar.appendChild(el(`<div class="hint" style="margin:0;">🤖 Modalità automatica in corso…</div>`));
  } else if(busy){
    actionBar.appendChild(el(`<div class="hint" style="margin:0;">${b.phase==='enemy_turn'?'⏳ Turno dei nemici…':'⏳ Azione in corso…'}</div>`));
  } else if(b.phase==='ally_turn'){
    const actor = currentAlly();
    const cdb={basic:getAbilityForActor(actor,'basic'),skill:getAbilityForActor(actor,'skill'),ult:getAbilityForActor(actor,'ult')};
    actionBar.appendChild(el(`<div class="who">${actor.name} ▸</div>`));

    if(b.pendingAbility){
      const abName = cdb[b.pendingAbility.key].name;
      actionBar.appendChild(el(`<div class="hint" style="margin:0;">Seleziona un bersaglio per <b style="color:var(--text)">${abName}</b>…</div>`));
      if(targetingEnemy){
        const targets=el(`<div class="mobile-target-list" aria-label="Seleziona un nemico"></div>`);
        b.enemies.filter(enemy=>enemy.hp>0).forEach(enemy=>{
          const affinityTags=(enemy.elements||[enemy.element]).map(element=>`<i class="element-tag ${getEnemyElementAffinity(enemy,element,activeAllyElement)}">${ELEMENT_DATA[element]?.label||element}</i>`).join('');
          const targetButton=el(`<button class="mobile-target-btn" type="button"><span>${enemy.name}</span><small>${enemy.hp}/${enemy.maxHp} PV</small><span class="mobile-target-elements">${affinityTags}</span></button>`);
          targetButton.onclick=()=>playerChooseTarget(enemy.id);
          targets.appendChild(targetButton);
        });
        actionBar.appendChild(targets);
      }
      const cancelBtn = el(`<button class="ghost small">Annulla</button>`);
      cancelBtn.onclick=()=>{ b.pendingAbility=null; render(); };
      actionBar.appendChild(cancelBtn);
    } else {
      const basicBtn = el(`<button class="ability-btn"><span class="aname">⚔ ${cdb.basic.name}</span></button>`);
      basicBtn.onclick=()=>playerChooseAbility('basic');

      const maxedHits = cdb.skill.effect==='boost_basic_hits' && actor.basicHits>=10;
      const suiseiHpGate=actor.charId==='suiseiHoshimachi'&&actor.hp<=1;
      const skillDisabled = (b.sp<1 && actor.skillFreeUses<=0) || maxedHits || cdb.skill.effect==='disabled' || suiseiHpGate;
      const skillCostLabel = cdb.skill.effect==='disabled'?'Postura attiva':suiseiHpGate?'PV insufficienti':maxedHits ? 'Al massimo' : (actor.skillFreeUses>0 ? `Gratis · ${actor.skillFreeUses} rimasti` : '1 PA');
      const skillBtn = el(`<button class="ability-btn" ${skillDisabled?'disabled':''}><span class="aname">✦ ${cdb.skill.name} (${skillCostLabel})</span></button>`);
      skillBtn.onclick=()=>playerChooseAbility('skill');

      const ultReady = actor.energy>=actor.energyMax;
      const ultBtn = el(`<button class="ability-btn" ${!ultReady?'disabled':''}><span class="aname">★ ${cdb.ult.name}</span></button>`);
      ultBtn.onclick=()=>playerChooseAbility('ult');

      actionBar.appendChild(basicBtn);
      actionBar.appendChild(skillBtn);
      actionBar.appendChild(ultBtn);
    }
  } else {
    actionBar.appendChild(el(`<div class="hint" style="margin:0;">Turno dei nemici…</div>`));
  }
  const autoBtn = el(`<button class="small auto-toggle ${auto?'active':''}">${auto?'⏸ Ferma Auto':'▶ Auto'}</button>`);
  autoBtn.onclick=toggleAutoBattle;
  actionBar.appendChild(autoBtn);
  wrap.appendChild(actionBar);

  return wrap;
}

function renderVictory(){
  const b = state.battle;
  const wrap = el(`<div class="hud-panel center-msg win">
    <h2>Piano Superato</h2>
    <div class="hint">Hai sconfitto tutti i nemici del Piano ${state.stage}. +${b.goldReward||0} 💠 Frammenti</div>
  </div>`);
  const loot = el(`<div class="artifact-grid"></div>`);
  b.loot.forEach(it=>{
    loot.appendChild(renderArtifactCard(it));
  });
  wrap.appendChild(loot);
  const btnRow = el(`<div style="text-align:center;"><button class="primary" id="continueBtn">Torna alla base ▶</button></div>`);
  btnRow.querySelector('#continueBtn').onclick=()=>goToTown(true);
  wrap.appendChild(btnRow);
  return wrap;
}

function renderDefeat(){
  const wrap = el(`<div class="hud-panel center-msg lose">
    <h2>Squadra Sconfitta</h2>
    <div class="hint">Il Piano ${state.stage} ti ha respinto. Migliora l'equipaggiamento e riprova.</div>
  </div>`);
  const btnRow = el(`<div style="text-align:center;"><button class="primary" id="retryBtn">Torna alla base ▶</button></div>`);
  btnRow.querySelector('#retryBtn').onclick=()=>retryStage();
  wrap.appendChild(btnRow);
  return wrap;
}

/* ============ INIT ============ */
render();
