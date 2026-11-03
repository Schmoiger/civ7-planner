# Map Tiles and Behaviours


---

## Terrain

As in previous titles, all Unimproved (Civ7) Terrain in the game is defined by a combination of three elements: biomes, base Terrain morphology, and features. These Terrain attributes determine several key factors, including:

- Base yields
- Appeal
- Construction requirements
- Tile Improvements
- Movement and passability
- Sight Sight and view obstruction.
- Combat modifiers for units
- Resource spawn conditions
- Natural Wonder spawn conditions
- Disaster spawn conditions
- Additional tile-based bonuses

### Biomes

A biome is a geographical region characterized by a specific set of Unimproved (Civ7) Terrains and features associated with it. Essentially, a biome represents a cohesive grouping of Terrain types and theming that reflect real-world vegetation zones and ecological boundaries.

Many leaders and civilizations have synergies with particular biomes and tend to have a bias toward starting near or within their associated biome.

#### Land biome

There are currently five land biomes:

- Tundra
- Grassland
- Plains
- Desert
- Tropical

Each biome can be further differentiated into Unimproved (Civ7) Terrain morphology:

- Flat (e.g., Flat Desert)
- Rough (e.g., Desert Rough)
- Mountainous (e.g., Mountainous Desert)
- Navigable River (e.g., Navigable River Desert)

#### Marine biome

In Civilization VII, deep water tiles are collectively called "Marine", forming a sixth biome which can be defined as tiles which are completely covered in water. Land Units Land Units will always have to embark upon entering this biome. Similar to how land biomes can be differentiated into Rough, Flat, and Mountainous Terrains, the Marine biome includes:

- Coastal - Water tiles which are close to land and connect land to the oceans.
- Ocean - Deep water tiles separating continents. These tiles can only be accessed starting from the Exploration Age.
- Lake (referred to in game as Lake (Coastal)) - Inland fresh water tiles which often appear as isolated bodies of waters, usually connected to Coast by a river (minor or navigable).

### Terrain Features

Aside from base Unimproved (Civ7) Terrain morphology and biomes, Terrain can be further enhanced by features. Featured tiles are essentially standard tiles that include an additional element, such as a natural feature or special Natural Wonder Natural Wonder. These added components provide extra yields, strategic value, or unique gameplay effects.

- Volcanoes — A variant of regular Mountains that can erupt, fertilizing adjacent tiles while also damaging nearby Buildings Buildings and Tile Improvements Tile Improvements when they do.
- Minor Rivers — Indicates the presence of Fresh Water and movement difficulty.
- Floodplains — Indicates the tile is vulnerable to flood damage, usually adjacent or on Navigable River tiles.
- Wet - Indicates the presence of Fresh Water and movement difficulty.
- Vegetated — Indicates the presence of Vegetation and movement difficulty.
- Aquatic — Is found exclusively on Marine tiles.
- Snow — Indicates cold climate and the outer reaches of the map.
- Ice — Can be found on Coastal or Ocean tiles, blocks movement, and indicates the border of the map.

Each tile can only have one additional feature from each feature class; however, certain special features — such as Snow or Rivers — can coexist with others, allowing some tiles to become multi-feature locations.


---

## Tile Yields

Every yield below feeds the others; the loop they form is mapped in The Yield Wheel.

🌾 Food – Drives population growth and keeps citizens fed. Surplus Food above the maintenance threshold accelerates growth; a deficit causes Starvation and population loss. Primary sources: Farms, Pastures, Fishing Boats, Granaries, and Food Resources like Fish, Cotton, and Dates. Prioritize Food early to grow quickly, then pivot once your cities are large enough to staff all their buildings.

⚒️ Production – Determines how fast you build units, buildings, Wonders, and districts. Primary sources: Mines, Quarries, Lumber Mills, Workshops, and Hills. Production is what converts every other advantage into something on the map; a city with strong Production can pivot to any strategy on demand.

💰 Gold – The universal flex yield. Gold purchases units and buildings instantly, funds trade agreements, and fuels diplomatic actions. Primary sources: Trade Routes, Markets, Commercial Quarters, and Gold Resources. Gold cannot win the game by itself, but insufficient Gold constrains everything else.

🔬 Science – Advances you through the technology tree, unlocking units, buildings, and abilities. Falling behind means fighting with obsolete units and missing critical infrastructure. Primary sources: Libraries, Universities, Research Labs, Lecture Halls, and Specialist Scholars. Science compounds: each technology unlocks more efficient ways to generate more of it.

🎭 Culture – Propels you through the civic tree, unlocking governments, policies, traditions, and social institutions, and contributes to Tourism throughout the game. Primary sources: Monuments, Amphitheaters, Museums, Great Works, and Cultural Specialists. Culture and Science run on parallel tracks; neglecting either leaves you lopsided.

😊 Happiness – A settlement-level yield that decides whether cities thrive or stagnate. High Happiness triggers Celebrations; low Happiness causes Unrest, yield penalties, and eventually Revolt. Primary sources: Luxury Resources, Entertainment buildings, certain Wonders, and government policies. Happiness is the silent yield – easy to ignore until it collapses your empire. Full mechanics in Happiness, Governments & Celebrations.

🕊️ Influence – The currency of diplomacy. Like Gold, it accumulates each turn rather than being worked from tiles, which is why it sits slightly apart from the other six. Primary sources: Chancery, Embassy, and Foreign Ministry, Social Policies, and the Diplomatic Attribute Tree. Without it you cannot propose Endeavors, establish Treaties, or contest City-State suzerainty. Full mechanics in Diplomacy, Influence & Trade.


