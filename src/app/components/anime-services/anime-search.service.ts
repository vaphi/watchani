import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  private searchinputSource = new BehaviorSubject('blank');
  currentSearchInput = this.searchinputSource.asObservable();

  private animes: any;
  constructor(private http: HttpClient) {}

  changeSearchInput(input: string) {
    this.searchinputSource.next(input);
  }

  async getAnimes(inputSearch: string, page?: number) {
    let animes: any;
    const query = `query($search: String, $page: Int){
            Page (page: $page) {
              pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
              }
              media (search: $search, isAdult: false) {
                id
      			status
      			averageScore
      			episodes
                type
                genres
                title {
                  english,
                  native,
                  romaji
                }
      			description
      			status
      			coverImage {
      			extraLarge
      			large
      			medium
      			color
      			}
              }
            }
          }`;
    const variables = {
      search: inputSearch,
      page: page ? page : 1,
    };

    const apiURL = 'https://graphql.anilist.co';

    const body = JSON.stringify({
      query,
      variables,
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    return this.http.post(apiURL, body, options);
  }

  async getAnimePages(inputSearch: string, page?: number) {
    let animes: any;
    const query = `query($search: String, $page: Int){
            Page (page: $page) {
              pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
              }
              media (search: $search, isAdult: false) {
                id
      			status
      			averageScore
      			episodes
                type
                genres
                title {
                  english,
                  native,
                  romaji
                }
      			description
      			status
      			coverImage {
      			extraLarge
      			large
      			medium
      			color
      			}
              }
            }
          }`;
    const variables = {
      search: inputSearch,
      page: page ? page : 1,
    };

    const apiURL = 'https://graphql.anilist.co';

    const body = JSON.stringify({
      query,
      variables,
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    const res: any = await this.http.post(apiURL, body, options).toPromise();

    return res.data.Page;
  }

  getAnimeByID(searchID: number) {
    const query = this.getAnimeSearchByIdQuery();
    const variables = {
      id: searchID,
    };

    const apiURL = 'https://graphql.anilist.co';

    const body = JSON.stringify({
      query,
      variables,
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    console.log('serviceID' + searchID);
    return this.http.post(apiURL, body, options);
  }

  getRandomAnime(page: number) {
    let animes: any;
    const query = `query($page: Int){
            Page (page: $page) {
              pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
              }
              media (isAdult: false, type: ANIME) {
                id
                status
                averageScore
                bannerImage
                episodes
                type
                genres
                startDate {
                  year
                  month
                  day
                }
                endDate {
                  year
                  month
                  day
                }
                title {
                  english,
                  native,
                  romaji
                }
      			    description
      			    status
                coverImage {
                  extraLarge
                  large
                  medium
                  color
                }
      		      studios {
      		        nodes{
                    name
                  }
      		      }
                characters{
                  nodes{
                    name {
                      first
                      middle
                      last
                      full
                    }
                    gender
                    dateOfBirth {
                      year
                      month
                      day
                    }
                    age
                    image {
                      large
                      medium
                    }
                  }
                }
                trailer{
                  id
                  site
                  thumbnail
                }
                recommendations{
                  nodes{
                    id
                    media {
                      id
                    }
                    mediaRecommendation {
                      id
                      status
                      averageScore
                      bannerImage
                      episodes
                          type
                          genres
                          title {
                            english,
                            native,
                            romaji
                          }
                      description
                      status
                      coverImage {
                      extraLarge
                      large
                      medium
                      color
                      }
                    }
                  }
                }
              }
            }
          }`;
    const variables = {
      page: page ? page : 1,
    };

    const apiURL = 'https://graphql.anilist.co';

    const body = JSON.stringify({
      query,
      variables,
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    return this.http.post(apiURL, body, options);
  }

  getRandomManga(page: number) {
    let animes: any;
    const query = `query($page: Int){
            Page (page: $page) {
              pageInfo {
                total
                currentPage
                lastPage
                hasNextPage
                perPage
              }
              media (isAdult: false, type: MANGA) {
                id
                status
                averageScore
                bannerImage
                episodes
                type
                genres
                startDate {
                  year
                  month
                  day
                }
                endDate {
                  year
                  month
                  day
                }
                title {
                  english,
                  native,
                  romaji
                }
      			    description
      			    status
                coverImage {
                  extraLarge
                  large
                  medium
                  color
                }
      		      studios {
      		        nodes{
                    name
                  }
      		      }
                characters{
                  nodes{
                    name {
                      first
                      middle
                      last
                      full
                    }
                    gender
                    dateOfBirth {
                      year
                      month
                      day
                    }
                    age
                    image {
                      large
                      medium
                    }
                  }
                }
                trailer{
                  id
                  site
                  thumbnail
                }
                recommendations{
                  nodes{
                    id
                    media {
                      id
                    }
                    mediaRecommendation {
                      id
                      status
                      averageScore
                      bannerImage
                      episodes
                          type
                          genres
                          title {
                            english,
                            native,
                            romaji
                          }
                      description
                      status
                      coverImage {
                      extraLarge
                      large
                      medium
                      color
                      }
                    }
                  }
                }
              }
            }
          }`;
    const variables = {
      page: page ? page : 1,
    };

    const apiURL = 'https://graphql.anilist.co';

    const body = JSON.stringify({
      query,
      variables,
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    return this.http.post(apiURL, body, options);
  }

  getTop100Animes(page: number) {
    let animes: any;
    const query = `query($page: Int){
      Page (page: $page) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (isAdult: false, type: ANIME, sort: SCORE_DESC) {
          id
      status
      averageScore
      episodes
          type
          genres
          title {
            english,
            native,
            romaji
          }
      description
      status
      coverImage {
      extraLarge
      large
      medium
      color
      }
        }
      }
    }`;
    const variables = {
      page: page ? page : 1,
    };

    const apiURL = 'https://graphql.anilist.co';

    const body = JSON.stringify({
      query,
      variables,
    });

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    return this.http.post(apiURL, body, options);
  }

  private getAnimeSearchByIdQuery() {
    return `query($id: Int){
            Media(id: $id) {
                id
                averageScore
                season
                seasonYear
                status
                episodes
                type
                volumes
                chapters
                genres
                description
                status
                bannerImage
                studios {
                  nodes{
                    name
                  }
                }
                characters {
                  nodes {
                    id
                    dateOfBirth {
                      year
                      month
                      day
                    }
                    name {
                      first
                      middle
                      last
                      full
                      native
                      userPreferred
                    }
                    gender
                    image {
                      large
                      medium
                    }
                  }
                }
                startDate {
                  year
                  month
                  day
                }
                endDate {
                  year
                  month
                  day
                }
                title {
                  english
                  native
                  romaji
                }
                coverImage {
                  extraLarge
                  large
                  medium
                  color
                }
                characters{
                  nodes{
                    name {
                      first
                      middle
                      last
                      full
                    }
                    gender
                    dateOfBirth {
                      year
                      month
                      day
                    }
                    age
                    image {
                      large
                      medium
                    }
                  }
                }
                trailer{
                  id
                  site
                  thumbnail
                }
                recommendations{
                  nodes{
                    id
                    mediaRecommendation {
                      id
                      status
                      averageScore
                      bannerImage
                      episodes
                          type
                          genres
                          title {
                            english,
                            native,
                            romaji
                          }
                      description
                      status
                      coverImage {
                      extraLarge
                      large
                      medium
                      color
                    }
                    }
                  }
                }
              }
            }`;
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
