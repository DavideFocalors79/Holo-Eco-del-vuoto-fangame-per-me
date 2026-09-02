/* ============ CHARACTERS ============ */
const CHAR_DB = {
  kaelaKolvalskia: { name:'Kaela kolvalskia', title:'Baluardo di Ferro', role:'Tank', color:'#4fd8e0', glyph:'K', rarity:4,
    base:{hp:1450, atk:92, def:150, energyMax:120},
    basic:{name:'Colpo di Scudo', desc:'Danno fisico a un bersaglio.', mult:1.0, target:'enemy', effect:null, energyGain:20},
    skill:{name:'Presa Ferrea', desc:'Danno e si scherma per 2 turni.', mult:1.2, target:'enemy', effect:'shield_self', shieldPct:0.18, energyGain:30},
    ult:{name:'Muro Indistruttibile', desc:'Scherma tutta la squadra per 2 turni.', mult:0, target:'allies_all', effect:'shield_all', shieldPct:0.22} },
  ceciliaImmergreen: { name:'Cecilia Immergreen', title:"Luce dell'Aurora", role:'Supporto Curativo', color:'#6ee7a0', glyph:'C', rarity:4,
    base:{hp:980, atk:76, def:75, energyMax:110},
    basic:{name:'Raggio Guida', desc:'Danno leggero a un nemico.', mult:0.75, target:'enemy', effect:null, energyGain:20},
    skill:{name:'Benedizione', desc:'Cura un alleato.', mult:1.4, target:'ally', effect:'heal', energyGain:30},
    ult:{name:"Grazia dell'Alba", desc:'Cura tutta la squadra.', mult:1.9, target:'allies_all', effect:'heal_all'} },
  monaHoshinova: { name:'Mona Hoshinova', title:'Frattura Stellare', role:'DPS Arcano', color:'#a78bfa', glyph:'M', rarity:4,
    base:{hp:1000, atk:132, def:68, energyMax:130},
    basic:{name:'Scheggia Arcana', desc:'Danno magico a un bersaglio.', mult:0.95, target:'enemy', effect:null, energyGain:20},
    skill:{name:'Implosione', desc:'Danno magico elevato.', mult:1.7, target:'enemy', effect:null, energyGain:30},
    ult:{name:'Collasso Stellare', desc:'Danno devastante a un bersaglio.', mult:2.8, target:'enemy', effect:null} },
  mumeiNanashi: { name:'Mumei Nanashi', title:'Lama Silente', role:'DPS Rapido', color:'#ef5a7d', glyph:'M', rarity:4, skillFreeUses:2,
    base:{hp:1050, atk:106, def:64, energyMax:115},
    basic:{name:'Doppio Taglio', desc:'Colpi rapidi su un bersaglio (i colpi aumentano usando la Skill).', mult:0.55, hits:2, target:'enemy', effect:null, energyGain:20},
    skill:{name:'Danza di Lame', desc:'Aumenta di 1 il numero di colpi dell\'Attacco Base, fino a un massimo di 10. Non conclude il turno: puoi usarla più volte finché hai Punti Abilità, poi chiudi con l\'Attacco Base. Le prime 2 volte a battaglia non costa Punti Abilità.', mult:0, target:'self', effect:'boost_basic_hits', energyGain:5},
    ult:{name:'Tempesta di Fendenti', desc:'5 colpi su un bersaglio.', mult:0.5, hits:5, target:'enemy', effect:null} },
  vestiaZeta: { name:'Vestia Zeta', title:'Lama Spezzata', role:'DPS Fisico', color:'#c23b52', glyph:'V', rarity:4, dotName:'Sanguinamento',
    base:{hp:1080, atk:116, def:70, energyMax:120},
    basic:{name:'Sparo', desc:'Danno e applica Sanguinamento.', mult:0.85, target:'enemy', effect:'burn', burnStacks:1, energyGain:20},
    skill:{name:'Fendente', desc:'Danno maggiore, Sanguinamento x2.', mult:1.35, target:'enemy', effect:'burn', burnStacks:2, energyGain:30},
    ult:{name:'Attacco Aereo', desc:'Danno ad area, Sanguinamento su tutti.', mult:1.6, target:'enemies_all', effect:'burn_all', burnStacks:2} },
  IRyS: { name:'IRyS', title:'Voce del Comando', role:'Supporto Buff', color:'#7dd3fc', glyph:'I', rarity:4,
    base:{hp:1000, atk:86, def:80, energyMax:125},
    basic:{name:'Colpo Tattico', desc:'Danno leggero a un bersaglio.', mult:0.7, target:'enemy', effect:null, energyGain:20},
    skill:{name:'Coordinazione', desc:'Un alleato attacca una volta in più e ottiene +20% ATK.', mult:0, target:'ally', effect:'extra_attack_buff', buffPct:0.20, energyGain:30},
    ult:{name:'Grido di Guerra', desc:'Grande +ATK e energia alla squadra.', mult:0, target:'allies_all', effect:'buff_atk_energy', buffPct:0.4, energyGainAll:25} },
  ouroKronii: { name:'Ouro Kronii', title:'Architetta del Tempo', role:'Supporto Punti Abilità', color:'#ffd700', glyph:'O', rarity:5, passiveSpCapBonus:2,
    base:{hp:1150, atk:118, def:78, energyMax:140},
    basic:{name:'Impulso Armonico', desc:'Danno a un bersaglio. Genera 2 Punti Abilità invece di 1.', mult:0.8, target:'enemy', effect:null, energyGain:20, spGain:2},
    skill:{name:'Dono del Tempo', desc:'Non infligge danno: dona 3 Punti Abilità alla squadra.', mult:0, target:'team', effect:'grant_sp', spGrant:3, energyGain:25},
    ult:{name:'Convergenza Assoluta', desc:'Dona 3 Punti Abilità e +25% ATK alla squadra per 2 turni.', mult:0, target:'team', effect:'grant_sp_and_buff', spGrant:3, buffPct:0.25} },
};

