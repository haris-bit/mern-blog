import { useState, useEffect } from 'react'
import { Sidebar } from 'flowbite-react';
import { useSelector } from 'react-redux'; 
import { HiChartPie, HiUser, HiArrowSmRight, HiDocumentText, HiOutlineUserGroup, HiAnnotation } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';



const DashSidebar = () => {
    const { currentUser } = useSelector((state) => state.user);
    const location = useLocation();

    const [tab, setTab] = useState('');
    const dispatch = useDispatch();
  
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    }, [location.search]);

    const handleSignOut = async () => {
      try {
        const res = await fetch(`/api/user/signout`, {
          method: "POST",
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signOutSuccess());
        }
  
  
      } catch (error) {
        console.log(error.message);
      }
    };
  return (
    <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
            <Sidebar.ItemGroup className="flex flex-col gap-1">
                {currentUser && currentUser.isAdmin && (
                    <Link to="/dashboard?tab=dash">
                        <Sidebar.Item
                        active={tab === 'dash'}
                        icon={HiChartPie}
                        as="div"
                        >
                            Dashboard
                        </Sidebar.Item>
                    </Link>
                )}
            <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>

          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}

          {currentUser.isAdmin && (
            <>
            <Link to='/dashboard?tab=users'>
              <Sidebar.Item
                active={tab === 'users'}
                icon={HiOutlineUserGroup}
                as="div"
              >
                Users
              </Sidebar.Item>
            </Link>

            <Link to='/dashboard?tab=comments'>
              <Sidebar.Item
                active={tab === 'comments'}
                icon={HiAnnotation}
                as="div"
              >
                Comments
              </Sidebar.Item>
            </Link>
            </>
          )}


          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </Sidebar.Item>

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar;
    