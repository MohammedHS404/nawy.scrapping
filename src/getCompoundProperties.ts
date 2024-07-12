export async function getCompoundProperties(compoundIds: number[], primary_start: number = 1): Promise<PropertyFromList[]> {
    console.log(`Fetching properties for compounds at primary_start: ${primary_start}`);

    const compoundPropertiesResponse: Root = await fetch("https://webapi.cooingestate.com/api/properties/compound_page_search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            show: "property",
            compounds_ids:
                compoundIds,
            "primary_start": primary_start,
            "resale_start": primary_start
        })
    })
        .then((response) => response.json());

    console.log(`${compoundPropertiesResponse.primary.values.length}/${compoundPropertiesResponse.primary.total_properties}`)
    if (compoundPropertiesResponse.primary.values.length === 0) {
        return [];
    }

    const props = await getCompoundProperties(compoundIds, primary_start + 12)

    return [...compoundPropertiesResponse.primary.values, ...props]
}


export interface Root {
    primary: Primary
    resale: Resale
    search_tracking_msg: string
}

export interface Primary {
    total_compounds: number
    total_properties: number
    total_property_groups: number
    property_types: PropertyType[]
    values: PropertyFromList[]
    seo_backlinks: SeoBacklink[]
}

export interface PropertyType {
    id: number
    count: number
}

export interface PropertyFromList {
    id: number
    slug: string
    name: string
    property_type: PropertyType2
    compound: Compound
    area: Area
    developer: Developer
    image: string
    finishing: string
    min_unit_area: number
    max_unit_area: number
    min_price: number
    max_price: number
    currency: string
    max_installment_years: number
    min_installments: number
    min_down_payment: number
    number_of_bathrooms: number
    number_of_bedrooms: number
    min_ready_by: string
    sponsored: number
    new_property: boolean
    company: any
    resale: boolean
    financing: boolean
    type: string
    has_offers: boolean
    offer_title: string
    limited_time_offer: boolean
    in_quick_search: number
    recommended: any
    manual_ranking: any
    completeness_score: number
    favorite: boolean
    ranking_type: string
    recommended_financing: number
    property_ranking: number
    compound_ranking: number
    tags: any[]
}

export interface PropertyType2 {
    id: number
    name: string
    manual_ranking: number
}

export interface Compound {
    id: number
    lat: number
    long: number
    name: string
    slug: string
    sponsored: number
    nawy_organization_id: any
}

export interface Area {
    id: number
    name: string
}

export interface Developer {
    id: number
    name: string
    slug: string
    logo_path: string
}

export interface SeoBacklink {
    name: string
    slug: string
}

export interface Resale {
    total_compounds: number
    total_properties: number
    total_property_groups: number
    property_types: PropertyType[]
    values: PropertyFromList[]
    seo_backlinks: SeoBacklink[]
}