const ENEMY_NAMES = ['Larva del Vuoto','Sentinella Corrotta','Sciame Spinato','Costrutto Infranto','Ombra Vagante'];
const BOSS_NAMES = ['Custode di Cristallo','Araldo del Vuoto','Colosso Corroso','Regina Ombra'];

/* ============ ARTIFACT / STAT SYSTEM ============ */
// Each stat key is either a flat bonus, a percentage bonus to a base stat, or a bonus to energy gain.
const STAT_KEYS = {
  atk:        {label:'ATK',      kind:'flat',   flatKey:'atk'},
  hp:         {label:'PV',       kind:'flat',   flatKey:'hp'},
  def:        {label:'DEF',      kind:'flat',   flatKey:'def'},
  atk_pct:    {label:'ATK%',     kind:'pct',    target:'atk'},
  hp_pct:     {label:'PV%',      kind:'pct',    target:'hp'},
  def_pct:    {label:'DEF%',     kind:'pct',    target:'def'},
  energy_pct: {label:'Energia%', kind:'energy'},
};
const RARITY_ORDER = ['comune','rara','epica'];
const RARITY_COLOR = {comune:'#8791b3', rara:'#4fd8e0', epica:'#f5b342'};
const RARITY_LABEL = {comune:'Comune', rara:'Rara', epica:'Epica'};

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
const WEAPON_MAIN_VALUES = {
  flat:{comune:{atk:40}, rara:{atk:75}, epica:{atk:130}},
};
function generateWeapon(stageLevel){
  const rarityRoll = Math.random() + stageLevel*0.012;
  const rarity = rarityRoll>0.93 ? 'epica' : rarityRoll>0.65 ? 'rara' : 'comune';
  const growth = 1 + Math.min(1.5, stageLevel*0.03);
  const mainValue = Math.round(WEAPON_MAIN_VALUES.flat[rarity].atk*growth);
  const subKeys = Object.keys(STAT_KEYS).filter(k=>k!=='atk');
  const subKey = pick(subKeys);
  const subMeta = STAT_KEYS[subKey];
  const subValue = valueForRarity(subMeta.kind, subMeta, rarity, 'sub', stageLevel);
  const name = pick(WEAPON_NAMES);
  return {uid:'wp'+(state.weaponUidCounter++), name, rarity, mainStat:{key:'atk',value:mainValue}, subStat:{key:subKey,value:subValue}};
}
function renderWeaponCard(w, opts){
  opts = opts||{};
  const card = el(`<div class="hud-panel artifact-card" style="border-color:${RARITY_COLOR[w.rarity]}">
    <div class="ac-head">
      <span class="ac-icon">⚔</span>
      <div>
        <div class="ac-name">${w.name}</div>
        <div class="ac-setname" style="color:${RARITY_COLOR[w.rarity]}">${RARITY_LABEL[w.rarity]} · Arma</div>
      </div>
    </div>
    <div class="ac-main">${statKeyLabel(w.mainStat.key)} <b>${formatStatValue(w.mainStat)}</b></div>
    <div class="ac-subs"><span>· ${statKeyLabel(w.subStat.key)} ${formatStatValue(w.subStat)}</span></div>
  </div>`);
  if(opts.actionLabel){
    const btn = el(`<button class="small" style="margin-top:8px;width:100%;">${opts.actionLabel}</button>`);
    btn.onclick=(ev)=>{ ev.stopPropagation(); opts.onAction && opts.onAction(); };
    card.appendChild(btn);
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
    flatBonus:{atk:0,hp:0,def:0}, pctBonus:{atk:0,hp:0,def:0},
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
    applyStatToAcc(acc, weapon.mainStat.key, weapon.mainStat.value);
    applyStatToAcc(acc, weapon.subStat.key, weapon.subStat.value);
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
    hp, atk, def, energyMax:base.energyMax,
    energyGainMult:acc.energyGainMult, healMult:acc.healMult,
    burnMult:acc.burnMult, shieldMult:acc.shieldMult, startEnergyBonus:acc.startEnergyBonus,
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
  lastPullResults:[],
  townTab:'squadra', // squadra | personaggi | abilita | inventario | torre | banner | missioni
  abilityTabChar: 'kaelaKolvalskia',
  autoBattle:false,
  claimedQuests:{}, // questId -> true
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
    claimedQuests: state.claimedQuests,
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
    state.claimedQuests = data.claimedQuests || {};
    state.totalPullsDone = data.totalPullsDone || 0;
    state.totalArtifactsSold = data.totalArtifactsSold || 0;
    ensureRosterIntegrity();
    return true;
  } catch(e){ console.error('Caricamento fallito', e); return false; }
}
function resetSave(){
  try{ localStorage.removeItem(SAVE_KEY); } catch(e){}
  state.gold=0; state.stage=1; state.maxStageReached=1; state.inventory=[]; state.itemUidCounter=1;
  state.weaponInventory=[]; state.weaponUidCounter=1; state.pityCounter=0; state.pity5Counter=0; state.lastPullResults=[];
  state.claimedQuests={}; state.totalPullsDone=0; state.totalArtifactsSold=0;
  initRoster();
  state.party=['kaelaKolvalskia'];
  state.battle=null;
  state.autoBattle=false;
}

