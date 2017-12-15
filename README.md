# <a href='http://github.com/pratishshr/bharyang'><img src='https://raw.githubusercontent.com/pratishshr/bharyang/master/assets/logo.png' height='80'></a> Bharyang [![npm](https://img.shields.io/npm/v/bharyang.svg)](https://www.npmjs.com/package/bharyang) [![Build Status](https://travis-ci.org/pratishshr/bharyang.svg?branch=master)](https://travis-ci.org/pratishshr/bharyang) [![npm](https://img.shields.io/npm/dt/bharyang.svg)](https://www.npmjs.com/package/bharyang)

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
- **sortAscending(text: string)**
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
- **sortDescending(text: string)**
```js
// Before:                                      |  // After:
                                                |
import get from 'lodash/get';                   |  import { browserHistory } from 'react-router';
import { browserHistory } from 'react-router';  |  import { bindActionCreators } from 'redux';
import moment from 'moment';                    |  import { connect } from 'react-redux';
import React from 'react';                      |  import camelize from 'camelize';
import { connect } from 'react-redux';          |  import get from 'lodash/get';
import { bindActionCreators } from 'redux';     |  import moment from 'moment';
import camelize from 'camelize';                |  import React from 'react';
```
- **sortImports(text: string)**

  Groups and reorders imports.  
  Asset imports are kept on top, then the libraries and followed by your app modules.
```js
// Before:                                                                    |  //After:
                                                                              |
import '../public/style.css';                                                 |  import '../public/style.css';
                                                                              |
import queryConstants from '../../constants/queryConstants';                  |  import moment from 'moment';
import React, { Component } from 'react';                                     |  import get from 'lodash/get';
import camelize from 'camelize';                                              |  import camelize from 'camelize';
import entityConstants from '../../constants/entityConstants';                |  import { connect } from 'react-redux';
import moment from 'moment';                                                  |  import React, { Component } from 'react';
import { bindActionCreators } from 'redux';                                   |  import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';                                        |  
import get from 'lodash/get';                                                 |  import queryConstants from '../../constants/queryConstants';
import loginInformationActions from '../../actions/loginInformationActions';  |  import entityConstants from '../../constants/entityConstants';
import apiActions from '../../actions/apiActions';                            |  import messageConstants from '../../constants/messageConstants';
import transactionActions from '../../actions/transactionActions';            |
import crudActions from '../../actions/crudActions';                          |  import apiActions from '../../actions/apiActions';
import messageConstants from '../../constants/messageConstants';              |  import crudActions from '../../actions/crudActions';
import TransactionsGraph from './TransactionsGraph';                          |  import paginationActions from '../../actions/paginationActions';
import DateUtil from '../../util/DateUtil';                                   |  import transactionActions from '../../actions/transactionActions';
import RecentTransactions from './RecentTransactions';                        |  import loginInformationActions from '../../actions/loginInformationActions';
import TransactionService from '../../service/dashboard/TransactionService';  |
import TransactionReportWidget from './TransactionReportWidget';              |  import TransactionsGraph from './TransactionsGraph';
import TodaysTransactionWidget from './TodaysTransactionsWidget';             |  import RecentTransactions from './RecentTransactions';
import paginationActions from '../../actions/paginationActions';              |  import TransactionReportWidget from './TransactionReportWidget';
                                                                              |  import TodaysTransactionWidget from './TodaysTransactionsWidget';
                                                                              |
                                                                              |  import DateUtil from '../../util/DateUtil';
                                                                              |
                                                                              |  import TransactionService from '../../service/dashboard/TransactionService';
                                                                              |
```

