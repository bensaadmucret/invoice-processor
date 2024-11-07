import nspell from 'nspell';

let spellChecker: nspell | null = null;

// Fonction pour charger le dictionnaire en utilisant fetch
const loadDictionary = async (): Promise<nspell | null> => {
  try {
    // Chemins d'accès aux fichiers du dictionnaire
    const affResponse = await fetch('/dictionary-fr/index.aff');
    const dicResponse = await fetch('/dictionary-fr/index.dic');
    
    if (!affResponse.ok || !dicResponse.ok) {
      console.error('Erreur lors du chargement des fichiers du dictionnaire.');
      return null;
    }

    const aff = await affResponse.text();
    const dic = await dicResponse.text();
    return nspell({ aff, dic });
  } catch (error) {
    console.error('Erreur lors du chargement du dictionnaire :', error);
    return null;
  }
};

// Initialisation du dictionnaire au démarrage de l'application
(async () => {
  spellChecker = await loadDictionary();
})();

// Fonction de correction orthographique
export const correctText = (text: string): string => {
  if (!spellChecker) {
    console.warn('SpellChecker n\'est pas encore initialisé.');
    return text;
  }

  return text.split(/\s+/).map(word => {
    if (spellChecker.correct(word)) return word;
    const suggestions = spellChecker.suggest(word);
    return suggestions.length > 0 ? suggestions[0] : word;
  }).join(' ');
};
