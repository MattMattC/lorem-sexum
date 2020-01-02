import React from 'react';
import './App.css';
import { CSSReset } from '@chakra-ui/core';
import { ThemeProvider } from '@chakra-ui/core';
import customTheme from './theme/theme';
import Generator from './components/Generator';
import Layout from './Layout';

function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <CSSReset />
            <Layout>
                <Generator />
            </Layout>
        </ThemeProvider>
    );
}

export default App;
