import type { NextPage } from 'next';
import LivingRoom from '../components/LivingRoom';
import DiningRoom from '../components/DiningRoom';

const Home: NextPage = () => {
  return (
    <div className="h-screen snap-mandatory snap-y overflow-y-scroll">
      <LivingRoom />
      <DiningRoom />
    </div>
  );
};

export default Home;
