import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

// eslint-disable-next-line react/prop-types
const Home = ({ isShowChatMenu }) => {
  return (
    <div className={`flex gap-5 relative sm:h-[calc(100vh_-_150px)] h-full `}>
      <div className='flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};
export default Home;
