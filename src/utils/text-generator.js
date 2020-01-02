import structure from '../content/structure';
import { FirstGroup, SecondGroup, ThirdGroup } from '../components/conjugator';

/**
 * @param {array} list
 * @param {number} forcedGender
 */
const getRandomInList = (list, forcedGender) => {
    let item = list[Math.floor(Math.random() * Math.floor(list.length))];
    if (forcedGender !== undefined && item.gender) {
        if (item.gender !== forcedGender) {
            return getRandomInList(list, forcedGender);
        }
    }
    return item;
};
/**
 *
 * @param {number} nbParagraph
 */
const generator = nbParagraph => {
    const order = getRandomInList(structure.order);
    const sentence = buildFromOrder(order);
    return toString(sentence);
};

/**
 *
 * @param {array} order
 */
const buildFromOrder = order => {
    const sentence = [];
    order.forEach(item => {
        const lastItemPushed = sentence[sentence.length - 1];
        const decomposition = item.split('.');
        if (decomposition.length > 0) {
            const list = getStructureList(structure, decomposition);

            let itemSentence = getRandomInList(
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
const toString = line => {
    const sentence = line.map((item, index) => {
        switch (item.type) {
            case 'verbes':
                const verbeValue = conjugate(line[index - 1], item);
                return verbeValue;
            case 'sujets.nomCommuns':
                if (line[index - 1]) {
                    if (line[index - 1].type === 'adjectifs.possessif') {
                        return item.value;
                    }
                }
                return (item.gender === 1 ? 'le' : 'la') + ' ' + item.value;
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

export default generator;
