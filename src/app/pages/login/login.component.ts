import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, getRedirectResult, signInWithRedirect } from "firebase/auth";
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { getDatabase, push, ref, set } from 'firebase/database';

const provider = new GoogleAuthProvider();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    window.localStorage.removeItem('user')
  }

  firebaseConfig = {
    apiKey: "AIzaSyD8rRQBvcR97vfG2QagXHZunKp3pTWdRYU",
    authDomain: "atmosapp-b42d9.firebaseapp.com",
    projectId: "atmosapp-b42d9",
    storageBucket: "atmosapp-b42d9.appspot.com",
    messagingSenderId: "170212286005",
    appId: "1:170212286005:web:32a2ee3e41625c5018db7c",
    measurementId: "G-M3GGYXNDT9",
    databaseURL: "https://atmosapp-b42d9-default-rtdb.europe-west1.firebasedatabase.app/"

  };
  app = initializeApp(this.firebaseConfig);
  analytics = getAnalytics(this.app);
  auth = getAuth();
  
  database = getDatabase(this.app)


  constructor(private userService: UserService, private router: Router) { }

  loginDesactivado() {
    alert('El inicio de sesión por correo electrónico está desactivado por el momento. Prueba a través de Google.')
  }
  call_login_google() {

    signInWithPopup(this.auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        // The signed-in user info.
        const user = result.user;
        this.userService.user = user

        const userString = JSON.stringify(user)
        window.localStorage.setItem('user',userString)

        this.router.navigate(['/home'])

      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }

}