/* ============ HELPERS ============ */
function clamp(v,min,max){return Math.max(min,Math.min(max,v));}
function rnd(a,b){return Math.random()*(b-a)+a;}
function pick(arr){return arr[Math.floor(Math.random()*arr.length)];}

/* ============ TOWER (INFINITE) ============ */
function isBossStage(n){return n%5===0;}
function generateEnemies(stageNum){
  const n = stageNum;
  const boss = isBossStage(n);
  const count = boss ? 1 : Math.min(5, 1+Math.floor((n-1)/2));
  const enemies=[];
  for(let i=0;i<count;i++){
    // Enemies hit hard and scale quadratically so the tower keeps getting tougher forever.
    const hp  = boss ? Math.round(1100 + n*190 + n*n*2.6) : Math.round(260 + n*58 + n*n*1.5);
    const atk = boss ? Math.round(150  + n*24  + n*n*0.22) : Math.round(95  + n*17  + n*n*0.14);
    const def = boss ? Math.round(35   + n*6   + n*n*0.05) : Math.round(10  + n*2.6  + n*n*0.02);
    const name = boss ? BOSS_NAMES[(Math.floor(n/5)-1) % BOSS_NAMES.length] : ENEMY_NAMES[i % ENEMY_NAMES.length];
    enemies.push({id:'e'+i, name, hp, maxHp:hp, atk, def, shield:0, burnStacks:0, burnRounds:0, burnSourceMult:1, isBoss:boss});
  }
  return enemies;
}

/* ============ BATTLE SETUP ============ */
function startBattle(){
  const allies = state.party.map(id=>{
    const eff = getEffectiveStats(id);
    return {
      charId:id, name:CHAR_DB[id].name, color:CHAR_DB[id].color, glyph:CHAR_DB[id].glyph,
      hp:eff.hp, maxHp:eff.hp, atk:eff.atk, def:eff.def,
      energy:clamp(eff.startEnergyBonus,0,eff.energyMax), energyMax:eff.energyMax,
      energyGainMult:eff.energyGainMult, healMult:eff.healMult, burnMult:eff.burnMult, shieldMult:eff.shieldMult,
      shield:0, shieldRounds:0, atkBuffMult:1, buffRounds:0,
      basicHits: CHAR_DB[id].basic.hits||1,
      skillFreeUses: CHAR_DB[id].skillFreeUses||0,
    };
  });
  const spMaxBonus = state.party.reduce((sum,id)=>sum+(CHAR_DB[id].passiveSpCapBonus||0),0);
  const spMax = 5+spMaxBonus;
  state.battle = {
    allies, enemies: generateEnemies(state.stage),
    sp:Math.min(3,spMax), spMax,
    round:1,
    turnIndex:0,
    phase:'ally_turn',
    pendingAbility:null,
    log:[],
    loot:[],
  };
  state.autoBattle=false;
  logMsg(`Piano ${state.stage} — Round 1. Tocca alla squadra.`);
  state.screen='battle';
  render();
}

function logMsg(msg){
  state.battle.log.unshift(msg);
  if(state.battle.log.length>40) state.battle.log.pop();
}

function currentAlly(){
  const b = state.battle;
  return b.allies[b.turnIndex];
}

function advanceAllyTurn(){
  const b = state.battle;
  b.pendingAbility=null;
  b.turnIndex++;
  while(b.turnIndex < b.allies.length && b.allies[b.turnIndex].hp<=0){
    b.turnIndex++;
  }
  if(b.turnIndex >= b.allies.length){
    b.phase='enemy_turn';
    runEnemyPhase();
  }
}

function checkBattleEnd(){
  const b = state.battle;
  if(b.enemies.every(e=>e.hp<=0)){
    b.phase='resolved';
    onVictory();
    return true;
  }
  if(b.allies.every(a=>a.hp<=0)){
    b.phase='resolved';
    onDefeat();
    return true;
  }
  return false;
}

/* ============ ABILITY EXECUTION ============ */
function calcDamage(atk, mult, def){
  let raw = atk*mult - def*0.5;
  raw = Math.max(raw, atk*mult*0.2);
  const variance = rnd(0.9,1.1);
  return Math.max(1, Math.round(raw*variance));
}

function dealDamageToEnemy(enemy, dmg){
  let applied = dmg;
  if(enemy.shield>0){
    if(enemy.shield>=applied){enemy.shield-=applied; applied=0;}
    else {applied-=enemy.shield; enemy.shield=0;}
  }
  enemy.hp = clamp(enemy.hp-applied,0,enemy.maxHp);
  return applied;
}

function dealDamageToAlly(ally, dmg, giveEnergy){
  let applied = dmg;
  if(ally.shield>0){
    if(ally.shield>=applied){ally.shield-=applied; applied=0;}
    else {applied-=ally.shield; ally.shield=0;}
  }
  ally.hp = clamp(ally.hp-applied,0,ally.maxHp);
  if(giveEnergy) ally.energy = clamp(ally.energy+Math.round(10*(ally.energyGainMult||1)),0,ally.energyMax);
  return applied;
}

