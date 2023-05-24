import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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

  call_login_google() {

    signInWithPopup(this.auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        const user = result.user;
        this.userService.user = user

        const userString = JSON.stringify(user)
        window.localStorage.setItem('user',userString)

        this.router.navigate(['/home'])

      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }

}
