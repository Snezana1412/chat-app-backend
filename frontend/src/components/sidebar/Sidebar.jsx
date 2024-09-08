import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isShowChatMenu }, user) => {
  return (
    <div
      className='panel p-4 flex-none max-w-xs w-full absolute xl:relative z-10 space-y-4 xl:h-full  xl:block overflow-hidden h-full
        block'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center'>
          <div className='flex-none'>
            <img
              src='/assets/images/profile-34.jpeg'
              className='rounded-full h-12 w-12 object-cover'
              alt=''
            />
          </div>
          <div className='mx-3'>
            <p className='mb-1 font-semibold'>{user.fullName}</p>
            <p className='text-xs text-white-dark'>Software Developer</p>
          </div>
        </div>
      </div>
      <SearchInput />
      <div className='divider px-3'></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;

// STARTER CODE FOR THIS FILE
// import Conversations from "./Conversations";
// import LogoutButton from "./LogoutButton";
// import SearchInput from "./SearchInput";

// const Sidebar = () => {
// 	return (
// 		<div className='border-r border-slate-500 p-4 flex flex-col'>
// 			<SearchInput />
// 			<div className='divider px-3'></div>
// 			<Conversations />
// 			<LogoutButton />
// 		</div>
// 	);
// };
// export default Sidebar;
