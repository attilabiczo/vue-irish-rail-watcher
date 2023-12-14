import { xml2js } from "xml-js";
import type { StationType, StationsType, RawStation, RawStations, RawStationDataType, RawStationType } from "@/types"

export function convertStation(inputXmlData: string): StationType[] {
    const stationDataRawObject: RawStation = xml2js(inputXmlData, {compact: true}) as RawStation;

    let stationDataObject: RawStationDataType[] = stationDataRawObject.ArrayOfObjStationData.objStationData;

    if(!Array.isArray(stationDataObject)) {
        stationDataObject = [stationDataObject]
    }

    return stationDataObject.map((station: RawStationDataType) => {
        return {
            name: station.Stationfullname['_text'],
            destination: station.Destination['_text'],
            dueIn: Number(station.Duein['_text']),
            direction: station.Direction['_text'],
            directionShort: station.Direction['_text'][0]
        }
    });
}

export function convertStations(inputXmlData: string): StationsType[] {
    const allStationsRawObject: RawStations = xml2js(inputXmlData, {compact: true}) as RawStations;

    const allStationsObject: RawStationType[] = allStationsRawObject.ArrayOfObjStation.objStation;
    return allStationsObject.map((station: RawStationType) => {
        return {
            title: station.StationDesc['_text'],
            id: station.StationCode['_text']
        }
    });
}

export function removeItemFromArray(inputArray: string[], itemToRemove: string): string[] {
    const copyStations: string[] = [...inputArray];
    const indexOfStation: number = copyStations.indexOf(itemToRemove);

    copyStations.splice(indexOfStation, 1);

    return copyStations;
}