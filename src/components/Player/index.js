import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import Publisher from './Publisher';
import Subscriber from './Subscriber';
import { OTSession, OTStreams } from './TokBox';

const App = () => {
  return (
    <Fragment>
      <OTSession
        apiKey='46216882'
        sessionId='2_MX40NjIxNjg4Mn5-MTU2NTMxNzY0NTYxOH5nbzZ2N0V6TzJRTjM4N3FwY0Uwdm1heEh-fg'
        token='T1==cGFydG5lcl9pZD00NjIxNjg4MiZzaWc9ZDg1NjkzZTU2ZTM5OTUwNjYwMTA0ZjE4NWU1NThjOGE5MmM5MjBhMDpzZXNzaW9uX2lkPTJfTVg0ME5qSXhOamc0TW41LU1UVTJOVE14TnpZME5UWXhPSDVuYnpaMk4wVjZUekpSVGpNNE4zRndZMFV3ZG0xaGVFaC1mZyZjcmVhdGVfdGltZT0xNTY1NDUwOTY0JnJvbGU9bW9kZXJhdG9yJm5vbmNlPTE1NjU0NTA5NjQuNDY1NzE3MjM5MTIzOTU='
      >
        <Publisher />

        <OTStreams
          countStreams={() => {
            return 1;
          }}
        >
          <Subscriber />
        </OTStreams>
      </OTSession>
    </Fragment>
  );
};

export default withRouter(App);
