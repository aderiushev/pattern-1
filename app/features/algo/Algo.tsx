import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { H1, H4, ButtonGroup, FormGroup, Button, Icon, NumericInput, Card } from '@blueprintjs/core';
import styles from './Algo.css';
import routes from '../../constants/routes.json';
import {
  increment,
  decrement,
  incrementIfOdd,
  incrementAsync,
  selectCount,
} from './algoSlice';

const STEP_1_1 = ({ onChangeStep }) => (
  <>
    <H1 className={styles.stepTitle}>Шаг 1: Лейкоцитоз?</H1>

    <ButtonGroup className={styles.buttonGroup}>
      <Button
        icon={<Icon iconSize={30} icon="thumbs-up" />}
        onClick={() => onChangeStep(2.2)}
      >
        Да
      </Button>
      <Button
        icon={<Icon iconSize={30} icon="thumbs-down" />}
        onClick={() => onChangeStep(2.1)}
      >
        Нет
      </Button>
    </ButtonGroup>
  </>
);

const STEP_2_1 = ({ onChangeStep }) => (
  <>
    <H1 className={styles.stepTitle}>Шаг 2: Нейтропения?</H1>

    <ButtonGroup className={styles.buttonGroup}>
      <Button
        icon={<Icon iconSize={30} icon="thumbs-up" />}
        onClick={() => onChangeStep(3.1)}
      >
        Да
      </Button>
      <Button
        icon={<Icon iconSize={30} icon="thumbs-down" />}
        onClick={() => onChangeStep(3.2)}
      >
        Нет
      </Button>
    </ButtonGroup>
  </>
);

const STEP_2_2 = ({ onChangeStep }) => (
  <>
    <H1 className={styles.stepTitle}>Шаг 2: Лимфоденапатия</H1>

    <ButtonGroup className={styles.buttonGroup}>
      <Button
        onClick={() => onChangeStep(3.3)}
      >
        Ранг 1-4
      </Button>
      <Button
        onClick={() => onChangeStep(3.4)}
      >
        Ранг 5-6
      </Button>
    </ButtonGroup>
  </>
);

const STEP_3_1 = ({ onChangeStep }) => (
  <>
    <H1 className={styles.stepTitle}>Шаг 3</H1>

    <ButtonGroup className={styles.buttonGroup}>
      <Button
        onClick={() => onChangeStep(4.1)}
      >
        Реактивация
      </Button>
    </ButtonGroup>
  </>
);

const STEP_3_2 = STEP_3_1;
const STEP_3_3 = STEP_3_1;

const STEP_3_4 = () => (
  <>
    <H1 className={styles.stepTitle}>Шаг 3</H1>

    <ButtonGroup className={styles.buttonGroup}>
      <Button
        disabled
      >
        Первичная инфекция
      </Button>
    </ButtonGroup>
  </>
);