function executeAbility(actor, abKey, targetId){
  const b = state.battle;
  const ability = CHAR_DB[actor.charId][abKey];
  const effAtk = Math.round(actor.atk*(actor.atkBuffMult||1));

  const enemyTargets = () => b.enemies.filter(e=>e.hp>0);
  const allyTargets = () => b.allies.filter(a=>a.hp>0);

  if(ability.target==='enemy'){
    const t = b.enemies.find(e=>e.id===targetId);
    if(!t || t.hp<=0) return;
    const hits = (abKey==='basic' && actor.basicHits) ? actor.basicHits : (ability.hits||1);
    for(let i=0;i<hits;i++){
      if(t.hp<=0) break;
      const dmg = calcDamage(effAtk, ability.mult, t.def);
      const applied = dealDamageToEnemy(t, dmg);
      logMsg(`${actor.name} usa ${ability.name}: ${applied} danni a ${t.name}.`);
    }
    if(abKey==='basic' && CHAR_DB[actor.charId].skill.effect==='boost_basic_hits'){
      actor.basicHits = CHAR_DB[actor.charId].basic.hits||1; // Danza di Lame si resetta dopo l'Attacco Base
    }
    if(ability.effect==='shield_self'){
      actor.shield += Math.round(actor.maxHp*ability.shieldPct*(actor.shieldMult||1));
      actor.shieldRounds = 2;
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
      logMsg(`${actor.name} cura ${target.name} per ${healAmt} PV.`);
    }
    if(ability.effect==='extra_attack_buff'){
      target.atkBuffMult = 1+ability.buffPct;
      target.buffRounds = Math.max(target.buffRounds, 2);
      logMsg(`${actor.name} coordina ${target.name}: +${Math.round(ability.buffPct*100)}% ATK.`);
      const foes = enemyTargets();
      if(foes.length>0){
        const foe = foes.reduce((a,c)=>c.hp<a.hp?c:a);
        const bonusAtk = Math.round(target.atk*(target.atkBuffMult||1));
        const dmg = calcDamage(bonusAtk, 1.0, foe.def);
        const applied = dealDamageToEnemy(foe, dmg);
        logMsg(`${target.name} attacca una volta in più: ${applied} danni a ${foe.name}.`);
        b.sp = clamp(b.sp+1,0,b.spMax);
        target.energy = clamp(target.energy+Math.round(20*(target.energyGainMult||1)),0,target.energyMax);
      }
    }
  }
  else if(ability.target==='self'){
    if(ability.effect==='boost_basic_hits'){
      actor.basicHits = Math.min(10, (actor.basicHits||2)+1);
      logMsg(`${actor.name} affina la lama: l'Attacco Base ora colpisce ${actor.basicHits} volte.`);
    }
  }
  else if(ability.target==='enemies_all'){
    enemyTargets().forEach(t=>{
      const dmg = calcDamage(effAtk, ability.mult, t.def);
      const applied = dealDamageToEnemy(t, dmg);
      logMsg(`${actor.name} colpisce ${t.name} per ${applied}.`);
      if(ability.effect==='burn_all'){
        const dotName = CHAR_DB[actor.charId].dotName || 'Bruciatura';
        t.burnStacks=(t.burnStacks||0)+ability.burnStacks;
        t.burnRounds=2;
        t.burnSourceMult = actor.burnMult||1;
        t.dotName = dotName;
      }
    });
  }
  else if(ability.target==='team'){
    if(ability.effect==='grant_sp'){
      b.sp = clamp(b.sp+ability.spGrant,0,b.spMax);
      logMsg(`${actor.name} dona ${ability.spGrant} Punti Abilità alla squadra.`);
    }
    if(ability.effect==='grant_sp_and_buff'){
      b.sp = clamp(b.sp+ability.spGrant,0,b.spMax);
      allyTargets().forEach(a=>{ a.atkBuffMult = 1+ability.buffPct; a.buffRounds = Math.max(a.buffRounds,2); });
      logMsg(`${actor.name} dona ${ability.spGrant} Punti Abilità e aumenta l'ATK della squadra del ${Math.round(ability.buffPct*100)}%.`);
    }
  }
  else if(ability.target==='allies_all'){
    if(ability.effect==='shield_all'){
      allyTargets().forEach(a=>{ a.shield += Math.round(a.maxHp*ability.shieldPct*(actor.shieldMult||1)); a.shieldRounds=2; });
      logMsg(`${actor.name} scherma tutta la squadra.`);
    }
    if(ability.effect==='heal_all'){
      allyTargets().forEach(a=>{ const amt=Math.round(effAtk*ability.mult*(actor.healMult||1)); a.hp=clamp(a.hp+amt,0,a.maxHp); });
      logMsg(`${actor.name} cura l'intera squadra.`);
    }
    if(ability.effect==='buff_atk'){
      allyTargets().forEach(a=>{ a.atkBuffMult = 1+ability.buffPct; a.buffRounds=2; });
      logMsg(`${actor.name} aumenta l'ATK della squadra.`);
    }
    if(ability.effect==='buff_atk_energy'){
      allyTargets().forEach(a=>{ a.atkBuffMult = 1+ability.buffPct; a.buffRounds=3; a.energy=clamp(a.energy+Math.round(ability.energyGainAll*(a.energyGainMult||1)),0,a.energyMax); });
      logMsg(`${actor.name} scatena un grido di guerra!`);
    }
  }

  if(abKey==='basic'){
    const spGain = (ability.spGain!==undefined) ? ability.spGain : 1;
    b.sp = clamp(b.sp+spGain,0,b.spMax);
    actor.energy = clamp(actor.energy+Math.round(ability.energyGain*(actor.energyGainMult||1)),0,actor.energyMax);
  } else if(abKey==='skill'){
    if(actor.skillFreeUses>0){ actor.skillFreeUses--; }
    else { b.sp = clamp(b.sp-1,0,b.spMax); }
    actor.energy = clamp(actor.energy+Math.round(ability.energyGain*(actor.energyGainMult||1)),0,actor.energyMax);
  } else if(abKey==='ult'){
    actor.energy = 0;
  }
}

