/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
  docs: {
    '简介': [
      'introduction/motivation',
      'introduction/core-concepts',
      'introduction/installation',
      'introduction/getting-started',
    ],
    '基础教程': [
      'basic-tutorial/intro',
      'basic-tutorial/atoms',
      'basic-tutorial/selectors',
      // 'basic-tutorial/demo',
      // 'basic-tutorial/performance',
    ],
    '指南': [
      //   {
      //     'Migrating to Recoil': [
      //       'guides/migrating/from-react-state',
      //       'guides/migrating/from-redux',
      //       'guides/migrating/from-mobx',
      //     ],
      //   },
      'guides/asynchronous-data-queries',
      'guides/atom-effects',
      'guides/testing',
      'guides/dev-tools',
      //   'guides/code-splitting',
    ],

    'API Reference': [
      'api-reference/core/RecoilRoot',
      {
        State: [
          'api-reference/core/atom',
          'api-reference/core/selector',
          'api-reference/core/Loadable',
          'api-reference/core/useRecoilState',
          'api-reference/core/useRecoilValue',
          'api-reference/core/useSetRecoilState',
          'api-reference/core/useResetRecoilState',
          'api-reference/core/useRecoilStateLoadable',
          'api-reference/core/useRecoilValueLoadable',
          'api-reference/core/useGetRecoilValueInfo',
          'api-reference/core/isRecoilValue',
          // 'api-reference/core/DefaultValue',
        ],
        Utils: [
          'api-reference/utils/atomFamily',
          'api-reference/utils/selectorFamily',
          'api-reference/utils/constSelector',
          'api-reference/utils/errorSelector',
          'api-reference/utils/noWait',
          'api-reference/utils/waitForAll',
          'api-reference/utils/waitForAllSettled',
          'api-reference/utils/waitForNone',
          'api-reference/utils/waitForAny',
        ],
      },
      'api-reference/core/useRecoilTransaction',
      'api-reference/core/useRecoilCallback',
      {
        Snapshots: [
          'api-reference/core/Snapshot',
          'api-reference/core/useRecoilTransactionObserver',
          'api-reference/core/useRecoilSnapshot',
          'api-reference/core/useGotoRecoilSnapshot',
        ],
        Misc: [
          'api-reference/core/useRecoilBridgeAcrossReactRoots',
        ],
      },
    ],
  },
};