---

## Improvements

### Types of Improvement

| Improvement | Appears On |
|-------------|------------|
| 🌾 Farm | Flat terrain |
| ⛏️ Mine | Rough terrain; Gold, Iron, Silver, Salt |
| 🪵 Woodcutter | Vegetated terrain; Cocoa, Spices, Quinine |
| 🧱 Clay Pit | Wet terrain |
| 🪨 Quarry | Gypsum, Jade, Kaolin, Marble |
| 🐎 Pasture | Horses |
| 🏕️ Camp | Ivory, Camels, Hides, Furs |
| 🎣 Fishing Boat | Coastal and Navigable River tiles; Fish, Pearls, Dyes |

### Town Focus

Every Town begins as a Growing Town (+50% Growth Rate). Once it reaches 7 Population you may choose a Focus – and that choice locks for the rest of the Age, so it deserves a moment's thought.

| FOCUS | EFFECT |
|-------|--------|
| Growing Town (default) | +50% Growth Rate |
| Farming/Fishing Town | +1 Food on Farms, Pastures, Plantations, and Fishing Boats; unlocks Water and Food Buildings |
| Mining Town | +2/3/4 Production on Camps, Woodcutters, Clay Pits, Mines, and Quarries |
| Urban Center | +100% Gold and Happiness toward Building maintenance; the Town can purchase additional Buildings such as Libraries, Baths, and Monuments |
| Resort Town | +1 Happiness and +1 Gold on Appealing tiles; +50% yields on Natural Wonder tiles; unlocks Happiness Buildings |
| Trade Outpost | +1 Happiness on Resource tiles; +5 Trade Range per Age; unlocks Gold Buildings. Distant Lands only |
| Religious Site | +1 Happiness on every Building; +1 Relic slot on Temples; +25% Gold toward purchasing Temples |
| Hub Town | +1 Influence per directly connected Settlement; unlocks Diplomacy Buildings. Limit 1 per continent |
| Fort Town | +5 Healing to Units; +25 HP to Fortifications; +1 Gold on Fortified Districts; unlocks Fortifications and Military Buildings |
| Factory Town | +100% Gold toward purchasing a Factory, Port, or Rail Station; +1 Resource slot; +5 Trade Range; unlocks Gold Buildings. Requires an improved Factory Resource |


---

## Buildings

To place a Building on a tile, the tile must:

- Be within your Settlement Settlement's borders.
- Not be Ocean, Ice, Mountainous, or a Natural Wonder Natural Wonder.
- Be free of Resources Resources.
- Be adjacent to a completed Building or within a District District that is not a Quarter Quarter or adjacent to a completed Wonder Wonder that is already next to a District District.

Some Buildings have stricter placement requirements.

### Warehouse Buildings

Warehouses are the odd ones out, and the easiest buildings to misjudge. They are the only buildings that improve your rural tiles.

| **Warehouse** | **Age (Unlock)** | **Effect** |
|---------------|------------------|------------|
| Granary | 🏺 Antiquity (Agriculture) | +1 Food; +1 Food on Farms, Pastures, Plantations |
| Brickyard | 🏺 Antiquity (Pottery) | +1 Production; +1 Production on Clay Pits, Mines, Quarries |
| Fishing Quay | 🏺 Antiquity (Sailing) | +1 Food; +1 Food on Fishing Boats |
| Saw Pit | 🏺 Antiquity (Animal Husbandry) | +1 Production; +1 Production on Camps, Woodcutters |
| Gristmill | ⛵ Exploration (Machinery) | +4 Food; +1 Food on Farms, Pastures, Plantations |
| Sawmill | ⛵ Exploration (Machinery) | +3 Production; +1 Production on Camps, Woodcutters |
| Grocer | 🏭 Modern (no research) | +4 Food; +1 Food on Camps, Farms, Fishing Boats, Pastures, Plantations, and uncultivated rural tiles |
| Ironworks | 🏭 Modern (Steam Engine) | +4 Production; +1 Production on Mines, Quarries, Woodcutters, Clay Pits |

### Gold Buildings

Adjacency: Coast · Navigable Rivers · Wonders. Gold Buildings pay no Gold maintenance.

| AGE | BUILDING | UNLOCKED BY | WHAT IT GIVES |
|-----|----------|-------------|---------------|
| 🏺 Antiquity | Market | Currency | +3 Gold, +1 Resource slot |
| | Lighthouse | Navigation | +4 Gold, +2 Resource slots |
| | Ancient Bridge | Engineering II | +4 Gold; land units cross without embarking |
| ⛵ Exploration | Bazaar | – | +6 Gold, +1 Resource slot |
| | Bank | Urban Planning | +8 Gold, +1 Gold on Quarters |
| | Guildhall | Guilds | +6 Gold, +6 Influence |
| | Medieval Bridge | Feudalism | +4 Gold |
| 🏭 Modern | Port | Steam Engine | +9 Gold, +2 Resource slots, trains Naval Units |
| | Rail Station | Industrialization | +9 Gold, +9 Production; builds Railroads |
| | Stock Exchange | Computation | +12 Gold, +1 Gold on Quarters |
| | Modern Bridge | Urbanization II | +6 Gold; immune to Floods |

### Science Buildings

Adjacency: Resources · Wonders.

