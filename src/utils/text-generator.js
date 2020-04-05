import structure from '../content/structure';
import { FirstGroup, SecondGroup, ThirdGroup } from '../components/conjugator';
import combinationSumRecursive from './combinationSum';

const sizeParagraph = {
    small: 30,
    medium: 50,
    large: 70,
};

/**
 * @param {array} list
 * @param {number} forcedGender
 */
const generateOrderSentence = (list, forcedGender) => {
    let item = list[Math.floor(Math.random() * Math.floor(list.length))];
    if (forcedGender !== undefined && item.gender !== undefined) {
        if (item.gender !== forcedGender && forcedGender !== 2) {
            return generateOrderSentence(list, forcedGender);
        }
    }
    return item;
};

/**
 *
 * @param {number} nbParagraph
 * @return {number[]}
 */
const generator = (nbParagraph) => {
    return getSentencesFromNbParagraph(nbParagraph);
};

/**
 *
 * @param {number} nbParagraph
 * @return {number[]}
 */
const getSentencesFromNbParagraph = (nbParagraph) => {
    const paragraphs = [];
    for (let i = 0; i < nbParagraph; i++) {
        const sentences = getSentencesFromNbWords(sizeParagraph.small);
        let stringFinal = '';
        sentences.forEach((sentence) => {
            const order = buildFromOrder(sentence);
            stringFinal += ' ' + toString(order);
        });
        paragraphs.push(stringFinal);
    }
    return paragraphs;
};

/**
 *
 * @param {number} nbWords
 */
const getSentencesFromNbWords = (nbWords) => {
    const mapSentences = [];
    let candidates = structure.order.map((o) => o.length);
    candidates = [...new Set(candidates)];

    const result = combinationSumRecursive(candidates, nbWords);
    const randomOrderSentences =
        result[Math.floor(Math.random() * Math.floor(result.length))];

    const newOrder = randomOrderSentences.sort(() => Math.random() - 0.5);

    newOrder.forEach((size) => {
        mapSentences.push(
            generateOrderSentence(
                structure.order.filter((o) => o.length === size)
            )
        );
    });
    return mapSentences;
};

const generateFromNbWords = (nbWords) => {
    const words = [];

    for (let i = 0; i < nbWords; i++) {
        words.push(
            structure.randomList[
                Math.floor(
                    Math.random() * Math.floor(structure.randomList.length)
                )
            ]
        );
    }

    return words.join(' ');
};

/**
 *
 * @param {array} order
 */
const buildFromOrder = (order) => {
    console.log(order);
    const sentence = [];
    order.forEach((item) => {
        const lastItemPushed = sentence[sentence.length - 1];
        const decomposition = item.split('.');
        if (decomposition.length > 0) {
            const list = getStructureList(structure, decomposition);
            let itemSentence = generateOrderSentence(
                list,
                lastItemPushed ? lastItemPushed.gender : undefined
            );
            if (typeof itemSentence !== 'object') {
                itemSentence = { value: itemSentence };
            }
            itemSentence.type = item;
            sentence.push(itemSentence);
        }
    });

    return sentence;
};

/**
 * return the list from properties
 *
 * @param {Object} structure dictionnary of the word with specificities
 * @param {array} properties path to get list
 * @return {null}
 */
const getStructureList = (structure, properties) => {
    if (properties.length > 1) {
        const property = properties.shift();
        if (property in structure) {
            return getStructureList(structure[property], properties);
        }
    } else if (properties.length === 1) {
        const property = properties.shift();
        return structure[property];
    }
    return null;
};

/**
 * Build the sentence depending on the difference type of words
 * @param {array} line array of composition of the sentence with options
 */
const toString = (line) => {
    const sentence = line.map((item, index) => {
        switch (item.type) {
            case 'verbes':
                const verbeValue = conjugate(line[index - 1], item);
                return verbeValue;
            case 'sujets.nomCorps':
            case 'sujets.nomCommuns':
                if (line[index - 1]) {
                    if (line[index - 1].type === 'adjectifs.possessif') {
                        return item.value;
                    }
                }
                let adjPossessif = '';

                switch (item.gender) {
                    case 0:
                        adjPossessif = beginByAVoyelle(item.value)
                            ? "l'"
                            : 'la';
                        break;
                    case 1:
                        adjPossessif = beginByAVoyelle(item.value)
                            ? "l'"
                            : 'le';
                        break;
                    case 2:
                        adjPossessif = 'les';
                        break;
                    default:
                        break;
                }

                return adjPossessif + ' ' + item.value;
            case 'prepositions.appartenance':
                if (line[index + 1]) {
                    return beginByAVoyelle(line[index + 1].value)
                        ? "d'"
                        : item.value;
                }
                break;
            default:
                return item.value;
        }
    });

    let finalSentence = sentence.join(' ');
    finalSentence =
        finalSentence.charAt(0).toUpperCase() + finalSentence.slice(1) + '.';
    return finalSentence;
};

/**
 *
 * @param {string} word
 */
const beginByAVoyelle = (word) => {
    var regex = new RegExp('^[aeiouyéè]');
    return regex.test(word.toLowerCase());
};

/**
 * Dispatch the verb to appropriate group with subject to
 * identify the terminaison
 *
 * @param {Object} subject
 * @param {Object} verb
 */
const conjugate = (subject, verb) => {
    switch (verb.degre) {
        case 1:
            return FirstGroup(subject, verb);
        case 2:
            return SecondGroup(subject, verb);
        case 3:
            return ThirdGroup(subject, verb);
        default:
            break;
    }
};

export { generator, generateFromNbWords };