const STEP_4_1 = ({ onChangeStep }) => {
  const [lmf, setLmf] = useState(null);
  const [gepat, setGepat] = useState(null);
  const [atipm, setAtipm] = useState(null);
  const [alt, setAlt] = useState(null);
  const [lu, setLu] = useState(null);
  const [sttj, setSttj] = useState(null);
  const [f, setF] = useState(null);

  useEffect(() => {
    const isValid = [lmf, gepat, atipm, atipm, alt, lu, sttj].every(item => Number.isFinite(item));

    if (isValid) {
      const f = -3.487 + (1.827 * lmf) + (1.297 * gepat) + (0.754 * atipm) + (0.623 * alt) + (0.153 * lu) + (0.356 * sttj);
      setF(f);
    }
  }, [lmf, gepat, atipm, alt, lu, sttj]);


  return (
    <>
      <H1 className={styles.stepTitle}>Шаг 4: Вычисление дискриминантной функции</H1>
      <H4 className={styles.formula}>
        F = -3.487
        &nbsp;+ 1.827 * X<small>лмф</small>
        &nbsp;+ 1.297 * X<small>гепат</small>
        &nbsp;+ 0.754 * X<small>атипм</small>
        &nbsp;+ 0.623 * X<small>АЛТ</small>
        &nbsp;+ 0.153 * X<small>ЛУ</small>
        &nbsp;+ 0.356 * X<small>сттяж</small>
      </H4>

      <Card className={styles.inputsCard}>
        <div>
          <FormGroup
            label={<>X<small>лмф</small></>}
            labelFor="lmf"
            labelInfo="(обязательно)"
          >
            <NumericInput
              id="lmf"
              placeholder="Введите значение"
              onValueChange={setLmf}
            />
          </FormGroup>

          <FormGroup
            label={<>X<small>атипм</small></>}
            labelFor="atipm"
            labelInfo="(обязательно)"
          >
            <NumericInput
              id="atipm"
              placeholder="Введите значение"
              onValueChange={setAtipm}
            />
          </FormGroup>

          <FormGroup
            label={<>X<small>ЛУ</small></>}
            labelFor="lu"
            labelInfo="(обязательно)"
          >
            <NumericInput
              id="lu"
              placeholder="Введите значение"
              onValueChange={setLu}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup
            label={<>X<small>гепат</small></>}
            labelFor="gepat"
            labelInfo="(обязательно)"
          >
            <NumericInput
              id="gepat"
              placeholder="Введите значение"
              onValueChange={setGepat}
            />
          </FormGroup>

          <FormGroup
            label={<>X<small>АЛТ</small></>}
            labelFor="alt"
            labelInfo="(обязательно)"
          >
            <NumericInput
              id="alt"
              placeholder="Введите значение"
              onValueChange={setAlt}
            />
          </FormGroup>

          <FormGroup
            label={<>X<small>сттяж</small></>}
            labelFor="sttj"
            labelInfo="(обязательно)"
          >
            <NumericInput
              id="lmf"
              placeholder="Введите значение"
              onValueChange={setSttj}
            />
          </FormGroup>
        </div>
      </Card>

      {f && (
        <h2 className={styles.f}>F = {f.toFixed(3)}</h2>
      )}

      {f && (
        <ButtonGroup className={styles.buttonGroup}>
          <Button
            disabled={f > 0.212}
            onClick={() => onChangeStep(5.2)}
          >
            {'F < 0.212'}
          </Button>
          <Button
            disabled={f < 0.212}
            onClick={() => onChangeStep(5.1)}
          >
            {'F > 0.212'}
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};

const STEP_5_1 = ({ onChangeStep }) => (
  <>
    <H1 className={styles.stepTitle}>Шаг 5</H1>

    <ButtonGroup className={styles.buttonGroup}>
      <Button
        disabled
      >
        Реактивация
      </Button>
    </ButtonGroup>
  </>
);

const STEP_5_2 = STEP_3_4;

export default function Algo() {
  const dispatch = useDispatch();
  const value = useSelector(selectCount);
  const history = useHistory();
  const [step, setStep] = useState(1.1);

  return (
    <div className={styles.container}>
      <div className={styles.topToolbar}>
        <div
          className={styles.homeButton}
          onClick={() => {
            history.push(routes.HOME);
          }}
        >
          <Button icon="home" large>
          </Button>
        </div>
        <div
          className={styles.backButton}
          onClick={() => {
            const prevStep = Math.floor(step) - 1;

            if (prevStep > 0) {
              setStep(Number(`${prevStep}.1`));
            } else {
              history.push(routes.HOME);
            }
          }}
        >
          <Button icon="arrow-left" large>
          </Button>
        </div>
      </div>

      <div className={styles.content}>
        {step === 1.1 && (
          <STEP_1_1 onChangeStep={(step) => setStep(step)} />
        )}
        {step === 2.1 && (
          <STEP_2_1 onChangeStep={(step) => setStep(step)} />
        )}
        {step === 2.2 && (
          <STEP_2_2 onChangeStep={(step) => setStep(step)} />
        )}
        {step === 3.1 && (
          <STEP_3_1 onChangeStep={(step) => setStep(step)} />
        )}
        {step === 3.2 && (
          <STEP_3_2 onChangeStep={(step) => setStep(step)} />
        )}
        {step === 3.3 && (
          <STEP_3_3 onChangeStep={(step) => setStep(step)} />
        )}
        {step === 3.4 && (
          <STEP_3_4 onChangeStep={(step) => setStep(step)} />
        )}
        {step === 4.1 && (
          <STEP_4_1 onChangeStep={(step) => setStep(step)} />
        )}
        {step === 5.1 && (
          <STEP_5_1 onChangeStep={(step) => setStep(step)} />
        )}
        {step === 5.2 && (
          <STEP_5_2 onChangeStep={(step) => setStep(step)} />
        )}
        {step === 6.1 && (
          <STEP_5_2 onChangeStep={(step) => setStep(step)} />
        )}
      </div>
    </div>
  );
}
