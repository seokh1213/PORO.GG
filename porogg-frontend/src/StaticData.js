import championJSON from './static/json/champion.json';
import itemJSON from './static/json/item.json';
import mapJSON from './static/json/map.json';
import runesReforgedJSON from './static/json/runesReforged.json';
import summonerJSON from './static/json/summoner.json';

const VERSION='10.4.1';
export const NORMAL_IMAGE_URL="https://www.pngkey.com/png/full/280-2801795_cartoon-tongue-png.png";
export const ERROR_IMAGE_URL="https://www.pngkey.com/png/full/43-431793_shock-emoji-png.png";
export const TIER_IMG=(tier, rank)=>`https://opgg-static.akamaized.net/images/medals/${tier}_${rank}.png`;
export const UNRANKED_IMG='https://opgg-static.akamaized.net/images/medals/default.png';
export const PROFILE_ICON_URL=iconId=>`http://ddragon.leagueoflegends.com/cdn/${VERSION}/img/profileicon/${iconId}.png`;
export const CHAMPION_TILE_URL=championName=>`http://ddragon.leagueoflegends.com/cdn/${VERSION}/img/champion/${championName}.png`;
export const CHAMPION_INFO_URL=`http://ddragon.leagueoflegends.com/cdn/${VERSION}/data/ko_KR/champion.json`;
export const SPELL_URL=spellName=>`http://ddragon.leagueoflegends.com/cdn/${VERSION}/img/spell/${spellName}.png`;
export const RUNE_URL=runePath=>`http://ddragon.leagueoflegends.com/cdn/img/${runePath}`;
export const MAP_URL=mapId=>`http://ddragon.leagueoflegends.com/cdn/${VERSION}/img/map/map${mapId}.png`;
export const ITEM_URL=itemId=>`http://ddragon.leagueoflegends.com/cdn/${VERSION}/img/item/${itemId}.png`;

export const CHAMPION_MAP=championJSON.data;
export const ITEM_MAP=itemJSON.data;
export const MAP_MAP=mapJSON.data;
export const RUNE_MAP=runesReforgedJSON;
export const SPELL_MAP=summonerJSON.data;