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
const ELEMENT_VISUALS = {
  physical:{icon:'⚔',color:'#d4b27a'},hydro:{icon:'💧',color:'#55bdf4'},
  ether:{icon:'✦',color:'#bd8cf2'},imaginary:{icon:'☼',color:'#f0c35c'},
  quantum:{icon:'◈',color:'#bd7aff'},electro:{icon:'⚡',color:'#f5df4d'},
  dendro:{icon:'❋',color:'#65d58a'},
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
    basic:{name:'Colpo di Scudo', desc:'Danno fisico a un bersaglio, basato sulla DIF.', mult:1.0, target:'enemy', effect:null, defBased:true, energyGain:20},
    skill:{name:'Presa Ferrea', desc:'Danno basato sulla DIF; si scherma per 2 turni e scherma anche l\'alleato con meno PV.', mult:1.2, target:'enemy', effect:'shield_self', shieldDefMult:1.8, defBased:true, energyGain:30},
    ult:{name:'Muro Indistruttibile', desc:'Scherma tutta la squadra per 2 turni in base alla DIF.', mult:0, target:'allies_all', effect:'shield_all', shieldDefMult:2.1} },
  ceciliaImmergreen: { name:'Cecilia Immergreen', title:"Luce dell'Aurora", role:'Supporto Curativo', color:'#6ee7a0', glyph:'C', rarity:4, element:'dendro', animStyle:'radiant-soft',
    base:{hp:980, atk:76, def:75, speed:100, energyMax:110},
    basic:{name:'Raggio Guida', desc:'Danno leggero a un nemico, basato sui PV massimi.', mult:0.1, target:'enemy', effect:null, hpBased:true, energyGain:20},
    skill:{name:'Benedizione', desc:'Cura un alleato, in base ai PV massimi.', mult:0.22, target:'ally', effect:'heal', hpBased:true, energyGain:30},
    ult:{name:"Grazia dell'Alba", desc:'Cura tutta la squadra, in base ai PV massimi.', mult:0.3, target:'allies_all', effect:'heal_all', hpBased:true} },
  hakuiKoyori: {name:'Hakui Koyori',title:'Investigatrice Elettro',role:'Debuffer Electro',color:'#f47cac',glyph:'K',rarity:4,element:'electro',animStyle:'arcane',dotName:'Shock',passiveEnemySpeedDown:0.10,faction:'HoloX',
    base:{hp:1040,atk:126,def:72,speed:103,energyMax:125},
    basic:{name:'Colpo Sperimentale',desc:'Attacco Electro normale contro un nemico.',mult:0.85,target:'enemy',effect:null,energyGain:20},
    skill:{name:'Reazione a Catena',desc:'Colpisce il bersaglio e fino a 2 nemici adiacenti, riduce la DIF del 10% e applica Shock x1.',mult:0.8,target:'enemy_adjacent',effect:'koyori_shock',defDownPct:0.10,burnStacks:1,energyGain:30},
    ult:{name:'Protocollo Elettroshock',desc:'Colpisce il bersaglio e fino a 2 nemici adiacenti, riduce la DIF di un ulteriore 10% e applica Shock x2.',mult:1.35,target:'enemy_adjacent',effect:'koyori_shock',defDownPct:0.10,burnStacks:2} },
  takaneLui: {name:'Takane Lui',title:'Aquila del Comando',role:'DPS Physical',color:'#bd303f',glyph:'L',rarity:5,element:'physical',animStyle:'heavy',faction:'HoloX',ultChargeMode:'debuffs',ultChargeMax:10,holoXAttackPerMember:0.60,
    base:{hp:1120,atk:148,def:74,speed:103,energyMax:100},
    basic:{name:'Artiglio dell’Aquila',desc:'Infligge danno Physical a un nemico.',mult:1.0,target:'enemy',effect:null,energyGain:0},
    skill:{name:'Assalto del Comandante',desc:'Infligge danno Physical a un singolo nemico.',mult:1.35,target:'enemy',effect:null,energyGain:0},
    ult:{name:'Ordine: Schianto Cremisi',desc:'Infligge danno Physical ad area a tutti i nemici. Si attiva dopo aver accumulato 10 cariche, ottenute ogni volta che un alleato infligge un debuff a un nemico (le DoT contano).',mult:2.0,target:'enemies_all',effect:null} },
  gawrGura: {name:'Gura',title:'Squalo degli Abissi',role:'Supporto Curativo',color:'#38bdf8',glyph:'G',rarity:5,element:'hydro',animStyle:'radiant-soft',
    base:{hp:1150,atk:86,def:82,speed:100,energyMax:135},
    basic:{name:'Morso dello Squalo',desc:'Infligge danno Hydro a un nemico.',mult:0.75,target:'enemy',effect:null,energyGain:20},
    skill:{name:'Marea Rigenerante',desc:'Cura tutta la squadra per il 17% dei PV massimi di Gura. Aumenta i PV massimi degli alleati del 20% per 2 round; poi tutti perdono l’1% dei propri PV massimi.',mult:0.17,target:'allies_all',effect:'heal_all',hpBased:true,maxHpBuffPct:0.2,maxHpBuffRounds:2,hpLossPct:0.01,energyGain:30},
    ult:{name:'Onda del Grande Blu',desc:'Cura tutta la squadra per il 25% dei PV massimi di Gura.',mult:0.25,target:'allies_all',effect:'heal_all',hpBased:true} },
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
  vestiaZeta: { name:'Vestia Zeta', title:'Lama Spezzata', role:'DPS Fisico DoT', color:'#c23b52', glyph:'V', rarity:4, element:'physical', animStyle:'bleed', dotName:'Sanguinamento',passiveZetaFollowUps:3,
    base:{hp:1080, atk:116, def:70, speed:100, energyMax:120},
    basic:{name:'Sparo', desc:'Danno e applica Sanguinamento.', mult:0.85, target:'enemy', effect:'burn', burnStacks:1, energyGain:20},
    skill:{name:'Fendente', desc:'Danno maggiore, Sanguinamento x2.', mult:1.35, target:'enemy', effect:'burn', burnStacks:2, energyGain:30},
    ult:{name:'Attacco Aereo', desc:'Danno ad area, Sanguinamento su tutti.', mult:1.6, target:'enemies_all', effect:'burn_all', burnStacks:2} },
  koboKanaeru: {name:'Kobo Kanaeru',title:'La Pioggia Scatenata',role:'DPS DoT',color:'#48a9d6',glyph:'K',rarity:5,element:'hydro',animStyle:'surge',dotName:'Mal di mare',passiveDotEnergy:true,
    base:{hp:1120,atk:142,def:76,speed:100,energyMax:140},
    basic:{name:'Spruzzo Salmastro',desc:'Infligge danno a un nemico e applica 1 stack di Mal di mare: ATK -5% per stack, fino a 10 stack.',mult:0.95,target:'enemy',effect:'kobo_seasick',energyGain:20},
    skill:{name:'Marea Turbolenta',desc:'Infligge danno a tutti i nemici, detona le DoT dannose e applica 1 stack di Mal di mare a ciascuno.',mult:1.05,target:'enemies_all',effect:'kobo_seasick_all',energyGain:30},
    ult:{name:'Tifone di Kobo',desc:'Infligge danno a tutti i nemici, detona le DoT dannose e attiva per il resto della battaglia un’aura che applica Corrosione a chi ne è privo, anche ai nuovi nemici.',mult:1.6,target:'enemies_all',effect:'kobo_detonate_dots'} },
  pavoliaReine: {name:'Pavolia Reine',title:'Regina delle Mille Voci',role:'Supporto DoT AoE',color:'#d4a64a',glyph:'R',rarity:4,element:'ether',animStyle:'celestial',dotName:'Incanto',
    base:{hp:1080,atk:104,def:78,speed:102,energyMax:125},
    basic:{name:'Piume Iridescenti',desc:'Danneggia tutti i nemici e applica 1 stack di Incanto.',mult:0.45,target:'enemies_all',effect:'reine_dot',burnStacks:1,energyGain:20},
    skill:{name:'Danza della Ruota',desc:'Danneggia tutti i nemici, applica 2 stack di Incanto e aumenta del 25% i danni da DoT degli alleati per 2 turni.',mult:0.65,target:'enemies_all',effect:'reine_skill',burnStacks:2,dotDamageBuff:0.25,energyGain:30},
    ult:{name:'Trono del Pavone',desc:'Danneggia tutti i nemici, applica 2 stack di Incanto e fa detonare tutte le DoT dannose sui bersagli.',mult:0.9,target:'enemies_all',effect:'reine_ultimate',burnStacks:2} },
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
  hakosBaels: { name:'Hakos Baelz', title:'Arbitra del Caos', role:'DPS Trasformazione', color:'#ef5a7d', glyph:'H', rarity:5, element:'ether', animStyle:'swift', passiveSelfHeal:0.03,
    base:{hp:1220, atk:142, def:86, speed:100, energyMax:150},
    basic:{name:'Dado Impazzito', desc:'Infligge danno normale al bersaglio e ai nemici adiacenti, fino a 3 nemici.', mult:1.0, target:'enemy_adjacent', effect:null, energyGain:20},
    skill:{name:'Caos Concentrato', desc:'Infligge danno maggiore a un nemico.', mult:1.35, target:'enemy', effect:null, energyGain:30},
    ult:{name:'Rovina del Caos', desc:'Assorbe i parametri degli alleati, agisce due volte per turno e li richiama dopo 10 azioni.', mult:0, target:'self', effect:'hakos_ultimate'} },
  laplusDarkness: { name:'Laplus Darkness', title:'Signora della Disordine', role:'Debuffer Quantum', color:'#b69cff', glyph:'L', rarity:5, element:'quantum', animStyle:'arcane',faction:'HoloX',
    base:{hp:1080, atk:136, def:78, speed:100, energyMax:140},
    basic:{name:'Raggio Disordinato', desc:'Infligge danno a un nemico e ne riduce la DIF del 15% per 2 round.', mult:1.0, target:'enemy', effect:'laplus_def_down', energyGain:20},
    skill:{name:'Marchio del Caos', desc:'Infligge danno, riduce la DIF del 15% e per 2 round rimuove dalla lista delle debolezze del bersaglio l’elemento del primo eroe in squadra, se presente, aggiungendo quello contrapposto.', mult:1.35, target:'enemy', effect:'laplus_remove_element', energyGain:30},
    ult:{name:'Dominio della Disordine', desc:'Danneggia tutti i nemici, riduce la DIF del 30% per 2 round e rinnova il debuff.', mult:1.6, target:'enemies_all', effect:'laplus_ultimate'} },
  ninomaeInaNis: {name:"Ninomae Ina'Nis",title:'Sacerdotessa del Vuoto',role:'DPS Follow-up',color:'#42c9b8',glyph:'I',rarity:4,element:'hydro',animStyle:'radiant-soft',passiveInaFollowUps:3,
    base:{hp:1120,atk:128,def:82,speed:100,energyMax:135},
    basic:{name:'Inchiostro Abissale',desc:'Infligge danno a un singolo nemico, basato sui PV massimi.',mult:0.1,target:'enemy',effect:null,hpBased:true,energyGain:20},
    skill:{name:'Marchio Tentacolare',desc:'Infligge danno e marca un nemico. Gli attacchi successivi contro il bersaglio marcato attivano un follow-up di Ina, fino a 3 volte.',mult:0.15,target:'enemy',effect:'ina_mark',hpBased:true,energyGain:30},
    ult:{name:'Oltre il Mare',desc:'Infligge danno a tutti i nemici, esegue un follow-up casuale e recupera le 3 cariche di follow-up.',mult:0.18,target:'enemies_all',effect:'ina_ultimate',hpBased:true} },
  suiseiHoshimachi: {name:'Susei Hoshimachi',title:'Cometa Cremisi',role:'DPS PV Massimi',color:'#4c91ff',glyph:'S',rarity:5,element:'imaginary',animStyle:'surge',passiveHpLossFollowUps:4,revivesPerBattle:2,
    base:{hp:1420,atk:88,def:84,speed:100,energyMax:145},
    basic:{name:'Luce della Cometa',desc:'Attacco singolo basato sui PV massimi.',mult:0.14,target:'enemy',effect:null,hpBased:true,energyGain:20},
    skill:{name:'Stella Cadente',desc:'Sacrifica metà dei PV correnti, riduce del 40% i danni subiti per 3 round, provoca i nemici per 2 round e potenzia il Basic.',mult:0,target:'self',effect:'suisei_guard',energyGain:0},
    ult:{name:'Finale Stellare',desc:'Colpo singolo basato sui PV massimi. Porta i PV di Susei esattamente al 50% dopo il colpo.',mult:0.48,target:'enemy',effect:'suisei_set_half_hp',hpBased:true,energyGain:0} },
  selenTatsuki: {name:'DokiBird',title:'Fulmine Sovrano',role:'DPS Electro',color:'#f5d90a',glyph:'D',rarity:4,element:'electro',animStyle:'swift',
    base:{hp:1030,atk:130,def:66,speed:100,energyMax:125},
    basic:{name:'Scarica Rapida',desc:'Infligge danno elettrico a un bersaglio.',mult:0.95,target:'enemy',effect:null,energyGain:20},
    skill:{name:'Arco Voltaico',desc:'Danno elevato; molto più forte se il nemico è debole all\'Electro.',mult:1.9,weakMult:2.8,target:'enemy',effect:'selen_skill',energyGain:30},
    ult:{name:'Giudizio del Tuono',desc:'Colpo singolo devastante. Se il nemico è debole all\'Electro lo Stordisce per 2 turni.',mult:3.0,target:'enemy',effect:'selen_ult'} },
  finanaRyugu: {name:'Finana Ryugu',title:'Marea Gentile',role:'DPS Area',color:'#38bdf8',glyph:'F',rarity:4,element:'hydro',animStyle:'radiant-soft',passiveFinanaFollowUp:true,
    base:{hp:1010,atk:118,def:70,speed:100,energyMax:120},
    basic:{name:'Onda Spumeggiante',desc:'Danno leggero a tutti i nemici, basato sui PV massimi.',mult:0.06,target:'enemies_all',effect:null,hpBased:true,energyGain:20},
    skill:{name:'Marea Montante',desc:'Danno ad area superiore al Basic.',mult:0.11,target:'enemies_all',effect:null,hpBased:true,energyGain:30},
    ult:{name:'Tsunami Cristallino',desc:'Danno a tutti i nemici.',mult:0.18,target:'enemies_all',effect:null,hpBased:true} },
  takanashiKiara: {name:'Kiara Takanashi',title:'Guardiana del Sole',role:'DPS DEF Follow-up',color:'#f97316',glyph:'K',rarity:4,element:'imaginary',animStyle:'heavy',passiveKiaraCounter:true,
    base:{hp:1220,atk:82,def:160,speed:98,energyMax:120},
    basic:{name:'Fendente Solare',desc:'Attacco singolo basato sulla DIF.',mult:0.8,target:'enemy',effect:null,defBased:true,energyGain:20},
    skill:{name:'Giudizio Cremisi',desc:'Colpisce un singolo nemico in base alla DIF e cura Kiara del 35% della sua DIF.',mult:1.35,target:'enemy',effect:'kiara_skill_heal',healPct:0.35,defBased:true,energyGain:30},
    ult:{name:'Alba Inestinguibile',desc:'Aumenta la DIF di Kiara del 40% per 2 turni.',mult:0,target:'self',effect:'kiara_def_buff',defBuffPct:0.4} },
  elizabethRoseBloodflame: {name:'Elizabeth Rose Bloodflame',title:'Fiamma del Patto Cremisi',role:'Shielder · Buffer',color:'#e85b70',glyph:'E',rarity:5,element:'physical',animStyle:'heavy',
    base:{hp:1320,atk:104,def:118,speed:100,energyMax:135},
    basic:{name:'Colpo Cremisi',desc:'Infligge danno fisico a un bersaglio in base alla DIF.',mult:1.0,target:'enemy',effect:null,defBased:true,energyGain:20},
    skill:{name:'Patto di Sangue',desc:'Fornisce a un alleato uno scudo pari al 300% della DIF di Elizabeth e lo rende il bersaglio dei nemici per 3 turni.',mult:0,target:'ally',effect:'elizabeth_shield_taunt',shieldDefMult:3,tauntTurns:3,energyGain:30},
    ult:{name:'Regno della Fiamma Rossa',desc:'Aumenta ATK e DIF di tutta la squadra del 30% per 3 turni.',mult:0,target:'allies_all',effect:'buff_atk_def',buffPct:0.30,defBuffPct:0.30} },
};

const ENEMY_NAMES = ['Larva del Vuoto','Sentinella Corrotta','Sciame Spinato','Costrutto Infranto','Ombra Vagante'];
const BOSS_NAMES = ['Custode di Cristallo','Araldo del Vuoto','Colosso Corroso','Regina Ombra','Abisso Primordiale','Custode della Civiltà','Titano dell’Eclissi','Suisei Pshyco','Costrutto Immergreen'];
const MAX_ENEMIES_IN_BATTLE = 5;
const BOSS_HP_FACTOR = 1.5, BOSS_ATK_FACTOR = 0.75;
const TOWER_MAX_FLOOR = 150;
const TOWER_MAX_COMBAT_RANK = 50;
const TOWER_MAX_HP_RANK = 160;
const FINAL_GRADE_BOSS_HP = 100000;
const BOSS_MECHANICS = {
  'Custode di Cristallo':{phase1:'shield',phase2:'area'},
  'Araldo del Vuoto':{phase1:'summon',phase2:'summon'},
  'Colosso Corroso':{phase1:'heal',phase2:'area'},
  'Regina Ombra':{phase1:'shield',phase2:'heal'},
  'Abisso Primordiale':{phase1:'shield_heal',phase2:'summon_burst'},
  'Custode della Civiltà':{phase1:'normal',phase2:'mumei_guard'},
  'Titano dell’Eclissi':{phase1:'normal',phase2:'basic_ult_resistance'},
  'Suisei Pshyco':{phase1:'psycho',phase2:'psycho'},
  'Costrutto Immergreen':{phase1:'construct',phase2:'construct'},
};
const BOSS_MECHANIC_LABELS = {normal:'Attacchi normali',shield:'Scudo',summon:'Evoca rinforzi',heal:'Cura',area:'Attacco ad area',shield_heal:'Scudo e cura',summon_burst:'Evoca due sentinelle; AoE massiva se sopravvivono 2 turni',mumei_guard:'Danni subiti -40% per 5 round o finché non vengono spesi 5 PA in un round',basic_ult_resistance:'Resistenza 80% agli Attacchi Base e alle Ultimate',psycho:'Dopo 4 colpi ricevuti (non DoT) esegue un follow-up AoE, recupera il 2% dei PV massimi e aumenta permanentemente i danni del 30% (cumulabile e applicato a tutti gli attacchi); se non lo attiva in un round perde il 10% dei PV massimi. In Fase 2 attacca una volta e poi si cura.',construct:'Tre parti condividono i PV (doppio rispetto a un boss normale). In Fase 2 il centro attacca due volte, il secondo colpo è AoE; il danno assorbito dagli scudi alleati gli viene riflesso al 150%.'};
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
    'Custode della Civiltà':['electro','ether','physical'],
    'Titano dell’Eclissi':['physical','ether','imaginary'],
    'Suisei Pshyco':['imaginary','hydro','dendro'],
    'Costrutto Immergreen':['imaginary','dendro','electro'],
  'Sacerdote Spezzato':['dendro','ether','hydro'],
  'Custode Scudato':['physical','quantum','imaginary'],
  'Araldo Infiammato':['electro','imaginary','ether'],
  'Bombardiere Instabile':['quantum','electro','physical'],
  'Ladro di Energia':['ether','dendro','hydro'],
  'Lama Gemella':['physical','dendro','electro'],
};

// Special normal enemies, appearing from stage 3. `hpMult` trades durability for utility.
const SPECIAL_ENEMIES = {
  'Sacerdote Spezzato':{role:'healer', hpMult:0.85, label:'Supporto: cura gli alleati'},
  'Custode Scudato':{role:'shielder', hpMult:0.85, label:'Supporto: scherma gli alleati'},
  'Araldo Infiammato':{role:'buffer', hpMult:0.9, label:'Supporto: potenzia l\'ATK dei nemici'},
  'Bombardiere Instabile':{role:'bomber', hpMult:0.8, label:'Si carica, poi colpisce tutta la squadra'},
  'Ladro di Energia':{role:'thief', hpMult:1, label:'Colpisce e drena energia'},
  'Lama Gemella':{role:'twin', hpMult:0.9, label:'Due attacchi rapidi per turno'},
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
  flat:   {comune:{atk:20,hp:200,def:24}, rara:{atk:36,hp:360,def:42}, epica:{atk:60,hp:600,def:70}, leggendaria:{atk:90,hp:900,def:105}},
  pct:    {comune:0.08, rara:0.14, epica:0.20, leggendaria:0.27},
  energy: {comune:0.06, rara:0.10, epica:0.14, leggendaria:0.19},
};
const SUB_VALUES = {
  flat:   {comune:{atk:6,hp:60,def:8}, rara:{atk:11,hp:110,def:14}, epica:{atk:18,hp:180,def:22}, leggendaria:{atk:27,hp:270,def:33}},
  pct:    {comune:0.03, rara:0.05, epica:0.08, leggendaria:0.11},
  energy: {comune:0.03, rara:0.05, epica:0.07, leggendaria:0.10},
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
    bonus4:{label:'+50% danni da DoT', apply:(acc)=>{ acc.dotDamageMult+=0.50; }} },
  glaciale: { name:'Eco Glaciale', icon:'❄',
    pieces:['Cristallo Glaciale','Prisma Glaciale','Velo Glaciale','Perla Glaciale','Diadema Glaciale'],
    bonus2:{label:'+12% PV Massimi', apply:(acc)=>{ acc.pctBonus.hp+=0.12; }},
    bonus4:{label:'+15% cure effettuate', apply:(acc)=>{ acc.healMult+=0.15; }} },
  supernova: { name:'Erede della Supernova', icon:'✨',
    pieces:['Corona della Supernova','Nucleo della Supernova','Velo della Supernova','Sigillo della Supernova','Anello della Supernova'],
    bonus2:{label:'+12% ATK', apply:(acc)=>{ acc.pctBonus.atk+=0.12; }},
    bonus4:{label:'+30% danni delle Ultimate', apply:(acc)=>{ acc.ultDamageMult=(acc.ultDamageMult||0)+0.30; }} },
  tempesta: { name:'Tempesta Rapida', icon:'⚡',
    pieces:['Nucleo della Tempesta','Ali della Tempesta','Fascia della Tempesta','Lente della Tempesta','Spira della Tempesta'],
    bonus2:{label:'+15 energia iniziale', apply:(acc)=>{ acc.startEnergyBonus+=15; }},
    bonus4:{label:'+20% energia guadagnata', apply:(acc)=>{ acc.energyGainMult+=0.20; }} },
  custode: { name:'Custode Runico', icon:'✦',
    pieces:['Nucleo Runico','Placca Runica','Sigillo Runico','Anello Runico','Corona Runica'],
    bonus2:{label:'+12% DEF', apply:(acc)=>{ acc.pctBonus.def+=0.12; }},
    bonus4:{label:'+25% forza degli scudi', apply:(acc)=>{ acc.shieldMult+=0.25; }} },
  patto: { name:'Patto del Guardiano', icon:'🤝',
    pieces:['Cuore del Patto','Voto del Patto','Mantello del Patto','Sigillo del Patto','Corona del Patto'],
    bonus2:{label:'+12% DEF', apply:(acc)=>{ acc.pctBonus.def+=0.12; }},
    bonus4:{label:'Skill o Ultimate su un alleato: +15% danni per 2 round', apply:(acc)=>{ acc.singleAllyDamageBuff=true; }} },
  vitale: { name:'Cuore Vitale', icon:'💗',
    pieces:['Cuore Vitale','Calice Vitale','Veste Vitale','Pendente Vitale','Fascia Vitale'],
    bonus2:{label:'+15% PV Massimi', apply:(acc)=>{ acc.pctBonus.hp+=0.15; }},
    bonus4:{label:'+8% dei PV Massimi come ATK, +20% cure effettuate, +15% danni basati sui PV', apply:(acc)=>{ acc.hpToAtk+=0.08; acc.healMult+=0.20; acc.hpDamageMult=(acc.hpDamageMult||0)+0.15; }} },
  danza: { name:'Danza Instancabile', icon:'🌀',
    pieces:['Lama della Danza','Fascia della Danza','Calzari della Danza','Sigillo della Danza','Nastro della Danza'],
    bonus2:{label:'+12% ATK', apply:(acc)=>{ acc.pctBonus.atk+=0.12; }},
    bonus4:{label:'+30% danni per ogni Skill usata nello stesso turno', apply:(acc)=>{ acc.fxSkillSp=true; }} },
  assenza: { name:'Assenza Siderale', icon:'🌌',
    pieces:['Nucleo Siderale','Velo Siderale','Orbita Siderale','Frammento Siderale','Corona Siderale'],
    bonus2:{label:'+12% ATK', apply:(acc)=>{ acc.pctBonus.atk+=0.12; }},
    bonus4:{label:'+30% danni per ogni compagno assente in battaglia (Hakos, squadre con meno di 4 eroi)', apply:(acc)=>{ acc.fxAbsent=true; }} },
  furia: { name:'Furia del Colpito', icon:'💢',
    pieces:['Corazza Furente','Guanto Furente','Elmo Furente','Schinieri Furenti','Medaglione Furente'],
    bonus2:{label:'+20% DIF', apply:(acc)=>{ acc.pctBonus.def+=0.20; }},
    bonus4:{label:'Ogni volta che vieni colpito: +15% danni per 2 round (cumulabile)', apply:(acc)=>{ acc.fxHitStack=true; }} },
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