| AGE | BUILDING | UNLOCKED BY | WHAT IT GIVES |
|-----|----------|-------------|---------------|
| 🏺 Antiquity | Library | Writing | +3 Science, 2 Great Work slots |
| 🏺 Antiquity | Academy | Mathematics | +4 Science, 3 Great Work slots |
| ⛵ Exploration | Observatory | Astronomy | +6 Science |
| ⛵ Exploration | University | Education | +8 Science, +1 Science on Quarters |
| 🏭 Modern | Schoolhouse | Academics | +9 Science |
| 🏭 Modern | Laboratory | Electricity | +12 Science, +1 Science on Quarters |
| 🏭 Modern | Launch Pad | Rocketry | +18 Science; unlocks the Launch Satellite Project |

The file has been updated with this table format.

### Culture Buildings

Adjacency: Mountains · Natural Wonders · Wonders.

| AGE | BUILDING | UNLOCKED BY | WHAT IT GIVES |
|-----|----------|-------------|---------------|
| 🏺 Antiquity | Monument | Masonry | +3 Culture, +2 Influence |
| 🏺 Antiquity | Amphitheater | Engineering | +4 Culture, +10% Wonder Production |
| ⛵ Exploration | Kiln | Guilds | +6 Culture, +10% Wonder Production |
| ⛵ Exploration | Pavilion | Architecture | +8 Culture, +1 Happiness on Quarters |
| 🏭 Modern | Museum | Natural History | +9 Culture, 3 Great Work slots |
| 🏭 Modern | Opera House | Urbanization | +12 Culture, +6 Influence |

### Happiness Buildings

Adjacency: Mountains · Natural Wonders · Wonders. Happiness Buildings pay no Happiness maintenance.

| AGE | BUILDING | UNLOCKED BY | WHAT IT GIVES |
|-----|----------|-------------|---------------|
| 🏺 Antiquity | Altar | Mysticism | +3 Happiness; benefits from your Pantheon |
| 🏺 Antiquity | Arena | Military Training | +4 Happiness, +1 Happiness on Quarters |
| 🏺 Antiquity | Garden | Irrigation | +3 Food, +2 Happiness |
| 🏺 Antiquity | Villa | The Wheel | +3 Influence, +3 Happiness |
| ⛵ Exploration | Temple | Piety | +6 Happiness, 1 Great Work slot; trains Missionaries |
| ⛵ Exploration | Menagerie | Architecture | +8 Happiness, +1 Happiness on Camps and Pastures |
| ⛵ Exploration | Inn | Feudalism | +6 Food, +4 Happiness |
| 🏭 Modern | City Park | – | +9 Happiness, +1 Happiness on Vegetation |
| 🏭 Modern | Department Store | Urbanization | +12 Happiness, +1 Resource slot |
| 🏭 Modern | Radio Station | Radio | +9 Influence, +9 Happiness |

### Production Buildings

Adjacency: Resources · Wonders. The Military ones are also where units spawn.

| AGE | BUILDING | UNLOCKED BY | WHAT IT GIVES |
|-----|----------|-------------|---------------|
| 🏺 Antiquity | Barracks | Bronze Working | +3 Production; trains Land Units |
| 🏺 Antiquity | Blacksmith | Military Training | +4 Production, +1 Production on Quarters |
| ⛵ Exploration | Armorer | Metallurgy | +8 Production; trains Land Units |
| ⛵ Exploration | Dungeon | Castles | +6 Production, +4 Influence |
| ⛵ Exploration | Shipyard | Shipbuilding | +8 Production; trains Naval Units |
| 🏭 Modern | Military Academy | Military Science | +9 Production; Commanders trained here gain a free level |
| 🏭 Modern | Factory | Mass Production | +12 Production; enables a Factory Resource |
| 🏭 Modern | Aerodrome | Flight | +9 Production; trains Air Units |

### Food Buildings

Adjacency: Coast · Navigable Rivers · Wonders.

| AGE | BUILDING | UNLOCKED BY | WHAT IT GIVES |
|-----|----------|-------------|---------------|
| 🏺 Antiquity | Bath | Currency | +4 Food, +10% Growth Rate |
| 🏺 Antiquity | Garden | Irrigation | +3 Food, +2 Happiness |
| ⛵ Exploration | Hospital | Urban Planning | +8 Food, +15% Growth Rate |
| ⛵ Exploration | Wharf | Cartography | +6 Food, +2 Resource slots |
| ⛵ Exploration | Inn | Feudalism | +6 Food, +4 Happiness |
| 🏭 Modern | Cannery | Mass Production | +9 Food, +10% Growth Rate |
| 🏭 Modern | Tenement | Radio | +12 Food, +1 Happiness on Quarters |

### Building Adjacency

| BUILDING TYPE | EFFECT |
|---------------|--------|
| Food Buildings | +1 per source from Coastal Terrain, Navigable Rivers, or Wonders |
| Production Buildings | +1 per source from Resources or Wonders |
| Gold Buildings | +1 per source from Coastal Terrain, Navigable Rivers, or Wonders |
| Science Buildings | +1 per source from Resources or Wonders |
| Culture Buildings | +1 per source from Mountains, Natural Wonders, or Wonders |
| Happiness Buildings | +1 per source from Mountains, Natural Wonders, or Wonders |
| Warehouse Buildings | None – Warehouses have NO adjacency bonuses |
| Palace / City Hall | +1 per adjacent District or Quarter |

