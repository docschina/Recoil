/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>最小且具有响应式</>,
    // imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
<<<<<<< HEAD
        Recoil 拥有与 React 一样的工作方式与原理。将其添加到您的应用中可快速获得灵活的状态共享。
=======
        Recoil works and thinks like React. Add some to your app and get fast
        and flexible shared state.
>>>>>>> upstream/docs
      </>
    ),
  },
  {
    title: <>数据流图</>,
    // imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        针对派生数据（Derived data）和异步查询采用纯函数以及高效订阅的方式进行处理。
      </>
    ),
  },
  {
    title: <>应用程序全局监听</>,
    // imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
<<<<<<< HEAD
        通过监听应用程序中所有状态的变化来实现持久化存储，路由，时间旅行调试或撤消，并且不会影响代码分割。
=======
        Implement persistence, routing, time-travel debugging, or undo by
        observing all state changes across your app, without impairing
        code-splitting.
>>>>>>> upstream/docs
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout description="A state management library for React.">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'hero__button button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/introduction/getting-started')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map(({title, imageUrl, description}) => (
                  <Feature
                    key={title}
                    title={title}
                    imageUrl={imageUrl}
                    description={description}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className="container">
                <div className="row" style={{justifyContent: 'center'}}>
                  <iframe
                    width="560"
                    height="315"
                    src="https://v.youku.com/v_show/id_XNDY3MzIxNzY0MA==.html"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  />{' '}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;