function generateArtifact(stageLevel,forcedSetId=null,rarityBonus=0){
  const rarityRoll = Math.random() + stageLevel*0.012 + rarityBonus;
  const rarity = rarityRoll>1.3 ? 'leggendaria' : rarityRoll>0.93 ? 'epica' : rarityRoll>0.65 ? 'rara' : 'comune';
  const setId = forcedSetId || pick(Object.keys(ARTIFACT_SETS));
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
  'Caos Inevitabile': {ownerId:'hakosBaels', effect:{stat:'damageMult', base:0.15, perAscension:0.03, extra:[{stat:'startEnergyBonus',value:100}], describe:value=>`Danni inflitti +${Math.round(value*100)}%. Inizia ogni battaglia con 100 energia.`}},
  'Marea Senza Fine': {ownerId:'koboKanaeru', effect:{stat:'dotDamageMult',base:0.35,perAscension:0.05,describe:value=>`Danni da DoT +${Math.round(value*100)}%.`}},
  'Sigillo del Disordine': {ownerId:'laplusDarkness', effect:{stat:'defDownBonus', base:0.05, perAscension:0.02, describe:value=>`Ogni attacco riduce la DIF nemica di ${Math.round(value*100)}% per 2 round.`}},
  'Scia della Cometa': {ownerId:'suiseiHoshimachi', effect:{stat:'hpDamageMult',base:0.15,perAscension:0.03,describe:value=>`Danni delle abilita basate sui PV massimi +${Math.round(value*100)}%.`}},
  'Reliquiario delle Profondita': {ownerId:'ninomaeInaNis', effect:{stat:'damageMult', base:0.12, perAscension:0.025, describe:value=>`Danni inflitti +${Math.round(value*100)}%.`}},
  'Lampo Sovrano': {ownerId:'selenTatsuki', effect:{stat:'skillDamageMult', base:0.18, perAscension:0.03, describe:value=>`Danni di Skill e Ultimate +${Math.round(value*100)}%.`}},
  'Scintilla della Fenice': {ownerId:'takanashiKiara',effect:{stat:'defPct',base:0.1,perAscension:0.02,describe:value=>`DIF +${Math.round(value*100)}%.`}},
  'Canto della Marea': {ownerId:'finanaRyugu',effect:{stat:'hpDamageMult',base:0.15,perAscension:0.03,describe:value=>`Danni delle abilita basate sui PV massimi +${Math.round(value*100)}%.`}},
  'Cuore della Regina Cremisi': {ownerId:'elizabethRoseBloodflame',effect:{stat:'shieldMult',base:0.20,perAscension:0.03,describe:value=>`Scudi generati +${Math.round(value*100)}%.`}},
  'Risonanza del Grande Blu': {ownerId:'gawrGura',effect:{stat:'healMult',base:0.18,perAscension:0.03,describe:value=>`Cure effettuate +${Math.round(value*100)}%.`}},
  'Protocollo della Geniale Investigatrice': {ownerId:'hakuiKoyori',effect:{stat:'defDownBonus',base:0.05,perAscension:0.02,describe:value=>`Le riduzioni della DIF nemica aumentano di ${Math.round(value*100)}%.`}},
  'Archivio delle Mille Voci': {ownerId:'pavoliaReine',effect:{stat:'dotDamageMult',base:0.25,perAscension:0.04,describe:value=>`Danni da DoT +${Math.round(value*100)}%.`}},
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
  {name:'Marea Senza Fine',ownerId:'koboKanaeru',atk:180,subStat:{key:'atk_pct',value:0.14}},
  {name:'Sigillo del Disordine', ownerId:'laplusDarkness', atk:182, subStat:{key:'energy_pct',value:0.14}},
  {name:'Scia della Cometa',ownerId:'suiseiHoshimachi',atk:180,subStat:{key:'hp_pct',value:0.14}},
  {name:'Reliquiario delle Profondita', ownerId:'ninomaeInaNis', atk:176, subStat:{key:'hp_pct',value:0.12}},
  {name:'Lampo Sovrano', ownerId:'selenTatsuki', atk:178, subStat:{key:'atk_pct',value:0.12}},
  {name:'Scintilla della Fenice',ownerId:'takanashiKiara',atk:180,subStat:{key:'def_pct',value:0.16}},
  {name:'Canto della Marea',ownerId:'finanaRyugu',atk:172,subStat:{key:'hp_pct',value:0.14}},
  {name:'Cuore della Regina Cremisi',ownerId:'elizabethRoseBloodflame',atk:184,subStat:{key:'def_pct',value:0.18}},
  {name:'Risonanza del Grande Blu',ownerId:'gawrGura',atk:148,subStat:{key:'hp_pct',value:0.14}},
  {name:'Protocollo della Geniale Investigatrice',ownerId:'hakuiKoyori',atk:174,subStat:{key:'energy_pct',value:0.12}},
  {name:'Archivio delle Mille Voci',ownerId:'pavoliaReine',atk:169,subStat:{key:'energy_pct',value:0.12}},
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
    const levelGrowth=STAT_KEYS[fixed.subStat.key].flatKey==='speed'?0.01:0.02;
    const subStatScale=1+weapon.level*levelGrowth+weapon.ascension*0.05;
    const subStatMeta=STAT_KEYS[fixed.subStat.key];
    const scaledSubStat=fixed.subStat.value*subStatScale;
    weapon.subStat={...fixed.subStat,value:subStatMeta.kind==='pct'||subStatMeta.kind==='energy'?Number(scaledSubStat.toFixed(4)):Math.round(scaledSubStat)};
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
    <div class="ac-subs"><span>· ${statKeyLabel(w.subStat.key)} ${formatWeaponSubStat(w.subStat)}</span></div>
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
function formatWeaponSubStat(stat){
  const meta=STAT_KEYS[stat.key];
  return meta.kind==='pct'||meta.kind==='energy'
    ? '+'+(stat.value*100).toFixed(1)+'%'
    : '+'+stat.value;
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
function getAllyBattleStatusMarkup(ally){
  const totals={atk:0,def:0,maxHp:0};
  (ally.activeBuffs||[]).forEach(buff=>{ totals[buff.stat]=(totals[buff.stat]||0)+buff.pct; });
  if(ally.fxHitStack) totals.dmg=0.15*(ally.hitStacks||[]).length;
  const tags=Object.entries(totals)
    .filter(([,pct])=>pct>0)
    .map(([stat,pct])=>`<div class="buff-tag">+${Math.round(pct*100)}% ${stat==='atk'?'ATK':stat==='def'?'DIF':stat==='maxHp'?'PV MAX':'DMG'}</div>`)
  const artifactSets=getActiveSetBonuses(ally.charId).filter(bonus=>bonus.tier===4);
  artifactSets.forEach(bonus=>{
    if(bonus.name==='Erede della Supernova'){
      tags.push('<div class="buff-tag">+30% DMG ULT</div>');
    } else if(bonus.name==='Danza Instancabile'){
      const skillBonus=0.30*(ally.turnSkillCount||0);
      if(skillBonus>0) tags.push(`<div class="buff-tag">+${Math.round(skillBonus*100)}% DMG</div>`);
    } else if(bonus.name==='Assenza Siderale'){
      const absent=Math.max(0,4-(state.battle?.allies.length||4));
      const absentBonus=0.30*absent;
      if(absentBonus>0) tags.push(`<div class="buff-tag">+${Math.round(absentBonus*100)}% DMG</div>`);
    } else if(bonus.name==='Furia del Colpito'){
      if(!ally.fxHitStack) tags.push(`<div class="buff-tag">+${Math.round(0.15*(ally.hitStacks||[]).length*100)}% DMG</div>`);
    } else if(bonus.name==='Cuore Vitale'){
      tags.push('<div class="buff-tag">+8% ATK da PV</div>','<div class="buff-tag">+20% CURE</div>','<div class="buff-tag">+15% DMG PV</div>');
    } else if(bonus.name==='Lama Cruenta'){
      tags.push('<div class="buff-tag">+50% DoT</div>');
    } else if(bonus.name==='Eco Glaciale'){
      tags.push('<div class="buff-tag">+15% CURE</div>');
    } else if(bonus.name==='Tempesta Rapida'){
      tags.push('<div class="buff-tag">+20% ENERGIA</div>');
    } else if(bonus.name==='Custode Runico'){
      tags.push('<div class="buff-tag">+25% SCUDI</div>');
    } else if(bonus.name==='Baluardo di Ferro'){
      tags.push('<div class="buff-tag">+20% PV MAX</div>');
    }
  });
  return tags.join('');
}

function getEffectiveStats(charId){
  const base = CHAR_DB[charId].base;
  const eq = state.roster[charId].equipment;
  const acc = {
    flatBonus:{atk:0,hp:0,def:0,speed:0}, pctBonus:{atk:0,hp:0,def:0},
    energyGainMult:1, healMult:1, burnMult:1, dotDamageMult:1, shieldMult:1, startEnergyBonus:0, hpToAtk:0,
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
      else if(['healMult','burnMult','dotDamageMult','shieldMult','energyGainMult'].includes(effect.stat)) acc[effect.stat]+=value;
      else acc[effect.stat]=value;
      (effect.extra||[]).forEach(bonus=>{ acc[bonus.stat]=(acc[bonus.stat]||0)+bonus.value; });
    }
  }
  Object.keys(setCounts).forEach(setId=>{
    const cnt = setCounts[setId];
    const def = ARTIFACT_SETS[setId];
    if(cnt>=2) def.bonus2.apply(acc);
    if(cnt>=4) def.bonus4.apply(acc);
  });
  const hp  = Math.round((base.hp  + acc.flatBonus.hp ) * (1+acc.pctBonus.hp ));
  const atk = Math.round((base.atk + acc.flatBonus.atk) * (1+acc.pctBonus.atk) + hp*acc.hpToAtk);
  const def = Math.round((base.def + acc.flatBonus.def) * (1+acc.pctBonus.def));
  return {
    hp, atk, def, speed:base.speed+acc.flatBonus.speed, energyMax:base.energyMax,
    energyGainMult:acc.energyGainMult, healMult:acc.healMult,
    burnMult:acc.burnMult, dotDamageMult:acc.dotDamageMult, shieldMult:acc.shieldMult, startEnergyBonus:acc.startEnergyBonus,
    damageMult:1+(acc.damageMult||0), ultDamageMult:1+(acc.ultDamageMult||0), weaknessBonus:acc.weaknessBonus||0,
    sameElementBonus:acc.sameElementBonus||0, basicDamageMult:1+(acc.basicDamageMult||0),
    buffPctBonus:acc.buffPctBonus||0, spGrantBonus:acc.spGrantBonus||0,
    formDamageMult:1+(acc.formDamageMult||0), defDownBonus:acc.defDownBonus||0,
    hpDamageMult:1+(acc.hpDamageMult||0), skillDamageMult:1+(acc.skillDamageMult||0),
    fxSkillSp:!!acc.fxSkillSp, fxAbsent:!!acc.fxAbsent, fxHitStack:!!acc.fxHitStack,
    singleAllyDamageBuff:!!acc.singleAllyDamageBuff,
  };
}

/* ============ GLOBAL STATE ============ */
let state = {
  screen:'home', // home | town | battle | victory | defeat
  gold:0, // Frammenti: evocazioni, Travel Log
  credits:0, // Crediti: Torre, missioni, vendite; servono per potenziare armi e manufatti
  stage:1,
  maxStageReached:1,
  roster:{}, // id -> {equipment:[5], weapon, unlocked}
  inventory:[], // artifact objects
  weaponInventory:[], // weapon objects
  party:['kaelaKolvalskia'], // starts with a single unlocked hero
  teamPresets:[['kaelaKolvalskia'],[],[],[]],
  battle:null,
  itemUidCounter:1,
  weaponUidCounter:1,
  pityCounter:0, // pulls since the last character obtained (4★ pity)
  pity5Counter:0, // pulls since the last 5★ obtained
  weaponBannerPulls:0,
  weaponBannerPulls5:0,
  featuredWeaponTargets:{armi4:null,armi5:null},
  pfDaily:null,
  pfCleared:false,
  mocDaily:null,
  mocTeams:[[],[]],
  moc:null,
  apocDaily:null,
  apoc:null,
  modeGrades:{pf:'C',moc:'C',apoc:'C'},
  suCleared:false,
  su:null,
  suDaily:null,
  dailyMissions:null,
  bannerType:'personaggi',
  lastPullBanner:'personaggi',
  lastPullResults:[],
  townTab:'squadra', // squadra | personaggi | abilita | inventario | indice | torre | banner | missioni
  travelTab:'purefiction',
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
    credits: state.credits,
    stage: state.stage,
    maxStageReached: state.maxStageReached,
    roster: state.roster,
    inventory: state.inventory,
    weaponInventory: state.weaponInventory,
    party: state.party,
    teamPresets: state.teamPresets,
    itemUidCounter: state.itemUidCounter,
    weaponUidCounter: state.weaponUidCounter,
    pityCounter: state.pityCounter,
    pity5Counter: state.pity5Counter,
    weaponBannerPulls: state.weaponBannerPulls,
    weaponBannerPulls5: state.weaponBannerPulls5,
    featuredWeaponTargets: state.featuredWeaponTargets,
    pfDaily: state.pfDaily,
    pfCleared: state.pfCleared,
    mocDaily: state.mocDaily,
    mocTeams: state.mocTeams,
    apocDaily: state.apocDaily,
    modeGrades: state.modeGrades,
    suCleared: state.suCleared,
    suDaily: state.suDaily,
    dailyMissions: state.dailyMissions,
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
  state.party = [...new Set(state.party)].slice(0,4);
  if(!Array.isArray(state.teamPresets)) state.teamPresets=[];
  state.teamPresets=Array.from({length:4},(_,index)=>{
    const preset=state.teamPresets[index];
    return Array.isArray(preset)
      ? [...new Set(preset)].filter(id=>CHAR_DB[id] && state.roster[id]?.unlocked).slice(0,4)
      : [];
  });
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
    if(Array.isArray(data.teamPresets)){
      data.teamPresets=data.teamPresets.map(preset=>Array.isArray(preset)?preset.map(id=>idMigration[id]||id):[]);
    }
    if(idMigration[data.abilityTabChar]) data.abilityTabChar = idMigration[data.abilityTabChar];
    state.gold = data.gold||0;
    state.credits = data.credits||0;
    state.stage = data.stage||1;
    state.maxStageReached = data.maxStageReached||1;
    state.roster = data.roster || state.roster;
    state.inventory = data.inventory || [];
    state.weaponInventory = data.weaponInventory || [];
    state.party = (data.party && data.party.length>0) ? data.party : ['kaelaKolvalskia'];
    state.teamPresets = Array.isArray(data.teamPresets) ? data.teamPresets : [state.party.slice(),[],[],[]];
    state.itemUidCounter = data.itemUidCounter || 1;
    state.weaponUidCounter = data.weaponUidCounter || 1;
    state.pityCounter = data.pityCounter || 0;
    state.pity5Counter = data.pity5Counter || 0;
    state.weaponBannerPulls = data.weaponBannerPulls || 0;
    state.weaponBannerPulls5 = data.weaponBannerPulls5 || 0;
    state.featuredWeaponTargets = {armi4:null,armi5:null,...(data.featuredWeaponTargets||{})};
    state.pfDaily = data.pfDaily || null;
    state.pfCleared = !!data.pfCleared;
    state.mocDaily = data.mocDaily || null;
    state.mocTeams = Array.isArray(data.mocTeams) && data.mocTeams.length===2 ? data.mocTeams : [[],[]];
    state.apocDaily = data.apocDaily || null;
    state.modeGrades = {...state.modeGrades,...(data.modeGrades||{})};
    state.maxStageReached = clamp(state.maxStageReached,1,TOWER_MAX_FLOOR+1);
    state.stage = clamp(state.stage,1,TOWER_MAX_FLOOR);
    state.suCleared = !!data.suCleared;
    state.suDaily = data.suDaily || null;
    state.dailyMissions = data.dailyMissions || null;
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
  state.gold=0; state.credits=0; state.stage=1; state.maxStageReached=1; state.inventory=[]; state.itemUidCounter=1;
  state.weaponInventory=[]; state.weaponUidCounter=1; state.pityCounter=0; state.pity5Counter=0; state.lastPullResults=[];
  state.weaponBannerPulls=0; state.weaponBannerPulls5=0; state.pfDaily=null; state.pfCleared=false; state.mocDaily=null; state.mocTeams=[[],[]]; state.moc=null; state.apocDaily=null; state.apoc=null; state.modeGrades={pf:'C',moc:'C',apoc:'C'}; state.travelTab='purefiction'; state.suCleared=false; state.suDaily=null; state.su=null; state.dailyMissions=null; state.bannerType='personaggi'; state.lastPullBanner='personaggi';
  state.featuredWeaponTargets={armi4:null,armi5:null};
  state.claimedQuests={}; state.questTiers={}; state.questExhausted={}; state.totalPullsDone=0; state.totalArtifactsSold=0;
  initRoster();
  state.party=['kaelaKolvalskia'];
  state.teamPresets=[state.party.slice(),[],[],[]];
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

/* ============ TOWER (FINITE) ============ */
function isBossStage(n){return n%5===0;}
function towerCombatRank(floor){
  return 1+(clamp(floor,1,TOWER_MAX_FLOOR)-1)*(TOWER_MAX_COMBAT_RANK-1)/(TOWER_MAX_FLOOR-1);
}
function towerHpRank(combatRank){
  return 1+(clamp(combatRank,1,TOWER_MAX_COMBAT_RANK)-1)*(TOWER_MAX_HP_RANK-1)/(TOWER_MAX_COMBAT_RANK-1);
}
function getScaledBossHp(combatRank){
  const rank=clamp(combatRank,1,TOWER_MAX_COMBAT_RANK);
  const hpRank=towerHpRank(rank);
  const baseHp=Math.round((1100+hpRank*190+hpRank*hpRank*2.6)*0.65*BOSS_HP_FACTOR);
  const finalBaseHp=Math.round((1100+TOWER_MAX_HP_RANK*190+TOWER_MAX_HP_RANK*TOWER_MAX_HP_RANK*2.6)*0.65*BOSS_HP_FACTOR);
  const progress=(rank-1)/(TOWER_MAX_COMBAT_RANK-1);
  const finalMultiplier=FINAL_GRADE_BOSS_HP/finalBaseHp;
  return Math.round(baseHp*(1+progress*(finalMultiplier-1)));
}
function getFloorEnemyBaseHp(stageNum){
  return Math.round(260+stageNum*58+stageNum*stageNum*1.5);
}
function expandConstructBossParts(boss){
  if(boss.name!=='Costrutto Immergreen') return [boss];
  const groupId=`${boss.id}_shared`;
  const sharedMaxHp=boss.maxHp*4;
  return ['sinistro','centrale','destro'].map((part,index)=>({
    ...boss,
    id:`${boss.id}_${part}`,
    name:'Costrutto Immergreen',
    partLabel:part,
    constructGroupId:groupId,
    constructPart:index,
    hp:sharedMaxHp,
    maxHp:sharedMaxHp,
    shield:0,
    dots:[],
  }));
}
// Tower content can stretch HP separately while preserving the established ATK, DEF, and speed ranks.
function generateEnemies(stageNum,combatRank=stageNum,scaleSpeed=false,hpRank=combatRank){
  const n = combatRank;
  const boss = isBossStage(stageNum);
  const count = boss ? 1 : Math.min(MAX_ENEMIES_IN_BATTLE, 1+Math.floor((stageNum-1)/2));
  const enemies=[];
  for(let i=0;i<count;i++){
    const hpBase = boss ? getScaledBossHp(n) : getFloorEnemyBaseHp(hpRank);
    const atk = boss ? Math.round((150  + n*24  + n*n*0.22)*BOSS_ATK_FACTOR) : Math.round(95  + n*17  + n*n*0.14);
    const def = boss ? Math.round(35   + n*6   + n*n*0.05) : Math.round(10  + n*2.6  + n*n*0.02);
    const special = !boss && stageNum>=3 && Math.random()<0.5 ? pick(Object.keys(SPECIAL_ENEMIES)) : null;
    const name = boss ? BOSS_NAMES[(Math.floor(stageNum/5)-1) % BOSS_NAMES.length] : (special || ENEMY_NAMES[i % ENEMY_NAMES.length]);
    const role = special ? SPECIAL_ENEMIES[special].role : null;
    const hp = special ? Math.round(hpBase*SPECIAL_ENEMIES[special].hpMult) : hpBase;
    const elements = ENEMY_ELEMENT_SETS[name].slice();
    const speed = 90+Math.floor(Math.random()*31)+(scaleSpeed?Math.floor((n-1)/10)*4:0);
    enemies.push({id:'e'+i,name,role,specialTurns:0,rageStacks:0,hp,maxHp:hp,atk,def,speed,element:elements[0],elements,vulnerableToElement:null,vulnerableRounds:0,defDownPct:0,defDownRounds:0,inaMarked:false,shield:0,dots:[],seasickStacks:0,isBoss:boss,phase:boss?1:0,bossTurns:0,addsWaveStarted:false,addsWaveResolved:false,addsTurnsRemaining:0,psychoHitCount:0,psychoTriggeredThisRound:false});
  }
  return enemies.flatMap(expandConstructBossParts);
}

/* ============ BATTLE SETUP ============ */
function buildTurnOrder(allies, enemies){
  applyKoyoriSpeedDown(allies,enemies);
  return [
    ...allies.map(actor=>({side:'ally', id:actor.charId, speed:actor.speed})),
    ...enemies.map(actor=>({side:'enemy', id:actor.id, speed:actor.speed})),
  ].sort((first,second)=>second.speed-first.speed);
}

function grantTakaneDebuffCharge(enemy,allies=state.battle?.allies){
  if(!enemy||enemy.hp<=0) return;
  const takane=allies?.find(actor=>actor.charId==='takaneLui'&&actor.hp>0);
  if(!takane) return;
  const max=CHAR_DB.takaneLui.ultChargeMax;
  const current=Number.isFinite(takane.takaneDebuffCharges)?takane.takaneDebuffCharges:0;
  if(current>=max) return;
  takane.takaneDebuffCharges=current+1;
  takane._fx={variant:'spgrant',label:'+1 CARICA'};
  if(state.battle?.allies===allies&&state.battle.enemies.includes(enemy)){
    logMsg(`${takane.name} accumula una carica per il debuff su ${enemy.name} (${takane.takaneDebuffCharges}/${max}).`);
  }
}

function isUltimateReady(actor){
  const character=CHAR_DB[actor.charId];
  return character.ultChargeMode==='debuffs'
    ? (actor.takaneDebuffCharges||0)>=character.ultChargeMax
    : actor.energy>=actor.energyMax;
}

function applyKoyoriSpeedDown(allies,enemies){
  if(!allies.some(actor=>actor.charId==='hakuiKoyori')) return;
  const slow=CHAR_DB.hakuiKoyori.passiveEnemySpeedDown;
  enemies.forEach(enemy=>{
    if(enemy.hp<=0||enemy.koyoriSlowApplied) return;
    enemy.speed=Math.max(1,Math.floor(enemy.speed*(1-slow)));
    enemy.koyoriSlowApplied=true;
    enemy.koyoriSlowPct=slow;
    grantTakaneDebuffCharge(enemy,allies);
  });
}

function getTurnActor(b, entry=b.turnOrder[b.turnIndex]){
  if(!entry) return null;
  return entry.side==='ally'
    ? b.allies.find(actor=>actor.charId===entry.id)
    : b.enemies.find(actor=>actor.id===entry.id);
}

const MODE_GRADE_DEFS=[
  {id:'C',floor:1,pfEnemies:3,pfSpecialChance:0.1,phases:1,mocDamageReduction:0,phaseAtkMultiplier:1.1,apocDamageReduction:0.25,apocStacksRequired:3,roundLimit:18,apocRequiresWeakness:false},
  {id:'B',floor:10,pfEnemies:3,pfSpecialChance:0.2,phases:1,mocDamageReduction:0,phaseAtkMultiplier:1.15,apocDamageReduction:0.35,apocStacksRequired:4,roundLimit:16,apocRequiresWeakness:false},
  {id:'A',floor:25,pfEnemies:4,pfSpecialChance:0.3,phases:1,mocDamageReduction:0.05,phaseAtkMultiplier:1.2,apocDamageReduction:0.5,apocStacksRequired:5,roundLimit:14,apocRequiresWeakness:true},
  {id:'S',floor:50,pfEnemies:4,pfSpecialChance:0.4,phases:2,mocDamageReduction:0.1,phaseAtkMultiplier:1.25,apocDamageReduction:0.65,apocStacksRequired:7,roundLimit:12,apocRequiresWeakness:true},
  {id:'SS',floor:100,pfEnemies:5,pfSpecialChance:0.5,phases:2,mocDamageReduction:0.15,phaseAtkMultiplier:1.35,apocDamageReduction:0.8,apocStacksRequired:9,roundLimit:10,apocRequiresWeakness:true},
  {id:'EX',floor:150,pfEnemies:5,pfSpecialChance:0.6,phases:2,mocDamageReduction:0.2,phaseAtkMultiplier:1.45,apocDamageReduction:0.9,apocStacksRequired:10,roundLimit:8,apocRequiresWeakness:true},
];
const MODE_REWARD_GRADE=MODE_GRADE_DEFS[1];
function getModeGrade(mode){
  return MODE_GRADE_DEFS.find(grade=>grade.id===state.modeGrades?.[mode])||MODE_GRADE_DEFS[0];
}
function getModeGradeById(gradeId){
  return MODE_GRADE_DEFS.find(grade=>grade.id===gradeId)||MODE_GRADE_DEFS[0];
}
function getModeGradeIndex(gradeId){
  const index=MODE_GRADE_DEFS.findIndex(grade=>grade.id===gradeId);
  return index<0?0:index;
}
function getClearedTowerFloor(){
  return clamp(state.maxStageReached-1,0,TOWER_MAX_FLOOR);
}
function isModeGradeUnlocked(grade){
  return MODE_GRADE_DEFS.includes(grade);
}
function setModeGrade(mode,gradeId){
  const grade=MODE_GRADE_DEFS.find(entry=>entry.id===gradeId);
  if(!grade||!isModeGradeUnlocked(grade)) return;
  state.modeGrades[mode]=grade.id;
  render();
}
function renderModeGradePicker(mode){
  const selected=getModeGrade(mode);
  const picker=el(`<div class="hud-panel section mode-grade-panel" style="padding:14px;margin:12px 0;"><div class="eyebrow">Grado di difficoltà</div><div class="subtab-bar mode-grade-picker"></div><div class="hint mode-grade-hint"></div></div>`);
  const buttons=picker.querySelector('.mode-grade-picker');
  MODE_GRADE_DEFS.forEach(grade=>{
    const unlocked=isModeGradeUnlocked(grade);
    const button=el(`<button class="subtab-btn ${selected.id===grade.id?'active':''}" type="button" ${unlocked?'':'disabled'}>${grade.id}${unlocked?'':` · Piano ${grade.floor}`}</button>`);
    button.title=unlocked?`Grado ${grade.id}`:`Completa il Piano ${grade.floor} della Torre`;
    button.onclick=()=>setModeGrade(mode,grade.id);
    buttons.appendChild(button);
  });
  const combatRank=towerCombatRank(selected.floor);
  picker.querySelector('.mode-grade-hint').textContent=`Grado ${selected.id} · Rango ATK/DIF ${combatRank.toFixed(1)} · Rango PV ${towerHpRank(combatRank).toFixed(1)}. Tutti i gradi sono selezionabili fin dall'inizio.`;
  return picker;
}
function getCumulativeModeReward(baseReward,gradeId){
  const current=getModeGradeIndex(gradeId);
  const totalWeight=MODE_GRADE_DEFS.length*(MODE_GRADE_DEFS.length+1)/2;
  const earnedWeight=(current+1)*(current+2)/2;
  return Math.round(baseReward*2*earnedWeight/totalWeight);
}
function getClaimedGradeIndex(day,index){
  const stored=day.claimedGrade?.[index];
  if(Number.isInteger(stored)&&stored>=0) return clamp(stored,0,MODE_GRADE_DEFS.length-1);
  return day.claimed?.[index]?0:-1;
}
function getClaimedModeRewardTotal(day,index,baseReward){
  const stored=day.claimedRewardTotal?.[index];
  if(Number.isFinite(stored)&&stored>=0) return stored;
  const previous=getClaimedGradeIndex(day,index);
  return previous>=0?Math.round(baseReward*(previous+1)/MODE_GRADE_DEFS.length):0;
}
function claimModeReward(day,index,baseReward,gradeId){
  if(!Array.isArray(day.claimedGrade)) day.claimedGrade=[];
  const previous=getClaimedGradeIndex(day,index);
  const current=getModeGradeIndex(gradeId);
  if(current<previous) return 0;
  const total=getCumulativeModeReward(baseReward,gradeId);
  const previousTotal=getClaimedModeRewardTotal(day,index,baseReward);
  const amount=Math.max(0,total-previousTotal);
  day.claimed=day.claimed||[];
  day.claimed[index]=true;
  day.claimedGrade[index]=current;
  if(!Array.isArray(day.claimedRewardTotal)) day.claimedRewardTotal=[];
  day.claimedRewardTotal[index]=Math.max(total,previousTotal);
  state.gold+=amount;
  return amount;
}
function getModeRewardStatus(day,index,baseReward,gradeId){
  const previous=getClaimedGradeIndex(day,index);
  const current=getModeGradeIndex(gradeId);
  if(current<=previous) return `✓ Grado ${MODE_GRADE_DEFS[Math.max(0,previous)].id}`;
  const amount=getCumulativeModeReward(baseReward,gradeId)-getClaimedModeRewardTotal(day,index,baseReward);
  return `+${amount} 💠`;
}

/* ============ PURE FICTION ============ */
const PF_ROUNDS = 12; // every hero acts once per round
const PF_TIERS = [{points:2000,reward:400},{points:5000,reward:650},{points:10000,reward:950}];
const PF_GENERAL_BUFFS = [
  {name:'Furia del Vuoto', desc:'Tutta la squadra: +15% ATK.', apply:a=>{ a.atk=Math.round(a.atk*1.15); }},
  {name:'Pelle di Cristallo', desc:'Tutta la squadra: +20% PV massimi.', apply:a=>{ a.maxHp=Math.round(a.maxHp*1.2); a.hp=a.maxHp; }},
  {name:'Ritmo Incalzante', desc:'Tutta la squadra: +10 VEL.', apply:a=>{ a.speed+=10; }},
  {name:'Scarica Iniziale', desc:'Tutta la squadra: +30 energia iniziale.', apply:a=>{ a.energy=clamp(a.energy+30,0,a.energyMax); }},
  {name:'Bottino Esplosivo', desc:'Punti per ogni nemico sconfitto +25%.', pointsMult:1.25, apply:()=>{}},
];
// Team-wide for everyone, but each only pays off fully for a specific playstyle/hero.
const PF_THEME_BUFFS = [
  {name:'Eco Vitale', desc:'Danni basati sui PV massimi +35%, cure +20%.', hint:'Susei, Cecilia', apply:a=>{ a.hpDamageMult+=0.35; a.healMult+=0.2; }},
  {name:'Nemici Instabili', desc:'Il danno contro le debolezze elementali aumenta del 50%.', hint:'DokiBird, Mona, Laplus', apply:a=>{ a.weaknessBonus+=0.5; }},
  {name:'Frenesia', desc:'Danni degli Attacchi Base +40%.', hint:'Mumei, Ina, Hakos', apply:a=>{ a.basicDamageMult+=0.4; }},
  {name:'Sangue Caldo', desc:'Danni da Sanguinamento +60%.', hint:'Vestia', apply:a=>{ a.burnMult+=0.6; }},
  {name:'Segno Persistente', desc:'+2 cariche di follow-up iniziali.', hint:'Ina', apply:a=>{ if(a.inaFollowUpsRemaining>0) a.inaFollowUpsRemaining+=2; }},
  {name:'Scudi Rinforzati', desc:'Forza degli scudi +60%.', hint:'Kaela', apply:a=>{ a.shieldMult+=0.6; }},
  {name:'Eco di Comando', desc:'Efficacia dei buff ATK +30%, le Skill che donano PA ne danno 1 in più.', hint:'IRyS, Kronii', apply:a=>{ a.buffPctBonus+=0.3; a.spGrantBonus+=1; }},
  {name:'Colpi Risolutivi', desc:'Danni di Skill e Ultimate +35%.', hint:'DokiBird, Mona, Laplus', apply:a=>{ a.skillDamageMult+=0.35; }},
];

function pfDateKey(){
  const d=new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function pfHash(str){
  let h=2166136261;
  for(let i=0;i<str.length;i++){ h^=str.charCodeAt(i); h=Math.imul(h,16777619); }
  return h>>>0;
}
// Rewards reset when the local date changes.
function ensurePFDay(){
  const key=pfDateKey();
  if(!state.pfDaily || state.pfDaily.date!==key) state.pfDaily={date:key,best:0,claimed:[false,false,false]};
  if(!Array.isArray(state.pfDaily.claimedGrade)) state.pfDaily.claimedGrade=state.pfDaily.claimed.map(claimed=>claimed?0:-1);
  while(state.pfDaily.claimedGrade.length<PF_TIERS.length) state.pfDaily.claimedGrade.push(-1);
  return state.pfDaily;
}
function getPFDailyBuffs(){
  const key=pfDateKey();
  return {general:PF_GENERAL_BUFFS[pfHash(key+'g')%PF_GENERAL_BUFFS.length], theme:PF_THEME_BUFFS[pfHash(key+'t')%PF_THEME_BUFFS.length]};
}
const APOC_TIERS=[
  {id:'stacks',label:`Accumula ${MODE_REWARD_GRADE.apocStacksRequired} stack elementali`,stacksRequired:MODE_REWARD_GRADE.apocStacksRequired,reward:400},
  {id:'phase',label:'Sconfiggi il boss',reward:650},
  {id:'clear',label:`Sconfiggi il boss entro ${MODE_REWARD_GRADE.roundLimit} round`,roundLimit:MODE_REWARD_GRADE.roundLimit,reward:950},
];
function ensureApocDay(){
  const date=pfDateKey();
  if(!state.apocDaily || state.apocDaily.date!==date){
    state.apocDaily={date,claimed:[false,false,false],bestRounds:null};
  }
  if(!Array.isArray(state.apocDaily.claimed)) state.apocDaily.claimed=[false,false,false];
  if(!Array.isArray(state.apocDaily.claimedGrade)) state.apocDaily.claimedGrade=state.apocDaily.claimed.map(claimed=>claimed?0:-1);
  while(state.apocDaily.claimed.length<APOC_TIERS.length) state.apocDaily.claimed.push(false);
  while(state.apocDaily.claimedGrade.length<APOC_TIERS.length) state.apocDaily.claimedGrade.push(-1);
  return state.apocDaily;
}
function getApocSetup(){
  const key=pfDateKey();
  const bossIndex=pfHash(key+'apoc-boss')%BOSS_NAMES.length;
  return {
    boss:BOSS_NAMES[bossIndex],
    buffs:{
      general:PF_GENERAL_BUFFS[pfHash(key+'apoc-general')%PF_GENERAL_BUFFS.length],
      theme:PF_THEME_BUFFS[pfHash(key+'apoc-theme')%PF_THEME_BUFFS.length],
    },
  };
}
function claimApocTier(index,gradeId=getModeGrade('apoc').id){
  const day=ensureApocDay();
  const tier=APOC_TIERS[index];
  if(!tier) return 0;
  return claimModeReward(day,index,tier.reward,gradeId);
}
function claimApocProgressRewards(boss){
  if(boss.apocStacks>=APOC_TIERS[0].stacksRequired) claimApocTier(0,boss.modeGrade);
  if(boss.hp<=0) claimApocTier(1,boss.modeGrade);
}
function applyPFBuffs(allies,buffs){
  allies.forEach(a=>{
    buffs.general.apply(a);
    buffs.theme.apply(a);
  });
}
function pfAllEnemyNames(){ return [...ENEMY_NAMES,...Object.keys(SPECIAL_ENEMIES)]; }

let pfTimerHandle=null;
function startPFTimer(node){
  clearInterval(pfTimerHandle);
  const tick=(first)=>{
    if(!first && !node.isConnected){ clearInterval(pfTimerHandle); return; }
    const now=new Date();
    const next=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1);
    const left=next-now;
    if(left<=0){ clearInterval(pfTimerHandle); render(); return; }
    const pad=n=>String(n).padStart(2,'0');
    node.textContent=`${pad(Math.floor(left/3600000))}:${pad(Math.floor(left/60000)%60)}:${pad(Math.floor(left/1000)%60)}`;
  };
  tick(true);
  pfTimerHandle=setInterval(tick,1000);
}
function buildPFEnemy(id,name,rank=towerCombatRank(getModeGrade('pf').floor),hpRank=towerHpRank(rank)){
  const n=rank;
  const special=SPECIAL_ENEMIES[name]||null;
  const hpBase=Math.round(getFloorEnemyBaseHp(hpRank)*1.4);
  const hp=Math.min(8000,special?Math.round(hpBase*special.hpMult):hpBase);
  const atk=Math.round((95+n*17+n*n*0.14)*0.25);
  const def=Math.round(10+n*2.6+n*n*0.02);
  const elements=ENEMY_ELEMENT_SETS[name].slice();
  return {id,name,role:special?special.role:null,specialTurns:0,rageStacks:0,hp,maxHp:hp,atk,def,speed:90+Math.floor(Math.random()*31)+Math.floor((n-1)/10)*4,element:elements[0],elements,vulnerableToElement:null,vulnerableRounds:0,defDownPct:0,defDownRounds:0,inaMarked:false,shield:0,dots:[],seasickStacks:0,isBoss:false,phase:0,bossTurns:0,addsWaveStarted:false,addsWaveResolved:false,addsTurnsRemaining:0};
}
function getPFEnemyPool(specialChance){
  return [...ENEMY_NAMES,...Object.keys(SPECIAL_ENEMIES).filter(()=>Math.random()<specialChance)];
}
function generatePFEnemies(){
  const grade=getModeGrade('pf');
  const names=shuffleArr(getPFEnemyPool(grade.pfSpecialChance));
  const count=grade.pfEnemies;
  const rank=towerCombatRank(grade.floor);
  const hpRank=towerHpRank(rank);
  return names.slice(0,count).map((name,i)=>buildPFEnemy('p'+i,name,rank,hpRank));
}
function spawnPFEnemy(b,spawned){
  const pf=b.pf;
  const aliveNames=b.enemies.filter(x=>x.hp>0).map(x=>x.name);
  const excluded=nm=>nm!==pf.lastSpawn&&!aliveNames.includes(nm);
  const pool=getPFEnemyPool(pf.specialChance).filter(excluded);
  const fallback=ENEMY_NAMES.filter(excluded);
  const name=pick(pool.length?pool:fallback.length?fallback:ENEMY_NAMES);
  pf.lastSpawn=name;
  const fresh=buildPFEnemy('p'+(b.summonCounter++),name,pf.rank,pf.hpRank);
  applyKoyoriSpeedDown(b.allies,[fresh]);
  b.enemies.push(fresh);
  applyKoboCorrosionIfNeeded(b,fresh);
  spawned.push(fresh);
  logMsg(`Un nuovo nemico entra in campo: ${name}.`);
}
function pfProcessKills(b){
  const pf=b.pf;
  const spawned=[];
  b.enemies.filter(e=>e.hp<=0&&!e._pfScored).forEach(e=>{
    e._pfScored=true;
    const pts=Math.round((SPECIAL_ENEMIES[e.name]?150:100)*(pf.buffs.general.pointsMult||1));
    pf.score+=pts;
    pf.kills++;
    logMsg(`${e.name} sconfitto: +${pts} punti.`);
    spawnPFEnemy(b,spawned);
  });
  // safety net: the field must always hold 5 living enemies
  while(b.enemies.filter(x=>x.hp>0).length<b.pf.enemyCount) spawnPFEnemy(b,spawned);
  if(spawned.length>0){
    const future=b.turnOrder.slice(b.turnIndex+1);
    future.push(...spawned.map(enemy=>({side:'enemy',id:enemy.id,speed:enemy.speed})));
    future.sort((first,second)=>second.speed-first.speed);
    b.turnOrder.splice(b.turnIndex+1,b.turnOrder.length-b.turnIndex-1,...future);
  }
}
function endPureFiction(reason){
  const b=state.battle;
  b.phase='resolved';
  state.autoBattle=false;
  if(reason==='rounds') state.pfCleared=true;
  const day=ensurePFDay();
  const score=b.pf.score;
  day.best=Math.max(day.best,score);
  const gained=[];
  PF_TIERS.forEach((tier,i)=>{
    if(score>=b.pf.thresholds[i]) gained.push(claimModeReward(day,i,tier.reward,b.pf.grade));
  });
  b.pfResult={score,kills:b.pf.kills,gained:gained.filter(amount=>amount>0),total:gained.reduce((sum,v)=>sum+v,0),reason,grade:b.pf.grade,thresholds:b.pf.thresholds};
  state.screen='pfresult';
}
function getPFScoreThresholds(partySize){
  const rank=towerCombatRank(MODE_REWARD_GRADE.floor);
  const referenceHp=getFloorEnemyBaseHp(10)*1.4;
  const rankHp=Math.min(8000,getFloorEnemyBaseHp(towerHpRank(rank))*1.4);
  const squadFactor=Math.max(0.25,partySize/4);
  return PF_TIERS.map(tier=>Math.max(100,Math.round(tier.points*(rankHp/referenceHp)*squadFactor/100)*100));
}
function startPureFiction(){
  if(!isModeGradeUnlocked(getModeGrade('pf'))) return;
  startBattle('pf');
}

function startApocalypticShadow(){
  const grade=getModeGrade('apoc');
  if(!isModeGradeUnlocked(grade)) return;
  state.apoc={grade:grade.id,setup:getApocSetup()};
  startBattle('apoc');
}
function endApocalypticShadow(reason){
  const b=state.battle;
  if(!b || b.mode!=='apoc') return;
  b.phase='resolved';
  state.autoBattle=false;
  const boss=b.enemies.find(enemy=>enemy.isBoss);
  if(boss) claimApocProgressRewards(boss);
  const grade=getModeGradeById(b.apoc?.grade||'C');
  const rounds=grade.roundLimit;
  if(reason==='victory'&&b.round<=APOC_TIERS[2].roundLimit){
    claimApocTier(2,grade.id);
    const day=ensureApocDay();
    day.bestRoundsByGrade=day.bestRoundsByGrade||{};
    const best=day.bestRoundsByGrade[grade.id];
    day.bestRoundsByGrade[grade.id]=best===undefined?b.round:Math.min(best,b.round);
    day.bestRounds=day.bestRounds===null?b.round:Math.min(day.bestRounds,b.round);
  }
  b.apocResult={reason,rounds:b.round,stacks:boss?.apocStacks||0,stacksRequired:boss?.apocStacksRequired||grade.apocStacksRequired,phase:boss?.phase||1,grade:grade.id,roundLimit:rounds};
  state.screen='apocresult';
}

/* ============ MEMORY OF CHAOS ============ */
const MOC_TIERS = [{clears:1,reward:400},{clears:2,reward:650},{clears:2,maxRounds:MODE_REWARD_GRADE.roundLimit,reward:950}];
function ensureMOCDay(){
  const key=pfDateKey();
  if(!state.mocDaily || state.mocDaily.date!==key) state.mocDaily={date:key,clears:0,bestRounds:null,claimed:[false,false,false]};
  if(!Array.isArray(state.mocDaily.claimedGrade)) state.mocDaily.claimedGrade=state.mocDaily.claimed.map(claimed=>claimed?0:-1);
  while(state.mocDaily.claimedGrade.length<MOC_TIERS.length) state.mocDaily.claimedGrade.push(-1);
  return state.mocDaily;
}
function getMOCSetup(){
  const key=pfDateKey();
  const first=pfHash(key+'moc-boss-a')%BOSS_NAMES.length;
  const second=(first+1+pfHash(key+'moc-boss-b')%(BOSS_NAMES.length-1))%BOSS_NAMES.length;
  const general=PF_GENERAL_BUFFS[pfHash(key+'moc-general')%PF_GENERAL_BUFFS.length];
  const theme=PF_THEME_BUFFS[pfHash(key+'moc-theme')%PF_THEME_BUFFS.length];
  return {bosses:[BOSS_NAMES[first],BOSS_NAMES[second]],buffs:{general,theme}};
}
function toggleMOCHero(teamIndex,charId){
  if(!state.roster[charId]?.unlocked || state.moc) return;
  const teams=state.mocTeams;
  const team=teams[teamIndex];
  if(team.includes(charId)) team.splice(team.indexOf(charId),1);
  else if(team.length<4 && (getModeGrade('moc').id==='C'||!teams[1-teamIndex].includes(charId))) team.push(charId);
  render();
}
function getMocPresetLoadState(teamIndex,presetIndex){
  const preset=state.teamPresets[presetIndex];
  const members=Array.isArray(preset)
    ? [...new Set(preset)].filter(id=>CHAR_DB[id]&&state.roster[id]?.unlocked).slice(0,4)
    : [];
  if(members.length===0) return {members,reason:'Questo preset è vuoto o non contiene eroi sbloccati.'};
  if(getModeGrade('moc').id!=='C'){
    const conflicts=members.filter(id=>state.mocTeams[1-teamIndex].includes(id));
    if(conflicts.length){
      const names=conflicts.map(id=>CHAR_DB[id].name).join(', ');
      return {members,reason:`Già assegnati all’altra squadra: ${names}.`};
    }
  }
  return {members,reason:''};
}
function loadMocTeamPreset(teamIndex,presetIndex){
  if(state.moc||teamIndex<0||teamIndex>1) return;
  const {members,reason}=getMocPresetLoadState(teamIndex,presetIndex);
  if(reason) return;
  state.mocTeams[teamIndex]=members;
  render();
}
function startMemoryOfChaos(){
  const grade=getModeGrade('moc');
  if(!isModeGradeUnlocked(grade) || state.moc) return;
  const [first,second]=state.mocTeams;
  const singleTeam=grade.id==='C';
  if(first.length===0 || (!singleTeam&&(second.length===0 || first.some(id=>second.includes(id))))) return;
  state.moc={phase:'first',bossIndex:0,rounds:0,grade:grade.id,singleTeam,setup:getMOCSetup()};
  startBattle('moc');
}
function claimMOCTiers(day,clears,rounds,gradeId=getModeGrade('moc').id){
  let gained=0;
  MOC_TIERS.forEach((tier,index)=>{
    if(clears>=tier.clears && (index!==2 || rounds<=tier.maxRounds)) gained+=claimModeReward(day,index,tier.reward,gradeId);
  });
  return gained;
}
function isElementStrongAgainstMOCBoss(element,bossName){
  const bossElements=ENEMY_ELEMENT_SETS[bossName]||[];
  return !bossElements.includes(element)&&bossElements.includes(ELEMENT_RELATION[element]);
}
function renderMOCBossElements(bossName){
  return (ENEMY_ELEMENT_SETS[bossName]||[]).map(element=>{
    const visual=ELEMENT_VISUALS[element];
    return `<span class="moc-element-sigil" style="--element-color:${visual.color}" title="${ELEMENT_DATA[element].label}" aria-label="${ELEMENT_DATA[element].label}">${visual.icon}</span>`;
  }).join('');
}
function onMOCBattleWin(){
  const battle=state.battle;
  const moc=state.moc;
  moc.rounds+=battle.round;
  const day=ensureMOCDay();
  if(moc.bossIndex===0){
    day.clears=Math.max(day.clears,1);
    if(moc.singleTeam){
      day.bestRounds=day.bestRounds===null?moc.rounds:Math.min(day.bestRounds,moc.rounds);
      claimMOCTiers(day,1,moc.rounds,moc.grade);
      moc.phase='complete';
    } else {
      claimMOCTiers(day,1,moc.rounds,moc.grade);
      moc.bossIndex=1;
      moc.phase='second';
    }
  } else {
    day.clears=2;
    day.bestRounds=day.bestRounds===null?moc.rounds:Math.min(day.bestRounds,moc.rounds);
    claimMOCTiers(day,2,moc.rounds,moc.grade);
    moc.phase='complete';
  }
  state.battle=null;
  state.autoBattle=false;
  state.screen='moc';
}
function onMOCBattleDefeat(){
  state.moc.phase='failed';
  state.battle=null;
  state.autoBattle=false;
  state.screen='moc';
}
function continueMOC(){
  if(!state.moc || state.moc.phase!=='second') return;
  startBattle('moc');
}
function finishMOC(){
  state.moc=null;
  state.screen='town';
  state.townTab='viaggi';
  state.travelTab='moc';
  render();
}
function retryMOC(){
  state.moc=null;
  startMemoryOfChaos();
}
function generateMOCBoss(name,index){
  const grade=MODE_GRADE_DEFS[getModeGradeIndex(state.moc.grade)];
  const stage=towerCombatRank(grade.floor);
  const hp=getScaledBossHp(stage);
  const elements=ENEMY_ELEMENT_SETS[name].slice();
  const boss={id:`moc${index}`,name,hp,maxHp:hp,atk:Math.round((150+stage*24+stage*stage*0.22)*BOSS_ATK_FACTOR),def:Math.round(35+stage*6+stage*stage*0.05),speed:100+Math.floor((stage-1)/10)*4,element:elements[0],elements,isBoss:true,phase:1,maxPhases:grade.phases,mocDamageReduction:grade.mocDamageReduction,phaseTwoAttackMultiplier:grade.phaseAtkMultiplier,modeGrade:grade.id,bossTurns:0,role:null,specialTurns:0,rageStacks:0,vulnerableToElement:null,vulnerableRounds:0,defDownPct:0,defDownRounds:0,inaMarked:false,shield:0,dots:[],seasickStacks:0,addsWaveStarted:false,addsWaveResolved:false,addsTurnsRemaining:0,psychoHitCount:0,psychoTriggeredThisRound:false};
  return expandConstructBossParts(boss);
}

function generateApocalypticShadowBoss(name){
  const grade=MODE_GRADE_DEFS[getModeGradeIndex(state.apoc.grade)];
  const stage=towerCombatRank(grade.floor);
  const hp=getScaledBossHp(stage);
  const atk=Math.round((150+stage*24+stage*stage*0.22)*BOSS_ATK_FACTOR);
  const elements=ENEMY_ELEMENT_SETS[name].slice();
  const boss={
    id:'apoc0',name,hp,maxHp:hp,atk,
    def:Math.round(35+stage*6+stage*stage*0.05),
    speed:100+Math.floor((stage-1)/10)*4,element:elements[0],elements,isBoss:true,phase:1,maxPhases:grade.phases,bossTurns:0,
    role:null,specialTurns:0,rageStacks:0,vulnerableToElement:null,vulnerableRounds:0,
    defDownPct:0,defDownRounds:0,inaMarked:false,shield:0,dots:[],seasickStacks:0,
    addsWaveStarted:false,addsWaveResolved:false,addsTurnsRemaining:0,
    apocStacks:0,apocStacksRequired:grade.apocStacksRequired,apocRequiresWeakness:grade.apocRequiresWeakness,
    apocDamageReduction:grade.apocDamageReduction,apocShieldRemoved:false,modeGrade:grade.id,
  };
  return expandConstructBossParts(boss);
}

/* ============ SIMULATED UNIVERSE (roguelike) ============ */
const SU_UNLOCK_STAGE = 5; // unlocked once floor 5 is cleared
const SU_WAVES = 10;
const SU_REWARD = 1000;
const SU_BLESSINGS = [
  {name:'Vigore', desc:'ATK +20%.', apply:a=>{ a.atk=Math.round(a.atk*1.2); }},
  {name:'Tempra', desc:'PV massimi +25%.', apply:a=>{ const m=Math.round(a.maxHp*1.25); a.hp+=m-a.maxHp; a.maxHp=m; }},
  {name:'Corazza', desc:'DEF +25%.', apply:a=>{ a.def=Math.round(a.def*1.25); }},
  {name:'Passo Leggero', desc:'VEL +8.', apply:a=>{ a.speed+=8; }},
  {name:'Furia', desc:'Danni inflitti +20%.', apply:a=>{ a.damageMult+=0.2; }},
  {name:'Fonte di Energia', desc:'Energia ottenuta +30%.', apply:a=>{ a.energyGainMult+=0.3; }},
  {name:'Mani Guaritrici', desc:'Cure e scudi +30%.', apply:a=>{ a.healMult+=0.3; a.shieldMult+=0.3; }},
  {name:'Rigenerazione', desc:'Dopo ogni ondata la squadra recupera il 10% di PV in più.', team:su=>{ su.regen+=0.1; }},
  {name:'Occhio Acuto', desc:'Danno contro le debolezze +30%.', apply:a=>{ a.weaknessBonus+=0.3; }},
  {name:'Maestria di Base', desc:'Danni degli Attacchi Base +30%.', apply:a=>{ a.basicDamageMult+=0.3; }},
  {name:'Colpi Risolutivi', desc:'Danni di Skill e Ultimate +30%.', apply:a=>{ a.skillDamageMult+=0.3; }},
  {name:'Brace Persistente', desc:'Danni da Sanguinamento +40%.', apply:a=>{ a.burnMult+=0.4; }},
  {name:'Riserva Tattica', desc:'+1 Punto Abilità iniziale a ogni ondata.', team:su=>{ su.bonusSp+=1; }},
  {name:'Cuore di Pietra', desc:'PV massimi +15% e DEF +15%.', apply:a=>{ const m=Math.round(a.maxHp*1.15); a.hp+=m-a.maxHp; a.maxHp=m; a.def=Math.round(a.def*1.15); }},
  {name:'Eco di Comando', desc:'Efficacia dei buff ATK +25%.', apply:a=>{ a.buffPctBonus+=0.25; }},
];
const SU_OCCURRENCES = [
  {id:'fontana', title:'La Fontana Oscura', text:'Tra le rovine trovate una fontana che sussurra: l\'acqua brilla di una luce inquieta.', choices:[
    {label:'Bere l\'acqua', outcomes:[{p:0.6,text:'L\'acqua ti rinvigorisce: la squadra recupera il 40% dei PV.',do:{heal:0.4}},{p:0.4,text:'L\'acqua era avvelenata! La squadra perde il 20% dei PV.',do:{hurt:0.2}}]},
    {label:'Gettare una moneta', outcomes:[{p:1,text:'La fontana accetta l\'offerta e ti concede una Benedizione.',do:{blessing:1}}]},
    {label:'Ignorarla', outcomes:[{p:1,text:'Prosegui senza voltarti.',do:{}}]}]},
  {id:'mercante', title:'Il Mercante Spettrale', text:'Una figura incappucciata espone tesori impossibili e chiede in cambio un po\' del tuo sangue.', choices:[
    {label:'Pagare con i PV (-25%)', outcomes:[{p:1,text:'Il mercante sorride e ti consegna due Benedizioni.',do:{hurt:0.25,blessing:2}}]},
    {label:'Derubarlo', outcomes:[{p:0.5,text:'Riesci a fuggire con un tesoro!',do:{blessing:1}},{p:0.5,text:'Il mercante si dissolve in un\'ombra furiosa: è battaglia!',do:{fight:true}}]},
    {label:'Rifiutare', outcomes:[{p:1,text:'Il mercante svanisce nella nebbia.',do:{}}]}]},
  {id:'altare', title:'L\'Altare Spezzato', text:'Un altare crepato pulsa di una vecchia energia. Qualcuno ha inciso un nome che non riesci a leggere.', choices:[
    {label:'Pregare', outcomes:[{p:0.7,text:'Una luce calda ti avvolge: la squadra recupera il 30% dei PV.',do:{heal:0.3}},{p:0.3,text:'Non succede nulla. Solo silenzio.',do:{}}]},
    {label:'Offrire sangue (-20% PV)', outcomes:[{p:1,text:'L\'altare accetta il sacrificio e ti dona una Benedizione.',do:{hurt:0.2,blessing:1}}]},
    {label:'Spaccarlo', outcomes:[{p:1,text:'Dalle macerie emergono i custodi dell\'altare!',do:{fight:true}}]}]},
  {id:'eco', title:'L\'Eco di un Eroe Caduto', text:'Una voce familiare riecheggia tra le pareti: sembra il ricordo di un eroe che non ce l\'ha fatta.', choices:[
    {label:'Ascoltare', outcomes:[{p:0.5,text:'Il ricordo ti insegna una tecnica dimenticata: ottieni una Benedizione.',do:{blessing:1}},{p:0.5,text:'La voce è un inganno! L\'incubo ti ferisce: la squadra perde il 15% dei PV.',do:{hurt:0.15}}]},
    {label:'Onorare i caduti', outcomes:[{p:1,text:'Un momento di quiete: la squadra recupera il 20% dei PV.',do:{heal:0.2}}]},
    {label:'Andare avanti', outcomes:[{p:1,text:'L\'eco si spegne alle tue spalle.',do:{}}]}]},
  {id:'uovo', title:'L\'Uovo Pulsante', text:'Un uovo gigantesco, caldo al tatto, pulsa a ritmo con il tuo cuore.', choices:[
    {label:'Toccarlo', outcomes:[{p:0.5,text:'L\'uovo si schiude in luce pura: ottieni due Benedizioni!',do:{blessing:2}},{p:0.5,text:'Qualcosa dentro si sveglia furioso!',do:{fight:true}}]},
    {label:'Osservarlo da lontano', outcomes:[{p:1,text:'Il calore dell\'uovo ti rilassa: la squadra recupera il 15% dei PV.',do:{heal:0.15}}]},
    {label:'Allontanarsi', outcomes:[{p:1,text:'Meglio non svegliare ciò che dorme.',do:{}}]}]},
  {id:'scrigno', title:'Lo Scrigno Maledetto', text:'Uno scrigno incatenato giace in mezzo alla stanza. Le catene tremano quando ti avvicini.', choices:[
    {label:'Aprirlo', outcomes:[{p:0.6,text:'Dentro c\'è un tesoro luminoso: ottieni una Benedizione.',do:{blessing:1}},{p:0.4,text:'La maledizione colpisce! La squadra perde il 25% dei PV.',do:{hurt:0.25}}]},
    {label:'Spezzare le catene', outcomes:[{p:1,text:'Le catene erano il sigillo di un guardiano: si risveglia!',do:{fight:true}}]},
    {label:'Lasciarlo stare', outcomes:[{p:1,text:'Ti allontani con un brivido.',do:{}}]}]},
];

function ensureSUDay(){
  const key=pfDateKey();
  if(!state.suDaily || state.suDaily.date!==key) state.suDaily={date:key,claimed:false,bestWave:0};
  return state.suDaily;
}
// Difficulty follows the highest cleared tower floor: wave 1 ~70% of it, wave 9 ~100%, boss at the nearest boss floor.
function suClearedFloor(){ return Math.max(3,state.maxStageReached-1); }
function generateSUEnemies(wave,fight){
  const enemies=generateSUBaseEnemies(wave,fight);
  // every Blessing taken makes enemies a bit tougher
  const picked=state.su.blessings.length;
  const hpMult=1+0.07*picked, atkMult=1+0.04*picked;
  enemies.forEach(e=>{ e.hp=e.maxHp=Math.round(e.maxHp*hpMult); e.atk=Math.round(e.atk*atkMult); });
  return enemies;
}
function generateSUBaseEnemies(wave,fight){
  const cleared=suClearedFloor();
  if(wave>=SU_WAVES && !fight){
    const stage=Math.max(5,Math.ceil(cleared/5)*5);
    const hp=Math.round((1100+stage*190+stage*stage*2.6)*0.65*BOSS_HP_FACTOR);
    const elements=ENEMY_ELEMENT_SETS[state.su.bossName].slice();
    const boss={id:'e0',name:state.su.bossName,hp,maxHp:hp,atk:Math.round((150+stage*24+stage*stage*0.22)*BOSS_ATK_FACTOR),def:Math.round(35+stage*6+stage*stage*0.05),speed:100,element:elements[0],elements,isBoss:true,phase:1,bossTurns:0,role:null,specialTurns:0,rageStacks:0,vulnerableToElement:null,vulnerableRounds:0,defDownPct:0,defDownRounds:0,inaMarked:false,shield:0,dots:[],seasickStacks:0,addsWaveStarted:false,addsWaveResolved:false,addsTurnsRemaining:0,psychoHitCount:0,psychoTriggeredThisRound:false};
    return expandConstructBossParts(boss);
  }
  let stage=Math.round(cleared*0.7+(Math.min(wave,9)-1)*cleared*0.3/8);
  if(stage%5===0) stage++;
  const baseStage=Math.max(3,stage);
  const enemies=generateEnemies(baseStage);
  while(enemies.length<3){
    const extra=generateEnemies(baseStage)[0];
    extra.id='e'+enemies.length;
    extra.name=pick(ENEMY_NAMES.filter(n=>!enemies.some(e=>e.name===n))); 
    extra.elements=ENEMY_ELEMENT_SETS[extra.name].slice();
    extra.element=extra.elements[0];
    extra.role=null;
    enemies.push(extra);
  }
  enemies.length=3;
  if(fight) enemies.forEach(e=>{ e.hp=e.maxHp=Math.round(e.maxHp*1.25); e.atk=Math.round(e.atk*1.1); });
  return enemies;
}
function syncAllyBuffMultipliers(ally){
  const buffs=ally.activeBuffs||[];
  ally.atkBuffMult=1+buffs.filter(buff=>buff.stat==='atk').reduce((sum,buff)=>sum+buff.pct,0);
  ally.defBuffMult=1+buffs.filter(buff=>buff.stat==='def').reduce((sum,buff)=>sum+buff.pct,0);
  ally.dotDamageBuffMult=1+buffs.filter(buff=>buff.stat==='dotDamage').reduce((sum,buff)=>sum+buff.pct,0);
  ally.damageBuffMult=1+buffs.filter(buff=>buff.stat==='damage').reduce((sum,buff)=>sum+buff.pct,0);
  const maxHpBuff= buffs.filter(buff=>buff.stat==='maxHp').reduce((sum,buff)=>sum+buff.pct,0);
  if(Number.isFinite(ally.baseMaxHp)&&(maxHpBuff>0||ally.maxHpBuffActive)){
    ally.maxHp=Math.round(ally.baseMaxHp*(1+maxHpBuff));
    ally.hp=Math.min(ally.hp,ally.maxHp);
    ally.maxHpBuffActive=maxHpBuff>0;
  }
  ally.buffRounds=buffs.filter(buff=>buff.stat==='atk').reduce((max,buff)=>Math.max(max,buff.rounds),0);
  ally.defBuffRounds=buffs.filter(buff=>buff.stat==='def').reduce((max,buff)=>Math.max(max,buff.rounds),0);
}
function addTimedAllyBuff(ally,name,stat,pct,rounds,refresh=false){
  ally.activeBuffs=ally.activeBuffs||[];
  const existing=stat==='maxHp'||refresh?ally.activeBuffs.find(buff=>buff.name===name&&buff.stat===stat):null;
  if(existing){ existing.rounds=rounds; existing.pct=pct; }
  else ally.activeBuffs.push({name,stat,pct,rounds});
  syncAllyBuffMultipliers(ally);
}
function tickTimedAllyBuffs(ally,stat){
  ally.activeBuffs=(ally.activeBuffs||[]).map(buff=>stat&&buff.stat!==stat?buff:{...buff,rounds:buff.rounds-1}).filter(buff=>buff.rounds>0);
  syncAllyBuffMultipliers(ally);
}
function clearTimedAllyBuffs(ally,stat){
  ally.activeBuffs=(ally.activeBuffs||[]).filter(buff=>buff.stat!==stat);
  syncAllyBuffMultipliers(ally);
}
function resetAlliesForWave(allies){
  allies.forEach(a=>{
    const c=CHAR_DB[a.charId];
    a.shield=0; a.shieldRounds=0; a.atkBuffMult=1; a.buffRounds=0;
    a.defBuffMult=1; a.defBuffRounds=0; a.dotDamageBuffMult=1;
    a.activeBuffs=[];
    syncAllyBuffMultipliers(a);
    a.basicHits=c.basic.hits||1;
    a.skillFreeUses=c.skillFreeUses||0;
    a.inaFollowUpsRemaining=c.passiveInaFollowUps||0;
    a.zetaFollowUpsRemaining=c.passiveZetaFollowUps||0;
    a.suiseiHpLossEvents=0; a.suiseiFollowUpReady=false; a.suiseiGuardRounds=0; a.suiseiGuardFresh=false; a.tauntRounds=0; a.tauntFresh=false; a.tauntSource=null;
    a.suiseiRevivesRemaining=c.revivesPerBattle||0;
    a.hakosForm=false;
    a.hitStacks=[]; a.turnSkillCount=0;
  });
}
function healAlliesBetweenWaves(fraction){
  state.su.allies.forEach(a=>{
    a.hp=clamp(Math.max(0,a.hp)+Math.round(a.maxHp*fraction),0,a.maxHp);
  });
}
function applySUBlessing(blessing){
  const su=state.su;
  su.allies.forEach(a=>{ if(blessing.apply) blessing.apply(a); });
  if(blessing.team) blessing.team(su);
  su.blessings.push(blessing.name);
}
function grantRandomSUBlessings(count){
  const names=[];
  for(let i=0;i<count;i++){
    const b=pick(SU_BLESSINGS);
    applySUBlessing(b);
    names.push(b.name);
  }
  return names;
}
function startSimulatedUniverse(){
  if(state.maxStageReached<=SU_UNLOCK_STAGE) return;
  state.su={wave:1,blessings:[],allies:null,bonusSp:0,regen:0,phase:'start',choices:[],startChoices:shuffleArr(SU_BLESSINGS).slice(0,3),pendingStart:null,bossName:pick(BOSS_NAMES),occ:null,result:null,lastOcc:false,seenOcc:[],reward:0,outcome:null};
  state.screen='su';
  render();
}
function startNextSUWave(){
  resetAlliesForWave(state.su.allies);
  state.su.phase=null;
  startBattle('su');
}
function onSUWaveClear(){
  const b=state.battle, su=state.su;
  state.autoBattle=false;
  if(b.hakosFormState) restoreHakosUltimate(b);
  su.allies=b.allies;
  if(b.suFight){
    const names=grantRandomSUBlessings(1);
    su.result={text:`Hai vinto lo scontro! Ottieni la Benedizione: ${names.join(', ')}.`,fight:false};
    su.phase='occurrenceResult';
    state.screen='su';
    return;
  }
  if(su.wave>=SU_WAVES){ endSimulatedUniverse('win'); return; }
  healAlliesBetweenWaves(0.3+su.regen);
  su.choices=shuffleArr(SU_BLESSINGS).slice(0,3);
  su.phase='blessing';
  state.screen='su';
}
function suChooseBlessing(index){
  const su=state.su;
  applySUBlessing(su.choices[index]);
  su.wave++;
  const canOccur=!su.lastOcc && su.seenOcc.length<SU_OCCURRENCES.length && Math.random()<0.45;
  if(canOccur){
    const occ=pick(SU_OCCURRENCES.filter(o=>!su.seenOcc.includes(o.id)));
    su.seenOcc.push(occ.id);
    su.occ=occ;
    su.lastOcc=true;
    su.phase='occurrence';
    render();
  } else {
    su.lastOcc=false;
    startNextSUWave();
  }
}
function suChooseOccurrence(index){
  const su=state.su;
  const choice=su.occ.choices[index];
  let roll=Math.random(), outcome=choice.outcomes[choice.outcomes.length-1];
  for(const o of choice.outcomes){ if(roll<o.p){ outcome=o; break; } roll-=o.p; }
  const d=outcome.do||{};
  let extra='';
  if(d.hurt) state.su.allies.forEach(a=>{ if(a.hp>0) a.hp=Math.max(1,a.hp-Math.round(a.maxHp*d.hurt)); });
  if(d.heal) state.su.allies.forEach(a=>{ if(a.hp>0) a.hp=clamp(a.hp+Math.round(a.maxHp*d.heal),0,a.maxHp); });
  if(d.blessing) extra=` Benedizioni ottenute: ${grantRandomSUBlessings(d.blessing).join(', ')}.`;
  su.result={text:outcome.text+extra,fight:!!d.fight};
  su.phase='occurrenceResult';
  render();
}
function suContinueAfterOccurrence(){
  const su=state.su;
  if(su.result.fight){ startBattle('su',true); return; }
  startNextSUWave();
}
function endSimulatedUniverse(outcome){
  const su=state.su, day=ensureSUDay();
  state.autoBattle=false;
  day.bestWave=Math.max(day.bestWave,outcome==='win'?SU_WAVES:su.wave);
  su.reward=0;
  if(outcome==='win' && !day.claimed){
    day.claimed=true;
    state.gold+=SU_REWARD;
    su.reward=SU_REWARD;
  }
  if(outcome==='win'){
    if(!state.suCleared) su.firstClear=true;
    state.suCleared=true;
  }
  su.outcome=outcome;
  su.phase='end';
  state.screen='su';
}
function suAbandon(){
  if(!state.su) return;
  state.battle=null;
  endSimulatedUniverse('defeat');
  render();
}

/* ============ DOMAINS ============ */
// Pick a set, fight a tower-scaled battle, get artifacts of that set (with a boosted legendary chance).
function domainStage(){
  let stage=Math.max(3,state.maxStageReached-1);
  if(stage%5===0) stage++;
  return stage;
}
function generateDomainEnemies(){
  const enemies=generateEnemies(domainStage());
  enemies.forEach(e=>{ e.hp=e.maxHp=Math.round(e.maxHp*1.15); });
  return enemies;
}
function startDomain(setId){
  if(!ARTIFACT_SETS[setId]) return;
  startBattle('domain',setId);
}
function onDomainVictory(){
  const b=state.battle;
  const stage=domainStage();
  const loot=[];
  for(let i=0;i<3;i++) loot.push(generateArtifact(stage,b.domainSet,0.3));
  b.loot=loot;
  state.inventory.push(...loot);
  b.creditReward=Math.round(getStageGoldReward(stage)*1.5);
  state.credits+=b.creditReward;
  recordDailyMissionProgress('battle');
  state.autoBattle=false;
  state.screen='victory';
}

function startBattle(mode,fight){
  const su = mode==='su';
  const domain = mode==='domain';
  const pf = mode==='pf';
  const moc = mode==='moc';
  const apoc = mode==='apoc';
  if(!su&&!domain&&!pf&&!moc&&!apoc&&(state.stage<1||state.stage>Math.min(state.maxStageReached,TOWER_MAX_FLOOR))) return;
  const pfGrade=pf?getModeGrade('pf'):null;
  const pfBuffs = pf ? getPFDailyBuffs() : null;
  const activeParty=moc?state.mocTeams[state.moc.bossIndex]:state.party;
  const mocBuffs=moc?state.moc.setup.buffs:null;
  const apocBuffs=apoc?state.apoc.setup.buffs:null;
  let allies = activeParty.map(id=>{
    const eff = getEffectiveStats(id);
    return {
      charId:id, name:CHAR_DB[id].name, color:CHAR_DB[id].color, glyph:CHAR_DB[id].glyph, element:CHAR_DB[id].element,
      hp:eff.hp, maxHp:eff.hp, atk:eff.atk, def:eff.def, speed:eff.speed,
      energy:clamp(eff.startEnergyBonus,0,eff.energyMax), energyMax:eff.energyMax,
      energyGainMult:eff.energyGainMult, healMult:eff.healMult, burnMult:eff.burnMult, dotDamageMult:eff.dotDamageMult, shieldMult:eff.shieldMult,
      damageMult:eff.damageMult, ultDamageMult:eff.ultDamageMult, weaknessBonus:eff.weaknessBonus, sameElementBonus:eff.sameElementBonus,
      basicDamageMult:eff.basicDamageMult, buffPctBonus:eff.buffPctBonus, spGrantBonus:eff.spGrantBonus,
      formDamageMult:eff.formDamageMult, defDownBonus:eff.defDownBonus, hpDamageMult:eff.hpDamageMult, skillDamageMult:eff.skillDamageMult,
      fxSkillSp:eff.fxSkillSp, fxAbsent:eff.fxAbsent, fxHitStack:eff.fxHitStack, turnSkillCount:0, hitStacks:[],
      shield:0, shieldRounds:0, atkBuffMult:1, damageBuffMult:1, buffRounds:0,
      defBuffMult:1, defBuffRounds:0, dotDamageBuffMult:1, activeBuffs:[],
      basicHits: CHAR_DB[id].basic.hits||1,
      skillFreeUses: CHAR_DB[id].skillFreeUses||0,
      singleAllyDamageBuff:eff.singleAllyDamageBuff,
      inaFollowUpsRemaining: CHAR_DB[id].passiveInaFollowUps||0,
      zetaFollowUpsRemaining: CHAR_DB[id].passiveZetaFollowUps||0,
      suiseiHpLossEvents:0,suiseiFollowUpReady:false,suiseiGuardRounds:0,suiseiGuardFresh:false,
      suiseiRevivesRemaining:CHAR_DB[id].revivesPerBattle||0,
      takaneDebuffCharges:0,
    };
  });
  if(pf) applyPFBuffs(allies,pfBuffs);
  if(moc) applyPFBuffs(allies,mocBuffs);
  if(apoc) applyPFBuffs(allies,apocBuffs);
  if(su){
    if(state.su.allies) allies=state.su.allies;
    else {
      state.su.allies=allies;
      if(state.su.pendingStart){ applySUBlessing(state.su.pendingStart); state.su.pendingStart=null; }
    }
  }
  const holoXMemberCount=allies.filter(ally=>CHAR_DB[ally.charId].faction==='HoloX').length;
  allies.filter(ally=>ally.charId==='takaneLui'&&!ally.holoXAtkBonusApplied).forEach(ally=>{
    ally.holoXAtkBonus=holoXMemberCount*CHAR_DB.takaneLui.holoXAttackPerMember;
    ally.atk=Math.round(ally.atk*(1+ally.holoXAtkBonus));
    ally.holoXAtkBonusApplied=true;
  });
  allies.forEach(ally=>{ if(!Number.isFinite(ally.baseMaxHp)) ally.baseMaxHp=ally.maxHp; });
  const enemies = pf ? generatePFEnemies() : moc ? generateMOCBoss(state.moc.setup.bosses[state.moc.bossIndex],state.moc.bossIndex) : apoc ? generateApocalypticShadowBoss(state.apoc.setup.boss) : su ? generateSUEnemies(state.su.wave,!!fight) : domain ? generateDomainEnemies() : generateEnemies(state.stage,towerCombatRank(state.stage),true,towerHpRank(towerCombatRank(state.stage)));
  const turnOrder = buildTurnOrder(allies,enemies);
  const spMaxBonus = activeParty.reduce((sum,id)=>sum+(CHAR_DB[id].passiveSpCapBonus||0),0);
  const spMax = 5+spMaxBonus;
  state.battle = {
    allies, enemies, turnOrder,
    sp:Math.min(3+(su?state.su.bonusSp:0),spMax), spMax,
    round:1,
    turnIndex:0,
    phase:turnOrder[0].side==='ally'?'ally_turn':'enemy_turn',
    pendingAbility:null,
    busy:false,
    finanaFollowUpsThisRound:0,
    screenFx:null,
    log:[],
    loot:[],
    inaFollowUpActive:false,
    zetaFollowUpActive:false,
    suiseiFollowUpActive:false,
    summonCounter:pf?5:0,
    mode:pf?'pf':moc?'moc':apoc?'apoc':su?'su':domain?'domain':'tower',
    domainSet:domain?fight:null,
    suFight:su&&!!fight,
    pf:pf?{score:0,kills:0,lastSpawn:null,buffs:pfBuffs,grade:pfGrade.id,rank:towerCombatRank(pfGrade.floor),hpRank:towerHpRank(towerCombatRank(pfGrade.floor)),enemyCount:pfGrade.pfEnemies,specialChance:pfGrade.pfSpecialChance,thresholds:getPFScoreThresholds(activeParty.length)}:null,
    mocBossIndex:moc?state.moc.bossIndex:null,
    apoc:apoc?{bossName:state.apoc.setup.boss,grade:state.apoc.grade}:null,
    apocTurns:0,
    koboCorrosionAura:false,
    koboCorrosionDamageMult:1,
  };
  state.autoBattle=false;
  const firstActor = getTurnActor(state.battle);
  logMsg(pf
    ? `Pure Fiction — Turno 1/${PF_ROUNDS}. ${firstActor.name} agisce per primo (${firstActor.speed} VEL).`
    : apoc
    ? `Apocalyptic Shadow ${state.apoc.grade} — ${enemies[0].name}. Riduzione danni ${Math.round(enemies[0].apocDamageReduction*100)}%: ${enemies[0].apocStacksRequired} colpi ${enemies[0].apocRequiresWeakness?'con un elemento efficace ':''}per rimuoverla. Hai ${getModeGradeById(state.apoc.grade).roundLimit} round. ${firstActor.name} agisce per primo (${firstActor.speed} VEL).`
    : moc
    ? `Memory of Chaos ${state.moc.grade} — Boss ${state.moc.bossIndex+1}/${state.moc.singleTeam?1:2}: ${enemies[0].name}. ${firstActor.name} agisce per primo (${firstActor.speed} VEL).`
    : su
    ? `Universo Simulato — Ondata ${state.su.wave}/${SU_WAVES}${fight?' (scontro)':''}. ${firstActor.name} agisce per primo (${firstActor.speed} VEL).`
    : domain
    ? `Dominio ${ARTIFACT_SETS[fight].name} — Livello ${domainStage()}. ${firstActor.name} agisce per primo (${firstActor.speed} VEL).`
    : `Piano ${state.stage} — Round 1. ${firstActor.name} agisce per primo (${firstActor.speed} VEL).`);
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

function ensureHakosExtraTurn(b){
  const actor=b.allies.find(ally=>ally.hakosForm);
  if(!actor||b.turnOrder.some(entry=>entry.hakosExtra)) return;
  const hakosIndex=b.turnOrder.findIndex(entry=>entry.side==='ally'&&entry.id===actor.charId);
  if(hakosIndex>=0) b.turnOrder.splice(hakosIndex+1,0,{...b.turnOrder[hakosIndex],hakosExtra:true});
}

async function advanceTurn(){
  const b = state.battle;
  if(!b) return;
  b.inaFollowUpActive=false; b.suiseiFollowUpActive=false; b.finanaActive=false; // follow-ups are always finished between turns
  if(b.phase!=='resolved') await processFinanaFollowUps(b);
  const completedActor=getTurnActor(b);
  if(completedActor) completedActor.turnSkillCount=0;
  if(completedActor?.activeBuffs?.length) tickTimedAllyBuffs(completedActor,'def');
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
    if((b.mode==='pf'&&b.round>=PF_ROUNDS)||(b.mode==='apoc'&&b.round>=getModeGradeById(b.apoc.grade).roundLimit)){
      if(b.mode==='apoc'){
        endApocalypticShadow('rounds');
        render();
        return;
      }
      endPureFiction('rounds');
      render();
      return;
    }
    b.round++;
    b.finanaFollowUpsThisRound=0;
    b.turnOrder = buildTurnOrder(b.allies,b.enemies);
    ensureHakosExtraTurn(b);
    b.turnIndex=0;
    logMsg(`— Round ${b.round} —`);
    await processFinanaFollowUps(b);
    if(checkBattleEnd()){
      render();
      return;
    }
  }

  b.phase = b.turnOrder[b.turnIndex].side==='ally' ? 'ally_turn' : 'enemy_turn';
  render();
  if(b.phase==='enemy_turn') await runEnemyTurn();
  else if(state.autoBattle) setTimeout(autoPlayTurn,550*BATTLE_PACE);
}

function checkBattleEnd(){
  const b = state.battle;
  if(b.mode==='pf') pfProcessKills(b);
  ensureInaMark(b); // the mark never disappears: if its holder died, it moves to another enemy
  const bossDefeated=b.enemies.some(enemy=>enemy.isBoss && enemy.hp<=0);
  if(bossDefeated || b.enemies.every(e=>e.hp<=0)){
    b.phase='resolved';
    if(b.mode==='apoc') endApocalypticShadow('victory');
    else if(b.mode==='su') onSUWaveClear();
    else if(b.mode==='domain') onDomainVictory();
    else if(b.mode==='moc') onMOCBattleWin();
    else onVictory();
    return true;
  }
  b.allies.filter(ally=>ally.charId==='suiseiHoshimachi').forEach(reviveSuiseiIfNeeded);
  if(b.allies.every(a=>a.hp<=0) && b.hakosFormState){
    restoreHakosUltimate(b,'knockout');
    if(b.allies.some(ally=>ally.hp>0)) return false;
  }
  if(b.allies.every(a=>a.hp<=0)){
    b.phase='resolved';
    if(b.mode==='pf') endPureFiction('defeat');
    else if(b.mode==='apoc') endApocalypticShadow('defeat');
    else if(b.mode==='su') endSimulatedUniverse('defeat');
    else if(b.mode==='moc') onMOCBattleDefeat();
    else onDefeat();
    return true;
  }
  return false;
}

/* ============ ABILITY EXECUTION ============ */
function getEffectiveEnemyDefense(enemy){
  return Math.max(0,enemy.def*(1-(enemy.defDownPct||0)));
}

function applyLaplusAttackEffects(actor,enemy,extraDefDown=0,removeLeaderElement=false){
  if(enemy.hp<=0) return;
  const reduction=(actor.charId==='laplusDarkness'?0.15:0)+(actor.defDownBonus||0)+extraDefDown;
  if(reduction>0){
    enemy.defDownPct=Math.min(0.75,(enemy.defDownPct||0)+reduction);
    enemy.defDownRounds=2;
    grantTakaneDebuffCharge(enemy);
    logMsg(`${enemy.name} subisce -${Math.round(reduction*100)}% DIF (${Math.round(enemy.defDownPct*100)}% totale).`);
  }
  if(removeLeaderElement){
    const leaderId=state.battle?.allies[0]?.charId||state.party[0];
    const leader=CHAR_DB[leaderId];
    const elementToRemove=leader?.element;
    const counterElement=elementToRemove&&ELEMENT_RELATION[elementToRemove];
    if(elementToRemove&&counterElement){
      const affected=enemy.constructGroupId
        ? state.battle.enemies.filter(part=>part.constructGroupId===enemy.constructGroupId)
        : [enemy];
      const elements=enemy.elements||(enemy.elements=[enemy.element]);
      const previousRemoval=affected.find(part=>part.laplusRemovedElement===elementToRemove);
      const previousAddition=affected.find(part=>part.laplusAddedElement===counterElement);
      const removedIndex=elements.indexOf(elementToRemove);
      const removedWasPresent=removedIndex>=0||!!previousRemoval?.laplusRemovedWeaknessWasPresent;
      const restoreIndex=previousRemoval?previousRemoval.laplusRemovedElementIndex:removedIndex;
      if(removedIndex>=0) elements.splice(removedIndex,1);

      const addedIndex=elements.indexOf(counterElement);
      const addedWasAbsent=previousAddition
        ? previousAddition.laplusAddedElementWasAbsent
        : addedIndex<0;
      const restoreAddedIndex=previousAddition
        ? previousAddition.laplusAddedElementIndex
        : elements.length;
      if(addedIndex<0) elements.push(counterElement);

      affected.forEach(part=>{
        part.laplusRemovedElement=elementToRemove;
        part.laplusRemovedWeaknessWasPresent=removedWasPresent;
        part.laplusRemovedElementIndex=restoreIndex;
        part.laplusAddedElement=counterElement;
        part.laplusAddedElementWasAbsent=addedWasAbsent;
        part.laplusAddedElementIndex=restoreAddedIndex;
        part.vulnerableRounds=2;
        part.vulnerableToElement=null;
      });
      if(removedWasPresent) grantTakaneDebuffCharge(enemy);
      logMsg(`${enemy.name} perde ${ELEMENT_DATA[elementToRemove].label} e acquisisce ${ELEMENT_DATA[counterElement].label} per 2 round.`);
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
  grantTakaneDebuffCharge(target,b.allies);
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
  const attack=Math.round(ina.maxHp*(ina.hpDamageMult||1));
  const dmg=calcDamage(attack,0.1,getEffectiveEnemyDefense(target),ina.element,target.elements||target.element,ina,'basic',vulnerability);
  const applied=dealDamageToEnemy(target,dmg,'basic',true,ina);
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

function getZetaActor(b){
  return b.allies.find(ally=>ally.charId==='vestiaZeta'&&ally.hp>0)||null;
}

async function performZetaFollowUp(b){
  const zeta=getZetaActor(b);
  if(!zeta||zeta.zetaFollowUpsRemaining<=0||b.zetaFollowUpActive) return false;
  const targets=shuffleArr(b.enemies.filter(enemy=>enemy.hp>0)).slice(0,2);
  if(targets.length===0) return false;
  zeta.zetaFollowUpsRemaining--;
  b.zetaFollowUpActive=true;
  zeta._fxAttack='basic';
  for(const target of targets){
    if(target.hp<=0) continue;
    const vulnerability=target.vulnerableRounds>0?target.vulnerableToElement:null;
    const attack=Math.round(zeta.atk*(zeta.atkBuffMult||1));
    const dmg=calcDamage(attack,0.85,getEffectiveEnemyDefense(target),zeta.element,target.elements||target.element,zeta,'basic',vulnerability);
    const applied=dealDamageToEnemy(target,dmg,'basic',true,zeta);
    if(target.hp>0) applyDamageOverTime(target,zeta,1);
    logMsg(`${zeta.name} esegue un follow-up su ${target.name}: ${applied} danni${target.hp>0?' e applica 1 Sanguinamento':''} (${zeta.zetaFollowUpsRemaining} cariche rimaste).`);
    render();
    await sleepMs(220);
  }
  b.zetaFollowUpActive=false;
  return true;
}

async function triggerInaFollowUpAfterHit(b,target,attacker){
  if(attacker?.charId!=='ninomaeInaNis' && target.inaMarked){
    const ina=getInaActor(b);
    if(ina && !ina.hakosForm){
      ina.energy=clamp(ina.energy+10,0,ina.energyMax);
      if(!ina._fx) ina._fx={variant:'buff',label:'+10 ⚡'};
    }
  }
  if(attacker?.charId!=='ninomaeInaNis'&&target.inaMarked&&!b.inaFollowUpActive){
    if(target.hp<=0){
      target.inaMarked=false;
      ensureInaMark(b);
      target=b.enemies.find(enemy=>enemy.inaMarked&&enemy.hp>0);
    }
    if(target) await performInaFollowUp(b,target,true);
  }
  if(attacker?.charId!=='vestiaZeta') await performZetaFollowUp(b);
}

function isEnemyWeakTo(element,enemy){
  const vulnerability=enemy.vulnerableRounds>0?enemy.vulnerableToElement:null;
  return getElementMultiplier(element,enemy.elements||enemy.element,0,0,vulnerability)>1;
}

function getSetDynamicMult(attacker){
  if(!attacker || !state.battle) return 1;
  let mult=1;
  if(attacker.fxSkillSp) mult*=1+0.3*(attacker.turnSkillCount||0);
  if(attacker.fxAbsent) mult*=1+0.3*Math.max(0,4-state.battle.allies.length);
  if(attacker.fxHitStack) mult*=1+0.15*(attacker.hitStacks||[]).length;
  return mult;
}

function calcDamage(atk, mult, def, attackerElement, targetElement, attackerStats=null, abilityKey='', vulnerableToElement=null){
  let raw = atk*mult - def*0.5;
  raw = Math.max(raw, atk*mult*0.2);
  const variance = rnd(0.9,1.1);
  const elementMult = getElementMultiplier(attackerElement, targetElement, attackerStats?.weaknessBonus||0, attackerStats?.sameElementBonus||0, vulnerableToElement);
  const weaponMult = (attackerStats?.damageMult||1)*(attackerStats?.damageBuffMult||1)*(abilityKey==='basic'?(attackerStats?.basicDamageMult||1):1)*(abilityKey==='skill'||abilityKey==='ult'?(attackerStats?.skillDamageMult||1):1)*(abilityKey==='ult'?(attackerStats?.ultDamageMult||1):1)*(attackerStats?.formDamageMult||1)*getSetDynamicMult(attackerStats);
  return Math.max(1, Math.round(raw*variance*elementMult*weaponMult));
}

function isAbissoProtected(enemy){
  return enemy.name==='Abisso Primordiale' && state.battle.enemies.some(e=>e!==enemy && e.hp>0);
}

function applyBossDamageReduction(enemy,dmg,attackType=''){
  if(state.battle?.mode==='apoc'&&enemy.apocDamageReduction>0){
    return Math.max(1,Math.round(dmg*(1-enemy.apocDamageReduction)));
  }
  if(state.battle?.mode==='moc'&&enemy.mocDamageReduction>0){
    return Math.max(1,Math.round(dmg*(1-enemy.mocDamageReduction)));
  }
  if(enemy.name==='Custode della Civiltà'&&enemy.phase===2&&enemy.mumeiGuardActive){
    return Math.max(1,Math.round(dmg*0.6));
  }
  if(enemy.name==='Titano dell’Eclissi'&&enemy.phase===2&&['basic','ult'].includes(attackType)){
    return Math.max(1,Math.round(dmg*0.2));
  }
  return dmg;
}
function syncConstructHealth(enemy){
  if(!enemy.constructGroupId) return;
  state.battle.enemies.forEach(part=>{
    if(part.constructGroupId===enemy.constructGroupId){
      part.hp=enemy.hp;
      part.maxHp=enemy.maxHp;
      part.phase=enemy.phase;
      part.atk=enemy.atk;
      part.bossTurns=enemy.bossTurns;
      part.apocStacks=enemy.apocStacks;
      part.apocDamageReduction=enemy.apocDamageReduction;
      part.apocShieldRemoved=enemy.apocShieldRemoved;
      part.apocStacksRequired=enemy.apocStacksRequired;
    }
  });
}
function applyEnemyHealthDamage(enemy,amount){
  const damage=enemy.apocDamageReduction>0?Math.min(amount,Math.max(0,enemy.hp-1)):amount;
  enemy.hp=clamp(enemy.hp-damage,0,enemy.maxHp);
  syncConstructHealth(enemy);
}
function grantApocalypticShadowEnergy(boss){
  const b=state.battle;
  const allies=[...b.allies,...(b.hakosFormState?.allies||[])];
  [...new Set(allies)].forEach(ally=>{
    ally.energy=ally.energyMax;
    if(ally.hakosForm) ally.apocEnergyReady=true;
    ally._fx={variant:'spgrant',label:'ENERGIA AL MASSIMO'};
  });
  logMsg(`${boss.name} perde la riduzione ai danni: tutti gli alleati ottengono energia massima.`);
}
function recordApocalypticShadowHit(boss,attacker){
  const b=state.battle;
  if(b?.mode!=='apoc'||!attacker||boss.apocDamageReduction<=0) return;
  const weakHit=getElementMultiplier(attacker.element,boss.elements||boss.element)>1;
  if(boss.apocRequiresWeakness&&!weakHit) return;
  boss.apocStacks=Math.min(boss.apocStacksRequired,(boss.apocStacks||0)+1);
  logMsg(`${attacker.name} centra un colpo efficace: stack elementali ${boss.apocStacks}/${boss.apocStacksRequired}.`);
  if(boss.apocStacks>=boss.apocStacksRequired){
    boss.apocDamageReduction=0;
    boss.apocShieldRemoved=true;
    grantApocalypticShadowEnergy(boss);
  }
  claimApocProgressRewards(boss);
  syncConstructHealth(boss);
}
function triggerSuiseiPsychoFollowUp(boss){
  if(boss.hp<=0) return;
  boss.psychoHitCount=(boss.psychoHitCount||0)+1;
  if(boss.psychoHitCount<4) return;
  boss.psychoHitCount=0;
  boss.psychoTriggeredThisRound=true;
  boss.psychoDamageBonus=(boss.psychoDamageBonus||0)+0.3;
  const battle=state.battle;
  const targets=battle.allies.filter(ally=>ally.hp>0);
  logMsg(`${boss.name} attiva il Follow-up psicotico! Danni inflitti +${Math.round(boss.psychoDamageBonus*100)}% permanente.`);
  targets.forEach(ally=>{
    const damage=calcDamage(getEffectiveEnemyAttack(boss),0.65,getEffectiveAllyDefense(ally),boss.element,ally.element);
    const result=dealDamageToAlly(ally,damage,true);
    logMsg(`${ally.name} subisce ${result.applied} danni dal Follow-up psicotico.`);
  });
  const healing=Math.min(boss.maxHp-boss.hp,Math.round(boss.maxHp*0.02));
  boss.hp+=healing;
  syncConstructHealth(boss);
  boss._fx={variant:'heal',label:'+'+healing};
  logMsg(`${boss.name} recupera ${healing} PV.`);
}
function dealDamageToEnemy(enemy, dmg, attackType='',countPsychoHit=true,attacker=null){
  if(attacker) recordApocalypticShadowHit(enemy,attacker);
  if(isAbissoProtected(enemy)) dmg=Math.max(1,Math.round(dmg*0.1));
  dmg=applyBossDamageReduction(enemy,dmg,attackType);
  const psychoBonusBefore=enemy.psychoDamageBonus||0;
  let applied = dmg;
  if(enemy.shield>0){
    if(enemy.shield>=applied){enemy.shield-=applied; applied=0;}
    else {applied-=enemy.shield; enemy.shield=0;}
  }
  applyEnemyHealthDamage(enemy,applied);
  updateBossPhase(enemy);
  if(state.battle?.mode==='apoc') claimApocProgressRewards(enemy);
  if(countPsychoHit&&enemy.name==='Suisei Pshyco') triggerSuiseiPsychoFollowUp(enemy);
  noteFinanaThreshold(enemy);
  if(enemy.hp<=0 && state.battle?.mode==='pf') pfProcessKills(state.battle); // respawn right away so chained follow-ups never find an empty field
  const absorbedE = dmg-applied;
  enemy._fx = (enemy.psychoDamageBonus||0)>psychoBonusBefore
    ? {variant:'buff',label:`+30% DANNI · TOTALE +${Math.round(enemy.psychoDamageBonus*100)}%`}
    : applied>0 ? {variant:'damage', label:'-'+applied} : {variant:'shield', label:'🛡-'+absorbedE};
  return applied;
}

const KOBO_SEASICK_MAX_STACKS=10;
function applyKoboSeasick(enemy){
  if(enemy.hp<=0) return;
  enemy.seasickStacks=Math.min(KOBO_SEASICK_MAX_STACKS,(enemy.seasickStacks||0)+1);
  grantTakaneDebuffCharge(enemy);
  const atkReduction=enemy.seasickStacks*5;
  enemy._fx={variant:'buff',label:`ATK -${atkReduction}%`};
  logMsg(`${enemy.name} accumula Mal di mare x${enemy.seasickStacks}: ATK -${atkReduction}%.`);
}

function getEffectiveEnemyAttack(enemy){
  const reduction=Math.min(0.5,(enemy.seasickStacks||0)*0.05);
  return Math.max(0,Math.round(enemy.atk*(1-reduction)*(1+(enemy.psychoDamageBonus||0))));
}

function applyDamageOverTime(enemy,actor,stacks,nameOverride=null){
  if(enemy.hp<=0) return;
  const name=nameOverride||CHAR_DB[actor.charId].dotName||'Bruciatura';
  enemy.dots=enemy.dots||[];
  let dot=enemy.dots.find(entry=>entry.name===name&&entry.sourceId===actor.charId);
  if(!dot){
    dot={name,sourceId:actor.charId,stacks:0,rounds:0,damagePct:0.045,damageMult:1};
    enemy.dots.push(dot);
  }
  dot.stacks+=stacks;
  dot.rounds=2;
  dot.damageMult=(actor.dotDamageMult||1)*(name==='Sanguinamento'?(actor.burnMult||1):1);
  grantTakaneDebuffCharge(enemy);
  logMsg(`${enemy.name} riceve ${dot.stacks} cariche di ${name}.`);
}

function applyKoboCorrosionIfNeeded(b,enemy){
  if(!b.koboCorrosionAura||enemy.hp<=0) return;
  const hasCorrosion=(enemy.dots||[]).some(dot=>dot.name==='Corrosione');
  if(hasCorrosion) return;
  applyDamageOverTime(enemy,{charId:'koboKanaeru',dotDamageMult:b.koboCorrosionDamageMult||1},1,'Corrosione');
}

function triggerKoboDotEnergy(b,dot,deferKoboEnergy=false){
  const kobo=b.allies.find(ally=>ally.charId==='koboKanaeru'&&ally.hp>0);
  if(!kobo) return 0;
  const source=b.allies.find(ally=>ally.charId===dot.sourceId&&ally.hp>0);
  const recipients=[...new Set([kobo,source].filter(Boolean))];
  let deferredEnergy=0;
  recipients.forEach(ally=>{
    const energy=Math.round(5*(ally.energyGainMult||1))*dot.stacks;
    if(ally===kobo&&deferKoboEnergy){
      deferredEnergy+=energy;
    } else {
      ally.energy=clamp(ally.energy+energy,0,ally.energyMax);
      ally._fx={variant:'spgrant',label:'+'+energy+' EN'};
    }
    logMsg(`${ally.name} recupera ${energy} energia grazie alla DoT ${dot.name}.`);
  });
  return deferredEnergy;
}

function triggerDamageOverTime(b,enemy,dot,detonate=false,deferKoboEnergy=false){
  if(!enemy.dots?.includes(dot)) return 0;
  if(enemy.hp<=0){
    enemy.dots=enemy.dots.filter(entry=>entry!==dot);
    return detonate?triggerKoboDotEnergy(b,dot,deferKoboEnergy):0;
  }
  const source=b.allies.find(ally=>ally.charId===dot.sourceId);
  const damage=Math.max(1,Math.round(enemy.maxHp*dot.damagePct*dot.stacks*(dot.damageMult||1)*(source?.dotDamageBuffMult||1)));
  const applied=applyBossDamageReduction(enemy,damage,'dot');
  applyEnemyHealthDamage(enemy,applied);
  updateBossPhase(enemy);
  noteFinanaThreshold(enemy);
  enemy._fx={variant:'damage',label:'-'+applied};
  logMsg(`${enemy.name} subisce ${applied} danni da ${dot.name}${detonate?' detonata':''}.`);
  const deferredEnergy=triggerKoboDotEnergy(b,dot,deferKoboEnergy);
  if(detonate){
    enemy.dots=enemy.dots.filter(entry=>entry!==dot);
  } else {
    dot.rounds--;
    if(dot.rounds<=0) enemy.dots=enemy.dots.filter(entry=>entry!==dot);
  }
  return deferredEnergy;
}

function detonateEnemyDamageOverTime(b,enemy,deferKoboEnergy=false){
  let deferredEnergy=0;
  for(const dot of [...(enemy.dots||[])]){
    deferredEnergy+=triggerDamageOverTime(b,enemy,dot,true,deferKoboEnergy);
  }
  return deferredEnergy;
}

// Finana: each enemy dropping to 50% HP for the first time queues one follow-up.
function noteFinanaThreshold(enemy){
  const b=state.battle;
  if(!b || enemy.finanaTriggered || enemy.hp<=0 || enemy.hp>enemy.maxHp*0.5) return;
  enemy.finanaTriggered=true;
  if(b.allies.some(a=>a.charId==='finanaRyugu'&&a.hp>0)) b.finanaPending=(b.finanaPending||0)+1;
}
async function processFinanaFollowUps(b){
  if(b.finanaActive) return;
  b.finanaActive=true;
  let guard=0;
  while((b.finanaPending||0)>0 && b.finanaFollowUpsThisRound<4 && guard++<8){
    b.finanaPending--;
    b.finanaFollowUpsThisRound++;
    const finana=b.allies.find(a=>a.charId==='finanaRyugu'&&a.hp>0);
    const targets=b.enemies.filter(e=>e.hp>0);
    if(!finana||targets.length===0){ b.finanaPending=0; break; }
    const ability=CHAR_DB.finanaRyugu.basic;
    finana._fxAttack='basic';
    logMsg(`${finana.name} lancia un follow-up: ${ability.name} (3% PV)!`);
    for(const t of targets){
      const vulnerability=t.vulnerableRounds>0?t.vulnerableToElement:null;
      const dmg=calcDamage(Math.round(finana.maxHp*(finana.hpDamageMult||1)),0.03,getEffectiveEnemyDefense(t),finana.element,t.elements||t.element,finana,'basic',vulnerability);
      const applied=dealDamageToEnemy(t,dmg,'basic',true,finana);
      logMsg(`${finana.name} colpisce ${t.name} per ${applied}.`);
    }
    render();
    await sleepMs(520);
  }
  b.finanaActive=false;
}

function updateBossPhase(enemy){
  if(!enemy.isBoss || enemy.phase>=(enemy.maxPhases||2) || enemy.hp>0) return false;
  // First bar emptied: refill for the second bar and drop every unfinished phase-1 action.
  enemy.finanaTriggered=false;
  enemy.phase=2;
  enemy.hp=enemy.maxHp;
  enemy.shield=0;
  enemy.atk=Math.round(enemy.atk*(enemy.phaseTwoAttackMultiplier||1.2));
  enemy.bossTurns=0;
  enemy.addsWaveStarted=false;
  enemy.addsWaveResolved=false;
  enemy.addsTurnsRemaining=0;
  if(enemy.name==='Custode della Civiltà'){
    enemy.mumeiGuardActive=true;
    enemy.mumeiGuardRounds=5;
    enemy.mumeiGuardFresh=true;
    enemy.mumeiGuardSkillPointsSpent=0;
  }
  syncConstructHealth(enemy);
  state.battle.enemies.forEach(e=>{ if(e.bossAddOwnerId===enemy.id) e.bossAddResolved=true; });
  logMsg(`${enemy.name} esaurisce la prima barra e entra nella Fase 2! Seconda barra di PV, ATK aumentato.`);
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
    const applied=dealDamageToEnemy(enemy,damage,'ult',true,actor);
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

function getEffectiveAllyDefense(ally){
  return ally.def*(ally.defBuffMult||1);
}

function dealDamageToAlly(ally, dmg, giveEnergy){
  if(ally.suiseiGuardRounds>0) dmg=Math.round(dmg*0.6);
  let applied = dmg;
  let absorbed = 0;
  if(ally.shield>0){
    if(ally.shield>=applied){ absorbed=applied; ally.shield-=applied; applied=0; }
    else { absorbed=ally.shield; applied-=ally.shield; ally.shield=0; }
  }
  if(ally.fxHitStack){
    ally.hitStacks=ally.hitStacks||[];
    ally.hitStacks.push({r:2});
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

async function performKiaraCounter(b,enemy,defender){
  const kiara=defender?.charId==='takanashiKiara'&&defender.hp>0?defender:null;
  if(!kiara||!enemy||enemy.hp<=0||b.kiaraCounterActive) return;
  b.kiaraCounterActive=true;
  const skill=CHAR_DB.takanashiKiara.skill;
  const effectiveDef=Math.round(kiara.def*(kiara.defBuffMult||1));
  const vulnerability=enemy.vulnerableRounds>0?enemy.vulnerableToElement:null;
  const damage=calcDamage(effectiveDef,skill.mult,getEffectiveEnemyDefense(enemy),kiara.element,enemy.elements||enemy.element,kiara,'skill',vulnerability);
  const applied=dealDamageToEnemy(enemy,damage,'skill',true,kiara);
  kiara._fxAttack='skill';
  logMsg(`${kiara.name} contrattacca ${enemy.name}: ${applied} danni.`);
  const healing=Math.round(effectiveDef*skill.healPct*(kiara.healMult||1));
  kiara.hp=clamp(kiara.hp+healing,0,kiara.maxHp);
  kiara._fx={variant:'heal',label:'+'+healing};
  logMsg(`${kiara.name} recupera ${healing} PV dal contrattacco.`);
  render();
  await sleepMs(300);
  b.kiaraCounterActive=false;
}

const HAKOS_FORM_ABILITIES={
  basic:{name:'Dado del Caos',desc:'Attacco Base potenziato: colpisce il bersaglio e i nemici adiacenti, fino a 3 nemici.',mult:1.35,target:'enemy_adjacent',effect:null,energyGain:0},
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
    atk:actor.atk,def:actor.def,speed:actor.speed,maxHp:actor.maxHp,hp:actor.hp,baseMaxHp:actor.baseMaxHp,
  };
  actor.hakosFormStartHp=actor.hp+absorbed.reduce((sum,ally)=>sum+ally.hp,0);
  actor.maxHp+=absorbed.reduce((sum,ally)=>sum+ally.maxHp,0);
  actor.baseMaxHp+=absorbed.reduce((sum,ally)=>sum+(ally.baseMaxHp||ally.maxHp),0);
  actor.hp=Math.min(actor.maxHp,actor.hp+absorbed.reduce((sum,ally)=>sum+ally.hp,0));
  actor.atk=Math.round(actor.atk*(actor.atkBuffMult||1)+absorbed.reduce((sum,ally)=>sum+ally.atk*(ally.atkBuffMult||1),0));
  actor.def+=absorbed.reduce((sum,ally)=>sum+ally.def,0);
  actor.speed+=absorbed.reduce((sum,ally)=>sum+ally.speed,0);
  actor.shield+=absorbedShield;
  absorbed.forEach(ally=>{ ally.shield=0; ally.shieldRounds=0; });
  clearTimedAllyBuffs(actor,'atk');
  actor.energy=0;
  actor.apocEnergyReady=false;
  actor.hakosForm=true;
  actor.hakosFormTurns=10;
  actor.hakosFormFresh=true;
  b.hakosFormState={allies:b.allies.slice(),turnEntries:b.turnOrder.filter(entry=>entry.side==='ally' && entry.id!==actor.charId)};
  b.allies=[actor];
  b.turnOrder=b.turnOrder.filter(entry=>entry.side!=='ally' || entry.id===actor.charId);
  const hakosIndex=b.turnOrder.findIndex(entry=>entry.side==='ally' && entry.id===actor.charId);
  ensureHakosExtraTurn(b);
  b.turnIndex=Math.max(0,hakosIndex);
  logMsg(`${actor.name} attiva la Rovina del Caos: assorbe le statistiche degli alleati e agisce due volte per turno. La forma durerà 10 azioni.`);
}

function restoreHakosUltimate(b,reason='expired'){
  const stateSnapshot=b.hakosFormState;
  const actor=b.allies.find(ally=>ally.charId==='hakosBaels');
  if(!stateSnapshot || !actor?.hakosBaseSnapshot) return false;
  const hpLost=Math.max(0,actor.hakosFormStartHp-actor.hp);
  const prefix=b.turnOrder.slice(0,b.turnIndex+1).filter(entry=>!entry.hakosExtra);
  const future=[...b.turnOrder.slice(b.turnIndex+1).filter(entry=>!entry.hakosExtra),...stateSnapshot.turnEntries]
    .sort((first,second)=>second.speed-first.speed);
  Object.assign(actor,actor.hakosBaseSnapshot);
  actor.hp=clamp(actor.hp-hpLost,0,actor.maxHp);
  actor.energy=actor.apocEnergyReady?actor.energyMax:0;
  actor.apocEnergyReady=false;
  clearTimedAllyBuffs(actor,'atk');
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

function getAbilityShieldAmount(source,target,ability){
  if(ability.shieldDefMult!==undefined){
    return Math.round(source.def*(source.defBuffMult||1)*ability.shieldDefMult*(source.shieldMult||1));
  }
  return Math.round(target.maxHp*ability.shieldPct*(source.shieldMult||1));
}

async function executeAbility(actor, abKey, targetId){
  const b = state.battle;
  const ability = getAbilityForActor(actor,abKey);
  if(!ability || ability.effect==='disabled') return;
  if(abKey==='ult'&&!isUltimateReady(actor)) return;
  let deferredKoboEnergy=0;
  const effAtk = ability.defBased
    ? Math.round(actor.def*(actor.defBuffMult||1))
    : ability.hpBased
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
    const selenWeak = ability.effect==='selen_ult' && isEnemyWeakTo(actor.element,t);
    for(const target of hitTargets){
      for(let i=0;i<hits;i++){
        if(target.hp<=0) break;
        const targetVulnerability=target.vulnerableRounds>0?target.vulnerableToElement:null;
        const hitMult = ability.effect==='selen_skill' && isEnemyWeakTo(actor.element,target) ? ability.weakMult : ability.mult;
        const dmg = calcDamage(effAtk, hitMult, getEffectiveEnemyDefense(target), actor.element, target.elements || target.element, actor, abKey, targetVulnerability);
        const applied = dealDamageToEnemy(target, dmg, abKey,true,actor);
        logMsg(`${actor.name} usa ${ability.name}: ${applied} danni a ${target.name}.`);
        if(hits>1){ render(); await sleepMs(230); }
        if(actor.charId!=='ninomaeInaNis'&&target.inaMarked&&(getInaActor(b)?.inaFollowUpsRemaining||0)>0){
          render();
          await sleepMs(220);
        }
        await triggerInaFollowUpAfterHit(b,target,actor);
      }
      if(actor.charId==='laplusDarkness'||actor.defDownBonus>0||ability.effect==='koyori_shock'){
        applyLaplusAttackEffects(actor,target,ability.effect==='koyori_shock'?(ability.defDownPct||0):0,actor.charId==='laplusDarkness'&&ability.effect==='laplus_remove_element');
      }
      if(ability.effect==='koyori_shock'&&target.hp>0){
        applyDamageOverTime(target,actor,ability.burnStacks||1);
      }
    }
    if(ability.effect==='kiara_skill_heal'&&actor.hp>0){
      const healing=Math.round(effAtk*ability.healPct*(actor.healMult||1));
      actor.hp=clamp(actor.hp+healing,0,actor.maxHp);
      actor._fx={variant:'heal',label:'+'+healing};
      logMsg(`${actor.name} recupera ${healing} PV.`);
    }
    if(selenWeak && t.hp>0){
      t.stunTurns=2;
      grantTakaneDebuffCharge(t);
      t._fx={variant:'buff',label:'⚡ STORDITO'};
      logMsg(`${t.name} è debole all'Electro: Stordito per 2 turni!`);
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
      const amt = getAbilityShieldAmount(actor,actor,ability);
      actor.shield += amt;
      actor.shieldRounds = 2;
      actor._fx = {variant:'shield', label:'🛡+'+amt};
      logMsg(`${actor.name} ottiene uno scudo.`);
      const weakest=allyTargets().filter(a=>a!==actor).sort((x,y)=>x.hp/x.maxHp-y.hp/y.maxHp)[0];
      if(weakest){
        const shared=getAbilityShieldAmount(actor,weakest,ability);
        weakest.shield+=shared;
        weakest.shieldRounds=2;
        weakest._fx={variant:'shield',label:'🛡+'+shared};
        logMsg(`${actor.name} protegge anche ${weakest.name} con uno scudo.`);
      }
    }
    if(ability.effect==='burn'){
      applyDamageOverTime(t,actor,ability.burnStacks);
    }
    if(ability.effect==='kobo_seasick'){
      applyKoboSeasick(t);
    }
  }
  else if(ability.target==='ally'){
    const target = b.allies.find(a=>a.charId===targetId);
    if(!target || target.hp<=0) return;
    if(actor.singleAllyDamageBuff&&(abKey==='skill'||abKey==='ult')){
      addTimedAllyBuff(target,'Patto del Guardiano','damage',0.15,2,true);
      target._fx={variant:'buff',label:'+15% DMG'};
      logMsg(`${actor.name} attiva Patto del Guardiano: ${target.name} infligge +15% danni per 2 round.`);
    }
    if(ability.effect==='elizabeth_shield_taunt'){
      b.allies.filter(ally=>ally.tauntSource===actor.charId).forEach(ally=>{
        ally.tauntRounds=0;
        ally.tauntFresh=false;
        ally.tauntSource=null;
      });
      const amount=Math.round(actor.def*(actor.defBuffMult||1)*ability.shieldDefMult*(actor.shieldMult||1));
      target.shield+=amount;
      target.shieldRounds=Math.max(target.shieldRounds,3);
      target.tauntRounds=ability.tauntTurns;
      target.tauntFresh=true;
      target.tauntSource=actor.charId;
      target._fx={variant:'shield',label:'🛡+'+amount};
      logMsg(`${actor.name} protegge ${target.name} con uno scudo da ${amount} PV: i nemici lo prendono di mira per ${ability.tauntTurns} turni.`);
    }
    if(ability.effect==='heal'){
      const healAmt = Math.round(effAtk*ability.mult*(actor.healMult||1));
      target.hp = clamp(target.hp+healAmt,0,target.maxHp);
      target._fx = {variant:'heal', label:'+'+healAmt};
      logMsg(`${actor.name} cura ${target.name} per ${healAmt} PV.`);
    }
    if(ability.effect==='extra_attack_buff'){
      addTimedAllyBuff(target,ability.name,'atk',buffPct,2);
      target._fx = {variant:'buff', label:'+'+Math.round(buffPct*100)+'% ATK'};
      logMsg(`${actor.name} coordina ${target.name}: +${Math.round(buffPct*100)}% ATK.`);
      const foes = enemyTargets();
      if(foes.length>0){
        const foe = foes.reduce((a,c)=>c.hp<a.hp?c:a);
        const bonusAtk = Math.round(target.atk*(target.atkBuffMult||1));
        const foeVulnerability=foe.vulnerableRounds>0?foe.vulnerableToElement:null;
        const dmg = calcDamage(bonusAtk,1.0,getEffectiveEnemyDefense(foe),target.element,foe.elements||foe.element,target,'basic',foeVulnerability);
        const applied = dealDamageToEnemy(foe, dmg, 'basic',true,target);
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
    } else if(ability.effect==='kiara_def_buff'){
      addTimedAllyBuff(actor,ability.name,'def',ability.defBuffPct,3);
      actor._fx={variant:'buff',label:'+'+Math.round(ability.defBuffPct*100)+'% DIF'};
      logMsg(`${actor.name} aumenta la propria DIF del ${Math.round(ability.defBuffPct*100)}% per 2 turni.`);
    } else if(ability.effect==='suisei_guard'){
      const lost=loseSuiseiHp(actor,actor.hp*0.5);
      actor.suiseiGuardRounds=3;
      actor.suiseiGuardFresh=true;
      actor.tauntRounds=2;
      actor.tauntFresh=true;
      logMsg(`${actor.name} sacrifica ${lost} PV e attiva la postura stellare: danni subiti -40% per 3 round. I nemici sono provocati per 2 round.`);
    } else if(ability.effect==='boost_basic_hits'){
      actor.basicHits = Math.min(10, (actor.basicHits||2)+1);
      actor._fx = {variant:'buff', label:'x'+actor.basicHits+' colpi'};
      logMsg(`${actor.name} affina la lama: l'Attacco Base ora colpisce ${actor.basicHits} volte.`);
    }
  }
  else if(ability.target==='enemies_all'){
    if(ability.effect==='reine_skill'){
      b.allies.filter(ally=>ally.hp>0).forEach(ally=>addTimedAllyBuff(ally,ability.name,'dotDamage',ability.dotDamageBuff,2));
      logMsg(`${actor.name} aumenta del ${Math.round(ability.dotDamageBuff*100)}% i danni da DoT degli alleati per 2 turni.`);
    }
    for(const t of enemyTargets()){
      const targetVulnerability=t.vulnerableRounds>0?t.vulnerableToElement:null;
      const dmg = calcDamage(effAtk,ability.mult,getEffectiveEnemyDefense(t),actor.element,t.elements||t.element,actor,abKey,targetVulnerability);
      const applied = dealDamageToEnemy(t, dmg, abKey,true,actor);
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
        applyDamageOverTime(t,actor,ability.burnStacks);
      }
      if(ability.effect==='reine_dot'||ability.effect==='reine_skill'||ability.effect==='reine_ultimate'){
        applyDamageOverTime(t,actor,ability.burnStacks);
      }
      if(ability.effect==='reine_ultimate'){
        detonateEnemyDamageOverTime(b,t);
      }
      if(ability.effect==='kobo_seasick_all'){
        applyKoboSeasick(t);
        deferredKoboEnergy+=detonateEnemyDamageOverTime(b,t);
      }
      if(ability.effect==='kobo_detonate_dots'){
        deferredKoboEnergy+=detonateEnemyDamageOverTime(b,t,true);
      }
      render(); await sleepMs(260);
    }
    if(ability.effect==='kobo_detonate_dots'){
      b.koboCorrosionAura=true;
        b.koboCorrosionDamageMult=actor.dotDamageMult||1;
      b.enemies.filter(enemy=>enemy.hp>0).forEach(enemy=>applyKoboCorrosionIfNeeded(b,enemy));
      logMsg(`${actor.name} avvolge l’arena in un’aura oceanica: Corrosione verrà applicata ai nuovi nemici.`);
    }
    if(actor.charId==='ninomaeInaNis'&&ability.effect==='ina_ultimate'){
      actor.inaFollowUpsRemaining=3;
      const living=enemyTargets();
      if(living.length>0) await performInaFollowUp(b,pick(living),false);
      actor.inaFollowUpsRemaining=3;
      logMsg(`${actor.name} recupera le 3 cariche di follow-up.`);
      ensureInaMark(b);
    }
    if(actor.charId==='vestiaZeta'&&ability.effect==='burn_all'){
      actor.zetaFollowUpsRemaining=CHAR_DB.vestiaZeta.passiveZetaFollowUps;
      logMsg(`${actor.name} ricarica le ${actor.zetaFollowUpsRemaining} cariche di follow-up.`);
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
      allyTargets().forEach(a=>addTimedAllyBuff(a,ability.name,'atk',buffPct,2));
      actor._fx = {variant:'spgrant', label:'+'+spGrant+' PA'};
      logMsg(`${actor.name} dona ${spGrant} Punti Abilità e aumenta l'ATK della squadra del ${Math.round(buffPct*100)}%.`);
    }
  }
  else if(ability.target==='allies_all'){
    if(ability.effect==='shield_all'){
      allyTargets().forEach(a=>{ const amt=getAbilityShieldAmount(actor,a,ability); a.shield+=amt; a.shieldRounds=2; a._fx={variant:'shield',label:'🛡+'+amt}; });
      logMsg(`${actor.name} scherma tutta la squadra.`);
    }
    if(ability.effect==='heal_all'){
      allyTargets().forEach(a=>{ const amt=Math.round(effAtk*ability.mult*(actor.healMult||1)); a.hp=clamp(a.hp+amt,0,a.maxHp); a._fx={variant:'heal',label:'+'+amt}; });
      logMsg(`${actor.name} cura l'intera squadra.`);
      if(ability.maxHpBuffPct){
        allyTargets().forEach(a=>addTimedAllyBuff(a,ability.name,'maxHp',ability.maxHpBuffPct,ability.maxHpBuffRounds));
        logMsg(`${actor.name} aumenta i PV massimi della squadra del ${Math.round(ability.maxHpBuffPct*100)}% per ${ability.maxHpBuffRounds} round.`);
      }
      if(ability.hpLossPct){
        const allies=allyTargets();
        allies.forEach(a=>{
          const loss=Math.round(a.maxHp*ability.hpLossPct);
          if(a.charId==='suiseiHoshimachi') loseSuiseiHp(a,loss);
          else {
            const lost=Math.min(a.hp,loss);
            a.hp=clamp(a.hp-lost,0,a.maxHp);
            a._fx={variant:'damage',label:'-'+lost};
          }
          logMsg(`${a.name} perde l'${Math.round(ability.hpLossPct*100)}% dei PV massimi (${loss} PV).`);
        });
        const suisei=allies.find(a=>a.charId==='suiseiHoshimachi');
        if(suisei) await triggerSuiseiFollowUp(b,suisei);
      }
    }
    if(ability.effect==='buff_atk'){
      allyTargets().forEach(a=>{ addTimedAllyBuff(a,ability.name,'atk',buffPct,2); a._fx={variant:'buff', label:'+'+Math.round(buffPct*100)+'% ATK'}; });
      logMsg(`${actor.name} aumenta l'ATK della squadra.`);
    }
    if(ability.effect==='buff_atk_energy'){
      allyTargets().forEach(a=>{ addTimedAllyBuff(a,ability.name,'atk',buffPct,3); a.energy=clamp(a.energy+Math.round(ability.energyGainAll*(a.energyGainMult||1)),0,a.energyMax); a._fx={variant:'buff', label:'+'+Math.round(buffPct*100)+'% ATK'}; });
      logMsg(`${actor.name} scatena un grido di guerra!`);
    }
    if(ability.effect==='buff_atk_def'){
      allyTargets().forEach(a=>{
        addTimedAllyBuff(a,ability.name,'atk',buffPct,3);
        addTimedAllyBuff(a,ability.name,'def',ability.defBuffPct,3);
        a._fx={variant:'buff',label:'+'+Math.round(buffPct*100)+'% ATK / DIF'};
      });
      logMsg(`${actor.name} aumenta ATK e DIF di tutta la squadra del ${Math.round(buffPct*100)}% per 3 turni.`);
    }
  }

  if(abKey==='basic'){
    const spGain = (ability.spGain!==undefined) ? ability.spGain : 1;
    b.sp = clamp(b.sp+spGain,0,b.spMax);
    if(actor.hakosForm) actor.energy=0;
    else actor.energy = clamp(actor.energy+Math.round((ability.energyGain||0)*(actor.energyGainMult||1)),0,actor.energyMax);
  } else if(abKey==='skill'){
    actor.turnSkillCount=(actor.turnSkillCount||0)+1;
    if(actor.skillFreeUses>0){ actor.skillFreeUses--; }
    else {
      b.sp = clamp(b.sp-1,0,b.spMax);
      const mumeiBoss=b.enemies.find(enemy=>enemy.name==='Custode della Civiltà'&&enemy.phase===2&&enemy.mumeiGuardActive);
      if(mumeiBoss){
        mumeiBoss.mumeiGuardSkillPointsSpent++;
        if(mumeiBoss.mumeiGuardSkillPointsSpent>=5){
          mumeiBoss.mumeiGuardActive=false;
          mumeiBoss._fx={variant:'buff',label:'SCUDO INFRANTO'};
          logMsg(`${mumeiBoss.name} perde la riduzione dei danni: sono stati spesi 5 PA nel round.`);
        }
      }
    }
    if(actor.hakosForm) actor.energy=0;
    else actor.energy = clamp(actor.energy+Math.round((ability.energyGain||0)*(actor.energyGainMult||1)),0,actor.energyMax);
  } else if(abKey==='ult'){
    if(CHAR_DB[actor.charId].ultChargeMode==='debuffs') actor.takaneDebuffCharges=0;
    actor.energy = clamp(deferredKoboEnergy,0,actor.energyMax);
  }
  if(actor.charId==='suiseiHoshimachi') await triggerSuiseiFollowUp(b,actor);
  if(actor.charId==='hakosBaels' && actor.hp>0 && ['enemy','enemy_adjacent','enemies_all'].includes(ability.target)){
    const baseMaxHp=actor.hakosBaseSnapshot?.maxHp||actor.maxHp;
    const heal=Math.round(baseMaxHp*0.03);
    actor.hp=clamp(actor.hp+heal,0,actor.maxHp);
    actor._fx={variant:'heal',label:'+'+heal};
    logMsg(`${actor.name} recupera ${heal} PV attaccando.`);
  }
  await processFinanaFollowUps(b);
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
  if(abKey==='ult' && !isUltimateReady(actor)) return;

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
  for(const e of b.enemies.filter(enemy=>enemy.hp>0&&enemy.dots?.length)){
    for(const dot of [...e.dots]){
      if(e.hp<=0||!e.dots.includes(dot)) break;
      triggerDamageOverTime(b,e,dot);
      await processFinanaFollowUps(b);
      if(checkBattleEnd()) return false;
      render();
      await sleepMs(280);
    }
  }
  b.enemies.filter(enemy=>enemy.name==='Suisei Pshyco'&&enemy.isBoss&&enemy.hp>0).forEach(boss=>{
    if(boss.psychoTriggeredThisRound){
      boss.psychoTriggeredThisRound=false;
      return;
    }
    const lost=Math.min(boss.hp,Math.round(boss.maxHp*0.1));
    applyEnemyHealthDamage(boss,lost);
    updateBossPhase(boss);
    boss._fx={variant:'damage',label:'-'+lost};
    logMsg(`${boss.name} non attiva il Follow-up nel round e perde ${lost} PV.`);
  });
  if(checkBattleEnd()) return false;

  b.enemies.forEach(enemy=>{
    if(enemy.name==='Custode della Civiltà'&&enemy.phase===2&&enemy.mumeiGuardActive){
      enemy.mumeiGuardSkillPointsSpent=0;
      if(enemy.mumeiGuardFresh){
        enemy.mumeiGuardFresh=false;
      } else {
        enemy.mumeiGuardRounds--;
        if(enemy.mumeiGuardRounds<=0){
          enemy.mumeiGuardActive=false;
          logMsg(`${enemy.name} perde la riduzione dei danni dopo 5 round.`);
        }
      }
    }
    if(enemy.defDownRounds>0){
      enemy.defDownRounds--;
      if(enemy.defDownRounds===0) enemy.defDownPct=0;
    }
    if(enemy.vulnerableRounds>0){
      enemy.vulnerableRounds--;
      if(enemy.vulnerableRounds===0){
        enemy.vulnerableToElement=null;
        if(enemy.laplusRemovedElement){
          if(enemy.laplusRemovedWeaknessWasPresent){
            const elements=enemy.elements||(enemy.elements=[enemy.element]);
            if(!elements.includes(enemy.laplusRemovedElement)){
              const restoreIndex=Number.isInteger(enemy.laplusRemovedElementIndex)
                ? clamp(enemy.laplusRemovedElementIndex,0,elements.length)
                : elements.length;
              elements.splice(restoreIndex,0,enemy.laplusRemovedElement);
            }
          }
          enemy.laplusRemovedElement=null;
          enemy.laplusRemovedWeaknessWasPresent=false;
          enemy.laplusRemovedElementIndex=null;
        }
        if(enemy.laplusAddedElement){
          const elements=enemy.elements||(enemy.elements=[enemy.element]);
          if(enemy.laplusAddedElementWasAbsent){
            const addedIndex=elements.indexOf(enemy.laplusAddedElement);
            if(addedIndex>=0) elements.splice(addedIndex,1);
          }
          enemy.laplusAddedElement=null;
          enemy.laplusAddedElementWasAbsent=false;
          enemy.laplusAddedElementIndex=null;
        }
      }
    }
  });

  b.allies.forEach(a=>{
    if(a.shieldRounds>0){ a.shieldRounds--; if(a.shieldRounds<=0) a.shield=0; }
    if(a.activeBuffs?.length){
      tickTimedAllyBuffs(a,'atk');
      tickTimedAllyBuffs(a,'dotDamage');
      tickTimedAllyBuffs(a,'damage');
      tickTimedAllyBuffs(a,'maxHp');
    }
    if(a.hitStacks?.length){ a.hitStacks.forEach(s=>s.r--); a.hitStacks=a.hitStacks.filter(s=>s.r>0); }
    if(a.suiseiGuardRounds>0){
      if(a.suiseiGuardFresh) a.suiseiGuardFresh=false;
      else {
        a.suiseiGuardRounds--;
        if(a.suiseiGuardRounds===0) logMsg(`${a.name} termina la postura stellare.`);
      }
    }
    if(a.tauntRounds>0){
      if(a.tauntFresh) a.tauntFresh=false;
      else {
        a.tauntRounds--;
        if(a.tauntRounds===0){
          a.tauntSource=null;
          logMsg(`${a.name} non provoca più i nemici.`);
        }
      }
    }
  });
  b.enemies.filter(enemy=>enemy.hp>0).forEach(enemy=>applyKoboCorrosionIfNeeded(b,enemy));
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
    const hp=Math.max(1,Math.round(boss.maxHp/BOSS_HP_FACTOR*(boss.phase===2?0.16:0.12)));
    const enemy={
      id:'s'+(b.summonCounter++), name, hp, maxHp:hp,
      atk:Math.round(boss.atk/BOSS_ATK_FACTOR*(boss.phase===2?0.55:0.45)),
      def:Math.round(boss.def*0.6), speed:90+Math.floor(Math.random()*31),
      element:elements[0], elements, vulnerableToElement:null, vulnerableRounds:0,
      defDownPct:0, defDownRounds:0, shield:0, dots:[], seasickStacks:0,
      isBoss:false, phase:0, bossTurns:0,
      bossAddOwnerId:addOwnerId,bossAddResolved:false,
    };
    b.enemies.push(enemy);
    applyKoyoriSpeedDown(b.allies,[enemy]);
    applyKoboCorrosionIfNeeded(b,enemy);
    summoned.push(enemy);
    logMsg(`${boss.name} evoca ${name}.`);
  }

  const future=b.turnOrder.slice(b.turnIndex+1);
  future.push(...summoned.map(enemy=>({side:'enemy',id:enemy.id,speed:enemy.speed})));
  future.sort((first,second)=>second.speed-first.speed);
  b.turnOrder.splice(b.turnIndex+1,b.turnOrder.length-b.turnIndex-1,...future);
  return summoned;
}

async function runEnemyRole(enemy,b){
  enemy.specialTurns++;
  const others=b.enemies.filter(e=>e!==enemy&&e.hp>0);
  let acted=false;
  if(enemy.role==='healer'){
    const wounded=others.filter(e=>e.hp<e.maxHp).sort((a,c)=>a.hp/a.maxHp-c.hp/c.maxHp)[0];
    if(wounded){
      const amount=Math.min(wounded.maxHp-wounded.hp,Math.round(wounded.maxHp*0.3));
      wounded.hp+=amount;
      wounded._fx={variant:'heal',label:'+'+amount};
      enemy._fxAttack='skill';
      logMsg(`${enemy.name} cura ${wounded.name} di ${amount} PV.`);
      acted=true;
    }
  } else if(enemy.role==='shielder'){
    if(others.length>0 && enemy.specialTurns%2===1){
      [enemy,...others].forEach(e=>{
        const amount=Math.round(e.maxHp*0.12);
        e.shield+=amount;
        e._fx={variant:'shield',label:'🛡+'+amount};
      });
      enemy._fxAttack='skill';
      logMsg(`${enemy.name} scherma tutti i nemici.`);
      acted=true;
    }
  } else if(enemy.role==='buffer'){
    if(others.length>0 && enemy.specialTurns%2===1){
      [enemy,...others].forEach(e=>{
        if((e.rageStacks||0)>=3) return;
        e.rageStacks=(e.rageStacks||0)+1;
        e.atk=Math.round(e.atk*1.15);
        e._fx={variant:'buff',label:'+15% ATK'};
      });
      enemy._fxAttack='skill';
      logMsg(`${enemy.name} infiamma i nemici: ATK +15% (max 3 volte).`);
      acted=true;
    }
  } else if(enemy.role==='bomber'){
    if(!enemy.bomberCharged){
      enemy.bomberCharged=true;
      enemy._fx={variant:'buff',label:'CARICA!'};
      logMsg(`${enemy.name} si sta caricando: al prossimo turno colpirà tutta la squadra!`);
      acted=true;
    } else {
      enemy.bomberCharged=false;
      enemy._fxAttack='skill';
      logMsg(`${enemy.name} esplode in un attacco ad area!`);
      for(const ally of b.allies.filter(a=>a.hp>0)){
        const dmg=calcDamage(Math.round(getEffectiveEnemyAttack(enemy)*0.9),1,getEffectiveAllyDefense(ally),enemy.element,ally.element);
        const result=dealDamageToAlly(ally,dmg,true);
        logMsg(`${ally.name} subisce ${result.applied} danni dall'esplosione.`);
        await performKiaraCounter(b,enemy,ally);
        if(ally.charId==='suiseiHoshimachi') await triggerSuiseiFollowUp(b,ally);
        if(enemy.hp<=0) break;
      }
      acted=true;
    }
  }
  if(!acted) return false;
  render();
  await sleepMs(700);
  if(checkBattleEnd()){ b.busy=false; render(); return true; }
  return true;
}

async function runBossMechanic(boss,b){
  if(boss.name==='Suisei Pshyco'||boss.name==='Costrutto Immergreen') return;
  const mechanics=BOSS_MECHANICS[boss.name];
  if(!mechanics) return;
  const startPhase=boss.phase;
  const mechanic=boss.phase===2?mechanics.phase2:mechanics.phase1;
  const shouldUseSpecial=boss.phase===2 || boss.bossTurns%2===0;
  boss.bossTurns++;
  if(!shouldUseSpecial) return;
  if(mechanic==='basic_ult_resistance') return;

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
            if(boss.phase!==startPhase) break;
            const damage=calcDamage(Math.round(getEffectiveEnemyAttack(boss)*1.8),1,getEffectiveAllyDefense(ally),boss.element,ally.element);
            const result=dealDamageToAlly(ally,damage,true);
            logMsg(`${ally.name} subisce ${result.applied} danni dall'esplosione massiva.`);
            await performKiaraCounter(b,boss,ally);
            if(boss.hp<=0) break;
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
      if(boss.phase!==startPhase) break;
      const dmg=calcDamage(Math.round(getEffectiveEnemyAttack(boss)*(boss.phase===2?0.8:0.65)),1,getEffectiveAllyDefense(ally),boss.element,ally.element);
      const result=dealDamageToAlly(ally,dmg,true);
      logMsg(`${ally.name} subisce ${result.applied} danni dall'onda d'urto.`);
      await performKiaraCounter(b,boss,ally);
      if(ally.charId==='suiseiHoshimachi') await triggerSuiseiFollowUp(b,ally);
      if(boss.hp<=0) break;
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
  if(enemy.stunTurns>0){
    enemy.stunTurns--;
    enemy._fx={variant:'buff',label:'⚡ STORDITO'};
    logMsg(`${enemy.name} è stordito e salta il turno.`);
    render();
    await sleepMs(600);
    b.busy=false;
    await advanceTurn();
    return;
  }
  const turnStartPhase=enemy.phase;
  if(enemy.role && await runEnemyRole(enemy,b)){
    b.busy=false;
    if(b.phase!=='ally_turn'&&b.phase!=='enemy_turn') return;
    if(b.allies.every(a=>a.hp<=0)){ checkBattleEnd(); render(); return; }
    await advanceTurn();
    return;
  }
  if(enemy.isBoss){
    await runBossMechanic(enemy,b);
    if(checkBattleEnd()){
      b.busy=false;
      render();
      return;
    }
  }

  const isConstruct=!!enemy.constructGroupId;
  const attackCount=isConstruct
    ? (enemy.phase===2&&enemy.constructPart===1?2:1)
    : enemy.name==='Suisei Pshyco'
    ? (enemy.phase===2?1:2)
    : (enemy.isBoss||enemy.role==='twin')?2:1;
  for(let attackIndex=0;attackIndex<attackCount;attackIndex++){
    if(enemy.isBoss && enemy.phase!==turnStartPhase) break;
    if(enemy.hp<=0) break;
    const livingTargets=b.allies.filter(ally=>ally.hp>0);
    if(livingTargets.length===0) break;
    const constructAoE=isConstruct&&enemy.phase===2&&enemy.constructPart===1&&attackIndex===1;
    const targets=constructAoE
      ? livingTargets
      : [livingTargets.find(a=>a.tauntRounds>0)||pick(livingTargets)];
    enemy._fxAttack='basic';
    const attackLabel=attackCount>1?` (${attackIndex+1}/${attackCount})`:'';
    if(constructAoE) logMsg(`${enemy.name} scatena un attacco ad area!`);
    for(const target of targets){
      const dmg=calcDamage(getEffectiveEnemyAttack(enemy),enemy.role==='twin'?0.7:constructAoE?0.7:1.0,getEffectiveAllyDefense(target),enemy.element,target.element);
      const result=dealDamageToAlly(target,dmg,true);
      if(enemy.role==='thief' && target.hp>0){
        const drained=Math.min(target.energy,25);
        target.energy-=drained;
        if(drained>0) logMsg(`${enemy.name} drena ${drained} energia da ${target.name}.`);
      }
      if(result.applied===0 && result.absorbed>0){
        logMsg(`${enemy.name}${attackLabel} attacca ${target.name}, ma lo scudo assorbe tutto il colpo (🛡 -${result.absorbed}).`);
      } else if(result.absorbed>0){
        logMsg(`${enemy.name}${attackLabel} attacca ${target.name}: lo scudo assorbe ${result.absorbed}, ${result.applied} danni passano.`);
      } else {
        logMsg(`${enemy.name}${attackLabel} attacca ${target.name} per ${result.applied} danni.`);
      }
      if(isConstruct&&result.absorbed>0&&enemy.hp>0){
        const reflected=Math.round(result.absorbed*1.5);
        applyEnemyHealthDamage(enemy,reflected);
        updateBossPhase(enemy);
        enemy._fx={variant:'damage',label:'-'+reflected};
        logMsg(`${enemy.name} subisce ${reflected} danni riflessi dallo scudo di ${target.name}.`);
      }
      render();
      await sleepMs(420);
      await performKiaraCounter(b,enemy,target);
      if(target.charId==='suiseiHoshimachi') await triggerSuiseiFollowUp(b,target);
      if(checkBattleEnd()){
        b.busy=false;
        render();
        return;
      }
      if(enemy.hp<=0 || enemy.phase!==turnStartPhase) break;
    }
    if(enemy.hp<=0 || enemy.phase!==turnStartPhase) break;
  }
  if(enemy.name==='Suisei Pshyco'&&turnStartPhase===2&&enemy.phase===2&&enemy.hp>0){
    const healing=Math.min(enemy.maxHp-enemy.hp,Math.round(enemy.maxHp*0.1));
    enemy.hp+=healing;
    enemy._fx={variant:'heal',label:'+'+healing};
    logMsg(`${enemy.name} si cura di ${healing} PV.`);
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
  if(isUltimateReady(actor)) abKey='ult';
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
  const base = Math.round(150 + stageNum*30 + stageNum*stageNum*0.5);
  return isBossStage(stageNum) ? Math.round(base*1.8) : base;
}

function onVictory(){
  const b = state.battle;
  const lootCount = isBossStage(state.stage) ? 3 : (1+Math.floor(Math.random()*2));
  const loot=[];
  for(let i=0;i<lootCount;i++) loot.push(generateArtifact(state.stage));
  b.loot = loot;
  state.inventory.push(...loot);
  const creditReward = getStageGoldReward(state.stage);
  b.creditReward = creditReward;
  state.credits += creditReward;
  state.maxStageReached = Math.min(TOWER_MAX_FLOOR+1,Math.max(state.maxStageReached,state.stage+1));
  recordDailyMissionProgress('battle');
  state.autoBattle=false;
  state.screen='victory';
}

function onDefeat(){
  state.autoBattle=false;
  state.screen='defeat';
}

function goToTown(advance){
  if(advance) state.stage = Math.min(TOWER_MAX_FLOOR,state.stage+1);
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
  const base = {comune:40, rara:90, epica:180, leggendaria:400}[it.rarity]||40;
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
function applyArtifactLevelUp(it){
  const level = it.level||0;
  if(level>=ARTIFACT_MAX_LEVEL) return false;
  const cost = getArtifactLevelUpCost(level);
  if(state.credits<cost) return false;
  state.credits -= cost;
  it.level = level+1;
  upgradeArtifactMainStat(it);
  recordDailyMissionProgress('artifactUpgrade');
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
  return true;
}
function levelUpArtifact(uid){
  const it = findArtifactByUid(uid);
  if(!it || !applyArtifactLevelUp(it)) return;
  render();
}
function levelArtifactToMax(uid){
  const it=findArtifactByUid(uid);
  if(!it) return;
  let upgraded=false;
  while(applyArtifactLevelUp(it)) upgraded=true;
  if(upgraded) render();
}
function getArtifactMaxUpgradeAction(it){
  const level=it.level||0;
  const nextCost=getArtifactLevelUpCost(level);
  return {
    label:'⏫ Potenzia al massimo',
    onClick:()=>levelArtifactToMax(it.uid),
    disabled:level>=ARTIFACT_MAX_LEVEL||state.credits<nextCost,
  };
}
function sellArtifact(uid){
  const idx = state.inventory.findIndex(i=>i.uid===uid);
  if(idx<0) return; // only unequipped artifacts can be sold
  const it = state.inventory[idx];
  state.credits += getArtifactSellValue(it);
  state.inventory.splice(idx,1);
  state.totalArtifactsSold++;
  recordDailyMissionProgress('artifactSale');
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

/* ---- Auto equip: prioritizes stats and set bonuses that match the hero's kit ---- */
function getAutoEquipProfile(charId){
  const c=CHAR_DB[charId];
  const abilities=[c.basic,c.skill,c.ult];
  const damagingAbilities=abilities.filter(ability=>ability.mult>0&&['enemy','enemy_adjacent','enemies_all'].includes(ability.target));
  const hpDamageAbilities=damagingAbilities.filter(ability=>ability.hpBased);
  const defDamageAbilities=damagingAbilities.filter(ability=>ability.defBased);
  const atkDamageAbilities=damagingAbilities.filter(ability=>!ability.hpBased&&!ability.defBased);
  const tank=/Tank|Shielder/i.test(c.role);
  const support=/Supporto|Buffer/i.test(c.role);
  const healer=abilities.some(ability=>ability.effect?.includes('heal'));
  const shielder=abilities.some(ability=>ability.shieldDefMult!==undefined||ability.shieldPct!==undefined||ability.effect?.includes('shield'));
  const buffs=abilities.some(ability=>ability.buffPct||ability.defBuffPct||ability.maxHpBuffPct||ability.effect==='extra_attack_buff');
  const grantsSp=abilities.some(ability=>ability.spGrant);
  const debuffs=abilities.some(ability=>ability.defDownPct)||!!c.passiveEnemySpeedDown;
  const singleAllyTarget=abilities.some(ability=>ability.target==='ally');
  const dps=/DPS/i.test(c.role)||damagingAbilities.length>0;
  const needsEnergy=c.ultChargeMode!=='debuffs';
  return {
    hp:hpDamageAbilities.length?1.15:tank?0.85:support?0.45:0.3,
    atk:atkDamageAbilities.length?1.25:dps?0.75:0.2,
    def:defDamageAbilities.length?1.25:tank?1.0:support?0.35:0.25,
    speed:support?1.05:0.65,
    damage:damagingAbilities.length?1.15:0.25,
    basic:damagingAbilities.includes(c.basic)?0.45:0,
    skill:damagingAbilities.includes(c.skill)?0.65:0,
    ult:damagingAbilities.includes(c.ult)?0.9:0,
    hpDamage:hpDamageAbilities.length?1.2:0,
    heal:healer?1.25:0,
    shield:shielder?1.0:0,
    dot:c.dotName?1.0:0,
    energy:needsEnergy?0.4:0.15,
    startEnergy:needsEnergy?0.65:0,
    buff:buffs?1.0:0,
    sp:grantsSp?0.25:0,
    defDown:debuffs?0.6:0,
    weakness:damagingAbilities.length?0.35:0,
    dynamicSkill:c.skillFreeUses||c.skill.mult===0?0.15:0,
    dynamicAbsent:dps?0.1:0,
    hitStacks:dps?0.12:0,
    singleAllyBuff:singleAllyTarget?0.18:0,
    energyMax:c.base.energyMax,
    base:c.base,
  };
}
function scoreAutoEquip(eff,p){
  const base=p.base;
  const stats=(eff.hp/base.hp)*p.hp+(eff.atk/base.atk)*p.atk+(eff.def/base.def)*p.def+(eff.speed/base.speed)*p.speed;
  const effects=(eff.damageMult-1)*p.damage+(eff.basicDamageMult-1)*p.basic
    +(eff.skillDamageMult-1)*p.skill+(eff.ultDamageMult-1)*p.ult
    +(eff.hpDamageMult-1)*p.hpDamage+(eff.healMult-1)*p.heal+(eff.shieldMult-1)*p.shield
    +(eff.burnMult-1)*p.dot+(eff.dotDamageMult-1)*p.dot
    +(eff.energyGainMult-1)*p.energy+eff.startEnergyBonus/p.energyMax*p.startEnergy
    +eff.buffPctBonus*p.buff+eff.spGrantBonus*p.sp+eff.defDownBonus*p.defDown
    +eff.weaknessBonus*p.weakness+(eff.formDamageMult-1)*p.damage
    +(eff.fxSkillSp?p.dynamicSkill:0)+(eff.fxAbsent?p.dynamicAbsent:0)+(eff.fxHitStack?p.hitStacks:0)
    +(eff.singleAllyDamageBuff?p.singleAllyBuff:0);
  return stats+effects;
}
function autoEquip(charId){
  const entry=state.roster[charId];
  const p=getAutoEquipProfile(charId);
  const score=()=>scoreAutoEquip(getEffectiveStats(charId),p);
  const origWeapon=entry.weapon;
  const origGear=entry.equipment.slice();

  // an owner's signature gets a small bonus: its effect is tuned for them
  const weapons=[...state.weaponInventory,...(origWeapon?[origWeapon]:[])];
  let bestWeapon=origWeapon, bestWeaponScore=-1;
  weapons.forEach(w=>{
    entry.weapon=w;
    const s=score()*(w.ownerId===charId?1.1:1);
    if(s>bestWeaponScore){ bestWeaponScore=s; bestWeapon=w; }
  });
  entry.weapon=bestWeapon;

  // artifacts: top items alone, plus combos built around 2 or 4 pieces of one set
  entry.equipment=[null,null,null,null,null];
  const baseline=score();
  const pool=[...state.inventory,...origGear.filter(Boolean)];
  const itemScore=new Map();
  pool.forEach(it=>{ entry.equipment=[it,null,null,null,null]; itemScore.set(it,score()-baseline); });
  const byScore=(a,b)=>itemScore.get(b)-itemScore.get(a);
  const sorted=[...pool].sort(byScore);
  const candidates=[sorted.slice(0,5)];
  const bySet={};
  pool.forEach(it=>{ (bySet[it.setId]=bySet[it.setId]||[]).push(it); });
  Object.values(bySet).forEach(list=>{
    list.sort(byScore);
    [2,4].forEach(k=>{
      if(list.length<k) return;
      const core=list.slice(0,k);
      candidates.push([...core,...sorted.filter(it=>!core.includes(it)).slice(0,5-k)]);
    });
  });
  let best=candidates[0], bestScore=-1;
  candidates.forEach(c=>{
    entry.equipment=[...c,...Array(5-c.length).fill(null)];
    const s=score();
    if(s>bestScore){ bestScore=s; best=c; }
  });

  entry.equipment=[...best,...Array(5-best.length).fill(null)];
  state.inventory=pool.filter(it=>!best.includes(it));
  if(bestWeapon!==origWeapon){
    state.weaponInventory=state.weaponInventory.filter(w=>w!==bestWeapon);
    if(origWeapon) state.weaponInventory.push(origWeapon);
  }
  render();
}

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
  if(state.credits<cost) return;
  state.credits-=cost;
  weapon.level++;
  weapon.mainStat.value += Math.max(1,Math.round(weapon.baseAtk*0.04));
  render();
}
function upgradeWeaponToMax(uid){
  const found=findWeapon(uid);
  if(!found) return;
  const weapon=normalizeWeapon(found.weapon);
  let upgraded=false;
  while(weapon.level<WEAPON_MAX_LEVEL){
    const cost=getWeaponUpgradeCost(weapon.level);
    if(state.credits<cost) break;
    state.credits-=cost;
    weapon.level++;
    weapon.mainStat.value+=Math.max(1,Math.round(weapon.baseAtk*0.04));
    upgraded=true;
  }
  if(upgraded) render();
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
  state.credits+=value;
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
  actions.push({label:level>=WEAPON_MAX_LEVEL?'Livello massimo':`⬆ Potenzia (${cost} 🪙)`,onClick:()=>upgradeWeapon(weapon.uid),disabled:level>=WEAPON_MAX_LEVEL||state.credits<cost});
  actions.push({label:'⏫ Potenzia al massimo',onClick:()=>upgradeWeaponToMax(weapon.uid),disabled:level>=WEAPON_MAX_LEVEL||state.credits<cost});
  actions.push({label:ascension>=WEAPON_MAX_ASCENSION?'Ascensione massima':hasDuplicate?`✦ Ascendi ${ascension+1}/${WEAPON_MAX_ASCENSION} (doppione)`:'✦ Ascendi (serve un doppione)',onClick:()=>ascendWeapon(weapon.uid),disabled:ascension>=WEAPON_MAX_ASCENSION||!hasDuplicate});
  actions.push({label:`💰 Vendi (+${getWeaponSellValue(weapon)} 🪙)`,onClick:()=>sellWeapon(weapon.uid)});
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
function savePartyPreset(index){
  if(index<0||index>=4) return;
  state.teamPresets[index]=state.party.slice();
  render();
}
function loadPartyPreset(index){
  const preset=state.teamPresets[index];
  if(!Array.isArray(preset)) return;
  const members=[...new Set(preset)].filter(id=>CHAR_DB[id] && state.roster[id]?.unlocked).slice(0,4);
  if(members.length===0) return;
  state.party=members;
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

function getSignaturePool(type){
  const heroRarity=type==='armi5'?5:4;
  return SIGNATURE_WEAPONS.filter(weapon=>CHAR_DB[weapon.ownerId].rarity===heroRarity);
}
function pityKeyFor(type){ return type==='armi5'?'weaponBannerPulls5':'weaponBannerPulls'; }

function drawFeaturedSignatureWeapon(type){
  const pool=getSignaturePool(type);
  const selected=pool.find(weapon=>weapon.name===state.featuredWeaponTargets[type]);
  const weapon=selected||pick(pool);
  if(!weapon) throw new Error(`Nessuna arma firma disponibile per il banner ${type}.`);
  if(selected) state.featuredWeaponTargets[type]=null;
  return createWeapon(weapon.name);
}

function drawWeaponBannerWeapon(type){
  const roll=Math.random();
  const rarity=roll<0.02?'leggendaria':roll<0.12?'epica':roll<0.47?'rara':'comune';
  if(rarity==='leggendaria') return drawFeaturedSignatureWeapon(type);
  const weaponNames=WEAPON_NAMES.filter(name=>WEAPON_FIXED_STATS[name].rarity===rarity);
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
  recordDailyMissionProgress('summon');
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

function doSingleWeaponPull(type){
  if(state.gold<PULL_COST) return null;
  const pityKey=pityKeyFor(type);
  state.gold-=PULL_COST;
  state.totalPullsDone++;
  recordDailyMissionProgress('summon');
  state[pityKey]++;

  let result;
  if(state[pityKey]>=WEAPON_BANNER_PITY){
    const weapon=drawFeaturedSignatureWeapon(type);
    state[pityKey]=0;
    state.weaponInventory.push(weapon);
    return {type:'weapon',weapon,pity:true};
  }

  const roll=Math.random();
  if(roll<CHAR_PULL_CHANCE_5){
    result=grantCharacterOfRarity(5,false);
  } else if(roll<CHAR_PULL_CHANCE_5+CHAR_PULL_CHANCE_4){
    result=grantCharacterOfRarity(4,false);
  } else {
    const weapon=drawWeaponBannerWeapon(type);
    state.weaponInventory.push(weapon);
    if(weapon.rarity==='leggendaria') state[pityKey]=0;
    result={type:'weapon',weapon};
  }
  return result;
}

async function doWeaponPulls(count,type){
  const results=[];
  for(let index=0;index<count;index++){
    const result=doSingleWeaponPull(type);
    if(!result) break;
    results.push(result);
  }
  state.lastPullResults=results;
  state.lastPullBanner=type;
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
  {id:'unlock5star',  desc:'Sblocca un eroe a 5 stelle',       reward:2000, check:hasUnlocked5Star},
  {id:'equip1',       desc:'Equipaggia il tuo primo manufatto', reward:500,  check:anyHeroHasEquippedArtifact},
  {id:'equipWeapon',  desc:'Equipaggia la tua prima arma',      reward:600,  check:anyHeroHasWeapon},
  {id:'finana',       desc:'Completa l\'Universo Simulato per la prima volta', reward:800, unlockChar:'finanaRyugu', rewardText:'Sblocca Finana Ryugu (★★★★)', check:()=>state.suCleared},
  {id:'kiara',        desc:'Completa Pure Fiction per la prima volta', reward:800, unlockChar:'takanashiKiara', rewardText:'Sblocca Kiara Takanashi (★★★★)', check:()=>state.pfCleared},
];

const STARTER_TOWER_MISSIONS = Array.from(
  {length:Math.min(5,Math.floor(TOWER_MAX_FLOOR/5))},
  (_,index)=>({id:`starterTower${(index+1)*5}`,floor:(index+1)*5})
);
const DAILY_MISSION_REWARD = 300;
const DAILY_MISSIONS = [
  {id:'battle', desc:'Vinci una battaglia nella Torre o in un Dominio'},
  {id:'summon', desc:'Effettua un\'evocazione'},
  {id:'artifactSale', desc:'Vendi un manufatto'},
  {id:'artifactUpgrade', desc:'Potenzia un manufatto di un livello'},
];
function ensureDailyMissions(){
  const date=pfDateKey();
  if(!state.dailyMissions || state.dailyMissions.date!==date){
    state.dailyMissions={date,progress:{},claimed:[]};
  }
  const day=state.dailyMissions;
  if(!day.progress || typeof day.progress!=='object') day.progress={};
  if(!Array.isArray(day.claimed)) day.claimed=[];
  DAILY_MISSIONS.forEach(mission=>{
    day.progress[mission.id]=Math.max(0,Number(day.progress[mission.id])||0);
  });
  return day;
}
function recordDailyMissionProgress(id,amount=1){
  const mission=DAILY_MISSIONS.find(entry=>entry.id===id);
  if(!mission) return;
  const day=ensureDailyMissions();
  day.progress[id]=Math.min(1,(day.progress[id]||0)+amount);
}

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
  {id:'tower',  label:t=>`Raggiungi il Piano ${t} della Torre`, baseTarget:5, step:5,  baseReward:600, rewardStep:300, getValue:()=>Math.max(0,state.maxStageReached-1), maxTarget:TOWER_MAX_FLOOR},
  {id:'heroes', label:t=>`Sblocca ${t} eroi`,                   baseTarget:2, step:1,  baseReward:750, rewardStep:500, getValue:countUnlockedHeroes, maxTarget:Object.keys(CHAR_DB).length},
  {id:'pulls',  label:t=>`Effettua ${t} evocazioni totali`,     baseTarget:5, step:15, baseReward:450, rewardStep:300, getValue:()=>state.totalPullsDone},
  {id:'sells',  label:t=>`Vendi ${t} manufatti`,                baseTarget:3, step:5,  baseReward:300, rewardStep:240, getValue:()=>state.totalArtifactsSold},
  {id:'artifactLevel', label:t=>`Porta un manufatto al livello ${t}`, baseTarget:5, step:5, baseReward:450, rewardStep:300, getValue:getHighestArtifactLevel, maxTarget:20},
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
  state.credits += getTrackReward(track);
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
  const duplicateCharacter = q.unlockChar&&state.roster[q.unlockChar].unlocked;
  if(q.unlockChar&&!duplicateCharacter) state.roster[q.unlockChar].unlocked = true;
  if(duplicateCharacter) state.gold += 2000;
  else state.credits += q.reward;
  render();
}

function claimStarterTowerMission(id){
  const mission=STARTER_TOWER_MISSIONS.find(entry=>entry.id===id);
  if(!mission || state.claimedQuests[id] || getClearedTowerFloor()<mission.floor) return;
  state.claimedQuests[id]=true;
  state.gold+=PULL_COST*5;
  render();
}

function claimDailyMission(id){
  const mission=DAILY_MISSIONS.find(entry=>entry.id===id);
  if(!mission) return;
  const day=ensureDailyMissions();
  if(day.claimed.includes(id) || (day.progress[id]||0)<1) return;
  day.claimed.push(id);
  state.gold+=DAILY_MISSION_REWARD;
  render();
}

/* ============ RENDER ============ */
function el(html){ const d=document.createElement('div'); d.innerHTML=html.trim(); return d.firstElementChild; }

function render(){
  const inBattle=state.screen==='battle';
  const hakosFormActive=inBattle&&!!state.battle?.hakosFormState;
  document.body.classList.toggle('hakos-chaos-mode',hakosFormActive);
  document.body.classList.toggle('kobo-underwater-mode',inBattle&&!!state.battle?.koboCorrosionAura&&!hakosFormActive);
  const app = document.getElementById('app');
  app.innerHTML='';
  app.appendChild(renderTopbar());
  if(state.screen==='home') app.appendChild(renderHome());
  else if(state.screen==='town') app.appendChild(renderTown());
  else if(state.screen==='battle') app.appendChild(renderBattle());
  else if(state.screen==='victory') app.appendChild(renderVictory());
  else if(state.screen==='defeat') app.appendChild(renderDefeat());
  else if(state.screen==='pfresult') app.appendChild(renderPFResult());
  else if(state.screen==='apocresult') app.appendChild(renderApocalypticShadowResult());
  else if(state.screen==='moc') app.appendChild(renderTravelLogTab());
  else if(state.screen==='su' && state.su) app.appendChild(renderSUScreen());
  if(state.screen!=='home') saveGame();
}

function renderTopbar(){
  const bar = el(`<div class="hud-panel topbar">
    <div class="title">
      <div class="glyph">◈</div>
      <div>
        <h1>Eco del Vuoto</h1>
        <div class="sub">Piano ${state.stage}/${TOWER_MAX_FLOOR} · Torre del Vuoto</div>
      </div>
    </div>
    <div class="stats">
      <div class="stat"><div class="val">${state.gold}</div><div class="lbl">Frammenti</div></div>
      <div class="stat"><div class="val">${state.credits}</div><div class="lbl">Crediti</div></div>
      <div class="stat"><div class="val">${state.battle?.mode==='moc'?state.battle.allies.length:state.party.length}/4</div><div class="lbl">Squadra</div></div>
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
    <p>Inizi con un solo eroe e affronti una Torre di ${TOWER_MAX_FLOOR} piani. Attacco base, Skill a punti condivisi, Ultimate a energia: sconfiggi i nemici, raccogli manufatti e sblocca altri eroi lungo la strada.</p>
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

function loadCharacterImage(image,charId,onLoad,onError){
  const extensions=['webp','png','jpg','jpeg'];
  let extensionIndex=0;
  image.addEventListener('load',()=>onLoad?.(),{once:true});
  image.addEventListener('error',()=>{
    if(extensionIndex<extensions.length){
      image.src=`resources/${charId.toLowerCase()}.${extensions[extensionIndex++]}`;
    } else {
      image.remove();
      onError?.();
    }
  });
  image.src=`resources/${charId.toLowerCase()}.${extensions[extensionIndex++]}`;
}

const characterArtworkImages=new Map();

function addCharacterCardArtwork(card,charId){
  let image=characterArtworkImages.get(charId);
  if(!image){
    image=document.createElement('img');
    image.className='hero-card-art';
    image.alt='';
    image.setAttribute('aria-hidden','true');
    image.loading='lazy';
    image.decoding='async';
    characterArtworkImages.set(charId,image);
    loadCharacterImage(
      image,
      charId,
      ()=>image.parentElement?.classList.add('has-art'),
      ()=>characterArtworkImages.delete(charId)
    );
  }
  card.prepend(image);
  if(image.complete&&image.naturalWidth>0) card.classList.add('has-art');
}

function renderHeroCard(charId){
  const c = CHAR_DB[charId];
  const unlocked = state.roster[charId].unlocked;
  if(!unlocked){
    const card=el(`<div class="hud-panel hero-card locked-card">
      <div class="hero-head">
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
    addCharacterCardArtwork(card,charId);
    return card;
  }
  const eff = getEffectiveStats(charId);
  const selected = state.party.includes(charId);
  const card = el(`<div class="hud-panel hero-card ${selected?'selected':''}">
    <div class="hero-head">
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
    <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap;"><button class="small ${selected?'danger':''}" id="toggle-${charId}">${selected?'Rimuovi dalla squadra':'Aggiungi alla squadra'}</button><button class="small" id="auto-${charId}">⚙ Equip automatico</button></div>
  </div>`);
  addCharacterCardArtwork(card,charId);
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
  card.querySelector(`#auto-${charId}`).onclick=(ev)=>{ ev.stopPropagation(); autoEquip(charId); };
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
    ['viaggi','Travel Log'],
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

  wrap.appendChild(el(`<div class="roster-section-title">Preset squadra</div>`));
  wrap.appendChild(el(`<div class="hint" style="margin-bottom:10px;">Salva fino a 4 composizioni e applicale tutte insieme quando vuoi.</div>`));
  const presetGrid=el(`<div class="team-preset-grid"></div>`);
  state.teamPresets.forEach((preset,index)=>{
    const isCurrent=preset.length===state.party.length&&preset.every((id,memberIndex)=>id===state.party[memberIndex]);
    const names=preset.map(id=>CHAR_DB[id]?.name).filter(Boolean);
    const card=el(`<div class="hud-panel team-preset-card ${isCurrent?'active':''}">
      <div class="team-preset-title">Preset ${index+1}${isCurrent?'<span>IN USO</span>':''}</div>
      <div class="team-preset-members">${names.length?names.join(' · '):'Nessuna squadra salvata'}</div>
      <div class="team-preset-actions">
        <button class="small primary" type="button" ${names.length?'':'disabled'}>Carica</button>
        <button class="small" type="button">Salva squadra attuale</button>
      </div>
    </div>`);
    const [loadButton,saveButton]=card.querySelectorAll('button');
    loadButton.onclick=()=>loadPartyPreset(index);
    saveButton.onclick=()=>savePartyPreset(index);
    presetGrid.appendChild(card);
  });
  wrap.appendChild(presetGrid);

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

function abilityScalingLabel(ability){
  return ability.defBased?'DIF':ability.hpBased?'PV massimi':'ATK';
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
      ${c.faction?`<div class="element-tag" style="margin-top:4px;">Appartenenza: ${c.faction}</div>`:''}
      <div class="element-tag" style="margin-top:4px;">Elemento: ${ELEMENT_DATA[c.element].label}</div>
      <div class="hero-stars" style="color:${c.rarity===5?'#ffd700':'#9aa4c4'}">${'★'.repeat(c.rarity)}${unlocked?'':' · 🔒 Bloccato'}</div>
      ${c.holoXAttackPerMember?`<div class="hint" style="text-align:left;margin-top:4px;">Passiva HoloX: +${Math.round(c.holoXAttackPerMember*100)}% ATK per ogni membro HoloX in squadra (inclusa Takane).</div>`:''}
      ${c.ultChargeMode==='debuffs'?`<div class="hint" style="text-align:left;margin-top:4px;">Carica speciale: ogni nemico che riceve un debuff da un alleato fornisce 1 carica; anche le DoT contano. Servono ${c.ultChargeMax} cariche per l'Ultimate.</div>`:''}
      ${c.passiveDotEnergy?`<div class="hint" style="text-align:left;margin-top:4px;">Passiva: ogni stack di DoT attivato normalmente o detonata ripristina 5 energia a Kobo e a chi l'ha applicata.</div>`:''}
      ${c.passiveSpCapBonus?`<div class="hint" style="text-align:left;margin-top:4px;">Passiva: mentre è in squadra, il cap dei Punti Abilità sale da 5 a ${5+c.passiveSpCapBonus}.</div>`:''}
      ${c.passiveSelfHeal?`<div class="hint" style="text-align:left;margin-top:4px;">Passiva: ogni volta che attacca recupera il ${Math.round(c.passiveSelfHeal*100)}% dei PV massimi.</div>`:''}
      ${c.passiveKiaraCounter?`<div class="hint" style="text-align:left;margin-top:4px;">Passiva: quando Kiara viene colpita e sopravvive, contrattacca il nemico con un follow-up equivalente alla Skill.</div>`:''}
      ${c.passiveFinanaFollowUp?`<div class="hint" style="text-align:left;margin-top:4px;">Passiva: quando un nemico scende al 50% dei PV per la prima volta, Finana lancia un follow-up ad area che infligge danni pari al 3% dei suoi PV massimi per bersaglio (massimo 4 per round).</div>`:''}
      ${c.passiveInaFollowUps?`<div class="hint" style="text-align:left;margin-top:4px;">Passiva: marchia il nemico con meno PV. I colpi al marchiato attivano fino a ${c.passiveInaFollowUps} follow-up; la Ultimate ricarica le cariche. Ogni volta che un alleato colpisce il nemico marchiato, Ina rigenera 10 energia.</div>`:''}
      ${c.passiveZetaFollowUps?`<div class="hint" style="text-align:left;margin-top:4px;">Passiva: gli attacchi di un alleato diverso da Zeta attivano un follow-up, anche contro nemici senza Sanguinamento. La Ultimate ricarica le ${c.passiveZetaFollowUps} cariche.</div>`:''}
      ${c.passiveHpLossFollowUps?`<div class="hint" style="text-align:left;margin-top:4px;">Passiva: ogni ${c.passiveHpLossFollowUps} perdite di PV attiva un follow-up ad area e cura il 15% dei PV massimi.</div>`:''}
      ${c.passiveEnemySpeedDown?`<div class="hint" style="text-align:left;margin-top:4px;">Passiva: riduce la VEL di tutti i nemici del ${Math.round(c.passiveEnemySpeedDown*100)}% per la battaglia.</div>`:''}
      ${c.revivesPerBattle?`<div class="hint" style="text-align:left;margin-top:4px;">Passiva: può rinascere ${c.revivesPerBattle} volte per battaglia con il 60% dei PV massimi.</div>`:''}
    </div>
  </div>`);
  wrap.appendChild(head);

  const cards = el(`<div class="ability-cards"></div>`);
  cards.appendChild(renderAbilityCard(c.basic, 'basic', 'Attacco Base',
    `<span><b>Moltiplicatore:</b> ${Math.round(c.basic.mult*100)}% ${abilityScalingLabel(c.basic)}${c.basic.hits?` x${c.basic.hits} colpi`:''}</span>
     <span><b>Genera:</b> ${c.basic.spGain!==undefined?c.basic.spGain:1} Punto/i Abilità</span>
     ${c.ultChargeMode==='debuffs'?'':`<span><b>Energia:</b> +${c.basic.energyGain}</span>`}`));
  cards.appendChild(renderAbilityCard(c.skill, 'skill', 'Skill · 1 Punto Abilità',
    `<span><b>Moltiplicatore:</b> ${c.skill.mult>0?Math.round(c.skill.mult*100)+'% '+abilityScalingLabel(c.skill):'—'}${c.skill.hits?` x${c.skill.hits} colpi`:''}</span>
     ${c.skill.effect?`<span><b>Effetto:</b> ${effectLabel(c.skill)}</span>`:''}
     ${c.ultChargeMode==='debuffs'?'':`<span><b>Energia:</b> +${c.skill.energyGain}</span>`}`));
  cards.appendChild(renderAbilityCard(c.ult, 'ult', c.ultChargeMode==='debuffs'?'Ultimate · 5 cariche':'Ultimate · Energia Piena',
    `<span><b>Moltiplicatore:</b> ${c.ult.mult>0?Math.round(c.ult.mult*100)+'% '+abilityScalingLabel(c.ult):'—'}${c.ult.hits?` x${c.ult.hits} colpi`:''}</span>
     ${c.ult.effect?`<span><b>Effetto:</b> ${effectLabel(c.ult)}</span>`:''}
     ${c.ultChargeMode==='debuffs'?`<span><b>Carica speciale:</b> ${c.ultChargeMax} debuff inflitti ai nemici (DoT comprese)</span>`:`<span><b>Energia massima:</b> ${c.base.energyMax}</span>`}`));
  if(id==='ninomaeInaNis'){
    cards.appendChild(renderAbilityCard(
      {name:'Tentacolo Inchiostrato',desc:'Un follow-up separato quando un alleato diverso da Ina colpisce il nemico marchiato.'},
      'skill','Follow-up · Reazione',
      `<span><b>Moltiplicatore:</b> 10% PV massimi</span><span><b>Cariche:</b> 3 per battaglia</span><span><b>Energia:</b> +10 per follow-up</span><span><b>Ricarica:</b> Ultimate</span><span>Il follow-up casuale della Ultimate non consuma cariche.</span>`
    ));
  }
  if(id==='vestiaZeta'){
    cards.appendChild(renderAbilityCard(
      {name:'Danza Sanguinaria',desc:'Quando un alleato diverso da Zeta attacca, Zeta colpisce fino a due nemici casuali, anche se non hanno Sanguinamento.'},
      'basic','Passiva · Follow-up',
      `<span><b>Moltiplicatore:</b> 85% ATK per bersaglio</span><span><b>Bersagli:</b> Fino a 2 nemici casuali, senza ripetizioni</span><span><b>Effetto:</b> Applica 1 stack di Sanguinamento a ciascun bersaglio sopravvissuto</span><span><b>Cariche:</b> ${c.passiveZetaFollowUps} · ricaricate dalla Ultimate</span>`
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
    wrap.appendChild(el(`<div class="hint" style="margin:-8px 0 14px;">Disponibili durante la Ultimate. Hakos resta sola per 10 azioni e agisce due volte per turno; nessuna abilità genera energia.</div>`));
    const formCards=el(`<div class="ability-cards"></div>`);
    const formBasic=HAKOS_FORM_ABILITIES.basic;
    const formSkill=HAKOS_FORM_ABILITIES.skill;
    formCards.appendChild(renderAbilityCard(formBasic,'basic','Attacco Base · Trasformata',
      `<span><b>Moltiplicatore:</b> ${Math.round(formBasic.mult*100)}% ATK</span><span><b>Bersaglio:</b> Bersaglio selezionato e nemici adiacenti, fino a 3 nemici</span><span><b>Energia:</b> Non genera energia</span>`));
    formCards.appendChild(renderAbilityCard(formSkill,'skill','Skill · Trasformata',
      `<span><b>Moltiplicatore:</b> ${Math.round(formSkill.mult*100)}% ATK</span><span><b>Bersaglio:</b> Bersaglio selezionato e nemici adiacenti</span><span><b>Energia:</b> Non genera energia</span>`));
    wrap.appendChild(formCards);
  }
  return wrap;
}

function effectLabel(ability){
  switch(ability.effect){
    case 'kiara_skill_heal': return `Dopo il colpo, cura Kiara del ${Math.round(ability.healPct*100)}% della sua DIF.`;
    case 'kiara_def_buff': return `Aumenta la DIF di Kiara del ${Math.round(ability.defBuffPct*100)}% per 2 turni.`;
    case 'shield_self': return ability.shieldDefMult!==undefined
      ? `Scudo pari al ${Math.round(ability.shieldDefMult*100)}% della DIF di chi lo genera, per 2 turni. Lo stesso scudo protegge anche l'alleato con meno PV.`
      : `Scudo su se stesso pari al ${Math.round(ability.shieldPct*100)}% dei PV massimi, per 2 turni. Lo stesso scudo (sui PV massimi dell'alleato) va anche all'alleato con meno PV.`;
    case 'shield_all': return ability.shieldDefMult!==undefined
      ? `Scudo su tutta la squadra pari al ${Math.round(ability.shieldDefMult*100)}% della DIF di chi lo genera, per 2 turni.`
      : `Scudo su tutta la squadra pari al ${Math.round(ability.shieldPct*100)}% dei PV massimi, per 2 turni.`;
    case 'elizabeth_shield_taunt': return `Scudo su un alleato pari al ${Math.round(ability.shieldDefMult*100)}% della DIF di Elizabeth. I nemici lo prendono di mira per ${ability.tauntTurns} turni.`;
    case 'heal': return `Cura un alleato.`;
    case 'heal_all': return `Cura l'intera squadra.`;
    case 'burn': return `Applica ${ability.burnStacks} carica/e di Sanguinamento (danno nel tempo).`;
    case 'koyori_shock': return `Riduce la DIF del ${Math.round((ability.defDownPct||0)*100)}% e applica Shock x${ability.burnStacks||1} (danno nel tempo) a ogni bersaglio colpito.`;
    case 'burn_all': return `Applica ${ability.burnStacks} carica/e di Sanguinamento a tutti i nemici colpiti.`;
    case 'reine_dot': return `Applica ${ability.burnStacks} stack di Incanto a tutti i nemici: danno nel tempo.`;
    case 'reine_skill': return `Applica ${ability.burnStacks} stack di Incanto a tutti i nemici e aumenta del ${Math.round(ability.dotDamageBuff*100)}% i danni da DoT degli alleati per 2 turni.`;
    case 'reine_ultimate': return `Applica ${ability.burnStacks} stack di Incanto a tutti i nemici e detona le DoT dannose presenti.`;
    case 'kobo_seasick': return `Applica 1 stack di Mal di mare: ATK nemico -5% per stack, fino a 10 stack (-50%).`;
    case 'kobo_seasick_all': return `Detona tutte le DoT dannose con un tick normale per i loro stack, poi applica 1 stack di Mal di mare a ogni nemico colpito (massimo 10).`;
    case 'kobo_detonate_dots': return `Detona tutte le DoT dannose con un tick normale per i loro stack, poi attiva per il resto della battaglia un'aura che applica Corrosione agli avversari che ne sono privi.`;
    case 'buff_atk': return `+${Math.round(ability.buffPct*100)}% ATK a tutta la squadra per 2 turni.`;
    case 'buff_atk_energy': return `+${Math.round(ability.buffPct*100)}% ATK per 3 turni e +${ability.energyGainAll} energia a tutta la squadra.`;
    case 'buff_atk_def': return `+${Math.round(ability.buffPct*100)}% ATK e +${Math.round(ability.defBuffPct*100)}% DIF a tutta la squadra per 3 turni.`;
    case 'boost_basic_hits': return `Aumenta di 1 il numero di colpi dell'Attacco Base (fino a un massimo di 10). Non conclude il turno: si può riusare finché ci sono Punti Abilità, poi va chiusa con l'Attacco Base. Le prime 2 Skill della battaglia non costano Punti Abilità.`;
    case 'extra_attack_buff': return `L'alleato scelto attacca subito una volta in più e ottiene +${Math.round(ability.buffPct*100)}% ATK per 2 turni.`;
    case 'grant_sp': return `Dona istantaneamente ${ability.spGrant} Punti Abilità alla squadra (nessun danno).`;
    case 'grant_sp_and_buff': return `Dona istantaneamente ${ability.spGrant} Punti Abilità e +${Math.round(ability.buffPct*100)}% ATK a tutta la squadra per 2 turni.`;
    case 'hakos_ultimate': return `Assorbe PV, ATK, DIF, VEL, scudi e buff ATK degli alleati. Hakos resta sola per 10 azioni e agisce due volte per turno; poi li richiama. Durante la forma non guadagna energia.`;
    case 'suisei_guard': return `Sacrifica il 50% dei PV correnti e riduce del 40% i danni subiti per 3 round. I nemici sono costretti ad attaccare Susei per 2 round (Provocazione). Durante la postura la Skill è bloccata e il Basic viene potenziato.`;
    case 'suisei_set_half_hp': return `Dopo il colpo porta i PV di Susei esattamente al 50%: cura se è sotto, sacrifica PV se è sopra.`;
    case 'laplus_def_down': return `Riduce la DIF del nemico del 15% per 2 round. Il debuff si accumula fino al 75%.`;
    case 'laplus_remove_element': return `Riduce la DIF del 15% e per 2 round rimuove dalla lista delle debolezze del bersaglio l'elemento del primo eroe in squadra, se presente, aggiungendo quello contrapposto.`;
    case 'laplus_ultimate': return `Colpisce tutti i nemici, riduce la DIF del 30% per 2 round e rinnova il debuff.`;
    case 'ina_mark': return `Marca un nemico: quando viene colpito, Ina esegue un follow-up e rigenera 10 energia se a colpire è un alleato. Disponibili 3 cariche, recuperate con la Ultimate.`;
    case 'ina_ultimate': return `Colpisce tutti i nemici, esegue un follow-up su un bersaglio casuale e recupera tutte le cariche.`;
    case 'selen_skill': return `Danno ${Math.round(ability.mult*100)}% ATK; ${Math.round(ability.weakMult*100)}% ATK se il nemico è debole all'Electro.`;
    case 'selen_ult': return `Se il nemico è debole all'Electro lo Stordisce per 2 turni: salta le sue azioni.`;
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
        {label:maxed?'Livello massimo':`⬆ Potenzia (${cost} 🪙)`,onClick:()=>levelUpArtifact(it.uid),disabled:maxed||state.credits<cost},
        getArtifactMaxUpgradeAction(it),
        {label:`💰 Vendi (+${getArtifactSellValue(it)} 🪙)`,onClick:()=>sellArtifact(it.uid)},
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
  wrap.appendChild(el(`<div class="hint" style="margin:8px 0 20px;">I manufatti si possono potenziare fino al livello 20 spendendo Crediti e vendere per Crediti. I set attivano bonus con 2 e 4 pezzi.</div>`));

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
    const enemyCards = [...[...ENEMY_NAMES,...Object.keys(SPECIAL_ENEMIES)].map(name => el(`<div class="hud-panel artifact-card" style="border-color:#a1a1aa;">
      <div class="ac-head">
        <span class="ac-icon">◆</span>
        <div>
          <div class="ac-name">${name}</div>
          <div class="ac-setname" style="color:#a1a1aa;">${SPECIAL_ENEMIES[name]?'Nemico speciale':'Nemico comune'}</div>
        </div>
      </div>
      <div class="ac-main">${SPECIAL_ENEMIES[name]?SPECIAL_ENEMIES[name].label:'Scarto: minion di torre'}</div>
      <div class="ac-subs"><span>· Elementi: ${elementLabels(ENEMY_ELEMENT_SETS[name])}</span></div>
    </div>`)), ...BOSS_NAMES.map(name => el(`<div class="hud-panel artifact-card" style="border-color:#eab308;">
      <div class="ac-head">
        <span class="ac-icon">☠</span>
        <div>
          <div class="ac-name">${name}</div>
          <div class="ac-setname" style="color:#eab308;">Boss</div>
        </div>
      </div>
      <div class="ac-main">${name==='Costrutto Immergreen'?'Tre parti con PV condivisi · Fase 2: il centro attacca due volte, secondo colpo AoE':name==='Suisei Pshyco'?'Fase 1: due attacchi · Fase 2: un attacco e una cura':'Due attacchi per turno'} · Due barre di PV</div>
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
    ['Boss e fasi', `<p>I boss hanno molti più PV, compiono due attacchi consecutivi a ogni turno e passano alla Fase 2 quando esauriscono la prima barra di PV: la seconda barra si riempie, lo scudo e i rinforzi in corso vengono annullati, il loro ATK aumenta e la mossa speciale diventa più frequente. Ogni boss ha una meccanica propria; gli evocati non superano mai 5 nemici vivi in campo.</p>`],
    ['Velocità e ordine', `<p>Ogni round mostra l'ordine completo delle azioni: chi ha più VEL agisce prima, eroi e nemici possono alternarsi. Gli eroi partono da 100 VEL; i nemici hanno da 90 a 120. Gli artefatti possono aggiungere VEL: le statistiche VEL partono da 1–4 e, potenziando una secondaria, possono arrivare fino a 12.</p>`],
    ['Attacco, Skill e Ultimate', `<ul><li><b>Attacco Base:</b> infligge danno, genera Punti Abilità e ricarica energia.</li><li><b>Skill:</b> di norma costa 1 Punto Abilità; alcune abilità hanno usi gratuiti o effetti speciali.</li><li><b>Ultimate:</b> si attiva quando l'energia è al massimo e consuma tutta l'energia accumulata.</li></ul><p>La squadra parte con 3 Punti Abilità, ne può conservare fino a 5; Ouro Kronii aumenta il limite se è in squadra.</p>`],
    ['Elementi e danni', `<p>Ogni eroe ha un elemento; ogni nemico ha sempre gli stessi 3 elementi, mostrati nell'Indice e in battaglia. Un attacco dello stesso elemento infligge metà danno. Un elemento forte contro uno dei tipi del nemico infligge il doppio; gli altri attacchi infliggono danno normale.</p><ul>${Object.keys(ELEMENT_DATA).map(element=>`<li><b>${ELEMENT_DATA[element].label}</b> è forte contro ${ELEMENT_DATA[ELEMENT_DATA[element].strongAgainst].label}.</li>`).join('')}</ul>`],
    ['Manufatti e set', `<p>Equipaggia fino a 5 manufatti per eroe. Le statistiche principali e secondarie aumentano i parametri; i bonus set si attivano con 2 e 4 pezzi dello stesso set. Puoi potenziare un manufatto fino al livello 20; ogni 5 livelli migliora una statistica secondaria casuale.</p>`],
    ['Armi', `<p>Ogni eroe ha uno slot arma. Ogni arma ha rarità, ATK, statistica secondaria ed effetto fissi. Potenziala fino al livello 20 spendendo Crediti; ascendi fino al grado 5 consumando un doppione identico e vendila dall'Armeria. Ci sono due Banner armi: uno con le armi esclusive degli eroi 4 stelle e uno con quelle degli eroi 5 stelle.</p>`],
    ['Torre, domini e ricompense', `<p>Avanza nella Torre del Vuoto: la progressione termina al Piano ${TOWER_MAX_FLOOR} e ogni 5 piani affronti un boss. Pure Fiction, Memory of Chaos e Apocalyptic Shadow sono accessibili dall'inizio con tutti i gradi di difficoltà già selezionabili. Le vittorie in Torre e nei domini danno Crediti e manufatti; usa i Crediti per potenziare armi e manufatti e i Frammenti (ottenuti nel Travel Log) per evocare dal Banner.</p>`],
    ['Banner e missioni', `<p>Un'evocazione costa 300 Frammenti. Il Banner personaggi garantisce un personaggio 4 stelle entro 10 evocazioni e uno 5 stelle entro 50. Nei Banner armi i personaggi hanno le stesse probabilità base ma nessuna garanzia: un'arma esclusiva (4 o 5 stelle a seconda del banner) è invece garantita ogni 30 evocazioni su quel banner. Le missioni iniziali della Torre danno 5 evocazioni ai piani 5, 10, 15, 20 e 25. Le missioni ricorrenti offrono Crediti; le quattro missioni giornaliere danno 300 Frammenti ciascuna e si azzerano a mezzanotte.</p>`],
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
  const starterTowerDone=STARTER_TOWER_MISSIONS.filter(mission=>state.claimedQuests[mission.id]).length;
  const daily=ensureDailyMissions();
  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Obiettivi</span><h2>Missioni</h2></div>`));
  wrap.appendChild(el(`<div class="hint" style="margin-bottom:14px;">Le missioni a progressione si ripetono all'infinito: ogni volta che le riscatti, obiettivo e ricompensa aumentano per il giro successivo.</div>`));

  wrap.appendChild(el(`<div class="screen-title" style="margin-top:6px;"><span class="eyebrow">All'inizio dell'avventura</span><h2>Missioni della Torre (${starterTowerDone}/${STARTER_TOWER_MISSIONS.length})</h2></div>`));
  wrap.appendChild(el(`<div class="hint" style="margin-bottom:10px;">Completa i piani 5, 10, 15, 20 e 25: ogni traguardo ti dà 5 evocazioni (1.500 💠 Frammenti).</div>`));
  const starterTowerGrid=el(`<div class="artifact-grid"></div>`);
  STARTER_TOWER_MISSIONS.forEach(mission=>{
    const claimed=!!state.claimedQuests[mission.id];
    const completed=!claimed&&getClearedTowerFloor()>=mission.floor;
    const statusLabel=claimed?'✓ Riscattata':completed?'Completata!':`${Math.min(getClearedTowerFloor(),mission.floor)}/${mission.floor} piani`;
    const statusColor=claimed?'var(--green)':completed?'var(--amber)':'var(--text-dim)';
    const card=el(`<div class="hud-panel artifact-card" style="border-color:${claimed?'var(--green)':completed?'var(--amber)':'var(--border)'}">
      <div class="ac-name">Completa il Piano ${mission.floor}</div>
      <div class="ac-main">Ricompensa: <b>5 evocazioni · +${PULL_COST*5} 💠 Frammenti</b></div>
      <div class="ac-setname" style="color:${statusColor}">${statusLabel}</div>
    </div>`);
    if(completed){
      const btn=el(`<button class="small primary" style="margin-top:8px;width:100%;">Riscatta 5 evocazioni</button>`);
      btn.onclick=event=>{ event.stopPropagation(); claimStarterTowerMission(mission.id); };
      card.appendChild(btn);
    }
    starterTowerGrid.appendChild(card);
  });
  wrap.appendChild(starterTowerGrid);

  wrap.appendChild(el(`<div class="screen-title" style="margin-top:6px;"><span class="eyebrow">Si rinnovano ogni giorno</span><h2>Missioni giornaliere</h2></div>`));
  wrap.appendChild(el(`<div class="hint" style="margin-bottom:10px;">Ogni missione completata dà 300 💠 Frammenti (fino a 1.200 al giorno). Reset tra <b id="dailyMissionTimer"></b></div>`));
  startPFTimer(wrap.querySelector('#dailyMissionTimer'));
  const dailyGrid=el(`<div class="artifact-grid"></div>`);
  DAILY_MISSIONS.forEach(mission=>{
    const claimed=daily.claimed.includes(mission.id);
    const completed=(daily.progress[mission.id]||0)>=1;
    const statusLabel=claimed?'✓ Riscattata':completed?'Completata!':'In corso';
    const statusColor=claimed?'var(--green)':completed?'var(--amber)':'var(--text-dim)';
    const card=el(`<div class="hud-panel artifact-card" style="border-color:${claimed?'var(--green)':completed?'var(--amber)':'var(--border)'}">
      <div class="ac-name">${mission.desc}</div>
      <div class="ac-main">Ricompensa: <b>+${DAILY_MISSION_REWARD} 💠 Frammenti</b></div>
      <div class="ac-setname" style="color:${statusColor}">${statusLabel}</div>
    </div>`);
    if(completed&&!claimed){
      const btn=el(`<button class="small primary" style="margin-top:8px;width:100%;">Riscatta</button>`);
      btn.onclick=event=>{ event.stopPropagation(); claimDailyMission(mission.id); };
      card.appendChild(btn);
    }
    dailyGrid.appendChild(card);
  });
  wrap.appendChild(dailyGrid);

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
      <div class="ac-main">Ricompensa: <b>+${reward} 🪙</b></div>
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
    const duplicateCharacter = q.unlockChar&&state.roster[q.unlockChar].unlocked;
    const unlockReward = q.rewardText&&!duplicateCharacter ? `${q.rewardText} · ` : '';
    const rewardLabel = duplicateCharacter ? '+2000 💠 Frammenti' : `${unlockReward}+${q.reward} 🪙 Crediti`;
    const card = el(`<div class="hud-panel artifact-card" style="border-color:${claimed?'var(--green)':completed?'var(--amber)':'var(--border)'}">
      <div class="ac-name">${q.desc}</div>
      <div class="ac-main">Ricompensa: <b>${rewardLabel}</b></div>
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
  const weaponBanner=state.bannerType!=='personaggi';
  const bannerTitles={personaggi:'Richiamo degli Eroi',armi4:'Arsenale degli Eroi ★★★★',armi5:'Arsenale delle Stelle ★★★★★'};
  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Evocazioni</span><h2>${bannerTitles[state.bannerType]}</h2></div>`));
  const modeBar=el(`<div class="subtab-bar banner-mode"></div>`);
  [['personaggi','Banner personaggi'],['armi4','Armi eroi ★★★★'],['armi5','Armi eroi ★★★★★']].forEach(([type,label])=>{
    const button=el(`<button class="subtab-btn ${state.bannerType===type?'active':''}">${label}</button>`);
    button.onclick=()=>setBannerType(type);
    modeBar.appendChild(button);
  });
  wrap.appendChild(modeBar);
  const bannerDescription=weaponBanner
    ? `Ogni evocazione costa ${PULL_COST} Frammenti. Le armi esclusive 5 stelle in palio sono quelle degli eroi ${state.bannerType==='armi5'?'5':'4'} stelle (${getSignaturePool(state.bannerType).map(weapon=>weapon.name).join(', ')}), più le ${WEAPON_NAMES.length} armi standard. Personaggi ★★★★★: 2%; ★★★★: 5%, senza garanzie. Un'arma esclusiva è garantita ogni ${WEAPON_BANNER_PITY} evocazioni su questo banner. La prossima arma esclusiva 5★ selezionata è garantita al prossimo drop 5★.`
    : `Ogni evocazione costa ${PULL_COST} Frammenti. Personaggi ★★★★★: 2% (garantito ogni ${PITY_LIMIT_5}); ★★★★: 5% (garantito ogni ${PITY_LIMIT_4} senza averne ottenuto uno). Il resto sono armi.`;
  wrap.appendChild(el(`<div class="hint" style="margin-bottom:14px;">${bannerDescription}</div>`));

  if(weaponBanner){
    const targetPanel=el(`<div class="hud-panel section" style="padding:12px 16px;margin-bottom:14px;display:flex;flex-wrap:wrap;align-items:center;gap:10px;"></div>`);
    const targetLabel=document.createElement('label');
    targetLabel.htmlFor='featured-weapon-target';
    targetLabel.textContent='Scegli la prossima arma esclusiva 5★:';
    const targetSelect=document.createElement('select');
    targetSelect.id='featured-weapon-target';
    targetSelect.style.cssText='min-width:220px;max-width:100%;padding:8px;background:var(--bg-panel-2);color:var(--text);border:1px solid var(--border);border-radius:6px;';
    const randomOption=document.createElement('option');
    randomOption.value='';
    randomOption.textContent='Nessuna preferenza (casuale)';
    targetSelect.appendChild(randomOption);
    getSignaturePool(state.bannerType).forEach(weapon=>{
      const option=document.createElement('option');
      option.value=weapon.name;
      option.textContent=weapon.name;
      targetSelect.appendChild(option);
    });
    targetSelect.value=state.featuredWeaponTargets[state.bannerType]||'';
    targetSelect.onchange=()=>{
      state.featuredWeaponTargets[state.bannerType]=targetSelect.value||null;
      saveGame();
      render();
    };
    targetPanel.append(targetLabel,targetSelect);
    targetPanel.appendChild(el('<span class="hint">La scelta si consuma quando ottieni un’arma esclusiva 5★, anche tramite la garanzia.</span>'));
    wrap.appendChild(targetPanel);
  }

  const info = el(`<div class="hud-panel section" style="padding:16px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:14px;align-items:center;">
    <div>
      <div class="hero-name" style="font-size:20px;">💠 ${state.gold} Frammenti</div>
      <div class="hint" style="margin:4px 0 0;text-align:left;">${weaponBanner?`Garanzia arma esclusiva: ${state[pityKeyFor(state.bannerType)]}/${WEAPON_BANNER_PITY}`:`Garanzia ★★★★: ${state.pityCounter}/${PITY_LIMIT_4} · Garanzia ★★★★★: ${state.pity5Counter}/${PITY_LIMIT_5}`}</div>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      <button class="primary" id="pull1" ${state.gold<PULL_COST?'disabled':''}>Evoca x1 (${PULL_COST})</button>
      <button class="primary" id="pull10" ${state.gold<PULL_COST*10?'disabled':''}>Evoca x10 (${PULL_COST*10})</button>
    </div>
  </div>`);
  info.querySelector('#pull1').onclick=()=>weaponBanner?doWeaponPulls(1,state.bannerType):doPulls(1);
  info.querySelector('#pull10').onclick=()=>weaponBanner?doWeaponPulls(10,state.bannerType):doPulls(10);
  wrap.appendChild(info);

  if(state.lastPullResults.length>0){
    const resultBanner={personaggi:'Banner personaggi',armi4:'Armi eroi ★★★★',armi5:'Armi eroi ★★★★★'}[state.lastPullBanner]||'Banner';
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
  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Progressione principale · ${TOWER_MAX_FLOOR} piani</span><h2>Torre del Vuoto</h2></div>`));
  wrap.appendChild(el(`<div class="hint" style="margin-bottom:14px;">La Torre termina al Piano ${TOWER_MAX_FLOOR}; ogni 5° piano c'è un boss. La difficoltà cresce fino al rango massimo, poi la Torre è completata. Scegli un piano già raggiunto.</div>`));

  const towerPanel = el(`<div class="hud-panel section" style="padding:16px;"></div>`);
  const scroller = el(`<div class="tower-scroller"></div>`);
  const windowStart = 1;
  const windowEnd = Math.min(state.maxStageReached,TOWER_MAX_FLOOR);
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
  requestAnimationFrame(()=>{ scroller.querySelector('.current')?.scrollIntoView({inline:'center',block:'nearest'}); });
  wrap.appendChild(towerPanel);

  const info = el(`<div class="hud-panel section" style="padding:16px;margin-top:14px;text-align:center;">
    <div class="hero-name" style="font-size:20px;">Piano selezionato: ${state.stage} ${isBossStage(state.stage)?'· BOSS':''}</div>
    <div class="hint">${getClearedTowerFloor()>=TOWER_MAX_FLOOR?`Torre completata · ${TOWER_MAX_FLOOR}/${TOWER_MAX_FLOOR} piani`:`Massimo raggiunto: piano ${windowEnd}/${TOWER_MAX_FLOOR}`}</div>
    <div style="margin-top:8px;"><label class="hint">Vai al piano <input type="number" id="stageJump" min="1" max="${windowEnd}" value="${state.stage}" style="width:80px;"></label> <button id="stageJumpBtn">Vai</button></div>
    <button class="primary" id="deployBtn2" style="margin-top:12px;padding:12px 26px;font-size:15px;">${getClearedTowerFloor()>=TOWER_MAX_FLOOR?'Rigioca':'Avvia'} Piano ${state.stage} ▶</button>
  </div>`);
  info.querySelector('#deployBtn2').onclick=()=>startBattle();
  info.querySelector('#stageJumpBtn').onclick=()=>{
    const n=parseInt(info.querySelector('#stageJump').value,10);
    if(Number.isInteger(n)&&n>=1&&n<=windowEnd){ state.stage=n; render(); }
  };
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
  else if(state.townTab==='viaggi') wrap.appendChild(renderTravelLogTab());
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
      {label: maxed ? 'Livello massimo' : `⬆ Potenzia (${cost} 🪙)`, onClick:()=>levelUpArtifact(it.uid), disabled: maxed || state.credits<cost},
      getArtifactMaxUpgradeAction(it),
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
      ${e.partLabel?`<div class="boss-add-tag" style="color:var(--cyan);">${e.partLabel==='centrale'?'NUCLEO CENTRALE':`PARTE ${e.partLabel.toUpperCase()}`}</div>`:''}
      ${e.inaMarked?'<div class="ina-mark-tag">✦ MARCHIATO · INA</div>':''}
      ${e.isBoss?`<div class="boss-tag">BARRA ${e.phase||1}/${e.maxPhases||2} · ${e.name==='Suisei Pshyco'&&e.phase===2?'1 ATTACCO + CURA':e.constructGroupId&&e.phase===2&&e.constructPart===1?'2 ATTACCHI · 2° AOE':e.constructGroupId?'ATTACCO SINGOLO':'2 ATTACCHI'}</div>`:''}
      ${e.name==='Suisei Pshyco'?`<div class="boss-add-tag" style="color:var(--amber);">✦ FOLLOW-UP ${e.psychoHitCount||0}/4 · DANNI +${Math.round((e.psychoDamageBonus||0)*100)}%${e.psychoDamageBonus?' · BOOST ATTIVO':''}</div>`:''}
      ${e.constructGroupId?'<div class="boss-add-tag" style="color:var(--amber);">PV CONDIVISI · GLI SCUDI RIFLETTONO 150% DEI DANNI ASSORBITI</div>':''}
      ${b.mode==='apoc'?`<div class="boss-add-tag" style="color:var(--amber);">${e.apocDamageReduction>0?`RIDUZIONE DANNI ${Math.round(e.apocDamageReduction*100)}% · STACK ELEMENTALI ${e.apocStacks||0}/${e.apocStacksRequired}`:'RIDUZIONE RIMOSSA · ENERGIA AL MASSIMO'}</div>`:''}
      ${e.seasickStacks>0?`<div class="boss-add-tag" style="color:var(--cyan);">🌊 MAL DI MARE x${e.seasickStacks} · ATK -${e.seasickStacks*5}%</div>`:''}
        ${e.name==='Custode della Civiltà'&&e.phase===2&&e.mumeiGuardActive?`<div class="boss-add-tag" style="color:var(--amber);">DANNI SUBITI -40% · ${e.mumeiGuardRounds} ROUND · ${e.mumeiGuardSkillPointsSpent}/5 PA</div>`:''}
        ${e.name==='Titano dell’Eclissi'&&e.phase===2?'<div class="boss-add-tag" style="color:var(--amber);">RESISTENZA 80% · ATTACCHI BASE E ULTIMATE</div>':''}
      ${e.stunTurns>0?`<div class="boss-add-tag" style="color:var(--amber);">⚡ STORDITO · ${e.stunTurns} TURNI</div>`:''}
      ${e.role?`<div class="boss-add-tag" style="color:var(--cyan);">${SPECIAL_ENEMIES[e.name].label.toUpperCase()}${e.role==='bomber'&&e.bomberCharged?' · CARICO!':''}</div>`:''}
      ${isAbissoProtected(e)?'<div class="boss-add-tag">PROTETTO · DANNI -90% FINCHÉ ESISTONO ALTRI NEMICI</div>':''}
      ${e.bossAddOwnerId&&!e.bossAddResolved?'<div class="boss-add-tag">RINFORZO · SCONFIGGI PER FERMARE L’ESPLOSIONE</div>':''}
      <div class="element-tags">${(e.elements||[e.element]).map(element=>{
        const affinity=getEnemyElementAffinity(e,element,activeAllyElement);
        const affinityLabel=affinity==='element-strong'?'Forte contro questo nemico':'Non forte contro questo nemico';
        return `<span class="element-tag ${affinity}" title="${activeAllyElement?`${affinityLabel} · ${ELEMENT_DATA[activeAllyElement].label}`:`Elemento ${ELEMENT_DATA[element]?.label||element}`} ">${ELEMENT_DATA[element]?.label||element}</span>`;
      }).join('')}</div>
      ${(e.defDownRounds>0||e.koyoriSlowApplied)?`<div class="enemy-status-tags">${e.defDownRounds>0?`<span class="enemy-defdown">DIF -${Math.round(e.defDownPct*100)}%</span>`:''}${e.koyoriSlowApplied?`<span class="enemy-speeddown">VEL -${Math.round(e.koyoriSlowPct*100)}%</span>`:''}</div>`:''}
      <div class="bar-track"><div class="bar-fill hp-fill" style="width:${(e.hp/e.maxHp*100)}%"></div></div>
      ${e.isBoss&&e.phase<(e.maxPhases||2)?'<div class="bar-track" style="height:4px;margin-top:2px;opacity:.55;"><div class="bar-fill hp-fill" style="width:100%"></div></div>':''}
      <div class="mini-lbl"><span>${e.hp}/${e.maxHp}</span></div>
      ${(e.dots||[]).map(dot=>`<div class="burn-tag">${dot.name==='Corrosione'?'☣️':dot.name==='Sanguinamento'?'🩸':'🔥'} ${dot.name} x${dot.stacks}</div>`).join('')}
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
    <div class="mini-lbl" style="font-size:10px;margin-top:8px;">${b.mode==='pf'?`TURNO ${b.round}/${PF_ROUNDS} · PUNTI ${b.pf.score}`:b.mode==='apoc'?`TURNO ${b.round}/${getModeGradeById(b.apoc.grade).roundLimit}`:b.mode==='su'?`ONDATA ${state.su.wave}/${SU_WAVES}${b.suFight?' · SCONTRO':''} · ROUND ${b.round}`:`ROUND ${b.round}`}</div>
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
    const statusMarkup=getAllyBattleStatusMarkup(a);
    const card = el(`<div class="hud-panel ally-card ${isActive?'active-turn':''} ${dead?'dead':''} ${isTargetable?'selectable-target':''}" style="--char-glow:${hexToRgba(a.color,0.85)};--fx-scale:${fx.scale};${isActive?'border-color:'+a.color+';box-shadow:0 0 0 1px '+a.color+' inset;':''}position:relative;${fx.animation?'animation:'+fx.animation+';':''}">
      <div class="ally-top">
        <div><div class="ally-name">${a.name}</div><div class="element-tag">${ELEMENT_DATA[a.element]?.label||a.element}</div>${a.hakosForm?`<div class="hakos-form-tag">FORMA CAOTICA · ${a.hakosFormTurns}/10</div>`:''}${a.charId==='suiseiHoshimachi'&&a.suiseiGuardRounds>0?`<div class="suisei-posture-tag">POSTURA STELLARE · ${a.suiseiGuardRounds}/3</div>`:''}${a.tauntRounds>0?`<div class="suisei-posture-tag">PROVOCAZIONE · ${a.tauntRounds}</div>`:''}${a.charId==='suiseiHoshimachi'&&a.suiseiFollowUpReady?'<div class="suisei-posture-tag">FOLLOW-UP PRONTO</div>':''}</div>
      </div>
      <div class="mini-lbl"><span>PV</span><span>${a.hp}/${a.maxHp}</span></div>
      <div class="bar-track"><div class="bar-fill hp-fill" style="width:${(a.hp/a.maxHp*100)}%"></div></div>
      ${CHAR_DB[a.charId].ultChargeMode==='debuffs'
        ? `<div class="mini-lbl" style="margin-top:5px;"><span>Carica Ultimate</span><span>${a.takaneDebuffCharges}/${CHAR_DB[a.charId].ultChargeMax} debuff</span></div><div class="bar-track"><div class="bar-fill energy-fill" style="width:${(a.takaneDebuffCharges/CHAR_DB[a.charId].ultChargeMax*100)}%"></div></div>`
        : `<div class="mini-lbl" style="margin-top:5px;"><span>Energia</span><span>${a.energy}/${a.energyMax}</span></div><div class="bar-track"><div class="bar-fill energy-fill" style="width:${(a.energy/a.energyMax*100)}%"></div></div>`}
      ${a.charId==='takaneLui'?`<div class="ina-charge-tag">HOLOX · ATK +${Math.round((a.holoXAtkBonus||0)*100)}%</div>`:''}
      ${a.shield>0?`<div class="shield-tag">🛡 Scudo ${a.shield}</div>`:''}
      ${statusMarkup}
      ${a.charId==='ninomaeInaNis'?`<div class="ina-charge-tag">FOLLOW-UP ${a.inaFollowUpsRemaining}/3</div>`:''}
      ${a.charId==='vestiaZeta'?`<div class="ina-charge-tag">FOLLOW-UP ${a.zetaFollowUpsRemaining}/${CHAR_DB.vestiaZeta.passiveZetaFollowUps}</div>`:''}
      ${a.charId==='suiseiHoshimachi'?`<div class="suisei-revive-tag">RINASCITE ${a.suiseiRevivesRemaining}/2</div>`:''}
      ${fx.floatHtml}
    </div>`);
    addCharacterCardArtwork(card,a.charId);
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

      const ultReady = isUltimateReady(actor);
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

function renderPureFictionTab(){
  const wrap = document.createElement('div');
  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Modalità a punteggio</span><h2>Pure Fiction</h2></div>`));
  const grade=getModeGrade('pf');
  const thresholds=getPFScoreThresholds(state.party.length);
  wrap.appendChild(renderModeGradePicker('pf'));
  const day=ensurePFDay();
  const buffs=getPFDailyBuffs();
  wrap.appendChild(el(`<div class="hint" style="margin-bottom:14px;">${grade.pfEnemies} nemici sono in campo: ogni nemico sconfitto assegna 100 punti (150 se speciale), prima di eventuali potenziamenti al punteggio, e viene sostituito. La probabilità che appaia un nemico speciale è ${Math.round(grade.pfSpecialChance*100)}%. La sfida dura ${PF_ROUNDS} round, in cui ogni eroe agisce una volta. Le tre soglie per i frammenti sono quelle del grado B e si adattano alla squadra. Ogni grado superiore riscatta anche i premi interi dei gradi precedenti non ancora ottenuti; completando tutte le soglie al grado EX puoi ottenere fino a 4.000 frammenti al giorno in Pure Fiction.</div>`));
  wrap.appendChild(el(`<div class="hud-panel section" style="padding:16px;">
    <div class="eyebrow">Potenziamenti di oggi</div>
    <div style="margin-top:8px;"><b>${buffs.general.name}</b> · <span class="hint">${buffs.general.desc}</span></div>
    <div style="margin-top:6px;"><b>${buffs.theme.name}</b> · <span class="hint">${buffs.theme.desc}</span></div>
  </div>`));
  const tiers=el(`<div class="hud-panel section" style="padding:16px;margin-top:14px;"><div class="eyebrow">Ricompense di oggi · Miglior punteggio: ${day.best}</div><div class="hint" style="margin:4px 0 8px;text-align:left;">Reset tra <b id="pfTimer"></b></div></div>`);
  startPFTimer(tiers.querySelector('#pfTimer'));
  PF_TIERS.forEach((tier,i)=>{
    tiers.appendChild(el(`<div class="stat-row"><span>${thresholds[i]} punti</span><b style="color:${day.claimedGrade[i]>=getModeGradeIndex(grade.id)?'var(--green)':'var(--amber)'}">${getModeRewardStatus(day,i,tier.reward,grade.id)}</b></div>`));
  });
  wrap.appendChild(tiers);
  const startRow=el(`<div style="text-align:center;margin-top:14px;"><button class="primary" id="pfStart" style="padding:12px 26px;font-size:15px;">Avvia Pure Fiction · ${grade.id} ▶</button></div>`);
  startRow.querySelector('#pfStart').onclick=()=>startPureFiction();
  wrap.appendChild(startRow);
  return wrap;
}

function renderMemoryOfChaos(){
  const wrap=document.createElement('div');
  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Boss a difficoltà graduata</span><h2>Memory of Chaos</h2></div>`));
  const grade=getModeGrade('moc');
  if(!state.moc) wrap.appendChild(renderModeGradePicker('moc'));
  const day=ensureMOCDay();
  const setup=state.moc?.setup||getMOCSetup();
  if(!state.moc && state.mocTeams.every(team=>team.length===0)) state.mocTeams[0]=state.party.slice(0,4);
  if(state.moc){
    const phase=state.moc.phase;
    const title=phase==='second'?'Primo boss sconfitto':phase==='complete'?'Memory of Chaos completato':'Squadra sconfitta';
    const message=phase==='second'?`Ora affronta ${setup.bosses[1]} con la seconda squadra.`:phase==='complete'?`${state.moc.singleTeam?'Boss sconfitto':'Entrambi i boss sconfitti'} in ${state.moc.rounds} round.`:`La sfida si è fermata al boss ${state.moc.bossIndex+1}. Puoi riprovare con le stesse squadre.`;
    wrap.appendChild(el(`<div class="hud-panel section" style="padding:16px;text-align:center;"><div class="eyebrow">${title} · Grado ${state.moc.grade}</div><div class="hero-name" style="font-size:18px;margin:8px 0;">${message}</div><div class="hint">Ricompense giornaliere già ottenute: ${day.claimed.map((claimed,index)=>claimed?getClaimedModeRewardTotal(day,index,MOC_TIERS[index].reward):0).reduce((sum,reward)=>sum+reward,0)} Frammenti</div></div>`));
    if(phase==='second'){
      const button=el(`<div style="text-align:center;margin-top:14px;"><button class="primary" id="mocContinue">Affronta il secondo boss ▶</button></div>`);
      button.querySelector('#mocContinue').onclick=continueMOC;
      wrap.appendChild(button);
    } else if(phase==='failed'){
      const buttons=el(`<div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-top:14px;"><button class="primary" id="mocRetry">Riprova la sfida ▶</button><button class="small" id="mocBackToMenu">Torna al menu MoC</button></div>`);
      buttons.querySelector('#mocRetry').onclick=retryMOC;
      buttons.querySelector('#mocBackToMenu').onclick=finishMOC;
      wrap.appendChild(buttons);
    } else {
      const button=el(`<div style="text-align:center;margin-top:14px;"><button class="primary" id="mocFinish">${phase==='failed'?'Riprova la sfida':'Torna al Travel Log'} ▶</button></div>`);
      button.querySelector('#mocFinish').onclick=phase==='failed'?retryMOC:finishMOC;
      wrap.appendChild(button);
    }
    return wrap;
  }
  wrap.appendChild(el(`<div class="hint" style="margin-bottom:14px;">${grade.id==='C'?'Al grado C affronti un solo boss con una squadra, una modalità pensata anche per il roster iniziale.':'Affronti due boss consecutivi con squadre distinte.'} I boss mantengono fasi e pattern propri; dal grado A hanno una riduzione ai danni, mentre dal grado S hanno una seconda fase. I requisiti dei premi in frammenti sono: sconfiggere il primo boss, sconfiggere entrambi i boss e sconfiggerli entrambi entro ${MOC_TIERS[2].maxRounds} round totali. Al grado C è disponibile solo il primo requisito, perché si affronta un solo boss. Ogni grado superiore riscatta anche i premi interi dei gradi precedenti non ancora ottenuti; completando tutti e tre i requisiti al grado EX puoi ottenere fino a 4.000 frammenti al giorno in Memory of Chaos.</div>`));
  wrap.appendChild(el(`<div class="hud-panel section" style="padding:16px;"><div class="eyebrow">Boss e potenziamenti di oggi</div><div class="stat-row"><span>Boss 1</span><b class="moc-boss-info">${setup.bosses[0]}<span class="moc-boss-elements">${renderMOCBossElements(setup.bosses[0])}</span></b></div>${grade.id==='C'?'':`<div class="stat-row"><span>Boss 2</span><b class="moc-boss-info">${setup.bosses[1]}<span class="moc-boss-elements">${renderMOCBossElements(setup.bosses[1])}</span></b></div>`}<div style="margin-top:8px;"><b>${setup.buffs.general.name}</b> · <span class="hint">${setup.buffs.general.desc}</span></div><div style="margin-top:6px;"><b>${setup.buffs.theme.name}</b> · <span class="hint">${setup.buffs.theme.desc}</span></div></div>`));
  const clearTarget=2;
  const tierPanel=el(`<div class="hud-panel section" style="padding:16px;margin-top:14px;"><div class="eyebrow">Ricompense di oggi · Boss sconfitti: ${Math.min(day.clears,clearTarget)}/${clearTarget}</div><div class="hint" style="margin:4px 0 8px;text-align:left;">Reset tra <b id="mocTimer"></b></div></div>`);
  startPFTimer(tierPanel.querySelector('#mocTimer'));
  MOC_TIERS.forEach((tier,index)=>{
    const unavailable=grade.id==='C'&&index>0;
    const label=index===0?'Sconfiggi il primo boss':index===1?'Sconfiggi entrambi i boss':`Sconfiggi entrambi i boss entro ${tier.maxRounds} round`;
    tierPanel.appendChild(el(`<div class="stat-row"><span>${label}</span><b style="color:${unavailable?'var(--text-dim)':day.claimedGrade[index]>=getModeGradeIndex(grade.id)?'var(--green)':'var(--amber)'}">${unavailable?'Non disponibile al grado C':getModeRewardStatus(day,index,tier.reward,grade.id)}</b></div>`));
  });
  wrap.appendChild(tierPanel);

  const teamsPanel=el(`<div class="moc-teams"></div>`);
  state.mocTeams.forEach((team,teamIndex)=>{
    if(grade.id==='C'&&teamIndex===1) return;
    const bossName=setup.bosses[teamIndex];
    const panel=el(`<section class="hud-panel moc-team-panel"><h3>Squadra ${teamIndex+1} <span>${team.length}/4</span></h3><div class="moc-team-elements" title="${bossName}">${renderMOCBossElements(bossName)}</div><div class="moc-hero-list"></div></section>`);
    const presetToolbar=el(`<div class="moc-preset-toolbar"><select aria-label="Preset per la Squadra ${teamIndex+1}"><option value="">Scegli un preset...</option></select><button class="small" type="button" disabled>Carica</button></div>`);
    const presetSelect=presetToolbar.querySelector('select');
    const presetLoadButton=presetToolbar.querySelector('button');
    state.teamPresets.forEach((preset,presetIndex)=>{
      const option=document.createElement('option');
      const names=preset.map(id=>CHAR_DB[id]?.name).filter(Boolean);
      option.value=String(presetIndex);
      option.textContent=names.length?`Preset ${presetIndex+1} · ${names.join(', ')}`:`Preset ${presetIndex+1} · Vuoto`;
      option.disabled=names.length===0;
      presetSelect.appendChild(option);
    });
    const updatePresetLoadButton=()=>{
      if(presetSelect.value===''){
        presetLoadButton.disabled=true;
        presetLoadButton.title='';
        return;
      }
      const {reason}=getMocPresetLoadState(teamIndex,Number(presetSelect.value));
      presetLoadButton.disabled=!!reason;
      presetLoadButton.title=reason;
    };
    presetSelect.onchange=updatePresetLoadButton;
    presetLoadButton.onclick=()=>loadMocTeamPreset(teamIndex,Number(presetSelect.value));
    panel.appendChild(presetToolbar);
    const list=panel.querySelector('.moc-hero-list');
    Object.entries(CHAR_DB).filter(([id])=>state.roster[id]?.unlocked).forEach(([id,char])=>{
      const selected=team.includes(id);
      const assignedOther=grade.id!=='C'&&state.mocTeams[1-teamIndex].includes(id);
      const disabled=assignedOther||(!selected&&team.length>=4);
      const strongAgainst=isElementStrongAgainstMOCBoss(char.element,bossName);
      const option=el(`<button class="moc-hero-option ${selected?'selected':''} ${strongAgainst?'strong-against':''}" type="button" aria-label="${char.name}${strongAgainst?', elemento efficace contro '+bossName:''}" ${disabled?'disabled':''}><span class="moc-hero-glyph" style="background:${char.color}">${char.glyph}</span><span>${char.name}</span><span class="moc-hero-check">${selected?'✓':''}</span></button>`);
      option.onclick=()=>toggleMOCHero(teamIndex,id);
      list.appendChild(option);
    });
    teamsPanel.appendChild(panel);
  });
  wrap.appendChild(teamsPanel);
  const valid=grade.id==='C'?state.mocTeams[0].length>0:state.mocTeams.every(team=>team.length>0)&&!state.mocTeams[0].some(id=>state.mocTeams[1].includes(id));
  const start=el(`<div style="text-align:center;margin-top:14px;"><button class="primary" id="mocStart" ${valid?'':'disabled'}>Avvia Memory of Chaos · ${grade.id} ▶</button></div>`);
  start.querySelector('#mocStart').onclick=startMemoryOfChaos;
  wrap.appendChild(start);
  return wrap;
}

function renderApocalypticShadow(){
  const wrap=document.createElement('div');
  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Sfida endgame · Un boss</span><h2>Apocalyptic Shadow</h2></div>`));
  const grade=getModeGrade('apoc');
  wrap.appendChild(renderModeGradePicker('apoc'));
  const day=ensureApocDay();
  const setup=state.apoc?.setup||getApocSetup();
  const buffs=setup.buffs;
  wrap.appendChild(el(`<div class="hint" style="margin-bottom:14px;">Affronta il boss di oggi con tutta la squadra entro ${grade.roundLimit} round. La riduzione ai danni è ${Math.round(grade.apocDamageReduction*100)}% e si rimuove dopo ${grade.apocStacksRequired} colpi${grade.apocRequiresWeakness?' contro la debolezza elementale':''}; quando la barriera cede, tutti gli alleati recuperano tutta l’energia. I requisiti dei premi in frammenti sono fissi come al grado B: accumulare 4 stack elementali, sconfiggere il boss e vincere entro ${APOC_TIERS[2].roundLimit} round. Ai gradi alti la barriera può richiedere più colpi per essere rimossa, ma la prima soglia del premio resta a 4 stack. Ogni grado superiore riscatta anche i premi interi dei gradi precedenti non ancora ottenuti; completando tutti e tre i requisiti al grado EX puoi ottenere fino a 4.000 frammenti al giorno in Apocalyptic Shadow.</div>`));
  wrap.appendChild(el(`<div class="hud-panel section" style="padding:16px;">
    <div class="eyebrow">Boss e potenziamenti di oggi</div>
    <div class="stat-row"><span>Boss</span><b class="moc-boss-info">${setup.boss}<span class="moc-boss-elements">${renderMOCBossElements(setup.boss)}</span></b></div>
    <div style="margin-top:8px;"><b>${buffs.general.name}</b> · <span class="hint">${buffs.general.desc}</span></div>
    <div style="margin-top:6px;"><b>${buffs.theme.name}</b> · <span class="hint">${buffs.theme.desc}</span></div>
  </div>`));
  const bestForGrade=day.bestRoundsByGrade?.[grade.id];
  const tiers=el(`<div class="hud-panel section" style="padding:16px;margin-top:14px;"><div class="eyebrow">Ricompense giornaliere · Miglior risultato ${grade.id}: ${bestForGrade===undefined?'—':`${bestForGrade} round`}</div><div class="hint" style="margin:4px 0 8px;text-align:left;">Reset tra <b id="apocTimer"></b></div></div>`);
  startPFTimer(tiers.querySelector('#apocTimer'));
  APOC_TIERS.forEach((tier,index)=>{
    const label=tier.label;
    tiers.appendChild(el(`<div class="stat-row"><span>${label}</span><b style="color:${day.claimedGrade[index]>=getModeGradeIndex(grade.id)?'var(--green)':'var(--amber)'}">${getModeRewardStatus(day,index,tier.reward,grade.id)}</b></div>`));
  });
  wrap.appendChild(tiers);
  const start=el(`<div style="text-align:center;margin-top:14px;"><button class="primary" id="apocStart" style="padding:12px 26px;font-size:15px;">Affronta il boss · ${grade.id} ▶</button></div>`);
  start.querySelector('#apocStart').onclick=startApocalypticShadow;
  wrap.appendChild(start);
  return wrap;
}

function renderApocalypticShadowResult(){
  const result=state.battle.apocResult;
  const day=ensureApocDay();
  const cleared=result.reason==='victory'&&result.rounds<=result.roundLimit;
  const wrap=el(`<div class="hud-panel center-msg ${cleared?'win':'lose'}">
    <h2>Apocalyptic Shadow · Grado ${result.grade}</h2>
    <div class="hint">${cleared?`${state.apoc.setup.boss} sconfitto.`:result.reason==='defeat'?'La squadra è stata sconfitta.':`Sono terminati i ${result.roundLimit} round.`}</div>
    <div class="hero-name" style="font-size:24px;margin:10px 0;">${result.rounds}/${result.roundLimit} round</div>
    <div class="hint">Stack elementali: ${result.stacks}/${result.stacksRequired} · Miglior risultato ${result.grade}: ${day.bestRoundsByGrade?.[result.grade]===undefined?'—':`${day.bestRoundsByGrade[result.grade]} round`}</div>
    <div class="hint" style="margin-top:8px;">${day.claimed.some(Boolean)?`Premi giornalieri ottenuti: +${day.claimed.reduce((sum,claimed,index)=>sum+(claimed?getClaimedModeRewardTotal(day,index,APOC_TIERS[index].reward):0),0)} 💠 Frammenti`:'Nessuna ricompensa giornaliera riscossa.'}</div>
  </div>`);
  const tiers=el(`<div class="hud-panel section" style="padding:16px;margin:10px 0;"></div>`);
  APOC_TIERS.forEach((tier,index)=>{
    const label=tier.label;
    tiers.appendChild(el(`<div class="stat-row"><span>${label}</span><b style="color:${day.claimedGrade[index]>=getModeGradeIndex(result.grade)?'var(--green)':'var(--text-dim)'}">${getModeRewardStatus(day,index,tier.reward,result.grade)}</b></div>`));
  });
  wrap.appendChild(tiers);
  const done=el(`<div style="text-align:center;"><button class="primary" id="apocBack">Torna al Travel Log ▶</button></div>`);
  done.querySelector('#apocBack').onclick=()=>{state.apoc=null;state.townTab='viaggi';state.travelTab='apoc';state.screen='town';render();};
  wrap.appendChild(done);
  return wrap;
}

function renderTravelLogTab(){
  const wrap=document.createElement('div');
  const modes=[['purefiction','Pure Fiction'],['moc','Memory of Chaos'],['apoc','Apocalyptic Shadow'],['universo','Universo Simulato'],['domini','Domini']];
  const bar=el(`<div class="subtab-bar travel-mode-bar"></div>`);
  modes.forEach(([key,label])=>{
    const button=el(`<button class="subtab-btn ${state.travelTab===key?'active':''}">${label}</button>`);
    button.onclick=()=>{state.travelTab=key;render();};
    bar.appendChild(button);
  });
  wrap.appendChild(bar);
  if(state.travelTab==='purefiction') wrap.appendChild(renderPureFictionTab());
  else if(state.travelTab==='moc') wrap.appendChild(renderMemoryOfChaos());
  else if(state.travelTab==='apoc') wrap.appendChild(renderApocalypticShadow());
  else if(state.travelTab==='universo') wrap.appendChild(renderUniversoTab());
  else wrap.appendChild(renderDominiTab());
  return wrap;
}

function renderDominiTab(){
  const wrap = document.createElement('div');
  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Farming manufatti</span><h2>Domini</h2></div>`));
  wrap.appendChild(el(`<div class="hint" style="margin-bottom:14px;">Scegli un dominio: affronta una battaglia a parte, con nemici scalati sul tuo piano della Torre (livello ${domainStage()}), e ottieni 3 manufatti del set scelto e Crediti. In un dominio i manufatti hanno una probabilità maggiore di essere Leggendari.</div>`));
  const grid=el(`<div class="artifact-grid"></div>`);
  Object.entries(ARTIFACT_SETS).forEach(([setId,set])=>{
    const card=el(`<div class="hud-panel artifact-card" style="border-color:${RARITY_COLOR.leggendaria};">
      <div class="ac-head"><span class="ac-icon">${set.icon}</span><div><div class="ac-name">Dominio: ${set.name}</div><div class="ac-setname" style="color:${RARITY_COLOR.leggendaria};">Livello ${domainStage()}</div></div></div>
      <div class="ac-setbonus">2 pz: ${set.bonus2.label}<br>4 pz: ${set.bonus4.label}</div>
    </div>`);
    const btn=el(`<button class="small primary" style="margin-top:8px;width:100%;">Sfida il dominio ▶</button>`);
    btn.onclick=()=>startDomain(setId);
    card.appendChild(btn);
    grid.appendChild(card);
  });
  wrap.appendChild(grid);
  return wrap;
}

function renderUniversoTab(){
  const wrap = document.createElement('div');
  wrap.appendChild(el(`<div class=\"screen-title\"><span class=\"eyebrow\">Modalit\u00e0 roguelike</span><h2>Universo Simulato</h2></div>`));
  if(state.maxStageReached<=SU_UNLOCK_STAGE){
    wrap.appendChild(el(`<div class=\"hud-panel section\" style=\"padding:16px;text-align:center;\"><div class=\"hero-name\" style=\"font-size:18px;\">\ud83d\udd12 Bloccata</div><div class=\"hint\">Si sblocca dopo aver superato il Piano ${SU_UNLOCK_STAGE} della Torre. Massimo raggiunto: piano ${state.maxStageReached}.</div></div>`));
    return wrap;
  }
  const day=ensureSUDay();
  wrap.appendChild(el(`<div class=\"hint\" style=\"margin-bottom:14px;\">Affronta ${SU_WAVES} ondate di nemici sempre pi\u00f9 forti, con un boss all'ultima. Alla fine di ogni ondata scegli una Benedizione, un potenziamento permanente per la run; a volte ti imbatti in un Evento che pu\u00f2 darti altri benefici, ferirti o portarti a combattere. I PV non si ripristinano del tutto tra un'ondata e l'altra e, se la squadra cade, la run finisce. Puoi rifarla quante volte vuoi, ma la ricompensa si ottiene una sola volta al giorno.</div>`));
  const info=el(`<div class=\"hud-panel section\" style=\"padding:16px;\">
    <div class=\"eyebrow\">Ricompensa giornaliera</div>
    <div class=\"stat-row\"><span>Completa tutte le ${SU_WAVES} ondate</span><b style=\"color:${day.claimed?'var(--green)':'var(--amber)'}\">${day.claimed?'\u2713 riscossa':'+'+SU_REWARD+' \ud83d\udca0'}</b></div>
    <div class=\"stat-row\"><span>Ondata massima di oggi</span><b>${day.bestWave}/${SU_WAVES}</b></div>
    <div class=\"hint\" style=\"margin-top:6px;text-align:left;\">Reset tra <b id=\"suTimer\"></b></div>
  </div>`);
  startPFTimer(info.querySelector('#suTimer'));
  wrap.appendChild(info);
  const startRow=el(`<div style=\"text-align:center;margin-top:14px;\"><button class=\"primary\" id=\"suStart\" style=\"padding:12px 26px;font-size:15px;\">Avvia Universo Simulato \u25b6</button></div>`);
  startRow.querySelector('#suStart').onclick=()=>startSimulatedUniverse();
  wrap.appendChild(startRow);
  return wrap;
}

const SU_BLESSING_ICONS = {'Vigore':'\u2694','Tempra':'\u2764','Corazza':'\ud83d\udee1','Passo Leggero':'\ud83d\udca8','Furia':'\ud83d\udd25','Fonte di Energia':'\u26a1','Mani Guaritrici':'\u271a','Rigenerazione':'\ud83c\udf3f','Occhio Acuto':'\ud83d\udc41','Maestria di Base':'\ud83d\udde1','Colpi Risolutivi':'\ud83d\udca5','Brace Persistente':'\ud83e\ude78','Riserva Tattica':'\u2666','Cuore di Pietra':'\ud83e\udea8','Eco di Comando':'\ud83d\udce3'};

function suChooseStart(index){
  state.su.pendingStart=state.su.startChoices[index];
  startBattle('su');
}
function suCancelStart(){
  state.su=null;
  state.screen='town';
  render();
}

function renderSUScreen(){
  const su=state.su;
  const ended=su.phase==='end';
  const win=ended&&su.outcome==='win';
  const wrap=el(`<div class="hud-panel su-screen ${win?'win':ended?'lose':''}"></div>`);

  // waves already cleared decide how the progress track is drawn
  const cleared=win?SU_WAVES:su.phase==='blessing'?su.wave:su.wave-1;
  const pips=Array.from({length:SU_WAVES},(_,i)=>{
    const n=i+1;
    const cls=n<=cleared?'done':(!ended&&n===cleared+1)?'current':'';
    return `<span class="su-pip ${cls} ${n===SU_WAVES?'boss':''}">${n===SU_WAVES?'\u2620':n}</span>`;
  }).join('');
  wrap.appendChild(el(`<div class="su-progress">${pips}</div>`));

  const head=(eyebrow,title,text)=>wrap.appendChild(el(`<div class="su-head"><div class="eyebrow">${eyebrow}</div><h2>${title}</h2><p>${text}</p></div>`));

  const team=el(`<div class="su-team"></div>`);
  const members=su.allies||state.party.map(id=>({name:CHAR_DB[id].name,color:CHAR_DB[id].color,glyph:CHAR_DB[id].glyph,hp:null}));
  members.forEach(a=>{
    const hpBlock=a.hp===null?'':`<div class="bar-track"><div class="bar-fill hp-fill" style="width:${Math.max(0,a.hp)/a.maxHp*100}%"></div></div><div class="su-ally-hp">${Math.max(0,a.hp)}/${a.maxHp} PV</div>`;
    team.appendChild(el(`<div class="su-ally ${a.hp!==null&&a.hp<=0?'down':''}"><div class="su-ally-glyph" style="background:${a.color}">${a.glyph}</div><div class="su-ally-info"><div class="su-ally-name">${a.name}</div>${hpBlock}</div></div>`));
  });

  const choiceGrid=(list,onPick)=>{
    const grid=el(`<div class="su-choices"></div>`);
    list.forEach((bl,i)=>{
      const card=el(`<button class="su-choice"><span class="su-choice-icon">${SU_BLESSING_ICONS[bl.name]||'\u2728'}</span><span class="su-choice-name">${bl.name}</span><span class="su-choice-desc">${bl.desc}</span><span class="su-choice-cta">Scegli</span></button>`);
      card.onclick=()=>onPick(i);
      grid.appendChild(card);
    });
    return grid;
  };

  if(su.phase==='start'){
    head('Inizio run','Scegli la Benedizione iniziale','Ti accompagner\u00e0 per tutta la run, insieme a quelle che sceglierai dopo ogni ondata.');
    wrap.appendChild(team);
    wrap.appendChild(choiceGrid(su.startChoices,suChooseStart));
  } else if(su.phase==='blessing'){
    head(`Ondata ${su.wave} superata`,'Scegli una Benedizione',`La squadra recupera un po' di PV. Il potenziamento durer\u00e0 fino alla fine della run${su.wave+1===SU_WAVES?" \u2014 la prossima ondata \u00e8 il boss!":'.'}`);
    wrap.appendChild(team);
    wrap.appendChild(choiceGrid(su.choices,suChooseBlessing));
  } else if(su.phase==='occurrence'){
    head('Evento',su.occ.title,su.occ.text);
    wrap.appendChild(team);
    const list=el(`<div class="su-options"></div>`);
    su.occ.choices.forEach((ch,i)=>{
      const btn=el(`<button class="su-option">${ch.label}</button>`);
      btn.onclick=()=>suChooseOccurrence(i);
      list.appendChild(btn);
    });
    wrap.appendChild(list);
  } else if(su.phase==='occurrenceResult'){
    head('Evento',su.occ?su.occ.title:'Evento','');
    wrap.appendChild(el(`<div class="su-result">${su.result.text}</div>`));
    wrap.appendChild(team);
    const btn=el(`<button class="primary su-continue">${su.result.fight?'Combatti \u25b6':'Continua \u25b6'}</button>`);
    btn.onclick=()=>suContinueAfterOccurrence();
    wrap.appendChild(btn);
  } else if(ended){
    head(win?'Vittoria':'Fine della run',win?'Universo Simulato completato!':'Run terminata',win?`Hai sconfitto il boss dell'ondata ${SU_WAVES}.`:`La squadra \u00e8 caduta all'ondata ${su.wave}/${SU_WAVES}.`);
    wrap.appendChild(el(`<div class="su-result">${su.reward>0?`Ricompensa: +${su.reward} \ud83d\udca0 Frammenti`:win?'Ricompensa giornaliera gi\u00e0 riscossa.':'Completa tutte le ondate per ottenere la ricompensa.'}</div>`));
  }

  if(ended&&su.firstClear){
    wrap.appendChild(el(`<div class="su-result">🎉 Traguardo completato! Vai in Missioni per riscattare <b style="color:${CHAR_DB.finanaRyugu.color}">${CHAR_DB.finanaRyugu.name}</b> (${'★'.repeat(CHAR_DB.finanaRyugu.rarity)}).</div>`));
  }

  if(su.blessings.length>0){
    const counts={};
    su.blessings.forEach(name=>{ counts[name]=(counts[name]||0)+1; });
    const chips=Object.entries(counts).map(([name,n])=>`<span class="su-chip" title="${(SU_BLESSINGS.find(b=>b.name===name)||{}).desc||''}">${SU_BLESSING_ICONS[name]||'\u2728'} ${name}${n>1?` \u00d7${n}`:''}</span>`).join('');
    wrap.appendChild(el(`<div class="su-active"><div class="eyebrow">Benedizioni attive</div><div class="su-chips">${chips}</div></div>`));
  }

  if(ended){
    const btn=el(`<button class="primary su-continue">Torna alla base \u25b6</button>`);
    btn.onclick=()=>{ state.battle=null; state.su=null; state.screen='town'; state.townTab='viaggi'; state.travelTab='universo'; render(); };
    wrap.appendChild(btn);
  } else if(su.phase==='start'){
    const btn=el(`<button class="small su-abandon">Annulla</button>`);
    btn.onclick=suCancelStart;
    wrap.appendChild(btn);
  } else {
    const btn=el(`<button class="small danger su-abandon">Abbandona la run</button>`);
    btn.onclick=()=>{ if(confirm('Abbandonare la run? Perderai i progressi.')) suAbandon(); };
    wrap.appendChild(btn);
  }
  return wrap;
}

function renderPFResult(){
  const r=state.battle.pfResult;
  const day=ensurePFDay();
  const wrap=el(`<div class="hud-panel center-msg ${r.gained.length>0?'win':'lose'}">
    <h2>Pure Fiction · Grado ${r.grade}</h2>
    <div class="hint">${r.reason==='defeat'?'La squadra è stata sconfitta.':`I ${PF_ROUNDS} turni sono finiti.`}</div>
    <div class="hero-name" style="font-size:26px;margin:10px 0;">${r.score} punti</div>
    <div class="hint">Nemici sconfitti: ${r.kills} · Miglior punteggio di oggi: ${day.best}</div>
    <div class="hint" style="margin-top:8px;">${r.total>0?`Ricompensa ottenuta: +${r.total} 💠 Frammenti`:'Nessuna nuova ricompensa (già riscosse oggi o soglia non raggiunta).'}</div>
  </div>`);
  const tiers=el(`<div style="margin:10px 0;"></div>`);
  PF_TIERS.forEach((tier,i)=>{
    tiers.appendChild(el(`<div class="stat-row"><span>${r.thresholds[i]} punti</span><b style="color:${day.claimedGrade[i]>=getModeGradeIndex(r.grade)?'var(--green)':'var(--text-dim)'}">${getModeRewardStatus(day,i,tier.reward,r.grade)}</b></div>`));
  });
  wrap.appendChild(tiers);
  const btnRow=el(`<div style="text-align:center;"><button class="primary" id="pfBack">Torna alla base ▶</button></div>`);
  btnRow.querySelector('#pfBack').onclick=()=>{ state.battle=null; state.screen='town'; state.townTab='viaggi'; state.travelTab='purefiction'; render(); };
  wrap.appendChild(btnRow);
  return wrap;
}

function renderVictory(){
  const b = state.battle;
  const towerComplete=b.mode!=='domain'&&state.stage===TOWER_MAX_FLOOR&&getClearedTowerFloor()>=TOWER_MAX_FLOOR;
  const wrap = el(`<div class="hud-panel center-msg win">
    <h2>${b.mode==='domain'?'Dominio Superato':towerComplete?'Torre Completata':'Piano Superato'}</h2>
    <div class="hint">${b.mode==='domain'?`Hai completato il Dominio ${ARTIFACT_SETS[b.domainSet].name}.`:`Hai sconfitto tutti i nemici del Piano ${state.stage}${towerComplete?` · ${TOWER_MAX_FLOOR}/${TOWER_MAX_FLOOR} piani completati`:''}.`} +${b.creditReward||0} 🪙 Crediti</div>
  </div>`);
  const loot = el(`<div class="artifact-grid"></div>`);
  b.loot.forEach(it=>{
    loot.appendChild(renderArtifactCard(it));
  });
  wrap.appendChild(loot);
  const btnRow = el(`<div style="text-align:center;"><button class="primary" id="continueBtn">Torna alla base ▶</button></div>`);
  btnRow.querySelector('#continueBtn').onclick=()=>{
    if(b.mode==='domain'){ state.townTab='viaggi'; state.travelTab='domini'; goToTown(false); }
    else goToTown(true);
  };
  if(b.mode==='domain'||state.stage<TOWER_MAX_FLOOR){
    const nextBtn=el(`<button class="primary" style="margin-left:8px;">${b.mode==='domain'?'Ripeti dominio ▶':`Piano ${state.stage+1} ▶`}</button>`);
    nextBtn.onclick=()=>{
      if(b.mode==='domain'){ startDomain(b.domainSet); return; }
      state.stage=Math.min(TOWER_MAX_FLOOR,state.stage+1);
      state.battle=null;
      startBattle();
    };
    btnRow.appendChild(nextBtn);
  }
  wrap.appendChild(btnRow);
  return wrap;
}

function renderDefeat(){
  const wrap = el(`<div class="hud-panel center-msg lose">
    <h2>Squadra Sconfitta</h2>
    <div class="hint">${state.battle?.mode==='domain'?`Il dominio ti ha respinto. Migliora l'equipaggiamento e riprova.`:`Il Piano ${state.stage} ti ha respinto. Migliora l'equipaggiamento e riprova.`}</div>
  </div>`);
  const btnRow = el(`<div style="text-align:center;"><button class="primary" id="retryBtn">Torna alla base ▶</button></div>`);
  btnRow.querySelector('#retryBtn').onclick=()=>retryStage();
  const again=el(`<button class="primary" style="margin-left:8px;">Riprova ▶</button>`);
  again.onclick=()=>{
    const domainSet=state.battle?.mode==='domain'?state.battle.domainSet:null;
    state.battle=null;
    if(domainSet) startDomain(domainSet); else startBattle();
  };
  btnRow.appendChild(again);
  wrap.appendChild(btnRow);
  return wrap;
}

/* ============ INIT ============ */
render();
