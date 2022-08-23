import type { NextPage } from 'next';
import LivingRoom from '../components/LivingRoom';
import DiningRoom from '../components/DiningRoom';

const Home: NextPage = () => {
  return (
    <>
      <LivingRoom />
      <DiningRoom />
    </>
  );
};

export default Home;