### Building Maintenance

| Type | Maintenance Cost |
|------|------------------|
| Standard | -2 Gold Gold and -2 Happiness Happiness |
| Gold | -2 Happiness Happiness |
| Happiness | -2 Gold Gold |
| Warehouse | No upkeep cost |
| Others | No upkeep cost |

As civilizations progress, maintenance costs increase, rising by 1 additional yield in the Exploration Age and by 2 in the Modern Age.


---

## Quarters

When a second building goes onto an urban tile, that tile becomes a Quarter. Quarters serve as adjacency sources for neighboring buildings – the Palace and Town Hall each gain +1 from every adjacent Quarter – and they concentrate two buildings' worth of adjacency production on a single tile, which is exactly what Specialists want. Map this cascade before you build: a well-placed Quarter collects adjacency from the terrain around it, then becomes an adjacency source in its own right.

### Antiquity Age

| Quarter | Civilization | Buildings | Effects |
|---------|--------------|-----------|---------|
| Acropolis | Greek | Odeon | +2 Gold on the Parthenon for each City-State you are suzerain of |
| Dūnon | Gallic | Nemeton | +25 HP to Fortifications in this Settlement |
| Ekallu | Assyrian | Citadel | +2 Production for each Great Work in this Settlement |
| Forum | Roman | Basilica | +1 Culture for every Tradition in the Government |
| Matha | Mauryan | Dharamshala | +10% Happiness in this Settlement |
| Necropolis | Egyptian | Mastaba | +100 Gold every time a Wonder is completed in this Settlement |
| Punic Port | Carthaginian | Cothon | +2 Resource Capacity in this Settlement (additional +3 Resource Capacity when placed in the Capital) |
| Sachal | Silla | Lecture Hall | +1 Gold for every Resource slotted in this City |
| Tofi'a | Tongan | Langi | +2 Culture for every Trade Route you have to a City-State |
| Uwaybil K'uh | Maya | Jalaw | Every time you research a Technology, this Settlement gains Production equal to 5% of its cost |

### Exploration Age

| Quarter | Civilization | Buildings | Effects |
|---------|--------------|-----------|---------|
| Abbey | English | Chapter House | Increased Culture in this Settlement for each of your Towns following your Religion |
| Donjon | Norman | Bailey | Receive a free Chevalier when completed<br>+10% Production towards training Cavalry Units |
| Five Hundred Lords | Chola | Anjuvannam | +5 land Trade Range<br>+15 naval Trade Range |
| Haven | Pirate | Naval Arsenal | +1 Gold for every Treasure Resource in your pool<br>+50 healing for friendly Naval Units on this tile |
| Plaza | Spanish | Casa Consistorial | Casa de Contratación<br>+2 Gold in this Settlement for every Settlement in distant lands |
| Pura | Majapahit | Candi Bentar | Meru<br>Receive 1 Relic when completed<br>+10% Gold towards converting a Town into a City |
| Ulema | Abbasid | Madrasa | Mosque<br>+1 Science to all Specialists in this City |

### Modern Age

| Quarter | Civilization | Buildings | Effects |
|---------|--------------|-----------|---------|
| Avenue | French Imperial | Jardin à la Française | Salon<br>+2 Happiness on Quarters in this City |
| Bāq | Qajar | Ghahve Khane | Takyeh<br>+10% Influence and Culture in this Settlement during Celebrations |
| Financial Centre | British | Manufactory | Royal Exchange<br>+2 Gold and +2 Science for every connected Settlement |
| Huiguan | Qing | Shiguan | Qianzhuang<br>+25% Influence in this Settlement |
| Industrial Park | American | Railyard | Steel Mill<br>+1 GDP from Factory Resources assigned to this Settlement |
| Külliye | Ottoman | Cami | Hammam<br>+3 Culture and +2 Gold on Specialists in this City |
| Seowon | Joseon | Confucian Academy | Printing House<br>This Settlement gains Culture equal to 10% of its Production output<br>If built in a Town, +1 Population in the Capital |
| Zaibatsu | Meiji Japanese | Jukogyo | Ginkō<br>Buildings in adjacent tiles gain +1 Gold and Production<br>+1 Resource Capacity in this Settlement |
| Zócalo | Mexican | Catedral | Portal de Mercaderes<br>+2 Culture for every Tradition slotted into the Government |


---

## Specialists

Specialists are the highest-leverage yield amplifiers in the game, and their assignment is permanent and irreversible. Plan every one.

---

## Resources

All tiles (except for Mountains and Open Ocean) can come with Resources Resources spawned on top of them. Most Resources have specific spawn requirements based on the Biome, Morphology, and Feature class. Resources enhance the tile with additional yields and prevent any infrastructure from being built on top of them.

### Bonus Resources – flat yields, any Settlement

Workable by any Settlement, Town or City alike, providing flat yield boosts to the tile they occupy.

