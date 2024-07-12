import { readFile, writeFile } from "fs/promises";
import { getCompoundProperties, PropertyFromList } from "./getCompoundProperties";

async function main() {
    // const compoundIds = await getCompoundIds();

    // console.log(compoundIds);

    // const compoundIds = [274,202];

    // const compoundProperties = await getCompoundProperties(Array.from(compoundIds));

    // console.log(compoundProperties.length);

    // const json = JSON.stringify(compoundProperties);

    // await writeFile("compoundProperties.json", json);

    const compoundPropertiesJson:string = await readFile("compoundProperties.json", "utf-8");

    const compoundProperties: PropertyFromList[] = JSON.parse(compoundPropertiesJson);

    const promisesFullProperties = compoundProperties.map(async (property: PropertyFromList) => getFullProperty(property.slug, property.compound.slug));

    const fullProperties = await Promise.all(promisesFullProperties);

    console.log(fullProperties.length);

    const json = JSON.stringify(fullProperties);

    await writeFile("fullProperties.json", json);
}

async function getFullProperty(propertySlug: string, compoundSlug: string) {
    console.log(`Fetching full property for ${compoundSlug}/${propertySlug}`);
    const myHeaders = new Headers();

    const requestOptions = {
        method: "GET",
    };

    console.log()
    const result = await fetch(`https://www.nawy.com/_next/data/Ov_BuWs30pDG-zUpBJSjL/en/compound/${compoundSlug}/property/${propertySlug}.json`, requestOptions)
        .then((result) => result.json())

    console.log(`Fetched full property for ${compoundSlug}/${propertySlug}`);

    return result.pageProps.property;
}

main();
