
/* Form fields */
export interface ProfileProps {
    profileId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    middleName?: string;
    pictureUrl?: string;
    birthDate?: string;
    phone?: string;
    address1?: string;
    address2?: string;
    city?: string;
    stateCode?: string;
    countryCode?: string;
    postalCode?: string;
}

/* Return payload */
export interface Profile {
    userId?: string;
    profileId?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    email?: string;
    pictureUrl?: string;
    companyName?: string;
    birthDate?: string;
    phone?: string;
    address1?: string;
    address2?: string;
    city?: string;
    stateCode?: string;
    website?: string;
    countryCode?: string;
    postalCode?: string;
    createdWhen?: string;
    lastEditedWhen?: string;
}
