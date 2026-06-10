import { redirect } from 'next/navigation';

// /aerzte hat keine eigene Übersicht — die Sektion-Übersicht ist /promi-aerzte
// (verlinkt auf die Personen-Hubs /aerzte/{slug}). Konsolidiert auf eine Listing-URL
// (keine Cannibalization), verhindert 404 auf der nackten /aerzte-Ebene.
export default function AerzteIndex() {
  redirect('/promi-aerzte');
}