| Resource | Yield |
|----------|-------|
| 🐟 Fish | +6 Food with a Port; +3 Food otherwise |
| 🦌 Hides | +3 Production |
| 🧵 Cotton | +2 Food, +2 Production |
| 🌴 Dates | +2 Food, +2 Happiness |
| 🎨 Dyes | +4 Happiness |
| 🐑 Wool | +2 Production, +2 Happiness |
| 💎 Rubies | +4 Gold |
| 🦀 Crabs | +1 Food on tile; +1 / +2 / +3 Food on Warehouse Buildings by Age |
| 🐚 Cowrie | +1 Happiness on tile; +4 / +5 / +6 Gold in Cities, +2 / +3 / +4 Science in Towns by Age |
| 🐢 Turtles | +1 Culture on tile; +1 / +2 Culture on Warehouse Buildings in Antiquity / Exploration |
| ⚫ Pitch | +1 Production, +1 Gold on tile; +1 Gold on Water Buildings in Exploration; +1 Production on Factories and +10% toward Factories in Modern |
| 🟫 Clay | +1 Production on Warehouse Buildings |
| 🌿 Flax | +2 Science, +2 Culture |
| 🦙 Llamas | +1 Production, +3 Happiness |
| 🦬 Wild Game | +2 Food in Cities, +4 Food in Towns |
| 🐋 Whales | +5 Production |
| 🐎 Horses | +8 Happiness. Modern only |

### City Resources – require a City and a Resource Slot

Require a City (not a Town) and must be slotted into a Resource Slot to activate. They provide percentage-based bonuses or scaling yields that reward larger, more developed cities.

| Resource | Effect |
|----------|--------|
| 💚 Jade | +15% Gold in this city |
| 🕯️ Incense | +10% Science in this city |
| 🧶 Silk | +10% Culture in this city |
| 🏺 Kaolin | Antiquity +2 Food in Capital, +4 Food in any other City; Exploration +3 Food in Homeland Cities, +6 Food in Distant Lands Cities |
| 🧱 Gypsum | +2 Production in the Capital, +4 in other Cities |
| 🧂 Salt | +20% unit Production in this city |
| 🦪 Pearls | +8 Happiness in the Capital, +4 in other Cities |
| 🥭 Mangoes | +2 Food, +2 Culture |
| 🍄 Truffles | +20% Production toward training Units |
| 🍂 Tobacco | +8 Production with a Rail Station, +4 otherwise. Modern only |
| 🐫 Camels | +2 Resource capacity in this City, without consuming a slot |

### Treasure Resources – Exploration Age

| Resource | Yield Where Worked |
|----------|-------------------|
| 💎 Rubies | +1 Gold in Towns, doubled in the Homelands |
| 🍫 Cocoa | +1 Happiness in Towns, doubled in the Homelands |
| 🦫 Furs | +3 Happiness in the Capital; +10 Gold during a Celebration |
| 🪙 Gold | +1 Gold and +1 Happiness in all Settlements |
| 🐎 Horses | +1 Combat Strength for Cavalry Units |
| 🥈 Silver | +1 Gold and +1 Food in all Settlements |
| 🌶️ Spices | +1 Culture and +1 Influence in Cities, doubled in the Homelands |
| 🍬 Sugar | +1 Food and +1 Happiness in Cities, doubled in the Homelands |
| 🍵 Tea | +1 Science and +1 Production in Cities, doubled in the Homelands |

### Factory Resources – Modern Age, require a Factory

| Resource | Effect |
|----------|--------|
| ☕ Coffee | +5% Production toward Buildings and Wonders |
| 🧵 Cotton | +5% Production toward Land Units |
| 🍋 Citrus | +5% Production toward Naval Units |
| 🍵 Tea | +3% Science |
| 🏺 Kaolin | +3% Culture |
| 🍫 Cocoa | +3% Happiness |
| 🪨 Tin | +3% Growth Rate |
| 💊 Quinine | +1 HP recovery per turn for units |


---

## Wonders

Wonders are Ageless – they never obsolete, never need overbuilding, and keep paying for the rest of the game. They are also the most placement-sensitive thing you will ever build, and because they never obsolete, a bad placement is permanent.

Placing Wonders:

- Keep a coastal tile and a mountain-adjacent tile free if your city has either. Those are the two most common Wonder requirements, and losing them to a Warehouse is a genuine cost.
- Do not fill every tile just because you can. A city with two reserved sites and eight buildings usually outperforms one with ten buildings and no room, because the Wonders you fit later are Ageless and the tenth building is not.

### Antiquity Age Wonders

#### Available to everyone

| WONDER | CIV | PLACEMENT | WHAT'S NOTABLE |
|--------|-----|-----------|----------------|
| Colossus | All | Coast adjacent to land | ⭐ Top pick. +3 Gold, +3 Resource Capacity, and a free Economic Attribute Point. Resource Capacity is the scarcest thing in Antiquity and this is the cheapest way to buy it |
| Great Library | All | Adjacent to a District | +4 Science, +1 Science on Science Buildings across your whole empire, 3 Great Work slots, 3 Innovation. One of the few Antiquity effects that scales empire-wide |
| Great Lighthouse | All | Coast adjacent to land | +3 Gold, a free Merchant, +15 Naval Trade Route Range, +1 Naval Sight. Community opinion is split – strong for a naval trade empire, thin otherwise |
| Mausoleum at Halicarnassus | All | Flat adjacent to Coast | +3 Production; your first destroyed Cavalry Unit respawns. Niche insurance |
| Mausoleum of Theodoric | All | Adjacent to Coast | +3 Production and +100% Pillage yields. Narrow, but genuinely strong in a raiding game |
| Mireuksa | All | Adjacent to a Mountain | Culture and Production on Happiness-providing Districts |
| Nalanda | All | Plains | ⭐ Top pick for Science. +3 Science, a free Codex, 2 Great Work slots, a Scientific Attribute Point, and 3 Innovation outright |
| Petra | All | Desert | Turns Desert from dead ground into real yield. Situational by definition – excellent on a desert start, pointless without one |
| Pyramid Of The Sun | All | Flat, adjacent to a District | ⭐ Top pick for Culture. +3 Culture and +2 Culture on every Quarter in the Settlement – it scales with how densely you build, so put it in your best city |
| Terracotta Army | All | Grassland | +2 Production, a free Army Commander, and +25% Commander experience. Commander XP crosses every Age, so this compounds for the whole game |

