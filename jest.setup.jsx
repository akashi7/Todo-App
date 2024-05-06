/* eslint-disable no-undef */
require('@testing-library/jest-dom')

import { setAppElement } from 'react-modal'

// Set the app element for react-modal
setAppElement(document.createElement('div'))

import React from 'react'

global.React = React
