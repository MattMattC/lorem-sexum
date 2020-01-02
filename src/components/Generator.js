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
} from '@chakra-ui/core';
import { Formik } from 'formik';
import textGenerator from '../utils/text-generator';

Generator.propTypes = {};
function Generator(props) {
    const [result, setResult] = useState('');

    return (
        <>
            <Box p="6">
                <Formik
                    initialValues={{ nbValue: 5, type: '' }}
                    validate={values => {
                        const errors = {};
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setResult(textGenerator(2));
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
                                    defaultValue={5}
                                    name="nbValue"
                                    min={1}
                                    max={30}
                                    value={values.nbValue}
                                    onChange={handleChange}
                                >
                                    <NumberInputField type="number" />
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
                                Vends moi du rêves !
                            </Button>
                        </form>
                    )}
                </Formik>
            </Box>
            RESULTATS
            <Box p="6">{result}</Box>
        </>
    );
}

export default Generator;
