import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class MovieService {
    private searchinputSource = new BehaviorSubject('blank');
    currentSearchInput = this.searchinputSource.asObservable();

    private animes: any;
    constructor(private http: HttpClient) { }

    changeSearchInput(input: string) {
        this.searchinputSource.next(input);
    }

    getAnimes(inputSearch: string, page?: number) {
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
            page: page ? page : 1
        };

        const apiURL = 'https://graphql.anilist.co';

        const body = JSON.stringify({
            query,
            variables
        });

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
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
            page: page ? page : 1
        };

        const apiURL = 'https://graphql.anilist.co';

        const body = JSON.stringify({
            query,
            variables
        });

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        };

        const res: any = await this.http.post(apiURL, body, options).toPromise();

        return res.data.Page;
    }

    getAnimeByID(searchID: number) {
        const query = `query($id: Int){
              Media (id: $id) {
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
            }`;
        const variables = {
            id: searchID
        };

        const apiURL = 'https://graphql.anilist.co';

        const body = JSON.stringify({
            query,
            variables
        });

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }
        };

        console.log("serviceID" + searchID);
        return this.http.post(apiURL, body, options);

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