#### Civilization-specific

Wonders that bend settlement limits, War Support, diplomacy, unit production, or population are summarized here rather than duplicated across the earlier rule-bender tables.

| WONDER | CIV | PLACEMENT | WHAT'S NOTABLE |
|--------|-----|-----------|----------------|
| Angkor Wat | Khmer | Adjacent to a River | +3 Happiness and +1 Specialist Limit in this Settlement |
| Byrsa | Carthage | Adjacent to Coast | Trade Routes here cannot be plundered, and coastal tiles gain Walls |
| Colosseum | Rome | Adjacent to a District | +3 Culture, plus Happiness and Gold on Quarters. Strong in a dense capital, unremarkable in a sprawling one |
| Dur-Sharrukin | Assyria | Adjacent to a District | Acts as a Fortified District and gives +5 Combat Strength to Fortified Districts everywhere. A defensive pick |
| Emile Bell | Silla | Rough | +2 Influence and a unique Endeavor. Diplomatic niche |
| Gate of All Nations | Persia | Adjacent to a District | ⭐ +1 War Support on all Wars, permanently, plus +2 Happiness. Small number, enormous reach – it applies to every war for the rest of the game |
| Great Stele | Aksum | Flat | +200 Gold per Age for every Wonder completed in any Settlement, including itself, plus +2 Production. Only worth it if you intend to build many Wonders |
| Ha'amonga 'a Maui | Tonga | Adjacent to Coast | Culture and Food on Fishing Boats, plus a Cultural Attribute Point |
| Hanging Gardens | Babylon | Adjacent to a River | +1 Food on Farms here and +10% Growth Rate in all Cities – quiet, empire-wide, and best taken early |
| Hoo-do Hall | Heian Japan | Flat adjacent to a River | Wonders provide +1 Appeal to adjacent tiles – the enabler for an Appeal-based Culture game |
| Monks Mound | Mississippian | Adjacent to a River | +4 Food and +4 Resource Capacity – the largest single Capacity boost in the Age |
| Mundo Perdido | Maya | Tropical | Science and Happiness on Tropical tiles. Entirely map-dependent |
| Oracle | Greece | Rough | +2 Culture and +20 Culture per Age from every Narrative Event, plus a Wildcard Attribute Point |
| Pyramids | Egypt | Adjacent to a Navigable River, any biome but Tundra | Yields on river Improvements and Districts. Good with a river-heavy capital, weak otherwise |
| Sanchi Stupa | Maurya | Plains | +3 Happiness and Culture from excess Happiness. Fine in a Celebration empire, skippable elsewhere |
| Weiyang Palace | Han China | Grassland | +3 Influence and +1 Tradition slot. Traditions outlive the civilization that granted them, so the slot is permanent value |

### Exploration Age Wonders

#### Available to everyone

| WONDER | CIV | PLACEMENT | WHAT'S NOTABLE |
|--------|-----|-----------|----------------|
| Grand Bazaar | All | Adjacent to a District in the homelands | +2 Gold, +2 Resource slots, and Gold on homeland Treasure Resources |
| Nan Madol | All | An Island City on Coast | Large yields on the Palace and City Hall of island Cities. Superb on Archipelago, useless inland |
| Notre Dame | All | Adjacent to a River and a District | ⭐ Starts a Celebration on completion and gives all Specialists +3 Culture during Celebrations. The Celebration engine's best single purchase |
| Shwedagon Zedi Daw | All | Adjacent to a Lake | +4 Science, Science on Appeal tiles, a Wildcard Attribute Point, and 3 Innovation |
| Wat Xieng Thong | All | Adjacent to a River | 200 Gold every time you obtain a Great Work. Pairs with any Relic engine |

#### Civilization-specific

