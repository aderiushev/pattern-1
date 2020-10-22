import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
import routes from '../constants/routes.json';
import styles from './Home.css';

export default function Home(): JSX.Element {
  const history = useHistory();
  return (
    <div className={styles.container} data-tid="container">
      <h2>Pattern-1</h2>
      <div className={styles.description}>описание программы бла-бла-бла</div>

      <div className={styles.content}>
        <div>
          <Button
            large
            intent="success"
            text="Начать работу"
            onClick={() => history.push(routes.MAIN)}
          />
        </div>
      </div>
    </div>
  );
}
