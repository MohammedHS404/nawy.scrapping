
export async function getCompoundIds() {
    const compoundsResponse: CompoundResponse = await fetch("https://webapi.cooingestate.com/api/properties/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ show: "compound" })
    })
        .then((response) => response.json());

    const compoundIds = new Set(compoundsResponse.values.map((compound) => compound.id));

    return compoundIds;
}


export interface CompoundResponse {
    total_compounds: number;
    total_properties: number;
    total_property_groups: number;
    property_types: PropertyType[];
    amenities: Amenity[];
    values: Value[];
    seo_backlinks: SeoBacklink[];
    search_tracking_msg: string;
}

export interface PropertyType {
    id: number;
    count: number;
}

export interface Amenity {
    id: number;
    count: any;
}

export interface Value {
    id: number;
    name: string;
    is_super: boolean;
    slug: string;
    properties_count: number;
    image: string;
    min_price: number;
    max_price: number;
    min_unit_area: number;
    max_unit_area: number;
    available_bathrooms: number[];
    available_bedrooms: number[];
    currency: string;
    developer: Developer;
    area: Area;
    sponsored: number;
    max_installment_years: number;
    min_down_payment: number;
    min_ready_by: string;
    properties_ids: number[];
    sum_10_properties_min_price: number;
    lat: number;
    long: number;
    has_offer: boolean;
    has_launches: boolean;
    is_launch: boolean;
    offer_title: string;
    limited_time_offer: boolean;
    property_types: string[];
    advertising_image_path?: string;
    nawy_organization_id: any;
    livable: any;
    property_types_count: PropertyTypesCount[];
    favorite: boolean;
    property_types_count_highlighted: PropertyTypesCountHighlighted;
}

export interface Developer {
    id: number;
    name: string;
    logo_path: string;
}

export interface Area {
    id: number;
    name: string;
    slug: string;
}

export interface PropertyTypesCount {
    id: number;
    name: string;
    count: number;
    total: number;
    rank: number;
}

export interface PropertyTypesCountHighlighted {
    highlighted: any[];
    rest: Rest[];
}

export interface Rest {
    id: number;
    name: string;
    count: number;
    total: number;
    rank: number;
}

export interface SeoBacklink {
    name: string;
    slug: string;

}
