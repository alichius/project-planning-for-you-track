Library for project planning from YouTrack data. Retrieve past project schedule from activity log, and compute future schedule from unresolved issues and the available contributors.

## Status

[![Build Status](https://travis-ci.org/fschopp/project-planning-for-you-track.svg?branch=master)](https://travis-ci.org/fschopp/project-planning-for-you-track)
[![Coverage Status](https://coveralls.io/repos/github/fschopp/project-planning-for-you-track/badge.svg?branch=master)](https://coveralls.io/github/fschopp/project-planning-for-you-track?branch=master)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/fschopp/project-planning-for-you-track.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/fschopp/project-planning-for-you-track/context:javascript)
[![npm](https://img.shields.io/npm/v/@fschopp/project-planning-for-you-track.svg)](https://www.npmjs.com/package/@fschopp/project-planning-for-you-track)

## Overview

- Comprehensive [API documentation](https://fschopp.github.io/project-planning-for-you-track/doc/). Generated by TypeDoc.
- See the [interactive demo](https://fschopp.github.io/project-planning-for-you-track/) for experimenting with the API.
- Reconstructs a project plan (that is, an overview when each issue was being worked on) from the YouTrack activity log.
- Uses the list-scheduling algorithm implemented in [fschopp/project-planning-js](https://github.com/fschopp/project-planning-js) to compute a (future) project plan for the unresolved YouTrack issues.
- Written in TypeScript, but easily usable from JavaScript.
- Tests have [full code coverage](https://fschopp.github.io/project-planning-for-you-track/coverage/).

## License

[Apache License 2.0](LICENSE)

## Releases and Usage

Published releases include TypeScript type declarations and are available as either [UMD](https://github.com/umdjs/umd) or ECMAScript 2015 (aka ES6) modules.

### Node.js

Install with `npm install @fschopp/project-planning-for-you-track` or `yarn add @fschopp/project-planning-for-you-track`. Use the package as follows (example is in TypeScript, but ES6 JavaScript essentially reads the same, minus the types):
```typescript
import {
  ProgressCallback,
  ProjectPlan,
  retrieveProjectPlan,
  YouTrackConfig,
} from '@fschopp/project-planning-for-you-track';
const baseUrl: string = 'https://<name>.myjetbrains.com/';
const progressUpdate: ProgressCallback = (percentDone) => {
  /* ... */
};
const youTrackConfig: YouTrackConfig = {
  stateFieldId: '<state-field-id>',
  /* ... */
};
const promise: Promise<ProjectPlan> =
    retrieveProjectPlan(baseUrl, youTrackConfig, progressUpdate);
```

### Browser

Include the minified sources from the [jsDelivr CDN](https://www.jsdelivr.com/package/npm/@fschopp/project-planning-for-you-track):
```html
<script src="https://cdn.jsdelivr.net/npm/@fschopp/project-planning-for-you-track@.../dist/index.min.js"
  integrity="..." crossorigin="anonymous"></script>
```
Of course, the two occurrences of `...` need to be replaced by the current version and its corresponding [subresource integrity (SRI)](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) hash. Then, in a subsequent script:
```javascript
/* baseUrl, youTrackConfig, and progressUpdate defined as above */
const promise = ProjectPlanningForYouTrack.retrieveProjectPlan(
    baseUrl, youTrackConfig, progressUpdate);
```

If you intend to use method [`scheduleUnresolved()`](https://fschopp.github.io/project-planning-for-you-track/doc/globals.html#scheduleunresolved), note that it depends on [fschopp/project-planning-js](https://github.com/fschopp/project-planning-js). You therefore need to add a `<script>` element for that package, too; *before* the one for this package. Due to [cross-origin restrictions for web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API), package [fschopp/project-planning-js](https://github.com/fschopp/project-planning-js) needs to be served from the same domain as your website ([see also the explanation there](https://github.com/fschopp/project-planning-js#browser)).

## Build

- See the corresponding section in project [fschopp/project-planning-js](https://github.com/fschopp/project-planning-js#build). The description there applies for this project as well.

## References

- Cohn (2006): “[Agile Estimating and Planning][Cohn_2006],” Prentice Hall, ISBN 9780131479418.

[Cohn_2006]: http://www.worldcat.org/oclc/935197594
