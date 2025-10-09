export interface FaqItem {
	id: string
	question: string
	answer: string
	category?: string
}

export const FAQ_SHORT: FaqItem[] = [
	{
		id: 'credit-impot',
		question: "Suis-je éligible au crédit d'impôt ?",
		answer:
			'Oui ! Que vous soyez imposable ou non. Même les non-imposables reçoivent un remboursement du Trésor Public.',
	},
	{
		id: 'produits-chimiques',
		question: 'Utilisez-vous des produits chimiques ?',
		answer: 'Non. Je travaille exclusivement avec des méthodes naturelles et des produits organiques.',
	},
	{
		id: 'devis-gratuit',
		question: 'Le devis est-il gratuit ?',
		answer: 'Oui, totalement gratuit et sans engagement. Je me déplace pour évaluer vos besoins.',
	},
	{
		id: 'delais',
		question: 'Quels sont les délais ?',
		answer: "Je réponds sous 48h et planifie l'intervention selon vos disponibilités et les besoins de votre jardin.",
	},
]

export const FAQ_FULL: FaqItem[] = [
	// CRÉDIT D'IMPÔT
	{
		id: 'comment-credit-impot',
		question: "Comment fonctionne le crédit d'impôt de 50% ?",
		answer:
			"Le crédit d'impôt Services à la Personne vous permet de récupérer 50% des sommes versées pour l'entretien de votre jardin.\n\nConcrètement :\n• Vous me payez le montant de la prestation\n• L'année suivante, lors de votre déclaration d'impôt, vous déclarez cette somme\n• L'État vous rembourse 50% (soit par réduction d'impôt, soit par virement si vous n'êtes pas imposable)\n\nExemple : Prestation de 200€ → Vous déclarez 200€ → Vous récupérez 100€ → Coût réel : 100€\n\nPlafond : 5 000€ de dépenses par an maximum = 2 500€ de crédit d'impôt maximum",
		category: 'credit-impot',
	},
	{
		id: 'eligible-credit-impot',
		question: "Suis-je éligible au crédit d'impôt ?",
		answer:
			"OUI si :\n✓ Vous êtes fiscalement domicilié en France\n✓ Les travaux sont réalisés à votre résidence (principale ou secondaire)\n✓ Les prestations sont éligibles au régime Services à la Personne\n\nBon à savoir :\n• Imposable ou non-imposable : tout le monde en bénéficie\n• Les non-imposables reçoivent un remboursement direct\n• Aucune condition d'âge ou de revenus\n• Valable pour propriétaires ET locataires",
		category: 'credit-impot',
	},
	{
		id: 'prestations-eligibles',
		question: 'Quelles prestations sont éligibles ?',
		answer:
			"✅ ÉLIGIBLES (50% de crédit) :\n\nPELOUSE :\n• Tonte • Scarification • Aération • Arrosage manuel\n\nVÉGÉTAUX :\n• Désherbage manuel\n• Bêchage, binage\n• Taille de haies à partir du sol\n• Taille d'arbustes et fruitiers\n• Application d'engrais naturels\n\nAUTRES :\n• Entretien de massifs\n• Création et entretien de potager\n• Ramassage de feuilles\n\n❌ NON ÉLIGIBLES : Vente de plantes, Création paysagère complexe, Terrassement, Installation arrosage automatique",
		category: 'credit-impot',
	},
	{
		id: 'recuperer-credit',
		question: 'Comment récupérer mon crédit ?',
		answer:
			"EN 3 ÉTAPES :\n\n1. JE RÉALISE LA PRESTATION\nVous me payez le montant convenu\n\n2. JE VOUS FOURNIS L'ATTESTATION\nEn janvier, je vous envoie votre attestation fiscale annuelle\n\n3. VOUS DÉCLAREZ ET RÉCUPÉREZ\nAu printemps, vous déclarez sur votre déclaration d'impôt (case 7DB)\n→ Remboursement en été (réduction d'impôt ou virement)\n\nEXEMPLE DE TIMELINE :\n• 2024 : Prestations réalisées\n• Janvier 2025 : Attestation reçue\n• Printemps 2025 : Déclaration\n• Été 2025 : Remboursement de 50%",
		category: 'credit-impot',
	},

	// APPROCHE ÉCOLOGIQUE
	{
		id: 'pourquoi-eco-paysagiste',
		question: 'Pourquoi choisir un éco-paysagiste ?',
		answer:
			"Choisir un éco-paysagiste, c'est choisir :\n\nPOUR VOTRE SANTÉ :\n• Aucun produit toxique dans votre environnement\n• Fruits et légumes sains si vous avez un potager\n• Préservation de la qualité de l'eau\n\nPOUR LA NATURE :\n• Préservation de la biodiversité (insectes, oiseaux, hérissons...)\n• Sol vivant et fertile\n• Économie d'eau\n\nPOUR VOTRE PORTE-MONNAIE :\n• Réduction progressive des besoins d'entretien\n• Végétaux plus résistants = moins de remplacements\n• + 50% de crédit d'impôt en bonus !\n\nPOUR LE PLAISIR :\n• Jardin vivant et changeant\n• Satisfaction de contribuer à un environnement sain\n• Transmission de bonnes pratiques",
		category: 'approche-ecologique',
	},
	{
		id: 'vraiment-pas-chimique',
		question: 'Vraiment aucun produit chimique ?',
		answer:
			"VRAIMENT AUCUN.\n\nCE QUE J'UTILISE :\n✓ Mes mains et mes outils manuels\n✓ Compost et amendements organiques certifiés\n✓ Purins et décoctions de plantes si besoin\n✓ Paillages naturels (BRF, paille, feuilles)\n✓ Techniques préventives\n\nCE QUE JE N'UTILISE JAMAIS :\n✗ Glyphosate et désherbants chimiques\n✗ Pesticides de synthèse\n✗ Engrais chimiques\n✗ Produits phytosanitaires\n\nRÉSULTAT :\nUn jardin où vos enfants et animaux peuvent jouer en toute sécurité. Un sol qui s'enrichit d'année en année. Une nature qui revient (papillons, abeilles, oiseaux...).",
		category: 'approche-ecologique',
	},
	{
		id: 'entretien-manuel-long',
		question: "L'entretien manuel, n'est-ce pas plus long ?",
		answer:
			"OUI, c'est plus long. Et c'est tant mieux.\n\nPOURQUOI ?\nParce que ce temps investi est du temps de qualité :\n• Observation fine de votre jardin\n• Détection précoce de problèmes (maladies, parasites)\n• Travail soigné et précis\n• Respect de chaque plante\n\nMAIS AUSSI :\n• Résultats durables (pas de repousse express comme avec les désherbants)\n• Amélioration progressive de l'état général\n• Réduction des besoins au fil du temps\n\nET POUR VOUS :\nLe coût reste abordable grâce au crédit d'impôt de 50%.",
		category: 'approche-ecologique',
	},

	// PRESTATIONS PRATIQUES
	{
		id: 'quels-services',
		question: 'Quels services proposez-vous ?',
		answer:
			"Je propose tous les services classiques d'entretien de jardin, avec une approche écologique :\n\n• Tonte et entretien de pelouse\n• Désherbage manuel\n• Taille de haies, arbustes et fruitiers\n• Entretien de massifs fleuris\n• Création et entretien de potager en permaculture\n• Accompagnement à l'année\n\nToutes ces prestations sont éligibles à 50% de crédit d'impôt.",
		category: 'prestations',
	},
	{
		id: 'zone-intervention',
		question: "Quelle est votre zone d'intervention ?",
		answer:
			"Je suis basé à Monnières et j'interviens principalement dans :\n\n• Le Vignoble Nantais\n• La Vallée de la Loire (sud)\n• Secteur de Clisson\n• Communes environnantes (15 km autour de Monnières)\n\nPour savoir si j'interviens chez vous, le plus simple est de me contacter.",
		category: 'prestations',
	},
	{
		id: 'intervention-toute-annee',
		question: "Intervenez-vous toute l'année ?",
		answer:
			"OUI, selon les besoins de votre jardin :\n\nPRINTEMPS : Réveil du jardin, premières tontes, plantations\nÉTÉ : Entretien intensif, arrosage si besoin, récoltes\nAUTOMNE : Préparation hivernale, taille, plantation d'arbres\nHIVER : Taille d'arbustes et fruitiers, préparation de la saison\n\nChaque saison a ses travaux spécifiques.",
		category: 'prestations',
	},
	{
		id: 'presence-obligatoire',
		question: 'Dois-je être présent lors de votre intervention ?',
		answer:
			"NON, ce n'est pas obligatoire si :\n\n✓ Votre jardin est accessible\n✓ Vous m'avez donné vos consignes lors du devis\n✓ Vous m'avez signalé les points de vigilance\n\nJe vous laisse un compte-rendu après chaque passage.\n\nPRÉSENCE RECOMMANDÉE pour :\n• La première visite (faire connaissance et comprendre vos attentes)\n• Les interventions importantes nécessitant des choix",
		category: 'prestations',
	},
	{
		id: 'materiel-fourni',
		question: 'Fournissez-vous le matériel ?',
		answer:
			"OUI, je viens avec tout mon équipement professionnel :\n\n• Tondeuse, taille-haie, débroussailleuse\n• Outils manuels de qualité\n• Brouette, sacs, etc.\n\nET J'ÉVACUE :\n• Tous les déchets verts\n• Direction déchetterie agrée\n• Ou broyage sur place pour paillage si vous le souhaitez\n\nVous n'avez rien à fournir, rien à faire.",
		category: 'prestations',
	},

	// DEVIS ET TARIFS
	{
		id: 'tarifs-comment',
		question: 'Comment sont fixés vos tarifs ?',
		answer:
			'Mes tarifs dépendent de plusieurs facteurs :\n\n• Type de prestation\n• Surface à entretenir\n• État initial du jardin\n• Fréquence des interventions\n• Accessibilité du terrain\n\nTRANSPARENCE :\nJe ne travaille pas avec des plateformes qui prennent des commissions. Le tarif annoncé est le tarif facturé.\n\nMembre de la coopérative Unipros, je garantis des prix justes et transparents.',
		category: 'tarifs',
	},
	{
		id: 'devis-gratuit-full',
		question: 'Le devis est-il gratuit ?',
		answer:
			'OUI, totalement gratuit et sans engagement.\n\nJE ME DÉPLACE GRATUITEMENT pour :\n• Voir votre jardin\n• Comprendre vos besoins et vos attentes\n• Vous conseiller\n• Vous proposer un devis détaillé\n\nAucune obligation de donner suite. Le devis reste valable 3 mois.',
		category: 'tarifs',
	},
	{
		id: 'delais-intervention',
		question: 'Quels sont les délais pour une intervention ?',
		answer:
			"Je m'engage à :\n\n• Répondre sous 48h à toute demande\n• Planifier une visite devis rapidement (sous 1 semaine en général)\n• Réaliser l'intervention dans les meilleurs délais selon vos disponibilités\n\nPour les urgences (tempête, dégâts...) : je fais mon maximum pour intervenir rapidement.",
		category: 'tarifs',
	},
	{
		id: 'paiement-modalites',
		question: 'Comment se passe le paiement ?',
		answer:
			"Modalités de paiement :\n\n• Paiement après intervention (ou fin de mois pour les abonnements)\n• Chèque, espèces, virement\n• Facturation claire et détaillée\n• Attestation fiscale annuelle pour votre crédit d'impôt\n\nAucun acompte demandé pour les prestations régulières.",
		category: 'tarifs',
	},
]

export const FAQ_CATEGORIES = [
	{ id: 'credit-impot', name: "Crédit d'Impôt", icon: '💰' },
	{ id: 'approche-ecologique', name: 'Approche Écologique', icon: '🌱' },
	{ id: 'prestations', name: 'Prestations', icon: '🛠️' },
	{ id: 'tarifs', name: 'Devis et Tarifs', icon: '💵' },
] as const
