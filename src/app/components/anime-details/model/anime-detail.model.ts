export interface AnimeDetailsModel {
    id: number;
    averageScore: number;
    season: string;
    seasonYear: number;
    status: string;
    episodes: number;
    type: string;
    volumes: number;
    chapters: number;
    genres: string;
    description: string;
    studios: Studios[];
    characters: Characters[];
    startDate: DetailDate;
    endDate: DetailDate;
    title: animeTitle;
    coverImage: AnimeCoverImage;
}

export interface Studios {
    nodes: StudioNodes
}

export interface StudioNodes {
    name: CharacterName;
    isAnimationStudio: boolean;

}

export interface Characters {
    nodes: CharacterNodes
}

export interface CharacterNodes {
    id: string;
    dateOfBirth: DetailDate;
    gender: string;
    iamge: CharacterImage;
}

export interface CharacterName {
    full: string;
}

export interface CharacterImage {
    large: string;
    medium: string;
}

export interface DetailDate {
    year: number;
    month: number;
    day: number;
}

export interface animeTitle {
    english: string;
    native: string;
    romaji: string;
}

export interface AnimeCoverImage {
    extraLarge: string;
    large: string;
    medium: string;
    color: string;
}