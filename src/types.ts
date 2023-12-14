import type { Element } from "xml-js";

export interface StationCardProps {
    stationId: string,
    stationName: string,
    isFavourite: boolean,
    directions: string[]
}

export interface StationCardEmitType {
    station: string, 
    isFavourite: boolean
}

export interface RawStationItemType {
    _text: string
}

/** convertStation types **/
export interface RawStation extends Element {
    ArrayOfObjStationData: ArrayOfObjStationDataType
}

export interface ArrayOfObjStationDataType {
    objStationData: RawStationDataType[]
}

export interface RawStationDataType {
    Stationfullname: RawStationItemType,
    Destination: RawStationItemType,
    Duein: RawStationItemType,
    Direction: RawStationItemType
}

export interface StationType {
    name: string,
    destination: string,
    dueIn: number,
    direction: string,
    directionShort: string
}
/** **/

/** convertStations types **/
export interface RawStations extends Element {
    ArrayOfObjStation: ArrayOfObjStationType
}

export interface ArrayOfObjStationType {
    objStation: RawStationType[]
}

export interface RawStationType {
    StationDesc: RawStationItemType,
    StationCode: RawStationItemType
}

export interface StationsType {
    title: string,
    id: string
}
/** **/

