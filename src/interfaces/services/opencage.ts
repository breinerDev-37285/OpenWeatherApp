export interface IOpenCage {
  documentation?: string;
  licenses?: License[];
  rate?: Rate;
  results?: Result[];
  status?: Status;
  stay_informed?: StayInformed;
  thanks?: string;
  timestamp?: Timestamp;
  total_results?: number;
}

export interface License {
  name?: string;
  url?: string;
}

export interface Rate {
  limit?: number;
  remaining?: number;
  reset?: number;
}

export interface Result {
  annotations: Annotations;
  bounds: Bounds;
  components: Components;
  confidence: number;
  formatted: string;
  geometry: Geometry;
}

export interface Annotations {
  DMS?: Dms;
  MGRS?: string;
  Maidenhead?: string;
  Mercator?: Mercator;
  NUTS?: Nuts;
  OSM?: Osm;
  UN_M49?: UnM49;
  callingcode?: number;
  currency?: Currency;
  flag?: string;
  geohash?: string;
  qibla?: number;
  roadinfo?: Roadinfo;
  sun?: Sun;
  timezone?: Timezone;
  what3words?: What3Words;
  wikidata?: string;
}

export interface Dms {
  lat?: string;
  lng?: string;
}

export interface Mercator {
  x?: number;
  y?: number;
}

export interface Nuts {
  NUTS0?: NUTS0Class;
  NUTS1?: NUTS0Class;
  NUTS2?: NUTS0Class;
  NUTS3?: NUTS0Class;
}

export interface NUTS0Class {
  code?: string;
}

export interface Osm {
  edit_url?: string;
  note_url?: string;
  url?: string;
}

export interface UnM49 {
  regions?: Regions;
  statistical_groupings?: StatisticalGrouping[];
}

export interface Regions {
  ES?: string;
  EUROPE?: string;
  SOUTHERN_EUROPE?: string;
  WORLD?: string;
  AMERICAS?: string;
  EC?: string;
  LATIN_AMERICA?: string;
  SOUTH_AMERICA?: string;
  VE?: string;
  CENTRAL_AMERICA?: string;
  MX?: string;
  CARIBBEAN?: string;
  CU?: string;
  ASIA?: string;
  PH?: string;
  SOUTHEAST_ASIA?: string;
}

export type StatisticalGrouping = "LEDC" | "MEDC" | "SIDS";

export interface Currency {
  alternate_symbols?: string[];
  decimal_mark?: DecimalMark;
  html_entity?: string;
  iso_code?: string;
  iso_numeric?: string;
  name?: string;
  smallest_denomination?: number;
  subunit?: Subunit;
  subunit_to_unit?: number;
  symbol?: string;
  symbol_first?: number;
  thousands_separator?: DecimalMark;
  disambiguate_symbol?: string;
  format?: string;
}

export enum DecimalMark {
  DecimalMark = ".",
  Empty = ",",
}

export enum Subunit {
  Cent = "Cent",
  Centavo = "Centavo",
  Céntimo = "Céntimo",
}

export interface Roadinfo {
  drive_on?: DriveOn;
  speed_in?: SpeedIn;
}

export enum DriveOn {
  Right = "right",
}

export enum SpeedIn {
  KMH = "km/h",
}

export interface Sun {
  rise?: Rise;
  set?: Rise;
}

export interface Rise {
  apparent?: number;
  astronomical?: number;
  civil?: number;
  nautical?: number;
}

export interface Timezone {
  name?: string;
  now_in_dst?: number;
  offset_sec?: number;
  offset_string?: string;
  short_name?: string;
}

export interface What3Words {
  words?: string;
}

export interface Bounds {
  northeast?: Geometry;
  southwest?: Geometry;
}

export interface Geometry {
  lat: number;
  lng: number;
}

export interface Components {
  "ISO_3166-1_alpha-2"?: string;
  "ISO_3166-1_alpha-3"?: string;
  "ISO_3166-2"?: string[];
  _category?: Category;
  _normalized_city?: string;
  _type?: string;
  continent?: string;
  country?: string;
  country_code?: string;
  political_union?: string;
  postcode?: string;
  province?: string;
  state?: string;
  state_code?: string;
  village?: string;
  county?: string;
  municipality?: string;
  hamlet?: string;
  city?: string;
  town?: string;
  peak?: string;
  city_district?: string;
  suburb?: string;
  region?: string;
}

export enum Category {
  NaturalWater = "natural/water",
  Place = "place",
}

export interface Status {
  code?: number;
  message?: string;
}

export interface StayInformed {
  blog?: string;
  mastodon?: string;
}

export interface Timestamp {
  created_http?: string;
  created_unix?: number;
}
