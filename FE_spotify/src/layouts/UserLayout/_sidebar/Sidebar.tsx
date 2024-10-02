import { NavLink, useNavigate } from 'react-router-dom'
import './sidebar.css'
import { Button, Popover } from 'antd';
import { useModal } from '../../../globalContext/ModalContext';
import { useAppSelector } from '../../../redux/hooks';

export default function Sidebar() {
  const { openModal, openPopover, popover } = useModal()
  const navigate = useNavigate()
  const { currentUser } = useAppSelector((state => state.currentUser))

  return (
    <div className='sidebar mt-3 pl-3 mr-2'>
      <div className='sidebar-top mb-2'>
        <button className='logo-spotify'>
          <i className="fa-brands fa-spotify mr-1"></i>
          <span>Spotify</span>
        </button>
        <NavLink to={'/'} className={({ isActive }) =>
          isActive ? ("my-active btn-home") : ("btn-home")
        }>
          <i className="fa-solid fa-house"></i>
          Home
        </NavLink>
        <NavLink to={'search'} className={({ isActive }) =>
          isActive ? ("my-active btn-search") : ("btn-search")
        }>
          <i className="fa-solid fa-magnifying-glass"></i>
          Search
        </NavLink>
      </div>
      <div className="sidebar-bottom">
        <div>
          <div className='flex justify-between items-center library mb-7'>
            <div><i className="fa-solid fa-lines-leaning"></i>Your Library</div>
            <button>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className='create-playlist '>
            <p className="font-bold">Create your first playlist</p>
            <p className='font-medium'>It's easy, we'll help you</p>
            {!currentUser ? (<Popover
              style={{ backgroundColor: 'blue', left: "10%" }}
              content={<a onClick={popover}>Close</a>}
              title={
                <>
                  <p className='text-lg font-bold'>Create a playlist</p>
                  <p>Log in to create and share playlists.</p>
                  <br />
                  <Button
                    onClick={openModal}
                  >Login</Button>
                </>
              }
              trigger="click"
              open={openPopover}
              placement="rightTop"
              onOpenChange={popover}
            >
              <Button
                type="primary"
                className='btn-createPlaylist'
                onClick={popover}
              >Create playlist</Button>
            </Popover>
            ) : (<Button
              type="primary"
              className='btn-createPlaylist'
              onClick={() => { navigate('/play-list') }}
            >Create playlist</Button>)}

          </div>
          <div className='footer-sidebar-bottom'>
            <span>Legal</span>
            <span>Safety & Privacy Center</span>
            <span>Privacy Policy</span>
            <span>Cookies</span>
            <span>About Ads</span>
            <span>Accessibility</span>
            <span>Cookies</span>
          </div>
          <div className='languages'>
            <button className='btn-languages'>
              <i className="fa-solid fa-earth-americas mr-2"></i>English
            </button>
          </div>
        </div>
      </div>
    </div >
  )
}