function playerChooseAbility(abKey){
  const b = state.battle;
  const actor = currentAlly();
  const ability = CHAR_DB[actor.charId][abKey];
  if(abKey==='skill' && b.sp<1 && actor.skillFreeUses<=0) return;
  if(abKey==='ult' && actor.energy<actor.energyMax) return;

  if(ability.target==='enemy' || ability.target==='ally'){
    b.pendingAbility = {key:abKey};
    render();
    return;
  }
  executeAbility(actor, abKey, null);
  if(checkBattleEnd()) { render(); return; }
  const keepsTurn = (abKey==='skill' && ability.effect==='boost_basic_hits');
  if(!keepsTurn) advanceAllyTurn();
  render();
}

function playerChooseTarget(targetId){
  const b = state.battle;
  if(!b.pendingAbility) return;
  const actor = currentAlly();
  executeAbility(actor, b.pendingAbility.key, targetId);
  b.pendingAbility=null;
  if(checkBattleEnd()) { render(); return; }
  advanceAllyTurn();
  render();
}

function runEnemyPhase(){
  const b = state.battle;
  b.enemies.filter(e=>e.hp>0).forEach(e=>{
    const livingAllies = b.allies.filter(a=>a.hp>0);
    if(livingAllies.length===0) return;
    const target = pick(livingAllies);
    const dmg = calcDamage(e.atk, 1.0, target.def);
    const applied = dealDamageToAlly(target, dmg, true);
    logMsg(`${e.name} attacca ${target.name} per ${applied} danni.`);
  });
  if(checkBattleEnd()) return;

  b.enemies.filter(e=>e.hp>0 && e.burnStacks>0).forEach(e=>{
    const dot = Math.round(e.maxHp*0.045*e.burnStacks*(e.burnSourceMult||1));
    e.hp = clamp(e.hp-dot,0,e.maxHp);
    logMsg(`${e.name} subisce ${dot} danni da ${e.dotName||'Bruciatura'}.`);
    e.burnRounds--;
    if(e.burnRounds<=0){ e.burnStacks=0; }
  });
  if(checkBattleEnd()) return;

  b.allies.forEach(a=>{
    if(a.shieldRounds>0){ a.shieldRounds--; if(a.shieldRounds<=0) a.shield=0; }
    if(a.buffRounds>0){ a.buffRounds--; if(a.buffRounds<=0) a.atkBuffMult=1; }
  });

  b.round++;
  b.turnIndex=0;
  while(b.turnIndex<b.allies.length && b.allies[b.turnIndex].hp<=0) b.turnIndex++;
  b.phase='ally_turn';
  logMsg(`— Round ${b.round} —`);
}

