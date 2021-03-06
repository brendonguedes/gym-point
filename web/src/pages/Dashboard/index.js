import React, { useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUserGraduate, FaCheckCircle } from 'react-icons/fa';
import { MdGroup } from 'react-icons/md';
import posed from 'react-pose';

import { loadStudentsRequest } from '~/store/reducers/students/actions';
import { loadPlansRequest } from '~/store/reducers/plans/actions';
import { loadEnrollmentsRequest } from '~/store/reducers/enrollments/actions';
import { loadOrdersRequest } from '~/store/reducers/helpOrders/actions';

import { PageWrapper, ColLeft, ColRight } from '~/styles/layout';
import {
  SummaryCard,
  SummaryWrapper,
  Container,
  Overview,
  IconFrame,
} from './styles';

import Card from '~/components/Card';
import Gym from '~/assets/gym.svg';
import OrdersChart from './ordersChart';

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStudentsRequest());
    dispatch(loadPlansRequest());
    dispatch(loadEnrollmentsRequest());
    dispatch(loadOrdersRequest());
  }, []); // eslint-disable-line

  const profile = useSelector(state => state.user.profile);
  const students = useSelector(state => state.students.list);
  const enrollments = useSelector(state => state.enrollments.list);
  const plans = useSelector(state => state.plans.list);
  const orders = useSelector(state => state.orders.list);
  const studentsTotal = useMemo(() => students && students.length, [students]);

  // AVG Active Registered Students

  const getStudentTotal = students && students.length;
  const getEnrollmentsTotal = enrollments && enrollments.length;
  const activeMembersAvg = (getEnrollmentsTotal / getStudentTotal).toFixed(1);

  // AVG Plans
  const getPlansTotal = plans && plans.length;

  // get status for the chart
  const questionsCount = orders && orders.length;
  const answer = orders && orders.map(order => order.answer);
  const answersCount = answer && answer.filter(item => item !== null).length;

  const chartData = [
    {
      angle: questionsCount,
      color: '#536cfa',
    },
    { angle: answersCount, color: '#ebeef1' },
  ];

  // Table Animation
  const Table = posed.ul({
    start: {
      x: '0%',
      delayChildren: 200,
      staggerChildren: 50,
    },
    end: { x: '-100%', delay: 300 },
  });

  const Item = posed.li({
    start: { y: 0, opacity: 1 },
    end: { y: 20, opacity: 0 },
  });

  const [isAnimated, setAnimation] = useState(false);

  useEffect(() => {
    setTimeout(setAnimation({ isAnimated: !isAnimated }), 1000);
  }, [isAnimated]);

  return (
    <PageWrapper>
      <ColLeft>
        <h3>
          Hello {profile.name}, <br />
          check what is new.
        </h3>
        <p>
          Have a look at the Gym Summary <br />
          and check what is new.
        </p>
      </ColLeft>

      <ColRight>
        <Card fullHeight>
          <h3 style={{ marginBottom: '30px' }}>
            <strong>Feed</strong>
          </h3>
          <Container>
            <SummaryWrapper>
              <SummaryCard student>
                <IconFrame>
                  <FaUserGraduate size="25px" />
                </IconFrame>

                <p>{students && `${studentsTotal} Students`}</p>
              </SummaryCard>

              <SummaryCard enrollment>
                <IconFrame>
                  <FaCheckCircle size="25px" />
                </IconFrame>

                <p>{`${getEnrollmentsTotal} Active Members`}</p>
              </SummaryCard>

              <SummaryCard orders>
                <IconFrame>
                  <MdGroup size="25px" />
                </IconFrame>

                <p>{`${activeMembersAvg} Avg Active`}</p>
              </SummaryCard>
            </SummaryWrapper>

            <Overview>
              <strong>Gym Plans</strong>

              <Table pose={isAnimated ? 'start' : 'end'}>
                <Item>
                  Total Plans <strong>{getPlansTotal}</strong>
                </Item>
                <Item>
                  Most Popular Plan <strong>Gold</strong>
                </Item>
                <Item>
                  Least Popular Plan <strong>Start</strong>
                </Item>
              </Table>

              <img src={Gym} alt="gym" />
            </Overview>

            <Overview bordered>
              <strong style={{ color: 'var(--color-blue)' }}>
                Help Orders
              </strong>

              <OrdersChart data={chartData} />
              <p style={{ paddingBottom: 15 }}>
                Total Questions: <strong>{questionsCount}</strong>
              </p>
              <p>
                Open Questions: <strong>{answersCount}</strong>
              </p>
            </Overview>
          </Container>
        </Card>
      </ColRight>
    </PageWrapper>
  );
}
