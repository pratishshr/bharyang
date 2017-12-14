# <a href='http://github.com/pratishshr/bharyang'><img src='https://raw.githubusercontent.com/pratishshr/bharyang/master/logo.png' height='60'></a>

# Bharyang
[![npm](https://img.shields.io/npm/v/bharyang.svg)](https://www.npmjs.com/package/bharyang)
[![Build Status](https://travis-ci.org/pratishshr/bharyang.svg?branch=master)](https://travis-ci.org/pratishshr/bharyang)
[![npm](https://img.shields.io/npm/dt/bharyang.svg)](https://www.npmjs.com/package/bharyang)

> Core library for bharyang extensions.

This is the core library that provides functions to rearrange the block of lines.

It was mainly written due the OCD nature of mine and my colleagues.

```js
// Before:                                      |  // After:
                                                |
import get from 'lodash/get';                   |  import React from 'react';
import { browserHistory } from 'react-router';  |  import moment from 'moment';
import moment from 'moment';                    |  import get from 'lodash/get';
import React from 'react';                      |  import camelize from 'camelize';
import { connect } from 'react-redux';          |  import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';     |  import { bindActionCreators } from 'redux';
import camelize from 'camelize';                |  import { browserHistory } from 'react-router';
```

Whenever we see imports like this, we can't help but give it a little cringe. It's not wrong in any way, but its just... **not pretty**. How about arranging them in a way so that you would want to give a second look at your code?

Waste of time? **Totally**. We actually spend ridiculous amount of time just to make the code **"look pretty"**. But hey, once it's done, that satisfaction is totally worth it.

Actually, we are just so used to this ladder styled code that we can't go back 😅.

Anyways, **"Bharyang"** (Nepali) translates to -> **"Ladder"**. 

Yup, so creative! **Thank you**. 👏

## Implementations

Currently it is implemented for Visual Studio Code only. **Check here for the actual use**.
 - [bharyang-vscode](https://github.com/pratishshr/bharyang-vscode)

## Usage

```js
import {sortImports} from 'bharyang';

sortImports(selection);
```
## API
- **sortImports(text: string)**
- **sortAscending(text: string)**
- **sortDescending(text: string)**