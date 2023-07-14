import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData {
    kind: string;
    email: string;
    idToken: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered? : boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new Subject<User>();

    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA1EPumu3rBweTPgl92V8IAxYdPkkp3IVw',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(responseData => {
            this.handleAuthentication(
                responseData.email,
                responseData.localId,
                responseData.idToken,
                +responseData.expiresIn)
        })
        );
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA1EPumu3rBweTPgl92V8IAxYdPkkp3IVw',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(responseData => {
            this.handleAuthentication(
                responseData.email,
                responseData.localId,
                responseData.idToken,
                +responseData.expiresIn)
        })
        );
    }

    private handleAuthentication(email: string, userId: string, tokenId: string, expiresIn: number) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );
        const user = new User(
            email, 
            userId, 
            tokenId, 
            expirationDate
        );
        this.user.next(user);
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured.';
        if(!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        } 
        switch(errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct';
                break;
        }
        return throwError(errorMessage);
    }
        
}
