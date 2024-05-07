


export type IMovie =  {
    id?: string;
    title?: string;
    vote_average?: string;
    vote_count?: string;
    release_date?: string;
    backdrop_path?: string;
    media_type?: string;
    poster_path?: string;
    overview?: string;
    production_companies?: IProductionCompanies[];
    runtime?: string | number;
    status?: boolean;
    genres?: IGenres[]
    tagline?: string;
    imdb_id?: string;
}  

export type ITrailer = {
    id?: string;
    key?: string;
}

export type IPeople = {
    id?: string;
    name?: string;
    profile_path?: string;
    character?: string;
}

export type IProductionCompanies = {
    id?: string;
    logo_path?: string;
    name?: string;
    origin_country?: string;
}
export type IGenres = {
    id: string | number;
    name?: string;
}

export type ISerieTv = {
    backdrop_path?: string;
    tagline?: string;
    number_of_seasons?: string;
    number_of_episodes?: string;
    first_air_date?: string;
    genres?: IGenres[];
    id?: string;
    name?: string;
    original_name?: string;
    overview?: string;
    popularity?: string;
    poster_path?: string;
    media_type?: string;
    vote_average?: string;
    vote_count?: string;
    production_companies?: IProductionCompanies[];
    seasons?: ISeasons[];
    imdb_id?: string
}

export type ISeasons = {
    air_date?: string;
    episode_count?: number;
    id?: string;
    name?: string
    overview?: string;
    poster_path?: string;
    serie_id?: string;
    season_number?: string;
    vote_average?: string;
    episodes?: IEpisodes[];
    imdb_id?: string
}

export type IEpisodes = {
    air_date?: string;
    crew?: string;
    episode_number?: string; 
    episode_type?: string;
    guest_stars?: string;
    id?: string;
    name?: string;
    overview?: string;
    production_code?: string;
    runtime?: string;
    season_number?: string;
    show_id?: string;
    still_path?: string;
    imdb_id?: string
}


export type ICredits = {
    id?: string;
    name?: string;
    profile_path?: string;
    character?: string;
}

export type IInputSearch = {
    placeholder: string;
    value?: string;
    onchange: (e: string) => void;
    onclick?: () => void;  
}

export type IProvider = {
    provider_id?: string;
    provider_name?: string;
    logo_path?: string;
}

export type IListMovie = {
    nameList?: string;
    children?: React.ReactNode;
};

export type ICardMovie = {
    id?: string;
    title?: string;
    vote_average?: string;
    date_release?: string;
    poster?: string;
}