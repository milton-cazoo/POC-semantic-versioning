import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';
import { configure } from '@testing-library/react';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';

registerRequireContextHook();

configure({ testIdAttribute: 'data-test-id' });