/* ============ AUTO BATTLE ============ */
function autoPlayTurn(){
  if(!state.autoBattle) return;
  const b = state.battle;
  if(!b || b.phase!=='ally_turn') return;
  const actor = currentAlly();
  const cdb = CHAR_DB[actor.charId];

  let abKey = 'basic';
  if(actor.energy>=actor.energyMax) abKey='ult';
  else if(b.sp>=1 || actor.skillFreeUses>0){
    const maxedHits = cdb.skill.effect==='boost_basic_hits' && actor.basicHits>=10;
    abKey = maxedHits ? 'basic' : 'skill';
  }
  const ability = cdb[abKey];

  let targetId = null;
  if(ability.target==='enemy'){
    const targets = b.enemies.filter(e=>e.hp>0);
    if(targets.length===0) return;
    targetId = targets.reduce((a,c)=>c.hp<a.hp?c:a).id;
  } else if(ability.target==='ally'){
    const targets = b.allies.filter(a=>a.hp>0);
    targetId = targets.reduce((a,c)=>(c.hp/c.maxHp)<(a.hp/a.maxHp)?c:a).charId;
  }

  executeAbility(actor, abKey, targetId);
  if(checkBattleEnd()){ render(); return; }
  const keepsTurn = (abKey==='skill' && ability.effect==='boost_basic_hits');
  if(!keepsTurn) advanceAllyTurn();
  render();
  if(state.battle && state.battle.phase==='ally_turn' && state.autoBattle){
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
function levelUpArtifact(uid){
  const it = findArtifactByUid(uid);
  if(!it) return;
  const level = it.level||0;
  if(level>=ARTIFACT_MAX_LEVEL) return;
  const cost = getArtifactLevelUpCost(level);
  if(state.gold<cost) return;
  state.gold -= cost;
  it.level = level+1;
  if(it.level % ARTIFACT_SUBSTAT_MILESTONE === 0){
    const idx = Math.floor(Math.random()*it.subStats.length); // a substat can be picked again on later milestones
    const sub = it.subStats[idx];
    const meta = STAT_KEYS[sub.key];
    const bonus = valueForRarity(meta.kind, meta, it.rarity, 'sub', state.maxStageReached);
    sub.value += bonus;
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
function setTownTab(tab){ state.townTab=tab; render(); }
function setAbilityTabChar(id){ state.abilityTabChar=id; render(); }

/* ============ GACHA BANNER ============ */
const PULL_COST = 300;
const PITY_LIMIT_4 = 10;   // any-character pity (4★ tier)
const PITY_LIMIT_5 = 50;   // 5★ specific pity
const CHAR_PULL_CHANCE_4 = 0.05;
const CHAR_PULL_CHANCE_5 = 0.02;

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
      const weapon = generateWeapon(state.maxStageReached);
      state.weaponInventory.push(weapon);
      result = {type:'weapon', weapon};
    }
  }
  return result;
}
function doPulls(n){
  const results=[];
  for(let i=0;i<n;i++){
    const r = doSinglePull();
    if(!r) break;
    results.push(r);
  }
  state.lastPullResults = results;
  render();
}

/* ============ MISSIONS ============ */
function countUnlockedHeroes(){ return Object.values(state.roster).filter(r=>r.unlocked).length; }
function hasUnlocked5Star(){ return Object.keys(CHAR_DB).some(id=>CHAR_DB[id].rarity===5 && state.roster[id].unlocked); }
function anyHeroHasEquippedArtifact(){ return Object.values(state.roster).some(r=>r.equipment.some(e=>e)); }
function anyHeroHasWeapon(){ return Object.values(state.roster).some(r=>r.weapon); }
function anyArtifactLevelAtLeast(lvl){
  if(state.inventory.some(it=>(it.level||0)>=lvl)) return true;
  for(const charId in state.roster){
    if(state.roster[charId].equipment.some(it=>it && (it.level||0)>=lvl)) return true;
  }
  return false;
}

const QUEST_DB = [
  {id:'stage5',   desc:'Raggiungi il Piano 5 della Torre',        reward:200,  check:()=>state.maxStageReached>5},
  {id:'stage10',  desc:'Raggiungi il Piano 10 della Torre',       reward:400,  check:()=>state.maxStageReached>10},
  {id:'stage20',  desc:'Raggiungi il Piano 20 della Torre',       reward:800,  check:()=>state.maxStageReached>20},
  {id:'stage35',  desc:'Raggiungi il Piano 35 della Torre',       reward:1500, check:()=>state.maxStageReached>35},
  {id:'unlock2',  desc:'Sblocca un secondo eroe',                 reward:300,  check:()=>countUnlockedHeroes()>=2},
  {id:'unlock4',  desc:'Sblocca quattro eroi',                    reward:600,  check:()=>countUnlockedHeroes()>=4},
  {id:'unlock5star', desc:'Sblocca un eroe a 5 stelle',            reward:1000, check:hasUnlocked5Star},
  {id:'equip1',   desc:'Equipaggia il tuo primo manufatto',       reward:100,  check:anyHeroHasEquippedArtifact},
  {id:'equipWeapon', desc:'Equipaggia la tua prima arma',          reward:150,  check:anyHeroHasWeapon},
  {id:'levelArtifact5',  desc:'Porta un manufatto al livello 5',  reward:150,  check:()=>anyArtifactLevelAtLeast(5)},
  {id:'levelArtifact20', desc:'Porta un manufatto al livello 20 (massimo)', reward:400, check:()=>anyArtifactLevelAtLeast(20)},
  {id:'firstPull', desc:'Effettua la tua prima evocazione',       reward:100,  check:()=>state.totalPullsDone>=1},
  {id:'pull20',   desc:'Effettua 20 evocazioni',                  reward:300,  check:()=>state.totalPullsDone>=20},
  {id:'sell1',    desc:'Vendi un manufatto',                      reward:80,   check:()=>state.totalArtifactsSold>=1},
];

function claimQuest(id){
  const q = QUEST_DB.find(x=>x.id===id);
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
        <div class="hero-stars" style="color:${c.rarity===5?'#ffd700':'#9aa4c4'}">${'★'.repeat(c.rarity)}</div>
      </div>
    </div>
    <div class="stat-row"><span>PV</span><b>${eff.hp}</b></div>
    <div class="stat-row"><span>ATK</span><b>${eff.atk}</b></div>
    <div class="stat-row"><span>DEF</span><b>${eff.def}</b></div>
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
  wrap.appendChild(el(`<div class="hint" style="margin-bottom:14px;">Questi sono i personaggi che scenderanno in campo. Tocca uno slot per equipaggiare o rimuovere un manufatto.</div>`));
  const grid = el(`<div class="roster-grid"></div>`);
  state.party.forEach(id=> grid.appendChild(renderHeroCard(id)));
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
      <div class="hero-stars" style="color:${c.rarity===5?'#ffd700':'#9aa4c4'}">${'★'.repeat(c.rarity)}${unlocked?'':' · 🔒 Bloccato'}</div>
      ${c.passiveSpCapBonus?`<div class="hint" style="text-align:left;margin-top:4px;">Passiva: mentre è in squadra, il cap dei Punti Abilità sale da 5 a ${5+c.passiveSpCapBonus}.</div>`:''}
    </div>
  </div>`);
  wrap.appendChild(head);

  const cards = el(`<div class="ability-cards"></div>`);
  cards.appendChild(renderAbilityCard(c.basic, 'basic', 'Attacco Base',
    `<span><b>Moltiplicatore:</b> ${Math.round(c.basic.mult*100)}% ATK${c.basic.hits?` x${c.basic.hits} colpi`:''}</span>
     <span><b>Genera:</b> ${c.basic.spGain!==undefined?c.basic.spGain:1} Punto/i Abilità</span>
     <span><b>Energia:</b> +${c.basic.energyGain}</span>`));
  cards.appendChild(renderAbilityCard(c.skill, 'skill', 'Skill · 1 Punto Abilità',
    `<span><b>Moltiplicatore:</b> ${c.skill.mult>0?Math.round(c.skill.mult*100)+'% ATK':'—'}${c.skill.hits?` x${c.skill.hits} colpi`:''}</span>
     ${c.skill.effect?`<span><b>Effetto:</b> ${effectLabel(c.skill)}</span>`:''}
     <span><b>Energia:</b> +${c.skill.energyGain}</span>`));
  cards.appendChild(renderAbilityCard(c.ult, 'ult', 'Ultimate · Energia Piena',
    `<span><b>Moltiplicatore:</b> ${c.ult.mult>0?Math.round(c.ult.mult*100)+'% ATK':'—'}${c.ult.hits?` x${c.ult.hits} colpi`:''}</span>
     ${c.ult.effect?`<span><b>Effetto:</b> ${effectLabel(c.ult)}</span>`:''}
     <span><b>Energia massima:</b> ${c.base.energyMax}</span>`));
  wrap.appendChild(cards);
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
    default: return '';
  }
}

function renderInventarioTab(){
  const wrap = document.createElement('div');
  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Magazzino</span><h2>Manufatti (${state.inventory.length})</h2></div>`));
  const invPanel = el(`<div class="hud-panel section" style="padding:16px;"></div>`);
  if(state.inventory.length===0){
    invPanel.appendChild(el(`<div class="hint">Nessun manufatto. Completa un piano della torre per ottenerne.</div>`));
  } else {
    const list = el(`<div class="artifact-grid"></div>`);
    state.inventory.forEach(it=>{
      const cost = getArtifactLevelUpCost(it.level||0);
      const maxed = (it.level||0)>=ARTIFACT_MAX_LEVEL;
      list.appendChild(renderArtifactCard(it, {actions:[
        {label: maxed ? 'Livello massimo' : `⬆ Potenzia (${cost} 💠)`, onClick:()=>levelUpArtifact(it.uid), disabled: maxed || state.gold<cost},
        {label:`💰 Vendi (+${getArtifactSellValue(it)} 💠)`, onClick:()=>sellArtifact(it.uid)},
      ]}));
    });
    invPanel.appendChild(list);
  }
  wrap.appendChild(invPanel);
  wrap.appendChild(el(`<div class="hint" style="margin:8px 0 20px;">Ogni manufatto può essere potenziato fino al livello 20 (ogni 5 livelli migliora una sottostatistica casuale, anche ripetuta) oppure venduto per Frammenti. Per equipaggiarne uno vai su Squadra o Cambia Personaggi e tocca uno slot vuoto.</div>`));

  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Armeria</span><h2>Armi (${state.weaponInventory.length})</h2></div>`));
  const wpnPanel = el(`<div class="hud-panel section" style="padding:16px;"></div>`);
  if(state.weaponInventory.length===0){
    wpnPanel.appendChild(el(`<div class="hint">Nessuna arma. Ottienile dal Banner o dalla torre.</div>`));
  } else {
    const list2 = el(`<div class="artifact-grid"></div>`);
    state.weaponInventory.forEach(w=> list2.appendChild(renderWeaponCard(w)));
    wpnPanel.appendChild(list2);
  }
  wrap.appendChild(wpnPanel);
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
  const completedCount = QUEST_DB.filter(q=>state.claimedQuests[q.id]).length;
  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Obiettivi</span><h2>Missioni (${completedCount}/${QUEST_DB.length})</h2></div>`));
  wrap.appendChild(el(`<div class="hint" style="margin-bottom:14px;">Completa obiettivi una tantum per guadagnare Frammenti extra.</div>`));

  const grid = el(`<div class="artifact-grid"></div>`);
  QUEST_DB.forEach(q=>{
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
  wrap.appendChild(el(`<div class="screen-title"><span class="eyebrow">Banner</span><h2>Richiamo degli Eroi</h2></div>`));
  wrap.appendChild(el(`<div class="hint" style="margin-bottom:14px;">Ogni evocazione costa ${PULL_COST} Frammenti. ★★★★★ 2% di possibilità (garantito ogni ${PITY_LIMIT_5} evocazioni). ★★★★ 5% di possibilità (garantito ogni ${PITY_LIMIT_4} se non hai ottenuto nessun eroe prima). Il resto sono armi.</div>`));

  const info = el(`<div class="hud-panel section" style="padding:16px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:14px;align-items:center;">
    <div>
      <div class="hero-name" style="font-size:20px;">💠 ${state.gold} Frammenti</div>
      <div class="hint" style="margin:4px 0 0;text-align:left;">Garanzia ★★★★: ${state.pityCounter}/${PITY_LIMIT_4} · Garanzia ★★★★★: ${state.pity5Counter}/${PITY_LIMIT_5}</div>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;">
      <button class="primary" id="pull1" ${state.gold<PULL_COST?'disabled':''}>Evoca x1 (${PULL_COST})</button>
      <button class="primary" id="pull10" ${state.gold<PULL_COST*10?'disabled':''}>Evoca x10 (${PULL_COST*10})</button>
    </div>
  </div>`);
  info.querySelector('#pull1').onclick=()=>doPulls(1);
  info.querySelector('#pull10').onclick=()=>doPulls(10);
  wrap.appendChild(info);

  if(state.lastPullResults.length>0){
    wrap.appendChild(el(`<div class="screen-title" style="margin-top:22px;"><span class="eyebrow">Risultato</span><h2>Ultima Evocazione</h2></div>`));
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
  else if(state.townTab==='torre') wrap.appendChild(renderTorreTab());
  else if(state.townTab==='banner') wrap.appendChild(renderBannerTab());
  else if(state.townTab==='missioni') wrap.appendChild(renderMissioniTab());

  if(equipPickerFor) wrap.appendChild(renderEquipPickerModal());
  if(viewArtifactFor) wrap.appendChild(renderViewArtifactModal());
  if(weaponPickerFor) wrap.appendChild(renderWeaponPickerModal());
  if(viewWeaponFor) wrap.appendChild(renderViewWeaponModal());
  return wrap;
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
      list.appendChild(renderWeaponCard(w, {actionLabel:'Equipaggia', onAction:()=>equipWeapon(w.uid)}));
    });
    box.appendChild(list);
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
    box.appendChild(renderWeaponCard(weapon, {actionLabel:'Rimuovi arma', onAction:()=>{ unequipWeapon(charId); closeViewWeapon(); }}));
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
      list.appendChild(renderArtifactCard(it, {actionLabel:'Equipaggia', onAction:()=>equipItem(it.uid)}));
    });
    box.appendChild(list);
  }
  const closeBtn = el(`<div style="text-align:right;margin-top:16px;"><button class="ghost small" id="closeEq">Chiudi</button></div>`);
  closeBtn.querySelector('#closeEq').onclick=closeEquipPicker;
  box.appendChild(closeBtn);
  overlay.appendChild(box);
  overlay.onclick=(ev)=>{ if(ev.target===overlay) closeEquipPicker(); };
  return overlay;
}

