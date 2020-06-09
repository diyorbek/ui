import { renderComponent, renderCSS } from '@superdispatch/ui-testutils';
import React, { Fragment } from 'react';

import { Stack } from '../Stack';

it('flattens children', () => {
  const { container } = renderComponent(
    <Stack space={1}>
      A{null}
      {false}
      {undefined}
      <>
        B{null}
        {false}
        {undefined}
        {[
          null,
          false,
          undefined,
          'C',
          <Fragment key="d">
            D{null}
            {false}
            {undefined}
          </Fragment>,
        ]}
      </>
    </Stack>,
  );

  expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="SuperDispatchStack-root SuperDispatchStack-space1"
      >
        <div
          class="SuperDispatchStack-item"
        >
          A
        </div>
        <div
          class="SuperDispatchStack-item"
        >
          B
        </div>
        <div
          class="SuperDispatchStack-item"
        >
          C
        </div>
        <div
          class="SuperDispatchStack-item"
        >
          D
        </div>
      </div>
    </div>
  `);
});

it('checks component css', () => {
  expect(
    renderCSS(
      <Stack space={1}>
        <div />
        <div />
      </Stack>,
      ['SuperDispatchStack'],
    ),
  ).toMatchInlineSnapshot(`
    .SuperDispatchStack-root.SuperDispatchStack-space1 > .SuperDispatchStack-item {
      padding-bottom: 8px;
    }

    .SuperDispatchStack-root.SuperDispatchStack-space2 > .SuperDispatchStack-item {
      padding-bottom: 16px;
    }

    .SuperDispatchStack-root.SuperDispatchStack-space3 > .SuperDispatchStack-item {
      padding-bottom: 24px;
    }

    .SuperDispatchStack-root.SuperDispatchStack-space4 > .SuperDispatchStack-item {
      padding-bottom: 32px;
    }

    .SuperDispatchStack-root.SuperDispatchStack-space5 > .SuperDispatchStack-item {
      padding-bottom: 40px;
    }

    .SuperDispatchStack-root.SuperDispatchStack-space6 > .SuperDispatchStack-item {
      padding-bottom: 48px;
    }

    .SuperDispatchStack-root.SuperDispatchStack-space7 > .SuperDispatchStack-item {
      padding-bottom: 56px;
    }

    .SuperDispatchStack-root.SuperDispatchStack-space8 > .SuperDispatchStack-item {
      padding-bottom: 64px;
    }

    .SuperDispatchStack-root.SuperDispatchStack-space9 > .SuperDispatchStack-item {
      padding-bottom: 72px;
    }

    .SuperDispatchStack-root.SuperDispatchStack-space10 > .SuperDispatchStack-item {
      padding-bottom: 80px;
    }

    .SuperDispatchStack-root.SuperDispatchStack-alignRight
      > .SuperDispatchStack-item {
      display: flex;
      align-items: flex-end;
      flex-direction: column;
    }

    .SuperDispatchStack-root.SuperDispatchStack-alignCenter
      > .SuperDispatchStack-item {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .SuperDispatchStack-root > .SuperDispatchStack-item:last-child {
      padding-bottom: 0;
    }
  `);
});
