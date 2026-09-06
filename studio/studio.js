const form=document.querySelector('#login-form');
const note=document.querySelector('#auth-note');
const button=document.querySelector('#sign-in');
const config=window.PORTFOLIO_FIREBASE_CONFIG;
const configured=config&&config.apiKey&&!config.apiKey.startsWith('REPLACE_');
if(!configured)note.classList.add('show');

form.addEventListener('submit',async(event)=>{
  event.preventDefault();
  if(!configured){note.textContent='Owner login is ready, but the Firebase project configuration has not been added yet.';note.classList.add('show');return}
  button.disabled=true;button.textContent='Signing in…';note.classList.remove('show');
  try{
    const [{initializeApp},{getAuth,signInWithEmailAndPassword}]=await Promise.all([
      import('https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js')
    ]);
    const auth=getAuth(initializeApp(config));
    await signInWithEmailAndPassword(auth,form.email.value,form.password.value);
    note.textContent='Signed in. The content workspace will open after Firestore is connected.';note.classList.add('show');
  }catch(error){
    note.textContent=error?.code==='auth/invalid-credential'?'Email or password is incorrect.':'Sign-in could not be completed. Please try again.';note.classList.add('show');
  }finally{button.disabled=false;button.textContent='Sign in securely'}
});
