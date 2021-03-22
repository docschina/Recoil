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
>>>>>>> e47002473f0ad431a18377aef4b90e5e83fd25a8
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
<<<<<<< HEAD
        '核心': [
          'api-reference/core/RecoilRoot',
          {
            State: [
              'api-reference/core/atom',
              'api-reference/core/selector',
              'api-reference/core/Loadable',
              'api-reference/core/isRecoilValue',
              // 'api-reference/core/DefaultValue',             
              'api-reference/core/useRecoilState',
              'api-reference/core/useRecoilValue',
              'api-reference/core/useSetRecoilState',
              'api-reference/core/useResetRecoilState',
              'api-reference/core/useRecoilValueLoadable',
              'api-reference/core/useRecoilStateLoadable',              
            ],
            Snapshots: [
              'api-reference/core/Snapshot',
              'api-reference/core/useRecoilCallback',
              'api-reference/core/useRecoilTransactionObserver',
              'api-reference/core/useRecoilSnapshot',
              'api-reference/core/useGotoRecoilSnapshot',              
            ]
          },
=======
        'Recoil State': [
          'api-reference/core/atom',
          'api-reference/core/selector',
          'api-reference/core/Loadable',
          'api-reference/core/useRecoilState',
          'api-reference/core/useRecoilValue',
          'api-reference/core/useSetRecoilState',
          'api-reference/core/useResetRecoilState',
          'api-reference/core/useRecoilStateLoadable',
          'api-reference/core/useRecoilValueLoadable',
          'api-reference/core/isRecoilValue',
          // 'api-reference/core/DefaultValue',
>>>>>>> e47002473f0ad431a18377aef4b90e5e83fd25a8
        ],
      },
      'api-reference/core/useRecoilCallback',
      {
        '工具': [
          'api-reference/utils/atomFamily',
          'api-reference/utils/selectorFamily',
          'api-reference/utils/constSelector',
          'api-reference/utils/errorSelector',
          'api-reference/utils/noWait',
          'api-reference/utils/waitForAll',
          'api-reference/utils/waitForNone',
          'api-reference/utils/waitForAny',
        ],
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
