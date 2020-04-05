import React, { useState } from 'react';
import { Input, Box, RadioGroup, Radio } from '@chakra-ui/core';

import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    FormControl,
    Button,
    Text,
} from '@chakra-ui/core';
import { Formik } from 'formik';
import { generator, generateFromNbWords } from '../utils/text-generator';

Generator.propTypes = {};
function Generator(props) {
    const [result, setResult] = useState([]);
    const [size, setSize] = useState(5);
    return (
        <>
            <Box p="6">
                <Formik
                    initialValues={{ nbValue: 5, type: 'paragraphe' }}
                    validate={(values) => {
                        const errors = {};
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        switch (values.type) {
                            case 'paragraphe':
                                setResult(generator(values.nbValue));
                                break;
                            case 'mots':
                                setResult([
                                    generateFromNbWords(values.nbValue),
                                ]);
                                break;
                            default:
                            // nothing
                        }

                        setSubmitting(false);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <FormControl as="fieldset">
                                <NumberInput
                                    defaultValue={15}
                                    min={10}
                                    max={20}
                                >
                                    <NumberInputField
                                        name="nbValue"
                                        value={values.nbValue}
                                        onChange={handleChange}
                                        type="number"
                                    />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            <FormControl as="fieldset">
                                <RadioGroup
                                    name="type"
                                    defaultValue="paragraphe"
                                    value={values.type}
                                    onChange={handleChange}
                                >
                                    <Radio value="paragraphe">
                                        Paragraphes
                                    </Radio>
                                    <Radio value="mots">Mots</Radio>
                                </RadioGroup>
                            </FormControl>
                            <Button
                                mt={4}
                                variantColor="teal"
                                isLoading={props.isSubmitting}
                                type="submit"
                            >
                                <span role="img" aria-label="send">
                                    🍆🍆🍆🍆🍆
                                </span>
                            </Button>
                        </form>
                    )}
                </Formik>
            </Box>
            RESULTATS
            <Box p="6">
                {result.map((value, index) => (
                    <Text mb={4} key={index}>
                        {value}
                    </Text>
                ))}
            </Box>
        </>
    );
}

export default Generator;
