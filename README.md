# Wiefran Varenzo — Portfolio

A lightweight bilingual portfolio designed for fast recruiter scanning. Version one is designed for Firebase's no-cost Spark plan, without Cloud Storage or Cloud Run.

## Preview

Run `npm start`, then open `http://localhost:4173`.

## Deploy to Google Cloud

Use Firebase Hosting with `firebase deploy --only hosting,firestore`. The included configuration provides clean URLs, basic security headers, Firestore rules, and indexes. The Spark plan requires no billing account.

## Portfolio Studio

The Studio owner sign-in is ready at `/studio/` and uses Firebase Authentication email/password. There is no public registration. Before production:

1. Create one owner account in Firebase Authentication.
2. Paste the Firebase Web App values into `studio/firebase-config.js`.
3. Replace `REPLACE_WITH_OWNER_UID` in `firestore.rules` with that account's UID.
4. Deploy Hosting and Firestore rules.

Cloud Storage is deliberately not used. Images remain versioned website assets, keeping the project eligible for Spark with no billing account. Studio content fields can live in Firestore; adding or replacing media remains a deployment action in version one.

## Content notes

- English is the default; the ID/EN control stores the visitor preference locally.
- Light is the default; the theme control stores the preference locally.
- Project previews use two-image hover transitions instead of large video files.
- No resume file existed in the source project, so the public site offers an email request instead of publishing a broken download link. Add a current PDF before deployment.
