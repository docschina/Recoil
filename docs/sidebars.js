/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
<<<<<<< HEAD
  someSidebar: {
    '简介': [
=======
  docs: {
    Introduction: [
>>>>>>> 6d9b2206cb0ca987f4087d7cf5fd6205d68a97d0
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
      //   'guides/usage-flow',
      //   'guides/usage-typescript',
      'guides/asynchronous-data-queries',
      'guides/asynchronous-state-sync',
      'guides/persistence',
      //   'guides/writing-test',
      //   'guides/code-splitting',
    ],

    'API Reference': [
      {
        '核心': [
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
              'api-reference/core/useRecoilValueLoadable',
              'api-reference/core/useRecoilStateLoadable',
              'api-reference/core/isRecoilValue',
              // 'api-reference/core/DefaultValue',
            ],
            Snapshots: [
              'api-reference/core/Snapshot',
              'api-reference/core/useRecoilTransactionObserver',
              'api-reference/core/useRecoilSnapshot',
              'api-reference/core/useGotoRecoilSnapshot',
            ],
          },
          'api-reference/core/useRecoilCallback',
          {
            Misc: [
              'api-reference/core/useRecoilBridgeAcrossReactRoots',
            ],
          },
        ],
      },
      {
        '工具': [
          'api-reference/utils/atomFamily',
          'api-reference/utils/selectorFamily',
          'api-reference/utils/constSelector',
          'api-reference/utils/errorSelector',
          'api-reference/utils/waitForAll',
          'api-reference/utils/waitForAny',
          'api-reference/utils/waitForNone',
          'api-reference/utils/noWait',
        ],
      },
    ],
  },
};