function renderBattle(){
  const b = state.battle;
  const wrap = document.createElement('div');
  wrap.className='battle-wrap';
  const auto = state.autoBattle;

  const targetingEnemy = !auto && b.pendingAbility && CHAR_DB[currentAlly().charId][b.pendingAbility.key].target==='enemy';
  const targetingAlly = !auto && b.pendingAbility && CHAR_DB[currentAlly().charId][b.pendingAbility.key].target==='ally';

  const enemyRow = el(`<div class="hud-panel enemy-row"></div>`);
  b.enemies.forEach(e=>{
    const dead = e.hp<=0;
    const card = el(`<div class="hud-panel enemy-card ${dead?'dead':''} ${targetingEnemy && !dead?'targetable':''}">
      <div class="portrait">${e.isBoss?'☠':'◆'}</div>
      <div class="name">${e.name}</div>
      <div class="bar-track"><div class="bar-fill hp-fill" style="width:${(e.hp/e.maxHp*100)}%"></div></div>
      <div class="mini-lbl"><span>${e.hp}/${e.maxHp}</span></div>
      ${e.burnStacks>0?`<div class="burn-tag">${e.dotName==='Sanguinamento'?'🩸':'🔥'} x${e.burnStacks}</div>`:''}
      ${e.shield>0?`<div class="shield-tag">🛡 ${e.shield}</div>`:''}
    </div>`);
    if(targetingEnemy && !dead) card.onclick=()=>playerChooseTarget(e.id);
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
  wrap.appendChild(midRow);

  const allyRow = el(`<div class="ally-row"></div>`);
  b.allies.forEach((a,i)=>{
    const dead = a.hp<=0;
    const isActive = i===b.turnIndex && b.phase==='ally_turn' && !b.pendingAbility && !auto;
    const isTargetable = targetingAlly && !dead;
    const card = el(`<div class="hud-panel ally-card ${isActive?'active-turn':''} ${dead?'dead':''} ${isTargetable?'selectable-target':''}">
      <div class="ally-top">
        <div class="ally-portrait" style="background:${a.color}">${a.glyph}</div>
        <div class="ally-name">${a.name}</div>
      </div>
      <div class="mini-lbl"><span>PV</span><span>${a.hp}/${a.maxHp}</span></div>
      <div class="bar-track"><div class="bar-fill hp-fill" style="width:${(a.hp/a.maxHp*100)}%"></div></div>
      <div class="mini-lbl" style="margin-top:5px;"><span>Energia</span><span>${a.energy}/${a.energyMax}</span></div>
      <div class="bar-track"><div class="bar-fill energy-fill" style="width:${(a.energy/a.energyMax*100)}%"></div></div>
      ${a.shield>0?`<div class="shield-tag">🛡 Scudo ${a.shield}</div>`:''}
      ${a.buffRounds>0?`<div class="buff-tag">▲ ATK +${Math.round((a.atkBuffMult-1)*100)}%</div>`:''}
    </div>`);
    if(isTargetable) card.onclick=()=>playerChooseTarget(a.charId);
    allyRow.appendChild(card);
  });
  wrap.appendChild(allyRow);

  const actionBar = el(`<div class="hud-panel action-bar"></div>`);
  if(auto){
    actionBar.appendChild(el(`<div class="hint" style="margin:0;">🤖 Modalità automatica in corso…</div>`));
  } else if(b.phase==='ally_turn'){
    const actor = currentAlly();
    const cdb = CHAR_DB[actor.charId];
    actionBar.appendChild(el(`<div class="who">${actor.name} ▸</div>`));

    if(b.pendingAbility){
      const abName = cdb[b.pendingAbility.key].name;
      actionBar.appendChild(el(`<div class="hint" style="margin:0;">Seleziona un bersaglio per <b style="color:var(--text)">${abName}</b>…</div>`));
      const cancelBtn = el(`<button class="ghost small">Annulla</button>`);
      cancelBtn.onclick=()=>{ b.pendingAbility=null; render(); };
      actionBar.appendChild(cancelBtn);
    } else {
      const basicBtn = el(`<button class="ability-btn"><span class="aname">⚔ ${cdb.basic.name}</span></button>`);
      basicBtn.onclick=()=>playerChooseAbility('basic');

      const maxedHits = cdb.skill.effect==='boost_basic_hits' && actor.basicHits>=10;
      const skillDisabled = (b.sp<1 && actor.skillFreeUses<=0) || maxedHits;
      const skillCostLabel = maxedHits ? 'Al massimo' : (actor.skillFreeUses>0 ? `Gratis · ${actor.skillFreeUses} rimasti` : '1 PA');
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
