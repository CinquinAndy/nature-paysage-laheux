// Palette de couleurs pastel/sobre pour les communes
// Utilise des couleurs douces et harmonieuses
export const COMMUNE_COLORS: Record<string, string> = {
	// Verts pastel
	"44100": "#86efac", // Monnières - Vert clair
	"44117": "#a7f3d0", // Le Pallet - Vert menthe
	"44070": "#bbf7d0", // La Haie-Fouassière - Vert pâle

	// Bleus pastel
	"44071": "#93c5fd", // Haute-Goulaine - Bleu ciel
	"44009": "#bfdbfe", // Basse-Goulaine - Bleu très clair
	"44215": "#a5f3fc", // Vertou - Cyan pastel
	"44169": "#7dd3fc", // Saint-Julien-de-Concelles - Bleu turquoise

	// Violets/Roses pastel
	"44062": "#d8b4fe", // Gorges - Violet pastel
	"44176": "#e9d5ff", // Saint-Fiacre-sur-Maine - Mauve clair
	"44142": "#f0abfc", // La Regrippière - Rose-violet

	// Oranges/Jaunes pastel
	"44043": "#fdba74", // Clisson - Orange pastel
	"44037": "#fcd34d", // La Chapelle-Heulin - Jaune doux
	"44079": "#fde68a", // Le Landreau - Jaune pâle
	"44212": "#fed7aa", // Vallet - Pêche
	"44108": "#fbbf24", // Mouzillon - Ambre clair

	// Roses pastel
	"44038": "#fbcfe8", // Château-Thébaud - Rose clair
	"44002": "#fda4af", // Aigrefeuille-sur-Maine - Rose saumon
	"44177": "#f9a8d4", // Saint-Lumine-de-Clisson - Rose bonbon

	// Autres couleurs pastel
	"44061": "#c4b5fd", // Gétigné - Indigo pastel
	"44205": "#a5b4fc", // Tillières - Bleu indigo
	"44143": "#cbd5e1", // Remouillé - Gris bleuté
	"44217": "#d4d4d8", // Vieillevigne - Gris clair
	"44102": "#e4e4e7", // Montbert - Gris très clair
}

export function getCommuneColor(code: string): string {
	return COMMUNE_COLORS[code] || "#86efac"
}