| WONDER | CIV | PLACEMENT | WHAT'S NOTABLE |
|--------|-----|-----------|----------------|
| Borobudur | Majapahit | Adjacent to Coast | +3 Happiness, plus Food and Happiness on Quarters – it keeps Specialist-heavy Cities fed and content at once |
| Brihadeeswarar Temple | Chola | On or adjacent to a River | +3 Influence and a Happiness adjacency for Navigable Rivers on every Building in the Settlement |
| Buseoksa | Goryeo | Tropical or Grassland adjacent to a Mountain | Influence and Gold on Unique Improvements in nearby Joyous and Ecstatic Settlements |
| El Escorial | Spain | Rough | +1 Settlement Limit and +4 Happiness to Cities within 7 tiles, plus 3 Great Work slots |
| Erdene Zuu | Mongolia | Flat | Culture per Cavalry Unit trained. Niche, but banks Wildcard points in a cavalry game |
| Forbidden City | Ming China | Adjacent to a District | +4 Culture and yields on all Fortifications, plus Tourism on them here |
| Hale o Keawe | Hawai'i | Adjacent to Coast, not Tundra | +2 Culture, Culture on water Buildings, and 3 Great Work slots – display capacity is the real constraint on a Culture game |
| Havana Harbor | Republic of Pirates | Distant Lands Coast | +3 Gold and generates Treasure Convoys worth 3 Cargo |
| Himeji Castle | Sengoku Japan | Rough | Culture on Fortifications and +5 Combat Strength for Fortified Districts everywhere. Acts as a Fortified District |
| House of Wisdom | Abbasid | Adjacent to a District | ⭐ The strongest Exploration Wonder by consensus. +3 Science, a free Relic, +2 Science on every Great Work, 3 Great Work slots, and 3 Innovation. Science and Culture at once |
| Machu Pikchu | Inca | Grassland or Tropical Mountain tile | +4 Gold and Culture and Gold adjacency from Mountains for all Buildings. Turns dead terrain into yield |
| Reykjaholt | Iceland | Tundra | Production toward Military Units scaling with Great Works held, plus 3 Great Work slots |
| Rila Monastery | Bulgaria | Not adjacent to a District | A Relic every time you build a Wonder, including this one, plus 3 Great Work slots |
| Serpent Mound | Shawnee | Flat Grassland | +4 Influence and strong yields on Unique Improvements |
| Thành Huế | Dai Viet | Adjacent to Medieval Walls in a heavily walled City | +4 Culture and a Specialist Limit increase in fortified Cities |
| Tomb of Askia | Songhai | Desert | +2 Gold, +2 Resource Capacity, and yields per assigned Resource. Community favorite for free money and Production |
| White Tower | Norman | Adjacent to a City Hall | +4 Happiness per Tradition slotted in your Government – scales with a Tradition-heavy build |

### Modern Age Wonders

#### Available to everyone

| WONDER | CIV | PLACEMENT | WHAT'S NOTABLE |
|--------|-----|-----------|----------------|
| Manhattan Project | All | – | +5 Science, 3 Innovation, and unlocks Nuclear Weapons. Buildable by multiple civilizations, so it is not a race you can lose outright |
| Nirayama Reverberatory Furnace | All | Adjacent to a Mine on a Resource | +5 Production, plus large Production and Science on Mines |
| Oxford University | All | Adjacent to a District | Two free Technologies, +4 Science, a Wildcard point, and 3 Innovation. Expensive, but the free techs usually justify it |
| Taj Mahal | All | Plains | +5 Gold, +50% Celebration duration, and a Wildcard Attribute Point |
| Ubudiah Mosque | All | Wet terrain | +4 Happiness and +50% to all yields on Improvements in this Settlement |
| World's Fair | All | – | ⭐ Top pick. +6 Culture, Influence, Happiness, and Science, plus +2 Tourism on all Wonders. The single best capstone for a Wonder-heavy empire |

#### Civilization-specific

| WONDER | CIV | PLACEMENT | WHAT'S NOTABLE |
|--------|-----|-----------|----------------|
| Battersea Power Station | All | Land adjacent to Coast | +4 Production and a second Naval Unit each time you train one. Complete it before queuing an expensive fleet |
| Boudhanath | All | Grassland or Tropical adjacent to a Mountain | +6 Influence and +20 Relationship with every other leader – best before treaties and sanctions are settled |
| Brandenburg Gate | All | Adjacent to a District | ⭐ +6 Production, +1 War Support in all Wars, and +1 Settlement Limit |
| Chengde Mountain Resort | All | Adjacent to a Mountain | +6 Gold and +5% Culture per other civilization connected by your Trade Routes |
| Dogo Onsen | All | Adjacent to Coast | +4 Happiness and +1 Population in this Settlement per Celebration |
| Doi Suthep | All | Rough | +4 Influence and +5 Culture and Gold per City-State suzerainty |
| Eiffel Tower | All | Adjacent to a District | +5 Culture, plus +4 Culture and +2 Tourism on every Quarter in the City |
| Eram Garden | All | Desert | +4 Food and +1 Specialist Limit in this Settlement |
| Hermitage | All | Tundra | +4 Culture, +5 Culture in every Settlement displaying a Great Work, and 3 Great Work slots |
| Hwaseong | All | Flat adjacent to Rough | +4 Culture, a Social Policy slot and Tradition slot, and acts as a Fortified District |
| Muzibu Azaala Mpanga | All | Adjacent to a Lake | +4 Food, +4 Culture and Food on Lake Improvements and Districts, and +1 Population in lake-adjacent Settlements |
| Palacio de Bellas Artes | All | Adjacent to a District | +5 Culture, a free Artifact, 3 Great Work slots, and +3 Happiness on Great Works |
| Red Fort | All | Adjacent to a District | +4 Gold and Production, acts as a Fortified District, and grants +50 HP to itself and all City Centers |
| Statue of Liberty | All | Coast adjacent to land | +6 Happiness and spawns 4 Migrants – prepare housing or workable tiles before completion |
| Sultanahmet Camii | All | Adjacent to another Wonder | +4 Happiness and +4 Culture and Gold on local Wonders, doubled for Exploration and tripled for Antiquity Wonders |


---

## Natural Wonders

Scattered across the world, a handful of Natural Wonders Natural Wonders can be found — these are the most unique and special types of features in the game. Natural Wonders enrich the map with their distinctive appearance and thematic flair. Beyond their aesthetic and atmospheric value, they often carry powerful strategic and cultural bonuses that can significantly influence the direction of a game.

Similar to Resource Resource tiles, Natural Wonders Natural Wonders cannot have any infrastructure built on top of them, preserving their uniqueness and gameplay impact.

