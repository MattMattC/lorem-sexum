/**
 * gender :
 *  0 : féminim
 *  1 : masculin
 */
export default {
    order: [
        ['sujets.nomCommuns', 'verbes', 'adjectifs.possessif', 'sujets.nom'],
        [
            'sujets.nom',
            'verbes',
            'adverbes.quantite',
            'adjectifs.possessif',
            'sujets.nomCommuns',
        ],
        ['sujets.nomCommuns', 'verbes', 'adverbes.maniere', 'sujets.nom'],
        [
            'sujets.nomCommuns',
            'verbes',
            'adjectifs.possessif',
            'sujets.nomCommuns',
            'adverbes.quantite',
        ],
        ['sujets.nomCommuns', 'verbes', 'adjectifs.possessif', 'sujets.nom'],
    ],
    adjectifs: {
        /**
         * gender 1 si le nom qui suit commence par une voyelle
         */
        possessif: [
            { value: 'son', gender: 1 },
            { value: 'mon', gender: 1 },
            { value: 'ton', gender: 1 },
            { value: 'ma', gender: 0 },
            { value: 'sa', gender: 0 },
            { value: 'ta', gender: 0 },
            { value: 'notre', gender: 1 },
            { value: 'votre', gender: 1 },
            { value: 'leur', gender: 1 },
        ],
    },
    pronomsObjet: [
        {
            value: 'le',
            gender: 1,
        },
        {
            value: 'la',
            gender: 0,
        },
        {
            value: 'les',
            gender: 2,
        },
    ],
    sujets: {
        nomCommuns: [
            {
                value: 'jardinier',
                gender: 1,
            },
            {
                value: 'voisin',
                gender: 1,
            },
            {
                value: 'facteur',
                gender: 1,
            },
            {
                value: 'boulangère',
                gender: 0,
            },
        ],
        nom: [
            { value: 'Stefan', gender: 1 },
            { value: 'Matthieu', gender: 1 },
            { value: 'Martine', gender: 0 },
            { value: 'Anne Hidalgo', gender: 0 },
            { value: 'Emma Watston', gender: 0 },
        ],

        pronoms: [
            {
                value: 'je',
                withVoyelle: "j'",
                gender: 1,
            },
            {
                value: 'tu',
                withVoyelle: "t'",
                gender: 1,
            },
            {
                value: 'il',
                gender: 1,
            },
            {
                value: 'elle',
                gender: 0,
            },
            {
                value: 'on',
                gender: 2,
            },
            {
                value: 'nous',
                gender: 2,
            },
            {
                value: 'vous',
                gender: 2,
            },
            {
                value: 'ils',
                gender: 1,
            },
            {
                value: 'elles',
                gender: 0,
            },
        ],
    },
    verbes: [
        { value: 'pénétrer', degre: 1 },
        { value: 'baiser', degre: 1 },
        { value: 'défourailler', degre: 1 },
        { value: 'sucer', degre: 1 },
        { value: 'sodomiser', degre: 1 },
        { value: 'enfiler', degre: 1 },
        {
            value: 'prendre',
            degre: 3,
        },
    ],
    prepositions: [
        'à',
        'chez',
        'dans',
        'de',
        'entre',
        'jusque',
        'hors',
        'par',
        'pour',
        'sans',
        'vers',
    ],
    adverbes: {
        maniere: [
            'facilement',
            'bien',
            'mieux',
            'comme',
            'exprès',
            'franco',
            'gratis',
            'incognito',
            'mal',
            'mieux',
            'plutôt',
            'presque',
            'vite',
            'volontiers',
            'admirablement',
            'bravement',
            'brutalement',
            'clairement',
            'doucement',
            'également',
            'gentiment',
            'lentement',
        ],
        quantite: [
            'divinement',
            'drôlement',
            'encore',
            'entièrement',
            'extrêmement',
            'fort',
            'grandement',
            'guère',
            'infiniment',
        ],
        /**
         * et répitition
         */
        duree: [],
    },
};