| Natural Wonder | Tile yields | Effects | Terrain | Size & Passability |
|---------------|-------------|---------|---------|-------------------|
| Bermuda Triangle | +2 Science, +2 Culture | +1 Science on Coastal Terrain in this Settlement. | Ocean | 3 tile (triangle), Passable |
| Grand Canyon | +2 Culture, +4 Happiness | +1 Science on Flat Terrain in this Settlement. | Rough Desert | 4 tile (diamond), Impassable |
| Great Barrier Reef | +2 Food, +2 Happiness, +2 Science | +2 Science on adjacent Marine Terrain. | Coastal Reef | 4 tile (chain), Passable |
| Great Blue Hole | +2 Science, +4 Happiness | +2 Culture on adjacent Rural Sea tiles. | Coastal adjacent to 6 Coast tiles. | 1 tile, Passable |
| Gullfoss | +6 Food | +1 Culture and Production to adjacent Rural tiles. Provides Fresh Water. | Tundra Bog | 1 tile, Impassable |
| Hoerikwaggo | +2 Culture, +4 Food | +2 Happiness on adjacent Quarters. | Mountainous Grassland | 4 tile (Y), Impassable |
| Iguazú Falls | +2 Happiness, +4 Food | +2 Production on adjacent Quarters. Provides Fresh Water. | Wet Tropical | 1 tile, Impassable |
| Machapuchare | +4 Production, +2 Culture | +1 Happiness to all Rough and Mountain Terrain in this Settlement. | Mountainous Tropical | 3 tile (triangle), Impassable |
| Mapu 'a Vaea Blowholes | +2 Production, +4 Happiness | +2 Culture to all Coastal land tiles in this Settlement. | Coastal adjacent to Cliffs. | 2 tile, Impassable |
| Mount Everest | +2 Culture, +2 Happiness, +2 Influence | Reveal all Mountains on this continent upon discovery. | Mountainous Tropical | 4 tile (diamond), Impassable |
| Mount Fuji | +2 Gold, +2 Culture, +2 Happiness | | Mountainous Volcano | 3 tile (triangle), Impassable |
| Mount Kilimanjaro | +2 Production, +4 Happiness | | Mountainous Volcano | 3 tile (triangle), Impassable |
| Nachi Falls | +6 Culture | Can purchase 2 Happiness Buildings for free per Age. | Mountainous Tropical | 4 tile (diamond), Impassable |
| Redwood Forest | +2 Food, +2 Happiness, +2 Production | +1 Science and +1 Culture to all Vegetated Terrain in this Settlement. | Vegetated Grassland | 3 tile (triangle), Passable |
| Seongsan Ilchulbong | +6 Happiness | +20% Production towards training Cavalry Units. | Coastal | 2 tile, Impassable |
| Thera | +2 Happiness, +4 Culture | | Coastal Volcano | 4 tile (diamond), Impassable |
| Torres del Paine | +2 Food, +4 Happiness | +1 Food and +1 Production on Tundra Terrain in this Settlement. | Mountainous Tundra | 3 tile (triangle), Impassable |
| Uluru | +6 Happiness | +2 Culture on Desert Terrain in this Settlement. | Rough Desert | 1 tile, Impassable |
| Valley of Flowers | +2 Food, +2 Culture, +2 Happiness | +10 Land Trade Range from this Settlement. | Flat Plains | 2 tile, Passable |
| Vihren | +4 Food, +2 Production | Additional +1 Culture and +1 Happiness per Age for every time a Disaster has provided yields in your empire. Bonus resets upon new Age. | Mountainous Plains | 3 tile (triangle), Impassable |
| Vinicunca | +2 Production, +2 Science, +2 Happiness | +2 Culture on adjacent Rural tiles in this Settlement. | Mountainous Desert | 4 tile (diamond), Impassable |
| Zhangjiajie | +2 Happiness, +4 Production | +2 Culture on Rough Terrain in this Settlement. | Mountainous Tropical | 2 tile, Impassable |

---

## Settlement Rules

The numbers that decide how a Settlement develops. Placement rules are in Exploration & Settlement; development rules are in Improving Cities & Towns.

| Rule | Value |
|------|-------|
| Maximum border radius | 3 hexes from the City Center – a hard cap, with no way to extend it |
| Border growth | Improving a tile claims it plus surrounding unowned tiles, within the 3-hex limit |
| Tile ownership | Permanent once claimed |
| Growth | Food accumulates to a threshold that rises with every citizen gained |
| Growth event options | Improve a rural tile, or place a Specialist (Cities only) |
| No room to place a citizen | A free Migrant is produced instead |
| Town Focus unlocks | At 7 Population; locked for the rest of the Age |
| Choosing a Focus | Halts Town growth; accumulated Food redistributes to connected Cities |
| Town Production | Converts entirely to Gold; no build queue, no Wonders or Projects |
| Town → City cost | Rises with the number of Cities owned; falls as the Town grows; doubled for captured Towns |
| Specialist cost | 2 / 4 / 6 Food and Happiness by Age; 1 on Warehouse or obsolete Buildings |
| Specialist yield | 100% of the adjacency of the tile's Buildings, plus flat per-Specialist bonuses; no base yield |
| Unhappiness penalty | −5% yields per point, to a maximum of −80% |
| Settlement Limit penalty | Uncapped Happiness loss per Settlement over the limit |

